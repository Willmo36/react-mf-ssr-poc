import { PromotionListViewData } from "../domain/Promotion";

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
export const queryPromotions = async (
  query: string
): Promise<PromotionListViewData[]> => {
  if (!!process.env.SERVER) {
    return Promise.resolve(
      promos.filter((promo) => {
        return promo.title.toLowerCase().startsWith(query);
      })
    );
  } else {
    const res = await fetch(`http://localhost:3002/query?query=${query}`);
    return res.json();
  }
}