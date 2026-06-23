# Supabase backend — setup (≈10 minutes, free tier)

This site uses **Supabase** for: contact-form submissions, user accounts/profiles,
testimonials, and blog posts. Analytics stays on Google Analytics 4 (already set up).

Everything runs on Supabase's **free tier** — no credit card needed.

## 1. Create a project

1. Go to <https://supabase.com> → **Start your project** → sign in with GitHub.
2. **New project** → pick a name (e.g. `navya-edtech`), set a database password
   (save it somewhere), choose the region closest to your users → **Create**.
3. Wait ~2 minutes for it to provision.

## 2. Create the tables

1. In the dashboard sidebar: **SQL Editor** → **New query**.
2. Open [`schema.sql`](./schema.sql), copy everything, paste it in, click **Run**.
3. (Optional) Do the same with [`seed.sql`](./seed.sql) to load the 4 starter
   testimonials and one sample blog post.

## 3. Connect the website

1. Dashboard → **Project Settings** → **API**.
2. Copy the **Project URL** and the **anon / public** key.
3. In the project root, copy `.env.example` to `.env` and fill in:

   ```env
   VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOi...your-anon-key...
   ```

4. Restart the dev server (`npm run dev`). The contact form now saves to the
   database, and testimonials/blog posts are read from it.

> The anon key is **meant** to be public — every row is protected by Row-Level
> Security (see the policies in `schema.sql`). Visitors can only submit contact
> messages and read *published* testimonials/posts. Never put the **service_role**
> key in the frontend.

## 4. View / manage your data

The site has a built-in **admin dashboard** at **`/admin/login`** for managing the
overview, blog posts, and testimonials. There is no public sign-up — admin accounts
are created by you:

1. Supabase dashboard → **Authentication** → **Users** → **Add user** → enter an
   email + password (tick "Auto Confirm User").
2. Promote that account to admin in the **SQL Editor**:

   ```sql
   update public.profiles set role = 'admin' where email = 'you@example.com';
   ```

3. Open the site, go to **`/admin/login`**, and sign in with those credentials.
   Non-admin accounts are rejected at login.

You can still use the dashboard's **Table Editor** to edit any row by hand.

## What's wired up in the code

| Feature        | Where                                   |
| -------------- | --------------------------------------- |
| Client         | `src/lib/supabase.ts`                   |
| Types          | `src/types/database.ts`                 |
| Contact form   | `src/services/contact.ts` → `ContactForm.tsx` |
| Testimonials   | `src/services/testimonials.ts` → `TestimonialsSection.tsx` |
| Blog posts     | `src/services/blogs.ts`                 |
| Auth / profile | `src/context/AuthContext.tsx` (`useAuth()`) |

When Supabase env vars are absent, the app falls back to bundled static data, so
local development works without any backend.
