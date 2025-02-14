import { expect } from 'jsr:@std/expect';
import { createClient, SupabaseClient } from 'jsr:@supabase/supabase-js@2';

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

const testReturnsRandomFriends = async () => {
  const client: SupabaseClient = createClient(supabaseUrl, supabaseKey, options);

  const { data: func_data, error: func_error } = await client.functions.invoke('my-friends', {
    body: {},
  });

  if (func_error) {
    throw new Error('Invalid response: ' + func_error);
  }

  const friends = func_data;

  expect(friends.length).toBeGreaterThanOrEqual(1);
  expect(friends.length).toBeLessThanOrEqual(3);
};

Deno.test('my-friends returns random friends', testReturnsRandomFriends);
