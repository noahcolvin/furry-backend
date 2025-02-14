import { expect } from "jsr:@std/expect";
import { createClient, SupabaseClient } from "jsr:@supabase/supabase-js@2";
import { SelectItem } from "../_shared/data/schema.ts";

import "https://deno.land/x/dotenv@v3.2.2/load.ts";

const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
const options = {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false,
  },
};

const testReturnsAllForNoFilter = async () => {
  const client: SupabaseClient = createClient(
    supabaseUrl,
    supabaseKey,
    options,
  );

  const { data: func_data, error: func_error } = await client.functions.invoke(
    "items",
    {
      body: {},
    },
  );

  if (func_error) {
    throw new Error("Invalid response: " + func_error);
  }

  expect(func_data.length).toBe(11);
};

const testFiltersAnimals = async () => {
  const client: SupabaseClient = createClient(
    supabaseUrl,
    supabaseKey,
    options,
  );

  const { data: func_data, error: func_error } = await client.functions.invoke(
    "items?animal=dog",
    {
      body: {},
    },
  );

  if (func_error) {
    throw new Error("Invalid response: " + func_error);
  }

  expect(func_data.length).toBeGreaterThan(0);
  func_data.forEach((item: SelectItem) => {
    expect(item.categories).toContain("dog");
  });
};

const testFiltersProducts = async () => {
  const client: SupabaseClient = createClient(
    supabaseUrl,
    supabaseKey,
    options,
  );

  const { data: func_data, error: func_error } = await client.functions.invoke(
    "items?product=food",
    {
      body: {},
    },
  );

  if (func_error) {
    throw new Error("Invalid response: " + func_error);
  }

  expect(func_data.length).toBeGreaterThan(0);
  func_data.forEach((item: SelectItem) => {
    expect(item.categories).toContain("food");
  });
};

const testFiltersAnimalsAndProducts = async () => {
  const client: SupabaseClient = createClient(
    supabaseUrl,
    supabaseKey,
    options,
  );

  const { data: func_data, error: func_error } = await client.functions.invoke(
    "items?animal=dog&product=food",
    {
      body: {},
    },
  );

  if (func_error) {
    throw new Error("Invalid response: " + func_error);
  }

  expect(func_data.length).toBeGreaterThan(0);
  func_data.forEach((item: SelectItem) => {
    expect(item.categories).toContain("dog");
    expect(item.categories).toContain("food");
  });
};

const testSearchingName = async () => {
  const client: SupabaseClient = createClient(
    supabaseUrl,
    supabaseKey,
    options,
  );

  const { data: func_data, error: func_error } = await client.functions.invoke(
    "items?search=good",
    {
      body: {},
    },
  );

  if (func_error) {
    throw new Error("Invalid response: " + func_error);
  }

  expect(func_data.length).toBeGreaterThan(0);
  func_data.forEach((item: SelectItem) => {
    expect(item.name.toLowerCase()).toContain("good");
  });
};

const testSearchingDescription = async () => {
  const client: SupabaseClient = createClient(
    supabaseUrl,
    supabaseKey,
    options,
  );

  const { data: func_data, error: func_error } = await client.functions.invoke(
    "items?search=chew",
    {
      body: {},
    },
  );

  if (func_error) {
    throw new Error("Invalid response: " + func_error);
  }

  expect(func_data.length).toBeGreaterThan(0);
  func_data.forEach((item: SelectItem) => {
    expect(item.description.toLowerCase()).toContain("chew");
  });
};

const testSearchingAnimalProduct = async () => {
  const client: SupabaseClient = createClient(
    supabaseUrl,
    supabaseKey,
    options,
  );

  const { data: func_data, error: func_error } = await client.functions.invoke(
    "items?search=meow&animal=cat&product=food",
    {
      body: {},
    },
  );

  if (func_error) {
    throw new Error("Invalid response: " + func_error);
  }

  expect(func_data.length).toBeGreaterThan(0);
  func_data.forEach((item: SelectItem) => {
    expect(item.name.toLowerCase()).toContain("meow");
    expect(item.categories).toContain("cat");
    expect(item.categories).toContain("food");
  });
};

Deno.test("items returns all with no filter", testReturnsAllForNoFilter);
Deno.test("items filters animals", testFiltersAnimals);
Deno.test("items filters products", testFiltersProducts);
Deno.test("items filters animals and products", testFiltersAnimalsAndProducts);
Deno.test("items searches name", testSearchingName);
Deno.test("items searches description", testSearchingDescription);
Deno.test("items uses all filters at once", testSearchingAnimalProduct);
