import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { count, inArray } from "npm:drizzle-orm";
import getDb from "../_shared/data/database.ts";
import { friendTable } from "../_shared/data/schema.ts";

const storageUrl = Deno.env.get("STORAGE_URL") ?? "";

const getRandomUniqueNumbers = (max: number): number[] => {
  const numberOfValues = Math.floor(Math.random() * 3) + 1;
  const uniqueNumbers = new Set<number>();

  while (uniqueNumbers.size < numberOfValues) {
    uniqueNumbers.add(Math.floor(Math.random() * max) + 1);
  }

  return Array.from(uniqueNumbers);
};

Deno.serve(async (_) => {
  const db = getDb();
  const friendCount = await db.select({ value: count() }).from(friendTable);
  const indexesToGrab = getRandomUniqueNumbers(friendCount[0].value);
  const myFriends = await db.select().from(friendTable).where(
    inArray(friendTable.id, indexesToGrab),
  ).execute();

  myFriends.forEach((friend) => {
    friend.image = storageUrl + friend.image;
  });

  return new Response(JSON.stringify(myFriends), {
    headers: { "Content-Type": "application/json" },
  });
});
