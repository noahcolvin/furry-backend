import { expect } from "jsr:@std/expect";
import { createClient, SupabaseClient } from "jsr:@supabase/supabase-js@2";

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

const testReturnsRandomItems = async () => {
  const client: SupabaseClient = createClient(
    supabaseUrl,
    supabaseKey,
    options,
  );

  const { data: func_data, error: func_error } = await client.functions.invoke(
    "my-favorite-items",
    {
      body: {},
    },
  );

  if (func_error) {
    throw new Error("Invalid response: " + func_error);
  }

  const items = func_data;

  expect(items.length).toBeGreaterThanOrEqual(2);
  expect(items.length).toBeLessThanOrEqual(4);
};

Deno.test("my-favorite-items returns random items", testReturnsRandomItems);
