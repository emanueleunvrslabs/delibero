

# Delibero - Implementazione con Stile Attuale

## Principio guida
Mantenere intatto lo stile grafico attuale: tema dark, glassmorphism (liquid-glass), mesh gradient background, aurora effect, grain overlay, animazioni Framer Motion, navbar floating pill. Cambia solo il contenuto e le pagine.

## Cosa NON cambia
- `src/index.css` - tutti gli stili, variabili CSS, classi glass, gradient, aurora, grain
- Stile Navbar - struttura floating pill con liquid-glass-nav, stesso layout
- Footer - stessa struttura liquid-glass-card
- Background layers in Index.tsx (mesh-gradient, aurora-bg, grain-overlay)
- Font (Plus Jakarta Sans / Inter)
- Colori (verde/teal primary, dark blue background)
- Animazioni Framer Motion

## Cosa cambia

### Navbar (`src/components/layout/Navbar.tsx`)
- Logo: "Delibero" al posto di "energizzo", sottotitolo "by energizzo" al posto di "by UNVRS"
- Link: Home, Delibere, Aggiornamenti Tariffari (al posto di Funzionalita, Come Funziona, Prezzi, Confronto)
- CTA button: rimosso "Richiedi Demo", opzionale link a energizzo

### Footer (`src/components/landing/Footer.tsx`)
- Testo: "Delibero - un servizio energizzo by UNVRS Labs"
- Disclaimer: "Servizio non affiliato ad ARERA"
- Rimossa sezione CTA "Prenota una Demo"

### Homepage (`src/pages/Index.tsx`)
- Nuova HeroSection con stesso stile (gradient text, liquid glass, animazioni) ma contenuto Delibero
- Sezione "Aggiornamenti Tariffari" in evidenza con TariffHighlight cards (stile liquid-glass-card)
- Sezione "Ultime Delibere" con DeliberaCard (stile glass-card-hover)
- Rimossi: FeaturesSection, PlatformSection, HowItWorksSection, PricingSection, ComparisonSection

### Nuova pagina Lista Delibere (`src/pages/Delibere.tsx`)
- Stesso layout con mesh-gradient + aurora-bg di sfondo
- Filtri in liquid-glass-card
- Lista card in glass-card-hover
- Paginazione

### Nuova pagina Dettaglio (`src/pages/DeliberaDetail.tsx`)
- Stesso sfondo e stile
- Contenuto in liquid-glass-card-lg
- Bullet point, riassunto, allegati tutti in card glass

## Database

Tabella `delibere`:
- id (uuid PK), numero (text), data_pubblicazione (date), titolo (text)
- riassunto_ai (text), punti_salienti (jsonb), settori (text[])
- link_originale (text), allegati (jsonb)
- is_aggiornamento_tariffario (boolean), is_published (boolean default true)
- created_at, updated_at (timestamptz)

RLS: SELECT pubblico per anon e authenticated.

Dati di esempio inseriti (inclusa delibera 131/2025/R/com).

## Edge Functions

**`scrape-delibera`** - Firecrawl per estrarre contenuto da URL ARERA
**`analyze-delibera`** - OpenAI per riassunto, bullet point, classificazione
**`process-delibera`** - Orchestratore: scrape + analisi + salvataggio DB

## File da creare
- `src/pages/Delibere.tsx`
- `src/pages/DeliberaDetail.tsx`
- `src/components/delibere/DeliberaCard.tsx`
- `src/components/delibere/DeliberaFilters.tsx`
- `src/components/delibere/TariffHighlight.tsx`
- `src/components/delibere/DeliberaContent.tsx`
- `supabase/functions/scrape-delibera/index.ts`
- `supabase/functions/analyze-delibera/index.ts`
- `supabase/functions/process-delibera/index.ts`

## File da modificare
- `src/pages/Index.tsx` - nuova homepage Delibero (stesso stile sfondo)
- `src/components/layout/Navbar.tsx` - solo testi e link
- `src/components/landing/Footer.tsx` - solo testi
- `src/App.tsx` - nuove route /delibere e /delibere/:id

## File da eliminare
- `src/components/landing/HeroSection.tsx`
- `src/components/landing/FeaturesSection.tsx`
- `src/components/landing/PlatformSection.tsx`
- `src/components/landing/HowItWorksSection.tsx`
- `src/components/landing/PricingSection.tsx`
- `src/components/landing/ComparisonSection.tsx`
- `src/components/landing/DemoFormModal.tsx`
- `src/components/landing/MarketDataSection.tsx`

## Setup richiesto
1. Connettore Firecrawl (prompt durante implementazione)
2. Secret `OPENAI_API_KEY` in Supabase

