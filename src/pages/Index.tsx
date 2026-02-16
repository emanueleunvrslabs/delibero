import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/landing/Footer";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Shield, Brain, TrendingUp, FileText, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

const Index = () => {
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
                  className="relative flex justify-center lg:justify-center"
                >
                  <div
                    className="liquid-glass-card-lg p-6 md:p-8 overflow-hidden w-full max-w-sm"
                    style={{
                      background: 'linear-gradient(160deg, hsl(0 0% 100% / 0.1) 0%, hsl(0 0% 100% / 0.04) 100%)',
                    }}
                  >
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

                      <div className="space-y-3 mt-2">
                        <Link to="/delibere?tariffario=true">
                          <div className="flex items-center gap-3 p-3.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors group cursor-pointer">
                            <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
                              <TrendingUp className="w-4 h-4 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-foreground">Aggiornamenti Tariffari</p>
                              <p className="text-xs text-muted-foreground">Variazioni prezzi</p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
                          </div>
                        </Link>

                        <Link to="/delibere">
                          <div className="flex items-center gap-3 p-3.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors group cursor-pointer">
                            <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
                              <FileText className="w-4 h-4 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-foreground">Riassunti AI</p>
                              <p className="text-xs text-muted-foreground">Analisi automatica</p>
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
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default Index;
