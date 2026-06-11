-- Secure checkout: all price/total logic lives here, never trusted from the client.
-- Accepts only item IDs + quantities + zone ID, fetches real prices from DB.

CREATE OR REPLACE FUNCTION public.place_order_secure(
  p_items        JSONB,   -- [{product_id, quantity, size, color}]
  p_contact      JSONB,   -- {fullName, email, phone}
  p_is_pickup    BOOLEAN,
  p_pickup_branch TEXT,   -- 'nairobi' | 'makueni' | null
  p_delivery     JSONB,   -- {street, area, instructions} | null
  p_zone_id      UUID,    -- null when pickup
  p_user_id      UUID     -- null for guests
)
RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  v_item         JSONB;
  v_product      RECORD;
  v_subtotal     NUMERIC(10,2) := 0;
  v_delivery_fee NUMERIC(10,2) := 0;
  v_total        NUMERIC(10,2);
  v_order_id     UUID;
  v_order_number TEXT;
BEGIN
  -- 1. Resolve delivery fee from DB (never from client)
  IF NOT p_is_pickup AND p_zone_id IS NOT NULL THEN
    SELECT fee INTO v_delivery_fee
    FROM public.delivery_zones
    WHERE id = p_zone_id;

    IF NOT FOUND THEN
      RAISE EXCEPTION 'Invalid delivery zone';
    END IF;
  END IF;

  -- 2. Validate items and accumulate subtotal using DB prices
  FOR v_item IN SELECT * FROM jsonb_array_elements(p_items) LOOP
    SELECT id, name, price, stock_quantity, images
    INTO v_product
    FROM public.products
    WHERE id = (v_item->>'product_id')::UUID;

    IF NOT FOUND THEN
      RAISE EXCEPTION 'Product not found: %', v_item->>'product_id';
    END IF;

    IF v_product.stock_quantity < (v_item->>'quantity')::INT THEN
      RAISE EXCEPTION 'Insufficient stock for: %', v_product.name;
    END IF;

    v_subtotal := v_subtotal + (v_product.price * (v_item->>'quantity')::INT);
  END LOOP;

  v_total := v_subtotal + v_delivery_fee;

  -- 3. Insert order
  INSERT INTO public.orders (
    user_id, guest_email, guest_phone,
    subtotal, delivery_fee, total,
    is_pickup, pickup_branch,
    delivery_address, mpesa_phone
  )
  VALUES (
    p_user_id,
    CASE WHEN p_user_id IS NULL THEN p_contact->>'email' END,
    CASE WHEN p_user_id IS NULL THEN p_contact->>'phone' END,
    v_subtotal, v_delivery_fee, v_total,
    p_is_pickup,
    CASE WHEN p_is_pickup THEN p_pickup_branch::public.branch_type END,
    CASE WHEN NOT p_is_pickup THEN
      jsonb_build_object(
        'fullName', p_contact->>'fullName',
        'phone',    p_contact->>'phone',
        'street',   p_delivery->>'street',
        'area',     p_delivery->>'area',
        'instructions', p_delivery->>'instructions'
      )
    END,
    p_contact->>'phone'
  )
  RETURNING id, order_number INTO v_order_id, v_order_number;

  -- 4. Insert order items using DB prices
  FOR v_item IN SELECT * FROM jsonb_array_elements(p_items) LOOP
    SELECT id, name, price, images INTO v_product
    FROM public.products
    WHERE id = (v_item->>'product_id')::UUID;

    INSERT INTO public.order_items (
      order_id, product_id, product_name, product_image,
      quantity, size, color, unit_price
    ) VALUES (
      v_order_id,
      v_product.id,
      v_product.name,
      v_product.images[1],
      (v_item->>'quantity')::INT,
      v_item->>'size',
      v_item->>'color',
      v_product.price   -- authoritative DB price
    );

    -- 5. Decrement stock
    UPDATE public.products
    SET stock_quantity = stock_quantity - (v_item->>'quantity')::INT
    WHERE id = v_product.id;
  END LOOP;

  RETURN jsonb_build_object(
    'id',           v_order_id,
    'order_number', v_order_number,
    'subtotal',     v_subtotal,
    'delivery_fee', v_delivery_fee,
    'total',        v_total
  );
END;
$$;

-- Only service_role (used by supabaseAdmin) can call this directly
REVOKE ALL ON FUNCTION public.place_order_secure FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.place_order_secure TO service_role;
