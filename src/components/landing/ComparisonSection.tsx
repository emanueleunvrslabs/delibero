import { motion } from "framer-motion";
import { Check, X, AlertTriangle } from "lucide-react";

type CellValue = { type: "yes" | "no" | "partial" | "text"; label?: string };

const yes = (label?: string): CellValue => ({ type: "yes", label });
const no = (): CellValue => ({ type: "no" });
const partial = (label: string): CellValue => ({ type: "partial", label });
const text = (label: string): CellValue => ({ type: "text", label });

const rows: { feature: string; energizzo: CellValue; trilance: CellValue; ibill: CellValue; wattsdat: CellValue }[] = [
  { feature: "AI Customer Care (Chat/WhatsApp)", energizzo: yes("Nativo"), trilance: no(), ibill: partial("Basic"), wattsdat: no() },
  { feature: "Telefono AI (Inbound + Outbound)", energizzo: yes("Nativo"), trilance: no(), ibill: no(), wattsdat: no() },
  { feature: "Onboarding OCR da Bolletta", energizzo: yes("Nativo"), trilance: no(), ibill: no(), wattsdat: no() },
  { feature: "Simulatore Risparmio AI", energizzo: yes("Avanzato"), trilance: no(), ibill: partial("Base"), wattsdat: no() },
  { feature: "Predizione Churn", energizzo: yes("AI"), trilance: no(), ibill: no(), wattsdat: no() },
  { feature: "Predizione Morosità", energizzo: yes("AI"), trilance: no(), ibill: no(), wattsdat: no() },
  { feature: "Billing Automatizzato", energizzo: yes("AI"), trilance: yes("AI base"), ibill: partial("Terzi"), wattsdat: yes() },
  { feature: "CRM Energia", energizzo: yes("AI-driven"), trilance: yes(), ibill: yes(), wattsdat: yes() },
  { feature: "Compliance ARERA Auto", energizzo: yes("AI"), trilance: partial("Manuale"), ibill: no(), wattsdat: partial("") },
  { feature: "Integrazione Cerved", energizzo: yes("Nativo"), trilance: no(), ibill: no(), wattsdat: no() },
  { feature: "Time-to-Value", energizzo: text("< 1 settimana"), trilance: text("2-6 mesi"), ibill: text("2-4 settimane"), wattsdat: text("1-3 mesi") },
];

const CellContent = ({ value, isEnergizzo, iconOnly }: { value: CellValue; isEnergizzo?: boolean; iconOnly?: boolean }) => {
  const iconSize = 16;

  if (value.type === "text") {
    return <span className={`block text-center text-xs md:text-sm ${isEnergizzo ? "text-primary font-semibold" : ""}`}>{value.label}</span>;
  }

  const icon = (
    <span className="w-5 h-5 flex items-center justify-center flex-shrink-0 mx-auto">
      {value.type === "yes" && (
        <span className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
          <Check className="text-emerald-400" size={iconSize} strokeWidth={3} />
        </span>
      )}
      {value.type === "no" && (
        <span className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center">
          <X className="text-red-400" size={iconSize} strokeWidth={3} />
        </span>
      )}
      {value.type === "partial" && (
        <span className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center">
          <AlertTriangle className="text-amber-400" size={iconSize - 2} strokeWidth={2.5} />
        </span>
      )}
    </span>
  );

  if (iconOnly) {
    return <div className="flex justify-center">{icon}</div>;
  }

  return (
    <div className="w-full grid items-center" style={{ gridTemplateColumns: '1fr 20px 1fr' }}>
      <span />
      {icon}
      <span className="text-xs whitespace-nowrap pl-1.5">{value.label || '\u00A0'}</span>
    </div>
  );
};

export const ComparisonSection = () => {
  return (
    <section id="compare" className="py-16 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16"
        >
          <span className="font-mono text-xs font-semibold tracking-[0.15em] uppercase text-primary mb-4 block">
            // Confronto
          </span>
          <h2 className="text-2xl md:text-5xl font-extrabold text-foreground mb-3 md:mb-4 tracking-tight">
            Perché Energizzo è diverso
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto px-2">
            I competitor sono nati prima dell'AI. Energizzo è nato con l'AI.
          </p>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-5xl mx-auto"
        >
          <div className="liquid-glass rounded-xl overflow-hidden">
            <table className="w-full border-collapse table-fixed">
              <colgroup>
                <col className="w-[32%] md:w-[30%]" />
                <col className="w-[17%] md:w-[17.5%]" />
                <col className="w-[17%] md:w-[17.5%]" />
                <col className="w-[17%] md:w-[17.5%]" />
                <col className="w-[17%] md:w-[17.5%]" />
              </colgroup>
              <thead>
                <tr>
                  <th className="text-left p-2 md:p-4 text-xs md:text-sm font-semibold text-muted-foreground border-b border-white/[0.08]">
                    <span className="hidden md:inline">Funzionalità</span>
                    <span className="md:hidden">Feature</span>
                  </th>
                  <th className="text-center p-2 md:p-4 text-xs md:text-sm font-bold text-primary border-b border-white/[0.08]"
                    style={{ background: 'hsl(158 64% 42% / 0.06)' }}>
                    <span className="hidden md:inline">Energizzo</span>
                    <span className="md:hidden text-[10px]">Enrg.</span>
                  </th>
                  <th className="text-center p-2 md:p-4 text-xs md:text-sm font-semibold text-muted-foreground border-b border-white/[0.08]">
                    <span className="hidden md:inline">Trilance</span>
                    <span className="md:hidden text-[10px]">Tril.</span>
                  </th>
                  <th className="text-center p-2 md:p-4 text-xs md:text-sm font-semibold text-muted-foreground border-b border-white/[0.08]">
                    <span className="hidden md:inline">iBill</span>
                    <span className="md:hidden text-[10px]">iBill</span>
                  </th>
                  <th className="text-center p-2 md:p-4 text-xs md:text-sm font-semibold text-muted-foreground border-b border-white/[0.08]">
                    <span className="hidden md:inline">Wattsdat</span>
                    <span className="md:hidden text-[10px]">Wtsd.</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} className="transition-colors hover:bg-white/[0.03]">
                    <td className="text-left p-2 md:p-4 text-xs md:text-sm font-medium text-foreground border-b border-white/[0.05]">
                      {row.feature}
                    </td>
                    <td className="p-2 md:p-4 text-sm font-semibold text-primary border-b border-white/[0.05]"
                      style={{ background: 'hsl(158 64% 42% / 0.03)' }}>
                      <span className="hidden md:block"><CellContent value={row.energizzo} isEnergizzo /></span>
                      <span className="md:hidden"><CellContent value={row.energizzo} isEnergizzo iconOnly /></span>
                    </td>
                    <td className="p-2 md:p-4 text-sm text-muted-foreground border-b border-white/[0.05]">
                      <span className="hidden md:block"><CellContent value={row.trilance} /></span>
                      <span className="md:hidden"><CellContent value={row.trilance} iconOnly /></span>
                    </td>
                    <td className="p-2 md:p-4 text-sm text-muted-foreground border-b border-white/[0.05]">
                      <span className="hidden md:block"><CellContent value={row.ibill} /></span>
                      <span className="md:hidden"><CellContent value={row.ibill} iconOnly /></span>
                    </td>
                    <td className="p-2 md:p-4 text-sm text-muted-foreground border-b border-white/[0.05]">
                      <span className="hidden md:block"><CellContent value={row.wattsdat} /></span>
                      <span className="md:hidden"><CellContent value={row.wattsdat} iconOnly /></span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
