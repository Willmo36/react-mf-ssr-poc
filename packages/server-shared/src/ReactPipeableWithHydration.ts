import { QueryClient, dehydrate, Query } from "@tanstack/react-query";
import { Writable } from "node:stream";

export class ReactPipeableWithHydration extends Writable {
  private queryStorage: { [key: string]: boolean } = {};
  private queriesCache: string[] = [];

  constructor(readonly _writable: Writable, readonly queryClient: QueryClient) {
    super();
  }

  public _write(
    chunk: any,
    encoding: BufferEncoding,
    next?: (error: Error | null | undefined) => void
  ) {
    if (this._writable.destroyed) {
      return;
    }
    // console.info("CHUNK", chunk.toString());
    // this._writable.write(chunk, encoding, next);
    // console.info("CHUCK-RQ", this.queryClient.getQueryCache().getAll());
    // const dehydrated = dehydrate(this.queryClient, {shouldDehydrateQuery: () => true}).queries;
    // const hydrateScript = `<script data-hydrate-me type="application/json">${JSON.stringify(dehydrated)}</script>`
    // this._writable.write(hydrateScript);
    const queryClientCache = this.queryClient.getQueryCache().getAll() as Array<
      Query<unknown, unknown>
    >;

    if (queryClientCache.length !== this.queriesCache.length) {
      const queryToDehydrate = queryClientCache.find(
        (q) => q.state.status !== "loading" && !this.queryStorage[q.queryHash]
      );
      if (queryToDehydrate) {
        this.queryStorage[queryToDehydrate.queryHash] = true;
        this.queriesCache.push(queryToDehydrate.queryHash);

        const randomScriptElementVarName = generateRandomId("__script");
        const queryHash = JSON.stringify(queryToDehydrate.queryHash);
        const queryData = JSON.stringify({
          queries: [dehydrateQuery(queryToDehydrate)],
        });
        const scriptContent = JSON.stringify(
          `window[${queryHash}] = ${queryData}`
        );
        this._writable.write(
          wrapWithImmediateScript(`
          var ${randomScriptElementVarName} = document.createElement('script');
          ${randomScriptElementVarName}.innerHTML = ${scriptContent};
          document.body.appendChild(${randomScriptElementVarName});
        `)
        );
      }
    }
    this._writable.write(chunk, encoding, next);
  }
  /**
   * React uses `flush` to prevent stream middleware like gzip from buffering to the
   * point of harming streaming performance, so we make sure to expose it and forward it.
   * See: https://github.com/reactwg/react-18/discussions/91
   */
  public flush() {
    if (typeof (this._writable as any).flush === "function") {
      (this._writable as any).flush();
    }
  }
}

function wrapWithImmediateScript(code: string) {
  const randomScriptId = generateRandomId();

  return `<script data-hydrate-me id="${randomScriptId}">${code}document.getElementById("${randomScriptId}").remove();</script>`;
}

function generateRandomId(prefix?: string) {
  return `${prefix || ""}_${(Math.random() * 1000000).toFixed()}`;
}

function dehydrateQuery(query: Query<unknown, unknown>) {
  return {
    state: query.state,
    queryKey: query.queryKey,
    queryHash: query.queryHash,
  };
}