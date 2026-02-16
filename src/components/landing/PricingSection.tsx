import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";

const plans = [
  {
    label: "Per ogni contratto",
    name: "Firma OTP",
    price: "€1",
    unit: "/ firma",
    note: "A consumo, per ogni contratto firmato",
    features: [
      "Firma elettronica qualificata OTP",
      "Validità legale completa",
      "Integrata nel flusso di onboarding",
      "Archiviazione automatica"
    ],
    cta: "Scopri di più",
    highlighted: false
  },
  {
    label: "Piattaforma completa",
    name: "Per Punto di Fornitura",
    price: "€1",
    unit: "/ mese",
    note: "Per ogni POD e PDR attivo (da RCU)",
    features: [
      "CRM Clienti completo",
      "Onboarding OCR da bolletta",
      "Fatturazione automatizzata",
      "Gestione contratti e offerte",
      "Compliance ARERA automatica",
      "Dashboard e reportistica",
      "Supporto e aggiornamenti inclusi"
    ],
    cta: "Richiedi Demo Gratuita",
    highlighted: true
  },
  {
    label: "Espandi con",
    name: "Moduli Extra",
    price: "Add-on",
    unit: "",
    note: "Aggiungi solo ciò che ti serve",
    features: [
      "Dispacciamento energia",
      "AI Phone (Inbound + Outbound)",
      "App Cliente personalizzata",
      "AI WhatsApp per clienti",
      "Predizione Churn & Morosità"
    ],
    cta: "Richiedi Preventivo",
    highlighted: false
  }
];


export const PricingSection = () => {
  return (
    <section id="pricing" className="py-16 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16"
        >
          <span className="font-mono text-xs font-semibold tracking-[0.15em] uppercase text-primary mb-4 block">
            // Prezzi Trasparenti
          </span>
          <h2 className="text-2xl md:text-5xl font-extrabold text-foreground mb-3 md:mb-4 tracking-tight">
            Paghi solo per quello che gestisci
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto px-2">
            Nessun canone fisso. Il prezzo scala con il tuo business, calcolato sull'RCU.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5 max-w-6xl mx-auto items-stretch">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative ${plan.highlighted ? 'lg:scale-[1.02]' : ''}`}
            >
              {plan.highlighted && (
                <motion.div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 z-10"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground text-xs font-bold tracking-widest uppercase shadow-lg shadow-primary/25">
                    <Sparkles className="w-3.5 h-3.5" />
                    PIATTAFORMA BASE
                  </div>
                </motion.div>
              )}

              <motion.div
                className="relative h-full rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 flex flex-col transition-all duration-500 overflow-hidden liquid-glass"
                whileHover={{ y: -4 }}
                style={{
                  background: plan.highlighted
                    ? 'linear-gradient(135deg, hsl(var(--primary) / 0.12) 0%, hsl(0 0% 100% / 0.08) 50%, hsl(0 0% 100% / 0.04) 100%)'
                    : 'linear-gradient(135deg, hsl(0 0% 100% / 0.08) 0%, hsl(0 0% 100% / 0.03) 100%)',
                  border: plan.highlighted
                    ? '1px solid hsl(var(--primary) / 0.3)'
                    : '1px solid hsl(0 0% 100% / 0.12)'
                }}
              >
                {plan.highlighted && (
                  <div className="absolute inset-0 rounded-[2rem] opacity-40"
                    style={{ background: 'radial-gradient(ellipse at 50% 0%, hsl(var(--primary) / 0.15) 0%, transparent 60%)' }}
                  />
                )}

                <div className="relative z-10 flex flex-col h-full">
                  <p className="text-sm text-muted-foreground mb-2">{plan.label}</p>
                  <h3 className="text-xl font-bold text-foreground mb-6">{plan.name}</h3>

                  <div className="mb-1">
                    <span className={`font-black tracking-tight ${plan.price === 'Add-on' ? 'text-3xl' : 'text-5xl'} text-foreground`}>
                      {plan.price}
                    </span>
                    {plan.unit && <span className="text-lg text-muted-foreground ml-1">{plan.unit}</span>}
                  </div>
                  <p className="text-sm text-muted-foreground mb-7">{plan.note}</p>

                  <ul className="space-y-3 mb-8 flex-grow">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${plan.highlighted ? 'bg-primary/25' : 'bg-white/10'}`}>
                          <Check className={`w-3 h-3 ${plan.highlighted ? 'text-primary' : 'text-foreground/70'}`} />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <motion.a
                    href="#cta"
                    className={`w-full py-4 px-6 rounded-[1rem] font-semibold text-center transition-all duration-300 block ${
                      plan.highlighted
                        ? 'bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg shadow-primary/25'
                        : 'liquid-glass text-foreground hover:bg-white/15'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {plan.cta}
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
