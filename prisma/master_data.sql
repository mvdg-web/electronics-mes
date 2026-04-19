-- Clean up existing data (Optional, be careful!)
-- TRUNCATE TABLE "User", "Product" RESTART IDENTITY CASCADE;

-- Seed Users
INSERT INTO "User" (id, username, name, role, "createdAt")
VALUES
  (gen_random_uuid(), 'admin', 'System Admin', 'ADMIN', NOW()),
  (gen_random_uuid(), 'op_01', 'Operator One', 'OPERATOR', NOW())
  ON CONFLICT (username) DO NOTHING;

-- Seed Electronics Products
INSERT INTO "Product" (id, sku, name, description, revision)
VALUES
  (gen_random_uuid(), 'PCB-MAIN-99', 'Main Logic Board v2', 'Primary controller IoT', 'A'),
  (gen_random_uuid(), 'MOD-WIFI-AX', 'Wifi-6 Module', 'High-speed wireless', 'B'),
  (gen_random_uuid(), 'PWR-SUP-12V', 'Power Supply Unit', '12V DC Internal', '1')
  ON CONFLICT (sku) DO NOTHING;
