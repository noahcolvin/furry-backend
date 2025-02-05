# Furry Backend
This is a sample backend for a mobile app named `Furry`, a sample mobile app for a pet store.
## Features
This has three endpoints:
- `/items`: Get a list of store items
  - By default returns all items
  - `?animal={animal}`: Filter by animal type
  - `?product={product}`: Filter by product type
  - `?search={search}`: Search for items
- `/my-favorite-items`: Get a list of your favorite items
- `/my-friends`: Gets a list of your friends
## How to run
This is setup to run on [Supabase](https://supabase.com/). Go through the instructions to set up Supabase CLI and Docker Desktop.

#### Create `.env` file
`/supabase/functions/.env`: This holds the base URL for the file storage
```
STORAGE_URL=http://{projectId}supabase.co/storage/v1/object/public
```

Start the local service:
```bash
supabase start
supabase functions serve
```

## Running Tests
Follow the instructions to set up [Deno](https://deno.com/).
#### Create `.env` file

`/.env`: This is for running the tests
```
SUPABASE_URL=http://localhost:54321
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
STORAGE_URL=http://{projectId}supabase.co/storage/v1/object/public #make this match the other one
```

Functions must be running from previous instructions, then run the tests:
```bash
deno test --allow-all
```