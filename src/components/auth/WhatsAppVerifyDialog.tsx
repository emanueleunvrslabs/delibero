import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface Props {
  open: boolean;
  onClose: () => void;
  onVerified: (phone: string) => void;
  pendingNavigate: string | null;
}

export function WhatsAppVerifyDialog({ open, onClose, onVerified, pendingNavigate }: Props) {
  const [step, setStep] = useState<"phone" | "otp" | "success">("phone");
  const [phone, setPhone] = useState("+39");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    setError("");
    if (!/^\+[1-9]\d{6,14}$/.test(phone)) {
      setError("Inserisci un numero valido con prefisso internazionale (es. +393331234567)");
      return;
    }
    setLoading(true);
    try {
      const { data, error: fnError } = await supabase.functions.invoke("whatsapp-otp", {
        body: { action: "send", phone_number: phone },
      });
      if (fnError) throw new Error(fnError.message);
      if (!data.success) throw new Error(data.error);

      if (data.already_verified) {
        onVerified(phone);
        setStep("success");
        setTimeout(() => {
          if (pendingNavigate) navigate(pendingNavigate);
        }, 500);
        return;
      }
      setStep("otp");
    } catch (err: any) {
      setError(err.message || "Errore nell'invio del codice");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setError("");
    if (otp.length !== 6) {
      setError("Il codice deve essere di 6 cifre");
      return;
    }
    setLoading(true);
    try {
      const { data, error: fnError } = await supabase.functions.invoke("whatsapp-otp", {
        body: { action: "verify", phone_number: phone, otp_code: otp },
      });
      if (fnError) throw new Error(fnError.message);
      if (!data.success) throw new Error(data.error);

      onVerified(phone);
      setStep("success");
      setTimeout(() => {
        if (pendingNavigate) navigate(pendingNavigate);
      }, 800);
    } catch (err: any) {
      setError(err.message || "Codice errato");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setStep("phone");
    setOtp("");
    setError("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleClose()}>
      <DialogContent className="sm:max-w-md border-border/50 bg-background/95 backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <MessageCircle className="w-5 h-5 text-green-500" />
            Verifica WhatsApp
          </DialogTitle>
          <DialogDescription>
            {step === "phone" && "Inserisci il tuo numero WhatsApp per accedere alle delibere."}
            {step === "otp" && "Inserisci il codice a 6 cifre ricevuto su WhatsApp."}
            {step === "success" && "Numero verificato con successo!"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          {step === "phone" && (
            <>
              <Input
                placeholder="+393331234567"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/[^+\d]/g, ""))}
                className="text-lg tracking-wider"
                maxLength={16}
              />
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button onClick={handleSendOtp} disabled={loading} className="w-full gap-2">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                Invia codice su WhatsApp
              </Button>
            </>
          )}

          {step === "otp" && (
            <>
              <p className="text-sm text-muted-foreground">
                Codice inviato a <span className="font-semibold text-foreground">{phone}</span>
              </p>
              <Input
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                className="text-2xl tracking-[0.5em] text-center font-mono"
                maxLength={6}
                autoFocus
              />
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button onClick={handleVerifyOtp} disabled={loading} className="w-full gap-2">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                Verifica
              </Button>
              <button
                onClick={() => { setStep("phone"); setOtp(""); setError(""); }}
                className="text-xs text-muted-foreground hover:text-foreground w-full text-center"
              >
                Cambia numero o rinvia codice
              </button>
            </>
          )}

          {step === "success" && (
            <div className="flex flex-col items-center gap-3 py-4">
              <CheckCircle2 className="w-12 h-12 text-green-500" />
              <p className="text-lg font-semibold">Accesso verificato!</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
