import { motion } from "framer-motion";
import { TrendingUp, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface TariffHighlightProps {
  delibera: {
    id: string;
    numero: string;
    data_pubblicazione: string;
    titolo: string;
    punti_salienti: { punto: string }[] | null;
  };
  index?: number;
}

export const TariffHighlight = ({ delibera, index = 0 }: TariffHighlightProps) => {
  const punti = Array.isArray(delibera.punti_salienti) ? delibera.punti_salienti : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/delibere/${delibera.id}`}>
        <div
          className="liquid-glass-card p-6 md:p-8 cursor-pointer group transition-all duration-500 hover:translate-y-[-2px]"
          style={{
            background: 'linear-gradient(135deg, hsl(var(--primary) / 0.08) 0%, hsl(var(--primary) / 0.02) 100%)',
            border: '1px solid hsl(var(--primary) / 0.2)'
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-primary" />
            </div>
            <span className="text-xs font-mono font-semibold text-primary">{delibera.numero}</span>
          </div>

          <h3 className="text-sm md:text-base font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
            {delibera.titolo}
          </h3>

          {punti.length > 0 && (
            <ul className="space-y-1.5 mb-4">
              {punti.slice(0, 3).map((p, i) => (
                <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-primary mt-1.5 shrink-0" />
                  {p.punto}
                </li>
              ))}
            </ul>
          )}

          <div className="flex items-center gap-1 text-xs text-primary font-medium group-hover:gap-2 transition-all">
            Leggi dettagli <ArrowRight className="w-3 h-3" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
