export const Footer = () => {
  return (
    <footer className="relative py-8 md:py-12 z-10">
      <div className="container mx-auto px-4">
        <div className="liquid-glass-card-sm p-5 md:p-8 text-center">
          <p className="text-sm text-muted-foreground mb-2">
            <span className="font-bold gradient-text">Delibero</span>
            <span className="mx-3 text-white/10">|</span>
            un servizio <span className="font-semibold gradient-text">energizzo</span> by <a href="#" className="text-primary hover:underline">UNVRS Labs</a>
          </p>
          <p className="text-xs text-muted-foreground mb-1">
            © {new Date().getFullYear()} UNVRS Labs S.r.l. — Tutti i diritti riservati
          </p>
          <p className="text-xs text-muted-foreground/60">
            Servizio non affiliato ad ARERA
          </p>
        </div>
      </div>
    </footer>
  );
};
