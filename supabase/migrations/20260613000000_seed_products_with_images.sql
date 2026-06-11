-- Seed products with 3+ images each
-- Safe to re-run: uses ON CONFLICT (slug) DO UPDATE

-- ── Categories first (idempotent) ──────────────────────────────────────────
INSERT INTO public.categories (name, slug, description) VALUES
  ('Dresses',    'dresses',    'Elegant dresses for every occasion'),
  ('Tops',       'tops',       'Blouses, shirts and statement tops'),
  ('Skirts',     'skirts',     'Midi, maxi and mini skirts'),
  ('Accessories','accessories','Bags, jewellery and finishing touches')
ON CONFLICT (slug) DO NOTHING;

-- ── Products ───────────────────────────────────────────────────────────────
INSERT INTO public.products
  (name, slug, description, price, compare_price, sizes, colors, images,
   stock_quantity, is_featured, branch, category_id)
VALUES

-- 1. Ankara Wrap Dress
(
  'Ankara Wrap Dress',
  'ankara-wrap-dress',
  'A vibrant wrap dress crafted from premium Ankara fabric. The adjustable tie waist flatters every silhouette, while the bold print celebrates Kenyan heritage. Perfect for celebrations, church, or a night out.',
  3800, 4500,
  ARRAY['XS','S','M','L','XL'],
  ARRAY['Plum','Blush','Black'],
  ARRAY[
    'https://images.pexels.com/photos/7691037/pexels-photo-7691037.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/7691038/pexels-photo-7691038.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg?auto=compress&cs=tinysrgb&w=1200'
  ],
  24, true, 'both',
  (SELECT id FROM public.categories WHERE slug = 'dresses')
),

-- 2. Linen Midi Dress
(
  'Linen Midi Dress',
  'linen-midi-dress',
  'Breathable linen midi dress ideal for the Nairobi heat. A relaxed fit with a subtle A-line cut, side pockets, and a button-front detail. Dress up with heels or keep it casual with sandals.',
  2900, NULL,
  ARRAY['S','M','L','XL'],
  ARRAY['Cream','Blush','Olive'],
  ARRAY[
    'https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/6311387/pexels-photo-6311387.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/7691156/pexels-photo-7691156.jpeg?auto=compress&cs=tinysrgb&w=1200'
  ],
  18, true, 'nairobi',
  (SELECT id FROM public.categories WHERE slug = 'dresses')
),

-- 3. Kitenge Evening Gown
(
  'Kitenge Evening Gown',
  'kitenge-evening-gown',
  'A floor-length gown made from hand-selected Kitenge fabric. Structured bodice, modest neckline, and a flowing skirt that moves beautifully. Ideal for weddings, graduations, and gala events.',
  6500, 7800,
  ARRAY['S','M','L'],
  ARRAY['Plum','Gold','Navy'],
  ARRAY[
    'https://images.pexels.com/photos/16850176/pexels-photo-16850176.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/8839763/pexels-photo-8839763.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/7691180/pexels-photo-7691180.jpeg?auto=compress&cs=tinysrgb&w=1200'
  ],
  8, true, 'both',
  (SELECT id FROM public.categories WHERE slug = 'dresses')
),

-- 4. Rose Gold Blouse
(
  'Rose Gold Blouse',
  'rose-gold-blouse',
  'A satin-finish blouse in our signature rose gold tone. Relaxed fit with a V-neckline, flutter sleeves, and a subtle lustre that elevates any outfit. Pairs beautifully with high-waist trousers or a pencil skirt.',
  1850, NULL,
  ARRAY['XS','S','M','L','XL'],
  ARRAY['Rose Gold','Black','Cream'],
  ARRAY[
    'https://images.pexels.com/photos/5698989/pexels-photo-5698989.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/5698987/pexels-photo-5698987.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/6311478/pexels-photo-6311478.jpeg?auto=compress&cs=tinysrgb&w=1200'
  ],
  30, true, 'both',
  (SELECT id FROM public.categories WHERE slug = 'tops')
),

-- 5. Blush Tulle Skirt
(
  'Blush Tulle Skirt',
  'blush-tulle-skirt',
  'A dreamy midi tulle skirt in blush pink — romantic, feminine, and utterly effortless. The layered tulle adds volume without weight. Style with a tucked-in blouse or a crop top for maximum impact.',
  2400, 2900,
  ARRAY['XS','S','M','L'],
  ARRAY['Blush','White','Plum'],
  ARRAY[
    'https://images.pexels.com/photos/6311582/pexels-photo-6311582.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/6311583/pexels-photo-6311583.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/7691104/pexels-photo-7691104.jpeg?auto=compress&cs=tinysrgb&w=1200'
  ],
  15, true, 'nairobi',
  (SELECT id FROM public.categories WHERE slug = 'skirts')
),

-- 6. Floral Maxi Dress
(
  'Floral Maxi Dress',
  'floral-maxi-dress',
  'A flowing maxi dress with a tropical floral print, adjustable spaghetti straps, and a tiered hemline. Light, breezy, and perfect for Kenyan summers. Available in regular and plus sizes.',
  3200, NULL,
  ARRAY['S','M','L','XL','2XL'],
  ARRAY['Cream','Blush','Black'],
  ARRAY[
    'https://images.pexels.com/photos/5691630/pexels-photo-5691630.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/5691629/pexels-photo-5691629.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/6311390/pexels-photo-6311390.jpeg?auto=compress&cs=tinysrgb&w=1200'
  ],
  20, false, 'makueni',
  (SELECT id FROM public.categories WHERE slug = 'dresses')
),

-- 7. Plum Silk Wrap Dress
(
  'Plum Silk Wrap Dress',
  'plum-silk-wrap-dress',
  'Our bestseller. A luxurious wrap dress in deep plum, crafted from a silk-touch fabric that drapes flawlessly. The surplice neckline and adjustable waist tie suit all body types. From boardroom to dinner.',
  4200, 5000,
  ARRAY['XS','S','M','L','XL'],
  ARRAY['Plum','Blush','Black'],
  ARRAY[
    'https://images.pexels.com/photos/7691153/pexels-photo-7691153.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/7691154/pexels-photo-7691154.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/5699163/pexels-photo-5699163.jpeg?auto=compress&cs=tinysrgb&w=1200'
  ],
  12, true, 'both',
  (SELECT id FROM public.categories WHERE slug = 'dresses')
),

-- 8. Mustard Crop Top
(
  'Mustard Crop Top',
  'mustard-crop-top',
  'A structured crop top in warm mustard with a square neckline and short puff sleeves. The boning gives a corset-like silhouette without the discomfort. Pairs perfectly with high-waist jeans or the Blush Tulle Skirt.',
  1600, NULL,
  ARRAY['XS','S','M','L'],
  ARRAY['Mustard','Black','Cream'],
  ARRAY[
    'https://images.pexels.com/photos/6311648/pexels-photo-6311648.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/6311649/pexels-photo-6311649.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/5698988/pexels-photo-5698988.jpeg?auto=compress&cs=tinysrgb&w=1200'
  ],
  22, false, 'both',
  (SELECT id FROM public.categories WHERE slug = 'tops')
)

ON CONFLICT (slug) DO UPDATE SET
  images         = EXCLUDED.images,
  description    = EXCLUDED.description,
  price          = EXCLUDED.price,
  compare_price  = EXCLUDED.compare_price,
  sizes          = EXCLUDED.sizes,
  colors         = EXCLUDED.colors,
  is_featured    = EXCLUDED.is_featured,
  stock_quantity = EXCLUDED.stock_quantity;
