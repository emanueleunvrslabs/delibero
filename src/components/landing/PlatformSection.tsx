import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Users, FileSignature, Database, Receipt,
  List, ShoppingCart, AlertCircle, CreditCard,
  Bell, FileText, MapPin, Bot,
  BarChart3, LayoutDashboard, Shield, UserPlus,
  type LucideIcon
} from "lucide-react";

interface Module {
  icon: LucideIcon;
  title: string;
  tag: string;
  desc: string;
}

interface Category {
  name: string;
  modules: Module[];
}

const categories: Category[] = [
  {
    name: "CRM & Vendite",
    modules: [
      { icon: Users, tag: "CRM", title: "Gestione Anagrafiche", desc: "Clienti, agenti, distributori. POD/PDR con storico consumi e geolocalizzazione." },
      { icon: UserPlus, tag: "Sales", title: "Provvigioni Agenti", desc: "Calcolo automatico provvigioni ENASARCO, tracking obiettivi e pagamenti." },
      { icon: FileSignature, tag: "Legal", title: "Firma Contratti OTP", desc: "Firma digitale istantanea con OTP via WhatsApp ed email." },
      { icon: FileText, tag: "Ops", title: "Attivazioni e Switch", desc: "Workflow per nuove attivazioni, switch, volture e subentri." },
    ]
  },
  {
    name: "Billing & Pagamenti",
    modules: [
      { icon: Receipt, tag: "Billing", title: "Fatturazione Luce/Gas", desc: "Fatture massive, calcolo consumi, oneri, accise. PDF e XML automatici." },
      { icon: List, tag: "Pricing", title: "Listini e Indici", desc: "PUN, PSV, costi dispacciamento. Calcolo margini e versioning." },
      { icon: CreditCard, tag: "Payments", title: "SDD e Incassi", desc: "File SEPA SDD/CBI, mandati, riconciliazione e rimborsi automatici." },
      { icon: AlertCircle, tag: "Credit", title: "Gestione Insoluti", desc: "Tracking insoluti, solleciti automatici e recupero morosità." },
    ]
  },
  {
    name: "AI & Automazione",
    modules: [
      { icon: Bot, tag: "AI", title: "MAX POWER — Agente AI", desc: "AI proprietaria nel core: analisi dati, automazione decisionale, report intelligenti." },
      { icon: BarChart3, tag: "OCR", title: "Preventivatore OCR", desc: "Upload bolletta, estrazione OCR, calcolo preventivo comparativo." },
      { icon: LayoutDashboard, tag: "Analytics", title: "Dashboard & Reporting", desc: "KPI, grafici vendite, dashboard personalizzate per collaboratori." },
      { icon: Database, tag: "Data", title: "Arricchimento Dati", desc: "Validazione società, scoring creditizio e verifica IBAN in tempo reale." },
    ]
  },
  {
    name: "Compliance & Ops",
    modules: [
      { icon: Shield, tag: "Compliance", title: "Compliance ARERA", desc: "Rendicontazione accise, file Dogane/ARERA, Canone RAI e bonus." },
      { icon: Bell, tag: "Tariffe", title: "Oneri e Accise", desc: "Componenti ARERA (TD, ASOS, GS, RE), aggiornamenti automatici." },
      { icon: ShoppingCart, tag: "Trading", title: "Dispacciamento", desc: "Gestione automatizzata dispacciamento energia indicizzata a PUN/PSV." },
      { icon: MapPin, tag: "Supply", title: "Gestione POD/PDR", desc: "Caricamento RCU, storico consumi, analisi AI e geolocalizzazione." },
    ]
  },
];

export const PlatformSection = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="platform" className="py-16 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16"
        >
          <span className="font-mono text-xs font-semibold tracking-[0.15em] uppercase text-primary mb-4 block">
            // Piattaforma
          </span>
          <h2 className="text-2xl md:text-5xl font-extrabold text-foreground mb-3 md:mb-4 tracking-tight">
            Un ERP/CRM completo per{" "}
            <span className="gradient-text">fornitori di energia</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-2 text-balance">
            Oltre 100 pagine e 150+ endpoint API. Una suite enterprise che copre
            l'intero ciclo di vita del cliente.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-start md:justify-center gap-2 mb-8 md:mb-10 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-none"
        >
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`relative whitespace-nowrap px-4 py-2.5 md:px-6 md:py-3 rounded-full text-sm font-semibold transition-all duration-300 shrink-0 ${
                activeTab === i
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground liquid-glass"
              }`}
            >
              {activeTab === i && (
                <motion.div
                  layoutId="platformTab"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-accent"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                />
              )}
              <span className="relative z-10">{cat.name}</span>
            </button>
          ))}
        </motion.div>

        {/* Module Cards */}
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-5 md:overflow-visible md:pb-0 scrollbar-none"
            >
              {categories[activeTab].modules.map((mod, i) => {
                const Icon = mod.icon;
                return (
                  <motion.div
                    key={mod.tag}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    <div className="liquid-glass-card-sm p-5 md:p-6 h-full group hover:bg-white/[0.06] transition-all duration-300 min-w-[75vw] sm:min-w-0 snap-center">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <span className="font-mono text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary self-center">
                          {mod.tag}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {mod.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {mod.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom stat */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 md:mt-10 text-center"
        >
          <p className="text-sm text-muted-foreground">
            <span className="text-primary font-bold">16 moduli</span> · 4 categorie · Seleziona un tab per esplorare
          </p>
        </motion.div>
      </div>
    </section>
  );
};
