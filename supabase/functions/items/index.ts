import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { StoreItem, storeItems } from '../_shared/store-items.ts';

Deno.serve(async (req: Request) => {
  const { url } = req;

  const u = new URL(url);
  const animal = u.searchParams.get('animal')?.toLowerCase();
  const product = u.searchParams.get('product')?.toLowerCase();
  const searchTerm = u.searchParams.get('search')?.toLowerCase();

  const data: StoreItem[] = storeItems.filter(item => {
    if (!animal && !product && !searchTerm) {
      return true;
    }

    if (animal && !item.categories.some(category => category.toLowerCase() === animal)) {
      return false;
    }

    if (product && !item.categories.some(category => category.toLowerCase() === product)) {
      return false;
    }

    if (searchTerm && (item.name.toLowerCase().includes(searchTerm) || item.description.toLowerCase().includes(searchTerm))) {
      return true;
    }

    return !searchTerm;
  });

  return new Response(JSON.stringify({ items: data }), { headers: { 'Content-Type': 'application/json' } });
});
