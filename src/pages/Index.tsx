import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/landing/Footer";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Shield, Brain, TrendingUp, FileText, ChevronRight } from "lucide-react";
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
          {/* Hero - Split Layout */}
          <section className="pt-32 md:pt-40 pb-16 md:pb-24 relative">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                {/* Left - Text */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight mb-6 text-left leading-[1.05]">
                    LE DELIBERE CHE
                    <br />
                    <span className="gradient-text">TI SERVONO</span>
                  </h1>

                  <p className="text-base md:text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed text-left">
                    Monitoriamo le delibere ARERA e le analizziamo con intelligenza artificiale. 
                    Riassunti, punti salienti e aggiornamenti tariffari per operatori energia, in pochi secondi.
                  </p>

                  <div className="flex gap-3 flex-wrap mb-8">
                    <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.98 }}>
                      <Link to="/delibere" className="btn-premium inline-flex items-center gap-2">
                        Esplora Delibere <ArrowRight className="w-5 h-5" />
                      </Link>
                    </motion.div>
                  </div>

                  {/* Feature pills */}
                  <div className="flex gap-3 flex-wrap">
                    {[
                      { icon: <Brain className="w-3.5 h-3.5" />, label: "Analisi AI" },
                      { icon: <Shield className="w-3.5 h-3.5" />, label: "ARERA Compliant" },
                    ].map((f) => (
                      <div key={f.label} className="inline-flex items-center gap-2 px-4 py-2 rounded-full liquid-glass text-xs text-muted-foreground">
                        <span className="text-primary">{f.icon}</span>
                        {f.label}
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Right - Glass Stats Card */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="relative"
                >
                  <div
                    className="liquid-glass-card-lg p-6 md:p-8 overflow-hidden"
                    style={{
                      background: 'linear-gradient(160deg, hsl(0 0% 100% / 0.1) 0%, hsl(0 0% 100% / 0.04) 100%)',
                    }}
                  >
                    {/* Top glow */}
                    <div className="absolute inset-0 opacity-40 pointer-events-none"
                      style={{ background: 'radial-gradient(ellipse at 50% 0%, hsl(var(--primary) / 0.2) 0%, transparent 60%)' }}
                    />

                    <div className="relative z-10">
                      <p className="text-sm text-muted-foreground mb-1 text-center">Delibero</p>
                      <div className="text-center mb-6">
                        <span className="text-5xl md:text-6xl font-extrabold text-foreground tracking-tight">
                          {ultime?.length || 0}
                        </span>
                        <p className="text-sm text-muted-foreground mt-1">Delibere analizzate</p>
                      </div>

                      <div className="space-y-3">
                        <Link to="/delibere?tariffario=true">
                          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-secondary/40 hover:bg-secondary/60 transition-colors group cursor-pointer">
                            <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
                              <TrendingUp className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-foreground">Aggiornamenti Tariffari</p>
                              <p className="text-xs text-muted-foreground">Variazioni prezzi energia e gas</p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
                          </div>
                        </Link>

                        <Link to="/delibere">
                          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-secondary/40 hover:bg-secondary/60 transition-colors group cursor-pointer">
                            <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
                              <FileText className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-foreground">Riassunti AI</p>
                              <p className="text-xs text-muted-foreground">Analisi intelligente automatica</p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
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
