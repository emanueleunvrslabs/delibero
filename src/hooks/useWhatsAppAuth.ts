import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "delibero_wa_phone";

export function useWhatsAppAuth() {
  const [isVerified, setIsVerified] = useState<boolean>(() => {
    return !!localStorage.getItem(STORAGE_KEY);
  });
  const [showDialog, setShowDialog] = useState(false);
  const [pendingNavigate, setPendingNavigate] = useState<string | null>(null);

  const verifiedPhone = localStorage.getItem(STORAGE_KEY);

  const requireAuth = useCallback((targetPath: string) => {
    if (localStorage.getItem(STORAGE_KEY)) {
      return false; // already verified, no need to show dialog
    }
    setPendingNavigate(targetPath);
    setShowDialog(true);
    return true; // blocked, showing dialog
  }, []);

  const onVerified = useCallback((phone: string) => {
    localStorage.setItem(STORAGE_KEY, phone);
    setIsVerified(true);
    setShowDialog(false);
  }, []);

  const closeDialog = useCallback(() => {
    setShowDialog(false);
    setPendingNavigate(null);
  }, []);

  return {
    isVerified,
    showDialog,
    pendingNavigate,
    requireAuth,
    onVerified,
    closeDialog,
    verifiedPhone,
  };
}
