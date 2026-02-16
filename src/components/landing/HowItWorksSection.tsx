import { motion } from "framer-motion";
import { Database, Settings, Rocket, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Database,
    number: "01",
    title: "Connessione RCU",
    description: "Colleghi il tuo Registro Centrale Ufficiale. Energizzo importa i tuoi POD e PDR attivi e inizia a fatturare.",
    color: "from-primary to-emerald-500"
  },
  {
    icon: Settings,
    number: "02",
    title: "Configurazione AI",
    description: "Personalizzi le risposte dell'AI con il tuo brand, le tue offerte commerciali e le tue regole di business. L'AI impara il tuo modo di lavorare.",
    color: "from-blue-500 to-indigo-600"
  },
  {
    icon: Rocket,
    number: "03",
    title: "Vai Live",
    description: "Il sistema è operativo. Fatturazione automatica, AI che risponde ai clienti, dashboard in tempo reale. Tu ti concentri sulla crescita.",
    color: "from-violet-500 to-purple-600"
  }
];

export const HowItWorksSection = () => {
  return (
    <section id="how" className="py-16 md:py-32 relative overflow-hidden">
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
            // Come Funziona
          </span>
          <h2 className="text-2xl md:text-5xl font-extrabold text-foreground mb-3 md:mb-4 tracking-tight">
            Operativo in meno di una settimana
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto px-2">
            Nessun progetto IT. Nessuna migrazione complessa.
            <br className="hidden md:block" />
            <span className="md:hidden"> </span>Energizzo si adatta a te.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div
                className="liquid-glass-card-sm p-6 md:p-8 h-full text-center group cursor-pointer relative"
                whileHover={{ y: -4 }}
                style={{
                  background: 'linear-gradient(135deg, hsl(0 0% 100% / 0.08) 0%, hsl(0 0% 100% / 0.03) 100%)'
                }}
              >
                {/* Step number */}
                <div className="text-5xl md:text-6xl font-black tracking-tight mb-4 md:mb-5 leading-none"
                  style={{
                    background: 'linear-gradient(180deg, hsl(var(--primary) / 0.3) 0%, transparent 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  {step.number}
                </div>

                <motion.div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto mb-5 shadow-lg`}
                  whileHover={{ scale: 1.05, rotate: 3 }}
                >
                  <step.icon className="w-7 h-7 text-white" />
                </motion.div>

                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
