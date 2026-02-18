import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/landing/Footer";
import { SEOHead } from "@/components/seo/SEOHead";
import { DeliberaCard } from "@/components/delibere/DeliberaCard";
import { DeliberaFilters } from "@/components/delibere/DeliberaFilters";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

const Delibere = () => {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [settore, setSettore] = useState("");
  const [soloTariffari, setSoloTariffari] = useState(searchParams.get("tariffario") === "true");

  const { data: delibere, isLoading } = useQuery({
    queryKey: ["delibere-all"],
    queryFn: async () => {
      const { data } = await supabase
        .from("delibere")
        .select("*")
        .order("data_pubblicazione", { ascending: false });
      return data ?? [];
    },
  });

  const filtered = useMemo(() => {
    if (!delibere) return [];
    return delibere.filter((d: any) => {
      if (soloTariffari && !d.is_aggiornamento_tariffario) return false;
      if (settore && !(d.settori as string[])?.includes(settore)) return false;
      if (search) {
        const q = search.toLowerCase();
        return d.titolo.toLowerCase().includes(q) || d.numero.toLowerCase().includes(q);
      }
      return true;
    });
  }, [delibere, search, settore, soloTariffari]);

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      <SEOHead
        title="Delibere ARERA — Elenco completo"
        description="Consulta tutte le delibere ARERA analizzate con intelligenza artificiale. Filtra per settore elettricità, gas o aggiornamenti tariffari."
        canonical="/delibere"
      />
      <div className="fixed inset-0 mesh-gradient" />
      <div className="fixed inset-0 aurora-bg pointer-events-none" />
      <div className="grain-overlay" />
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-1 pt-28 md:pt-36 pb-16">
          <div className="container mx-auto px-4">

            <div className="mb-6">
              <DeliberaFilters
                search={search}
                onSearchChange={setSearch}
                settore={settore}
                onSettoreChange={setSettore}
                soloTariffari={soloTariffari}
                onSoloTariffariChange={setSoloTariffari}
              />
            </div>

            {isLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="liquid-glass-card p-6 h-40 animate-pulse" />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="liquid-glass-card p-12 text-center">
                <p className="text-muted-foreground">Nessuna delibera trovata</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {filtered.map((d: any, i: number) => (
                  <DeliberaCard key={d.id} delibera={d} index={i} />
                ))}
              </div>
            )}
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default Delibere;
