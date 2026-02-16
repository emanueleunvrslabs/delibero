import { motion } from "framer-motion";
import { Calendar, ExternalLink, Zap, Flame, TrendingUp, Share2, Paperclip } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

interface Delibera {
  id: string;
  numero: string;
  data_pubblicazione: string;
  titolo: string;
  riassunto_ai: string | null;
  settori: string[];
  is_aggiornamento_tariffario: boolean;
  allegati: { nome: string; url: string; tipo?: string }[] | null;
}

interface DeliberaCardProps {
  delibera: Delibera;
  index?: number;
}

const settoreConfig: Record<string, { icon: React.ReactNode; label: string; color: string }> = {
  elettricita: { icon: <Zap className="w-3 h-3" />, label: "Elettricità", color: "hsl(45 93% 47%)" },
  gas: { icon: <Flame className="w-3 h-3" />, label: "Gas", color: "hsl(200 80% 55%)" },
};

export const DeliberaCard = ({ delibera, index = 0 }: DeliberaCardProps) => {
  const allegati = Array.isArray(delibera.allegati) ? delibera.allegati : [];

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `${window.location.origin}/delibere/${delibera.id}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: delibera.titolo, url });
      } catch {}
    } else {
      await navigator.clipboard.writeText(url);
      toast.success("Link copiato negli appunti");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link to={`/delibere/${delibera.id}`}>
        <div className="glass-card-hover p-5 md:p-6 cursor-pointer group">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono font-semibold text-primary">
                {delibera.numero}
              </span>
              {delibera.is_aggiornamento_tariffario && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-primary/15 text-primary border border-primary/20">
                  <TrendingUp className="w-2.5 h-2.5" />
                  Tariffario
                </span>
              )}
            </div>
            <div className="flex gap-1.5">
              {delibera.settori?.map((s) => {
                const cfg = settoreConfig[s];
                if (!cfg) return null;
                return (
                  <span
                    key={s}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium"
                    style={{
                      background: `${cfg.color.replace(")", " / 0.15)")}`,
                      color: cfg.color,
                      border: `1px solid ${cfg.color.replace(")", " / 0.25)")}`
                    }}
                  >
                    {cfg.icon}
                    {cfg.label}
                  </span>
                );
              })}
            </div>
          </div>

          <h3 className="text-sm md:text-base font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {delibera.titolo}
          </h3>

          {delibera.riassunto_ai && (
            <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
              {delibera.riassunto_ai}
            </p>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <Calendar className="w-3 h-3" />
                {new Date(delibera.data_pubblicazione).toLocaleDateString("it-IT", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              {allegati.length > 0 && (
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <Paperclip className="w-3 h-3" />
                  {allegati.length}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-muted-foreground hover:text-primary"
              >
                <Share2 className="w-3.5 h-3.5" />
              </button>
              <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
