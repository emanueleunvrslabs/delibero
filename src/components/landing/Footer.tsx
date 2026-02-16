import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { DemoFormModal } from "./DemoFormModal";

export const Footer = () => {
  const [demoOpen, setDemoOpen] = useState(false);
  return (
    <>
    <DemoFormModal open={demoOpen} onOpenChange={setDemoOpen} />
    <>
      {/* CTA Section */}
      <section id="cta" className="py-16 md:py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="liquid-glass-card-lg p-8 md:p-12 lg:p-20 text-center max-w-[800px] mx-auto overflow-hidden relative"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--primary) / 0.08) 0%, hsl(270 60% 50% / 0.04) 100%)',
                border: '1px solid hsl(var(--primary) / 0.2)'
              }}
            >
              <div className="absolute inset-0 opacity-50"
                style={{ background: 'radial-gradient(ellipse at 50% 0%, hsl(var(--primary) / 0.15) 0%, transparent 50%)' }}
              />
              <div className="relative z-10">
                <h2 className="text-2xl md:text-5xl font-extrabold text-foreground mb-3 md:mb-4 tracking-tight">
                  Pronto a trasformare il tuo business?
                </h2>
                <p className="text-base md:text-lg text-muted-foreground mb-8 md:mb-10 max-w-[500px] mx-auto leading-relaxed">
                  30 minuti di demo. Nessun impegno. Vediamo insieme quanto puoi risparmiare e come Energizzo lavora con i tuoi dati reali.
                </p>
                <div className="flex gap-3 md:gap-4 justify-center flex-wrap">
                  <motion.button
                    onClick={() => setDemoOpen(true)}
                    className="btn-premium inline-flex items-center gap-2"
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Prenota una Demo
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                  <motion.a
                    href="#pricing"
                    className="inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold text-sm md:text-base text-foreground liquid-glass"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Vedi i Prezzi
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 md:py-12 z-10">
        <div className="container mx-auto px-4">
          <div className="liquid-glass-card-sm p-5 md:p-8 text-center">
            <p className="text-sm text-muted-foreground mb-2">
              <span className="font-bold gradient-text">energizzo</span>
              <span className="mx-3 text-white/10">|</span>
              by <a href="#" className="text-primary hover:underline">UNVRS Labs</a>
            </p>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} UNVRS Labs S.r.l. — Tutti i diritti riservati
            </p>
          </div>
        </div>
      </footer>
    </>
    </>
  );
};
