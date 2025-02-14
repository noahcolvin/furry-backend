import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { or, arrayContains, ilike } from "npm:drizzle-orm";
import getDb from "../_shared/data/database.ts";
import { itemTable } from "../_shared/data/schema.ts";

Deno.serve(async (req: Request) => {
  const { url } = req;

  const u = new URL(url);
  const animal = u.searchParams.get("animal")?.toLowerCase();
  const product = u.searchParams.get("product")?.toLowerCase();
  const searchTerm = u.searchParams.get("search")?.toLowerCase();

  const db = getDb();
  const query = db.select().from(itemTable);

  if (animal && product) {
    query.where(arrayContains(itemTable.categories, [animal, product]));
  } else if (animal) {
    query.where(arrayContains(itemTable.categories, [animal]));
  } else if (product) {
    query.where(arrayContains(itemTable.categories, [product]));
  }

  if (searchTerm) {
    query.where(
      or(
        ilike(itemTable.name, `%${searchTerm}%`),
        ilike(itemTable.description, `%${searchTerm}%`),
      ),
    );
  }

  const items = await query.execute();

  return new Response(JSON.stringify(items), {
    headers: { "Content-Type": "application/json" },
  });
});
