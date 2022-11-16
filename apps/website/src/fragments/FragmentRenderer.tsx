import React, { ComponentType, Suspense } from "react";
import { fetch } from "cross-fetch";

const isServer = typeof window === "undefined";

export class FragmentRenderer<Props extends Record<string, any>> {
  constructor(
    readonly ssrUrl: string,
    readonly mfImport: () => Promise<{ default: ComponentType<any> }>,
  ) {}

  render(props: Props) {
    return isServer ? this.renderServer(props) : this.renderClient(props);
  }

  renderClient(props: Props) {
    console.info("Render client")
    const Comp = React.lazy(this.mfImport);
    return (
      <Suspense>
        <section data-mf={this.ssrUrl}>
          <Comp {...props} />
        </section>
      </Suspense>
    );
  }

  renderServer(props: Props) {
    console.info("Render server")
    const Comp = React.lazy(async () => {
    const propsQuery = new URLSearchParams(props).toString();
    const res = await fetch(`${this.ssrUrl}?${propsQuery}`);
    const fragment =  await res.text();
      const component = () => (
        <section
          data-mf={this.ssrUrl}
          dangerouslySetInnerHTML={{ __html: fragment }}
        />
      );
      return {
        default: component,
      };
    });
    return (
      <Suspense>
        <Comp />
      </Suspense>
    );
  }
}
