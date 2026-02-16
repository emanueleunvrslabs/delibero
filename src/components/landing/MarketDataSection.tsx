import { motion } from "framer-motion";

const stats = [
  { value: "741", label: "Venditori attivi in Italia nel 2024. Erano 806 nel 2022.", color: "text-primary" },
  { value: "23,8%", label: "Tasso di switching 2024. 1 cliente su 4 ha cambiato fornitore.", color: "text-amber-400" },
  { value: "30,5M", label: "Punti di prelievo domestici nel mercato italiano.", color: "text-emerald-400" },
  { value: "108,5", label: "€/MWh il PUN medio 2024. Francia: 58. Spagna: 63.", color: "text-blue-400" },
];

export const MarketDataSection = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs font-semibold tracking-[0.15em] uppercase text-primary mb-4 block">
            // Il Mercato
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
            Un settore in trasformazione
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Dati ARERA 2025. Chi non si digitalizza, esce dal mercato.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="liquid-glass-card-sm p-8 text-center h-full">
                <div className={`text-4xl font-black tracking-tight mb-3 ${stat.color}`}>
                  {stat.value}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
