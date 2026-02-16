import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/landing/Footer";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Shield, Brain } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { DeliberaCard } from "@/components/delibere/DeliberaCard";
import { TariffHighlight } from "@/components/delibere/TariffHighlight";

const Index = () => {
  const { data: tariffari } = useQuery({
    queryKey: ["delibere-tariffari"],
    queryFn: async () => {
      const { data } = await supabase
        .from("delibere")
        .select("*")
        .eq("is_aggiornamento_tariffario", true)
        .order("data_pubblicazione", { ascending: false })
        .limit(3);
      return data ?? [];
    },
  });

  const { data: ultime } = useQuery({
    queryKey: ["delibere-ultime"],
    queryFn: async () => {
      const { data } = await supabase
        .from("delibere")
        .select("*")
        .order("data_pubblicazione", { ascending: false })
        .limit(6);
      return data ?? [];
    },
  });

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      <div className="fixed inset-0 mesh-gradient" />
      <div className="fixed inset-0 aurora-bg pointer-events-none" />
      <div className="grain-overlay" />
      
      <div className="relative z-10">
        <Navbar />
        
        <main>
          {/* Hero */}
          <section className="pt-32 md:pt-40 pb-16 md:pb-24 relative">
            <div className="container mx-auto px-4 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass text-xs font-medium text-muted-foreground mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  Monitoraggio Delibere ARERA
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
                  <span className="gradient-text">Delibere ARERA</span>
                  <br />
                  <span className="text-foreground">analizzate con AI</span>
                </h1>

                <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
                  Riassunti automatici, punti salienti e aggiornamenti tariffari. 
                  Tutto ciò che serve agli operatori energia in un unico posto.
                </p>

                <div className="flex gap-3 justify-center flex-wrap">
                  <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.98 }}>
                    <Link to="/delibere" className="btn-premium inline-flex items-center gap-2">
                      Esplora Delibere <ArrowRight className="w-5 h-5" />
                    </Link>
                  </motion.div>
                </div>
              </motion.div>

              {/* Feature pills */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex gap-4 justify-center flex-wrap mt-12"
              >
                {[
                  { icon: <Brain className="w-4 h-4" />, label: "Riassunti AI" },
                  { icon: <Zap className="w-4 h-4" />, label: "Aggiornamenti Tariffari" },
                  { icon: <Shield className="w-4 h-4" />, label: "Dati Certificati ARERA" },
                ].map((f) => (
                  <div key={f.label} className="inline-flex items-center gap-2 px-4 py-2 rounded-full liquid-glass text-xs text-muted-foreground">
                    <span className="text-primary">{f.icon}</span>
                    {f.label}
                  </div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Aggiornamenti Tariffari */}
          {tariffari && tariffari.length > 0 && (
            <section className="py-12 md:py-20">
              <div className="container mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex items-center justify-between mb-8"
                >
                  <h2 className="text-xl md:text-3xl font-extrabold text-foreground">
                    Aggiornamenti Tariffari
                  </h2>
                  <Link to="/delibere?tariffario=true" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
                    Vedi tutti <ArrowRight className="w-3 h-3" />
                  </Link>
                </motion.div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {tariffari.map((d: any, i: number) => (
                    <TariffHighlight key={d.id} delibera={d} index={i} />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Ultime Delibere */}
          {ultime && ultime.length > 0 && (
            <section className="py-12 md:py-20">
              <div className="container mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex items-center justify-between mb-8"
                >
                  <h2 className="text-xl md:text-3xl font-extrabold text-foreground">
                    Ultime Delibere
                  </h2>
                  <Link to="/delibere" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
                    Vedi tutte <ArrowRight className="w-3 h-3" />
                  </Link>
                </motion.div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {ultime.map((d: any, i: number) => (
                    <DeliberaCard key={d.id} delibera={d} index={i} />
                  ))}
                </div>
              </div>
            </section>
          )}
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default Index;
