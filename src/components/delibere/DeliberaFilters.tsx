import { motion } from "framer-motion";
import { Search, Filter, Zap, Flame, TrendingUp } from "lucide-react";

interface DeliberaFiltersProps {
  search: string;
  onSearchChange: (v: string) => void;
  settore: string;
  onSettoreChange: (v: string) => void;
  soloTariffari: boolean;
  onSoloTariffariChange: (v: boolean) => void;
}

export const DeliberaFilters = ({
  search, onSearchChange,
  settore, onSettoreChange,
  soloTariffari, onSoloTariffariChange,
}: DeliberaFiltersProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="liquid-glass-card-sm p-4 md:p-6"
    >
      <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-stretch md:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Cerca delibere..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-secondary/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
          />
        </div>

        {/* Settore pills */}
        <div className="flex gap-2 flex-wrap">
          {[
            { value: "", label: "Tutti", icon: <Filter className="w-3 h-3" /> },
            { value: "elettricita", label: "Elettricità", icon: <Zap className="w-3 h-3" /> },
            { value: "gas", label: "Gas", icon: <Flame className="w-3 h-3" /> },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => onSettoreChange(opt.value)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                settore === opt.value
                  ? "bg-primary/20 text-primary border border-primary/30"
                  : "bg-secondary/50 text-muted-foreground border border-border hover:text-foreground"
              }`}
            >
              {opt.icon}
              {opt.label}
            </button>
          ))}
        </div>

        {/* Tariffario toggle */}
        <button
          onClick={() => onSoloTariffariChange(!soloTariffari)}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
            soloTariffari
              ? "bg-primary/20 text-primary border border-primary/30"
              : "bg-secondary/50 text-muted-foreground border border-border hover:text-foreground"
          }`}
        >
          <TrendingUp className="w-3 h-3" />
          Tariffe
        </button>
      </div>
    </motion.div>
  );
};
