import { Instagram, Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative py-4 z-10">
      <div className="container mx-auto px-4">
        <div className="liquid-glass-card-sm px-5 py-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span>
            <span className="font-bold gradient-text">Delibero</span> — un servizio <a href="https://www.energizzo.it" target="_blank" rel="noopener noreferrer" className="font-semibold gradient-text hover:underline">energizzo</a> by <a href="https://www.unvrslabs.dev" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">UNVRS Labs</a>
          </span>
          <span className="text-white/10">|</span>
          <span>© {new Date().getFullYear()} UNVRS Labs Limited</span>
          <span className="text-white/10">|</span>
          <a href="/privacy-policy" className="hover:underline hover:text-foreground transition-colors">Privacy Policy</a>
          <span className="text-white/10">|</span>
          <span className="text-muted-foreground/60">Non affiliato ad ARERA</span>
          <span className="text-white/10">|</span>
          <div className="flex items-center gap-2">
            <a href="https://www.instagram.com/energizzo.it" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" aria-label="Instagram">
              <Instagram size={16} />
            </a>
            <a href="https://www.linkedin.com/company/111630917" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" aria-label="LinkedIn">
              <Linkedin size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
