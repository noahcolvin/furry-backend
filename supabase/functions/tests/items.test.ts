import { assertEquals } from 'jsr:@std/assert';
import { createClient, SupabaseClient } from 'jsr:@supabase/supabase-js@2';

import { StoreItem, storeItems } from '../_shared/store-items.ts';

import 'https://deno.land/x/dotenv@v3.2.2/load.ts';

const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY') ?? '';
const options = {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false,
  },
};

const typedArrayToNormalJson = (data: any) => JSON.parse(JSON.stringify(data));

const testReturnsAllForNoFilter = async () => {
  var client: SupabaseClient = createClient(supabaseUrl, supabaseKey, options);

  const { data: func_data, error: func_error } = await client.functions.invoke('items', {
    body: {},
  });

  if (func_error) {
    throw new Error('Invalid response: ' + func_error);
  }

  assertEquals(func_data, { items: typedArrayToNormalJson(storeItems) });
};

const testFiltersAnimals = async () => {
  var client: SupabaseClient = createClient(supabaseUrl, supabaseKey, options);

  const { data: func_data, error: func_error } = await client.functions.invoke('items?animal=dog', {
    body: {},
  });

  if (func_error) {
    throw new Error('Invalid response: ' + func_error);
  }

  const filteredItems = storeItems.filter(item => item.categories.includes('dog'));

  assertEquals(func_data, { items: typedArrayToNormalJson(filteredItems) });
};

const testFiltersProducts = async () => {
  var client: SupabaseClient = createClient(supabaseUrl, supabaseKey, options);

  const { data: func_data, error: func_error } = await client.functions.invoke('items?product=food', {
    body: {},
  });

  if (func_error) {
    throw new Error('Invalid response: ' + func_error);
  }

  const filteredItems = storeItems.filter(item => item.categories.includes('food'));

  assertEquals(func_data, { items: typedArrayToNormalJson(filteredItems) });
};

const testFiltersAnimalsAndProducts = async () => {
  var client: SupabaseClient = createClient(supabaseUrl, supabaseKey, options);

  const { data: func_data, error: func_error } = await client.functions.invoke('items?animal=dog&product=food', {
    body: {},
  });

  if (func_error) {
    throw new Error('Invalid response: ' + func_error);
  }

  const filteredItems = storeItems.filter(item => item.categories.includes('food') && item.categories.includes('dog'));

  assertEquals(func_data, { items: typedArrayToNormalJson(filteredItems) });
};

const testSearching = async () => {
  var client: SupabaseClient = createClient(supabaseUrl, supabaseKey, options);

  const { data: func_data, error: func_error } = await client.functions.invoke('items?search=good', {
    body: {},
  });

  if (func_error) {
    throw new Error('Invalid response: ' + func_error);
  }

  const filteredItems = storeItems.filter(item => item.name.toLowerCase().includes('good'));

  assertEquals(func_data, { items: typedArrayToNormalJson(filteredItems) });
};

const testSearchingAnimalProduct = async () => {
  var client: SupabaseClient = createClient(supabaseUrl, supabaseKey, options);

  const { data: func_data, error: func_error } = await client.functions.invoke('items?search=meow&animal=cat&product=food', {
    body: {},
  });

  if (func_error) {
    throw new Error('Invalid response: ' + func_error);
  }

  const filteredItems = storeItems.filter(item => item.name.toLowerCase().includes('meow') && item.categories.includes('cat') && item.categories.includes('food'));

  assertEquals(func_data, { items: typedArrayToNormalJson(filteredItems) });
};

Deno.test('items returns all with no filter', testReturnsAllForNoFilter);
Deno.test('items filters animals', testFiltersAnimals);
Deno.test('items filters products', testFiltersProducts);
Deno.test('items filters animals and products', testFiltersAnimalsAndProducts);
Deno.test('items searching', testSearching);
Deno.test('items uses all filters at once', testSearchingAnimalProduct);
