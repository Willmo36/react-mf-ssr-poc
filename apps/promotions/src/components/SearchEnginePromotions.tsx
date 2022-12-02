import {
  hydrate,
  isServer,
  QueryKeyHashFunction,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useFragmentInfo } from "fragments";
import React from "react";
import { PromotionListViewData } from "../domain/Promotion";
import { PromotionListView } from "./PromotionListView";

const promo1: PromotionListViewData = {
  title: "You're on a roll!",
  description: "Get a free meal when you order twice more by Sunday",
  id: Math.floor(Math.random() * 100),
};
const promo2: PromotionListViewData = {
  title: "Freshii Fanatic",
  description: "Order 3 slots with Freshii, get 1 for free!",
  id: Math.floor(Math.random() * 100),
};
const promos = [promo1, promo2];

const customQueryKeyHashFn: QueryKeyHashFunction<string[]> = (qk) =>
  `${qk.join("-")}`;

export const SearchEnginePromotions: React.FC<{ query: string }> = (props) => {
  useFragmentInfo("SearchEnginePromotions", props);

  const queryKey = ["promos", props.query];
  const queryClient = useQueryClient();
  const queryHash = customQueryKeyHashFn(queryKey);
  if (!isServer) {
    const result = (window as any)[queryHash];
    hydrate(queryClient, result);
  }

  const promosQuery = useQuery({
    queryKey,
    staleTime: 1000 * 30, 
    queryFn: () => Promise.resolve(promos),
    queryKeyHashFn: customQueryKeyHashFn
  });
  return (
    <div className="this guy is missing hydration">
      <h4 className="text-3xl font-bold ">Promotions</h4>
      <ul className="flex">
        {promosQuery.data?.map((promo) => (
          <PromotionListView key={promo.title} {...promo} />
        ))}
      </ul>
    </div>
  );
};

export default SearchEnginePromotions;
