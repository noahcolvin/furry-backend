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
STORAGE_URL=http://{projectId}.supabase.co/storage/v1/object/public #make this match the other one
```

Functions must be running from previous instructions, then run the tests:
```bash
deno test --allow-all
```

## Questions
#### What is the purpose of this project?
I created this project to demonstrate a simple backend for a mobile app.

- [furry-backend-express - TypeScript/Node/Express](https://github.com/noahcolvin/furry-backend-express)
- [furry-backend-dotnet - .NET Core](https://github.com/noahcolvin/furry-backend-dotnet)

#### The controllers are very simple, why don't they do more?
Yes, they only GET a few pieces of data. The sample mobile app is not complete and only displays data. If the modile app ever does more, the backend can be expanded to include the rest of the CRUD operations.

#### Why is the data hard-coded?
Just to keep it simple. In a real application, you'd need a way to add, update, and delete data as well.

#### Why is there no authentication?
No need for the current app.

#### Code X is bad, why didn't you do Y?
This is just a sample exercise and was completed in about a day. I'm sure there are many improvements that could be made. Fell free to make an issue or PR if you have a suggestion. This doesn't need to be perfect but I am certainly open to feedback. I may add to it in the future.