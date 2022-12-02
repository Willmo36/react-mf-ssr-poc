import { hydrate, isServer, QueryClient, QueryKey, QueryKeyHashFunction } from "@tanstack/react-query";

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			suspense: true
		}
	}
})

export const simpleQueryKeyHash: QueryKeyHashFunction<string[]> = qk => qk.join("-");

export const hydrateQueryClient = (client: QueryClient, qk: string[]) => {
  if (!isServer) {
    const result = (window as any)[simpleQueryKeyHash(qk)];
    hydrate(client, result);
  }
}