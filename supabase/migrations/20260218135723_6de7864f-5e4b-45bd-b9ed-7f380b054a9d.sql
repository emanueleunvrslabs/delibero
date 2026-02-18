
SELECT cron.schedule(
  'sync-delibere-daily',
  '0 14 * * *',
  $$
  SELECT net.http_post(
    url := 'https://ciqdciyrxzaqxaukoamn.supabase.co/functions/v1/sync-delibere',
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpcWRjaXlyeHphcXhhdWtvYW1uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyNTM2NTIsImV4cCI6MjA4NjgyOTY1Mn0.hIUTQB1sbuTIV5CZ2QKhw0h1Neo0EK39pes4V9ZMB6I"}'::jsonb,
    body := '{"anno": 2026, "settori": "4"}'::jsonb
  ) AS request_id;
  $$
);
