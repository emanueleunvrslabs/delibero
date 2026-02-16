import { useParams } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/landing/Footer";
import { DeliberaContent } from "@/components/delibere/DeliberaContent";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

const DeliberaDetail = () => {
  const { id } = useParams<{ id: string }>();

  const { data: delibera, isLoading } = useQuery({
    queryKey: ["delibera", id],
    queryFn: async () => {
      const { data } = await supabase
        .from("delibere")
        .select("*")
        .eq("id", id!)
        .single();
      return data;
    },
    enabled: !!id,
  });

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      <div className="fixed inset-0 mesh-gradient" />
      <div className="fixed inset-0 aurora-bg pointer-events-none" />
      <div className="grain-overlay" />
      
      <div className="relative z-10">
        <Navbar />
        
        <main className="pt-28 md:pt-36 pb-16">
          <div className="container mx-auto px-4 max-w-3xl">
            {isLoading ? (
              <div className="liquid-glass-card-lg p-10 animate-pulse h-60" />
            ) : delibera ? (
              <DeliberaContent delibera={delibera as any} />
            ) : (
              <div className="liquid-glass-card p-12 text-center">
                <p className="text-muted-foreground">Delibera non trovata</p>
              </div>
            )}
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default DeliberaDetail;
