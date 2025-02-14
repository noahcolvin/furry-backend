/* import { Database } from './types.ts';
// @ts-types="npm:@types/pg"
import { Pool, types } from 'npm:pg';
import { Kysely, PostgresDialect } from 'npm:kysely@^0.27.4';

types.setTypeParser(types.builtins.INT4, (val: string) => {
  return parseFloat(val);
});

const dialect = new PostgresDialect({
  pool: new Pool({connectionString:'',
    database: 'postgres',
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    port: 54322,
    max: 10,
  }),
});

export const db = new Kysely<Database>({
  dialect,
});
 */

import { drizzle } from "npm:drizzle-orm/postgres-js";
import postgres from "npm:postgres";

const connectionString = Deno.env.get("SUPABASE_DB_URL")!;

export default function getDb() {
  const client = postgres(connectionString, { prepare: false });
  const db = drizzle(client);
  return db;
}