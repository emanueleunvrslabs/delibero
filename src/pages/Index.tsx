import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/landing/Footer";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Shield, Brain, TrendingUp, FileText, ChevronRight, Flame } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useWhatsAppAuth } from "@/hooks/useWhatsAppAuth";
import { WhatsAppVerifyDialog } from "@/components/auth/WhatsAppVerifyDialog";

const Index = () => {
  const navigate = useNavigate();
  const { showDialog, pendingNavigate, requireAuth, onVerified, closeDialog } = useWhatsAppAuth();

  const { data: totalCount } = useQuery({
    queryKey: ["delibere-count"],
    queryFn: async () => {
      const { count } = await supabase
        .from("delibere")
        .select("*", { count: "exact", head: true });
      return count ?? 0;
    },
  });

  const handleDelibereClick = (e: React.MouseEvent, path: string) => {
    const blocked = requireAuth(path);
    if (blocked) {
      e.preventDefault();
    }
  };

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      <div className="fixed inset-0 mesh-gradient" />
      <div className="fixed inset-0 aurora-bg pointer-events-none" />
      <div className="grain-overlay" />
      
        <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-1">
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
                      <Link
                        to="/delibere"
                        onClick={(e) => handleDelibereClick(e, "/delibere")}
                        className="btn-premium inline-flex items-center gap-2"
                      >
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
                          {totalCount ?? 0}
                        </span>
                        <p className="text-sm text-muted-foreground mt-1">Delibere analizzate</p>
                      </div>

                      <div className="flex flex-col gap-3 mt-3">
                        <Link to="/delibere?settore=elettricita" onClick={(e) => handleDelibereClick(e, "/delibere?settore=elettricita")}>
                          <div className="flex items-center gap-3 p-3.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors group cursor-pointer">
                            <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
                              <Zap className="w-4 h-4 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-foreground">Energia</p>
                              <p className="text-xs text-muted-foreground">Delibere elettricità</p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
                          </div>
                        </Link>

                        <Link to="/delibere?settore=gas" onClick={(e) => handleDelibereClick(e, "/delibere?settore=gas")}>
                          <div className="flex items-center gap-3 p-3.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors group cursor-pointer">
                            <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
                              <Flame className="w-4 h-4 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-foreground">Gas</p>
                              <p className="text-xs text-muted-foreground">Delibere gas</p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
                          </div>
                        </Link>

                        <Link to="/delibere?tariffario=true" onClick={(e) => handleDelibereClick(e, "/delibere?tariffario=true")}>
                          <div className="flex items-center gap-3 p-3.5 rounded-xl border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors group cursor-pointer">
                            <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
                              <TrendingUp className="w-4 h-4 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-primary">Tariffe</p>
                              <p className="text-xs text-muted-foreground">Aggiornamenti tariffari</p>
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

          {/* Energizzo CTA Section */}
          <section className="py-16 md:py-24 relative">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="liquid-glass-card p-8 md:p-12 max-w-3xl mx-auto text-center"
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary font-medium mb-6">
                  <Zap className="w-3.5 h-3.5" />
                  Powered by Energizzo
                </div>

                <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight mb-4 text-foreground">
                  Delibero è un servizio offerto da{" "}
                  <span className="gradient-text">Energizzo</span>
                </h2>

                <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto">
                  I clienti Energizzo hanno il monitoraggio delle delibere ARERA già integrato nel software. 
                  Analisi AI, notifiche e aggiornamenti tariffari, tutto in un'unica piattaforma.
                </p>

                <motion.a
                  href="https://www.energizzo.it"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-premium inline-flex items-center gap-2"
                >
                  Scopri Energizzo <ArrowRight className="w-5 h-5" />
                </motion.a>
              </motion.div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>

      <WhatsAppVerifyDialog
        open={showDialog}
        onClose={closeDialog}
        onVerified={onVerified}
        pendingNavigate={pendingNavigate}
      />
    </div>
  );
};

export default Index;
