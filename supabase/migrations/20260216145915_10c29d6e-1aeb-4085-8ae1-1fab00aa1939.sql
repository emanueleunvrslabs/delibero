
-- Create delibere table
CREATE TABLE public.delibere (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  numero TEXT NOT NULL,
  data_pubblicazione DATE NOT NULL,
  titolo TEXT NOT NULL,
  riassunto_ai TEXT,
  punti_salienti JSONB DEFAULT '[]'::jsonb,
  settori TEXT[] DEFAULT '{}',
  link_originale TEXT,
  allegati JSONB DEFAULT '[]'::jsonb,
  is_aggiornamento_tariffario BOOLEAN NOT NULL DEFAULT false,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.delibere ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Delibere are publicly readable"
  ON public.delibere
  FOR SELECT
  USING (is_published = true);

-- Service role can do everything (for edge functions)
CREATE POLICY "Service role full access"
  ON public.delibere
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Index for common queries
CREATE INDEX idx_delibere_data ON public.delibere (data_pubblicazione DESC);
CREATE INDEX idx_delibere_settori ON public.delibere USING GIN (settori);
CREATE INDEX idx_delibere_tariffario ON public.delibere (is_aggiornamento_tariffario) WHERE is_aggiornamento_tariffario = true;

-- Updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_delibere_updated_at
  BEFORE UPDATE ON public.delibere
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Sample data
INSERT INTO public.delibere (numero, data_pubblicazione, titolo, riassunto_ai, punti_salienti, settori, link_originale, is_aggiornamento_tariffario)
VALUES
  ('131/2025/R/com', '2025-04-01', 'Aggiornamento delle condizioni economiche per il servizio di tutela gas e energia elettrica - II trimestre 2025',
   'La delibera 131/2025 aggiorna le condizioni economiche per i clienti in tutela nel secondo trimestre 2025. Si registra una riduzione della componente materia prima gas del 3,2% e un aumento dell''energia elettrica dell''1,8%. Vengono inoltre rivisti i corrispettivi per il trasporto e la gestione del contatore.',
   '[{"punto": "Riduzione prezzo gas materia prima del 3,2%"}, {"punto": "Aumento componente energia elettrica dell''1,8%"}, {"punto": "Revisione corrispettivi trasporto e gestione contatore"}, {"punto": "Decorrenza dal 1 aprile 2025"}]',
   ARRAY['elettricita', 'gas'], 'https://www.arera.it/atti-e-provvedimenti/dettaglio/25/131-25', true),

  ('98/2025/R/eel', '2025-03-15', 'Disposizioni in materia di qualità dei servizi di distribuzione e misura dell''energia elettrica',
   'La delibera introduce nuovi standard di qualità per i distributori di energia elettrica, con particolare attenzione ai tempi di ripristino dopo interruzioni e alla precisione delle misurazioni. Previste penalità più severe per il mancato rispetto degli standard.',
   '[{"punto": "Nuovi standard minimi di qualità per distributori"}, {"punto": "Riduzione tempi massimi di ripristino post-interruzione"}, {"punto": "Penalità aumentate del 20% per mancato rispetto standard"}, {"punto": "Obbligo reportistica trimestrale"}]',
   ARRAY['elettricita'], 'https://www.arera.it/atti-e-provvedimenti/dettaglio/25/98-25', false),

  ('76/2025/R/gas', '2025-02-28', 'Regolazione della qualità del servizio di stoccaggio del gas naturale per l''anno termico 2025-2026',
   'Definiti i parametri di qualità e i livelli minimi di servizio per lo stoccaggio gas nell''anno termico 2025-2026. Introdotto un nuovo meccanismo di incentivazione per la flessibilità dello stoccaggio.',
   '[{"punto": "Nuovi parametri qualità stoccaggio gas"}, {"punto": "Meccanismo incentivante per flessibilità"}, {"punto": "Livelli minimi di iniezione e prelievo aggiornati"}, {"punto": "Penalità per mancato rispetto capacità conferita"}]',
   ARRAY['gas'], 'https://www.arera.it/atti-e-provvedimenti/dettaglio/25/76-25', false);
