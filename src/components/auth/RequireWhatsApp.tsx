import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { WhatsAppVerifyDialog } from "@/components/auth/WhatsAppVerifyDialog";

const STORAGE_KEY = "delibero_wa_phone";

export function RequireWhatsApp({ children }: { children: React.ReactNode }) {
  const [verified, setVerified] = useState(() => !!localStorage.getItem(STORAGE_KEY));
  const [showDialog, setShowDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setShowDialog(true);
    }
  }, []);

  const handleVerified = (phone: string) => {
    localStorage.setItem(STORAGE_KEY, phone);
    setVerified(true);
    setShowDialog(false);
  };

  const handleClose = () => {
    setShowDialog(false);
    if (!localStorage.getItem(STORAGE_KEY)) {
      navigate("/");
    }
  };

  if (!verified) {
    return (
      <WhatsAppVerifyDialog
        open={showDialog}
        onClose={handleClose}
        onVerified={handleVerified}
        pendingNavigate={null}
      />
    );
  }

  return <>{children}</>;
}
