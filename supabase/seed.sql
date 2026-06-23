-- =============================================================================
-- Seed data — optional starter rows. Run AFTER schema.sql.
-- Safe to re-run: testimonials de-dupe on (name, company); posts on slug.
-- =============================================================================

insert into public.testimonials (quote, name, role, company, icon, rating, sort_order)
values
  ('Navya EdTech rebuilt our store from scratch. Page loads dropped to under a second and online orders climbed 60% in the first quarter. They understood our business before writing a single line of code.',
   'Aarav Shrestha', 'Founder', 'Kathmandu Cart', 'ShoppingBag', 5, 1),
  ('The custom LMS they built handles thousands of learners without a hiccup. Clean dashboards, fast support, and a team that actually listens. Easily our best technology decision this year.',
   'Sneha Maharjan', 'Director', 'BrightMinds Academy', 'GraduationCap', 5, 2),
  ('Their ERP rollout unified our finance, inventory, and HR into one place. What used to take days now takes minutes. The onboarding was smooth and the system simply works.',
   'Bibek Gurung', 'Operations Head', 'Himalayan Traders', 'Building2', 5, 3),
  ('From the website to our social media reels, everything finally feels consistent and premium. Engagement is up, leads are up, and we look like a brand twice our size.',
   'Priya Thapa', 'Marketing Lead', 'Bloom & Co.', 'Store', 5, 4)
on conflict do nothing;

insert into public.blog_posts (slug, title, excerpt, content, author, category, tags, status, read_minutes, published_at)
values
  ('why-your-business-needs-a-fast-website',
   'Why Your Business Needs a Fast Website in 2026',
   'Speed is no longer a nice-to-have. Here is how page performance directly shapes trust, conversions, and search ranking.',
   E'# Why speed wins\n\nA one-second delay can cut conversions noticeably. In this post we break down Core Web Vitals, what they mean for a small business, and the practical steps we take to keep Navya-built sites under a second.\n\n## What we measure\n\n- Largest Contentful Paint\n- Interaction to Next Paint\n- Cumulative Layout Shift\n\nReach out if you''d like a free performance audit of your current site.',
   'Navya EdTech', 'Web Performance', array['performance', 'seo', 'web'],
   'published', 4, now())
on conflict (slug) do nothing;
