import { motion } from "framer-motion";
import { Calendar, ExternalLink, Zap, Flame, TrendingUp, FileText, ArrowLeft, Share2, Download } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

interface Delibera {
  id: string;
  numero: string;
  data_pubblicazione: string;
  titolo: string;
  riassunto_ai: string | null;
  punti_salienti: { punto: string }[] | null;
  settori: string[];
  link_originale: string | null;
  allegati: { nome: string; url: string; tipo?: string }[] | null;
  is_aggiornamento_tariffario: boolean;
}

const settoreConfig: Record<string, { icon: React.ReactNode; label: string; color: string }> = {
  elettricita: { icon: <Zap className="w-3.5 h-3.5" />, label: "Elettricità", color: "hsl(45 93% 47%)" },
  gas: { icon: <Flame className="w-3.5 h-3.5" />, label: "Gas", color: "hsl(200 80% 55%)" },
};

export const DeliberaContent = ({ delibera }: { delibera: Delibera }) => {
  const punti = Array.isArray(delibera.punti_salienti) ? delibera.punti_salienti : [];
  const allegati = Array.isArray(delibera.allegati) ? delibera.allegati : [];

  const handleShare = async () => {
    const url = window.location.href;
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
    <div className="space-y-6">
      {/* Back button */}
      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
        <Link
          to="/delibere"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Tutte le delibere
        </Link>
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="liquid-glass-card-lg p-6 md:p-10"
      >
        <div className="flex items-center gap-2 flex-wrap mb-4">
          <span className="text-sm font-mono font-bold text-primary">{delibera.numero}</span>
          {delibera.is_aggiornamento_tariffario && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-primary/15 text-primary border border-primary/20">
              <TrendingUp className="w-3 h-3" />
              Aggiornamento Tariffario
            </span>
          )}
          {delibera.settori?.map((s) => {
            const cfg = settoreConfig[s];
            if (!cfg) return null;
            return (
              <span
                key={s}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium"
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

        <h1 className="text-xl md:text-3xl font-extrabold text-foreground mb-4 tracking-tight">
          {delibera.titolo}
        </h1>

        <div className="flex items-center gap-4 flex-wrap text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {new Date(delibera.data_pubblicazione).toLocaleDateString("it-IT", {
              day: "numeric", month: "long", year: "numeric"
            })}
          </span>
          {delibera.link_originale && (
            <a
              href={delibera.link_originale}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-primary hover:underline"
            >
              <ExternalLink className="w-4 h-4" />
              Vedi su ARERA
            </a>
          )}
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors"
          >
            <Share2 className="w-4 h-4" />
            Condividi
          </button>
        </div>
      </motion.div>

      {/* Riassunto AI */}
      {delibera.riassunto_ai && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="liquid-glass-card p-6 md:p-8"
        >
          <h2 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center">
              <FileText className="w-3 h-3 text-primary" />
            </span>
            Riassunto AI
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {delibera.riassunto_ai}
          </p>
        </motion.div>
      )}

      {/* Punti salienti */}
      {punti.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="liquid-glass-card p-6 md:p-8"
        >
          <h2 className="text-base font-bold text-foreground mb-4">Punti Salienti</h2>
          <ul className="space-y-3">
            {punti.map((p, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                {p.punto}
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Allegati */}
      {allegati.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="liquid-glass-card p-6 md:p-8"
        >
          <h2 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center">
              <Download className="w-3 h-3 text-primary" />
            </span>
            Allegati e Documenti
          </h2>
          <div className="space-y-2">
            {allegati.map((a, i) => (
              <a
                key={i}
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="flex items-center gap-3 p-3.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors group"
              >
                <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{a.nome}</p>
                  <p className="text-xs text-muted-foreground">{a.tipo || 'PDF'}</p>
                </div>
                <Download className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};
