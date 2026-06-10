-- Seed delivery zones for Christine Collections
INSERT INTO public.delivery_zones (name, fee, is_free) VALUES
  ('Nairobi CBD',          0,   true),
  ('Westlands',            0,   true),
  ('Kilimani',             0,   true),
  ('Lavington',            0,   true),
  ('Roysambu',             0,   true),
  ('Kasarani',             0,   true),
  ('Eastleigh',            0,   true),
  ('South B / South C',    0,   true),
  ('Lang''ata',            0,   true),
  ('Karen / Hardy',       200,  false),
  ('Ngong / Rongai',      300,  false),
  ('Thika',               350,  false),
  ('Makueni Town',        400,  false),
  ('Mombasa',             500,  false),
  ('Kisumu',              500,  false),
  ('Other Kenya',         500,  false)
ON CONFLICT DO NOTHING;
