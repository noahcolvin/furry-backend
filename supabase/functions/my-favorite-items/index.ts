import "jsr:@supabase/functions-js/edge-runtime.d.ts";

import { StoreItem, storeItems } from "../_shared/store-items.ts";

const generateRandomNumberBetween = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

Deno.serve((_) => {
  const tempItems = [...storeItems];
  const numberOfFavorites: number = generateRandomNumberBetween(2, 4);

  const myFavorites: StoreItem[] = [];

  for (let i = 0; i < numberOfFavorites; i++) {
    const itemIndex = generateRandomNumberBetween(0, tempItems.length - 1);
    const tempItem = tempItems[itemIndex];
    tempItems.splice(itemIndex, 1);

    myFavorites.push(tempItem);
  }

  return new Response(JSON.stringify(myFavorites), {
    headers: { "Content-Type": "application/json" },
  });
});
