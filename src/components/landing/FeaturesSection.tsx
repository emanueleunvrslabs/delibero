import { motion } from "framer-motion";
import { Zap, Smartphone, Brain, Phone, TrendingDown, Shield, ArrowUpRight } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Fatturazione AI Automatica",
    description: "Billing completo per energia elettrica e gas. Calcolo automatico delle componenti ARERA, emissione bollette, gestione incassi e scadenze. Zero intervento manuale.",
    tag: "AI-Powered",
    tagType: "ai" as const,
    color: "from-primary to-emerald-500"
  },
  {
    icon: Smartphone,
    title: "Onboarding OCR Istantaneo",
    description: "Il cliente fotografa la bolletta del vecchio fornitore. L'AI legge tutto, autocompila i campi, prepara il contratto. Da foto a firma in 60 secondi.",
    tag: "Solo Energizzo",
    tagType: "exclusive" as const,
    color: "from-blue-500 to-indigo-600"
  },
  {
    icon: Brain,
    title: "CRM Clienti Intelligente",
    description: "Gestione completa del ciclo di vita del cliente: anagrafiche, contratti, comunicazioni, storico. L'AI suggerisce azioni proattive e identifica opportunità di upselling.",
    tag: "AI-Powered",
    tagType: "ai" as const,
    color: "from-violet-500 to-purple-600"
  },
  {
    icon: Phone,
    title: "Telefono AI Inbound & Outbound",
    description: "L'AI risponde alle chiamate dei clienti 24/7: autoletture, duplicati bolletta, stato pagamenti. Fa anche chiamate outbound per solleciti, retention e campagne commerciali.",
    tag: "Solo Energizzo",
    tagType: "exclusive" as const,
    color: "from-emerald-500 to-teal-500"
  },
  {
    icon: TrendingDown,
    title: "Predizione Churn & Morosità",
    description: "L'AI monitora ogni cliente in tempo reale. Identifica chi sta per andarsene 30 giorni prima e chi rischia di non pagare. Azioni di retention e recupero automatiche.",
    tag: "Solo Energizzo",
    tagType: "exclusive" as const,
    color: "from-amber-500 to-orange-500"
  },
  {
    icon: Shield,
    title: "Compliance ARERA Automatica",
    description: "Ogni nuova delibera viene implementata automaticamente. Template aggiornati, schede sintetiche conformi, reportistiche normative pronte. Zero rischio di sanzioni.",
    tag: "Solo Energizzo",
    tagType: "exclusive" as const,
    color: "from-cyan-500 to-blue-500"
  }
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-16 md:py-32 relative overflow-hidden">
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
            // Funzionalità
          </span>
          <h2 className="text-2xl md:text-5xl font-extrabold text-foreground mb-3 md:mb-4 tracking-tight">
            Tutto ciò che serve per gestire
            <br className="hidden md:block" />
            <span className="md:hidden"> </span>il tuo business energetico
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto px-2">
            6 funzionalità che nessun competitor possiede.
            <br />
            Nato nell'era dell'AI, non adattato dopo.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative"
            >
              <motion.div
                className="relative h-full liquid-glass-card-sm p-5 md:p-7 transition-all duration-500 overflow-hidden"
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                style={{
                  background: 'linear-gradient(135deg, hsl(0 0% 100% / 0.08) 0%, hsl(0 0% 100% / 0.03) 100%)'
                }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[1.5rem]"
                  style={{ background: 'radial-gradient(circle at 30% 30%, hsl(var(--primary) / 0.08) 0%, transparent 60%)' }}
                />

                <motion.div
                  className={`relative z-10 w-[52px] h-[52px] rounded-[14px] bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 shadow-lg`}
                  whileHover={{ scale: 1.08, rotate: 3 }}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </motion.div>

                <div className="relative z-10">
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {feature.description}
                  </p>
                  <span className={`inline-block px-3 py-1 rounded-md text-xs font-semibold uppercase tracking-wider font-mono ${
                    feature.tagType === 'exclusive'
                      ? 'bg-primary/10 text-primary'
                      : 'bg-violet-500/10 text-violet-400'
                  }`}>
                    {feature.tag}
                  </span>
                </div>

                <motion.div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <ArrowUpRight className="w-5 h-5 text-primary" />
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
