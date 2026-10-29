-- =============================================================================
-- Remove the sample (made-up) testimonials that seed.sql used to insert.
-- The site must only show real client reviews submitted through
-- /share-your-story and published by an admin.
-- Safe to re-run.
-- =============================================================================

-- 1. The four seeded testimonials, matched on the same (name, company) pair
--    seed.sql de-duplicated on, so a real review is never caught by this.
delete from public.testimonials
where (name, company) in (
  ('Aarav Shrestha', 'Kathmandu Cart'),
  ('Sneha Maharjan', 'BrightMinds Academy'),
  ('Bibek Gurung',   'Himalayan Traders'),
  ('Priya Thapa',    'Bloom & Co.')
);

-- 2. The client quotes embedded in the seeded case studies. All of them used
--    stock avatars from pravatar.cc, which no real client quote would.
update public.case_studies
set content = content - 'testimonial'
where content -> 'testimonial' ->> 'image' like '%pravatar.cc%';
