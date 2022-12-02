import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import {
  hydrateQueryClient,
  simpleQueryKeyHash,
  useFragmentInfo,
} from "shared";
import { queryPromotions } from "../server/data";
import { PromotionListView } from "./PromotionListView";

export const PromotionSearchResults: React.FC<{ query: string }> = (props) => {
  useFragmentInfo("PromotionSearchResults", props);

  const queryKey = ["promos", props.query];
  const queryClient = useQueryClient();
  hydrateQueryClient(queryClient, queryKey);

  const promosQuery = useQuery({
    queryKey,
    staleTime: 1000 * 30,
    queryFn: ({ queryKey }) => queryPromotions(queryKey[1]),
    queryKeyHashFn: simpleQueryKeyHash,
  });

  return (
    <div className="this guy is missing hydration">
      <h4 className="text-3xl font-bold ">Promotions</h4>
      <ul className="flex">
        {promosQuery.data?.map((promo) => (
          <PromotionListView key={promo.title} {...promo} />
        ))}
        {promosQuery.data?.length === 0 ? (
          <p className="mb-5">No promotions found for "{props.query}"</p>
        ) : null}
      </ul>
    </div>
  );
};

export default PromotionSearchResults;
