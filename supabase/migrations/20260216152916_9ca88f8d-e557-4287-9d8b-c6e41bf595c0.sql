-- Fix dates for remaining 2026 delibere
UPDATE public.delibere SET data_pubblicazione = '2026-02-11' WHERE numero = '23/2026/E/eel';
UPDATE public.delibere SET data_pubblicazione = '2026-02-11' WHERE numero = '22/2026/R/eel';
UPDATE public.delibere SET data_pubblicazione = '2026-02-04' WHERE numero = '15/2026/R/eel';
UPDATE public.delibere SET data_pubblicazione = '2026-02-04' WHERE numero = '13/2026/R/eel';
UPDATE public.delibere SET data_pubblicazione = '2026-02-04' WHERE numero = '12/2026/R/eel';
UPDATE public.delibere SET data_pubblicazione = '2026-01-28' WHERE numero = '8/2026/R/eel';
-- Also fix 7/2026 which was logged as processed
UPDATE public.delibere SET data_pubblicazione = '2026-01-28' WHERE numero = '7/2026/R/efr';