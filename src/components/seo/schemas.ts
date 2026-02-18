const BASE_URL = "https://delibero.lovable.app";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Delibero",
  url: BASE_URL,
  logo: `${BASE_URL}/og-image.jpeg`,
  description:
    "Monitoriamo le delibere ARERA e le analizziamo con intelligenza artificiale.",
  parentOrganization: {
    "@type": "Organization",
    name: "UNVRS Labs Limited",
    url: "https://www.unvrslabs.dev",
  },
  sameAs: ["https://www.energizzo.it"],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Delibero",
  url: BASE_URL,
  description:
    "Delibere ARERA analizzate con intelligenza artificiale. Riassunti, punti salienti e aggiornamenti tariffari per operatori energia.",
  inLanguage: "it",
  publisher: {
    "@type": "Organization",
    name: "UNVRS Labs Limited",
  },
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Cos'è Delibero?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Delibero è un servizio che monitora le delibere pubblicate dall'Autorità di Regolazione per Energia Reti e Ambiente (ARERA) e le analizza con intelligenza artificiale, fornendo riassunti, punti salienti e aggiornamenti tariffari per operatori del settore energia e gas.",
      },
    },
    {
      "@type": "Question",
      name: "Quali delibere ARERA vengono monitorate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Delibero monitora tutte le delibere ARERA relative ai settori elettricità e gas, con particolare attenzione agli aggiornamenti tariffari che impattano gli operatori energia.",
      },
    },
    {
      "@type": "Question",
      name: "Come funziona l'analisi AI delle delibere?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ogni delibera ARERA viene processata da algoritmi di intelligenza artificiale che estraggono automaticamente un riassunto, i punti salienti e identificano se si tratta di un aggiornamento tariffario, rendendo la consultazione rapida e immediata.",
      },
    },
    {
      "@type": "Question",
      name: "Chi offre il servizio Delibero?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Delibero è un servizio offerto da Energizzo, una piattaforma di UNVRS Labs Limited. I clienti Energizzo hanno il monitoraggio delle delibere ARERA già integrato nel software.",
      },
    },
    {
      "@type": "Question",
      name: "Delibero è affiliato ad ARERA?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, Delibero non è affiliato ad ARERA. Il servizio raccoglie e analizza in modo indipendente le delibere pubblicate pubblicamente dall'Autorità.",
      },
    },
  ],
};

export function deliberaArticleSchema(delibera: {
  numero: string;
  titolo: string;
  data_pubblicazione: string;
  riassunto_ai: string | null;
  id: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `Delibera ${delibera.numero} — ${delibera.titolo}`,
    description:
      delibera.riassunto_ai?.slice(0, 160) ??
      `Analisi AI della delibera ARERA ${delibera.numero}`,
    datePublished: delibera.data_pubblicazione,
    url: `${BASE_URL}/delibere/${delibera.id}`,
    publisher: {
      "@type": "Organization",
      name: "Delibero by Energizzo",
      url: BASE_URL,
    },
    author: {
      "@type": "Organization",
      name: "Delibero",
    },
    inLanguage: "it",
    about: {
      "@type": "GovernmentService",
      name: "ARERA",
      description: "Autorità di Regolazione per Energia Reti e Ambiente",
    },
  };
}
