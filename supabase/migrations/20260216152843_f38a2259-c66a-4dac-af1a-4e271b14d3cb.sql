-- Fix dates for 2026 delibere based on ARERA publication dates
UPDATE public.delibere SET data_pubblicazione = '2026-02-09' WHERE numero = '20/2026/R/com';
UPDATE public.delibere SET data_pubblicazione = '2026-01-20' WHERE numero = '3/2026/R/com';
UPDATE public.delibere SET data_pubblicazione = '2026-01-20' WHERE numero = '2/2026/R/com';