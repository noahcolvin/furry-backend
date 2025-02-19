import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { count, inArray } from "npm:drizzle-orm";
import getDb from "../_shared/data/database.ts";
import { itemTable } from "../_shared/data/schema.ts";

const storageUrl = Deno.env.get("STORAGE_URL") ?? "";

const getRandomUniqueNumbers = (max: number): number[] => {
  const numberOfValues = Math.floor(Math.random() * 3) + 2;
  const uniqueNumbers = new Set<number>();

  while (uniqueNumbers.size < numberOfValues) {
    uniqueNumbers.add(Math.floor(Math.random() * max) + 1);
  }

  return Array.from(uniqueNumbers);
};

Deno.serve(async (_) => {
  const db = getDb();
  const itemCount = await db.select({ value: count() }).from(itemTable);
  const indexesToGrab = getRandomUniqueNumbers(itemCount[0].value);
  const myFavoriteItems = await db.select().from(itemTable).where(
    inArray(itemTable.id, indexesToGrab),
  ).execute();

  myFavoriteItems.forEach((item) => {
    item.image = storageUrl + item.image;
  });

  return new Response(JSON.stringify(myFavoriteItems), {
    headers: { "Content-Type": "application/json" },
  });
});
