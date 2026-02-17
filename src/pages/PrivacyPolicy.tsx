import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/landing/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen mesh-gradient aurora-bg relative">
      <div className="grain-overlay" />
      <Navbar />

      <main className="relative z-10 pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="liquid-glass-card-lg p-8 md:p-12 space-y-8">
            <h1 className="text-3xl md:text-4xl font-bold gradient-text">
              Privacy Policy
            </h1>
            <p className="text-sm text-muted-foreground">
              Ultimo aggiornamento: 17 febbraio 2026
            </p>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">1. Titolare del Trattamento</h2>
              <p className="text-muted-foreground leading-relaxed">
                Il titolare del trattamento dei dati è <strong className="text-foreground">UNVRS Labs Limited</strong>. 
                Per qualsiasi richiesta relativa alla privacy, è possibile contattarci all'indirizzo email:{" "}
                <a href="mailto:privacy@unvrslabs.dev" className="text-primary hover:underline">privacy@unvrslabs.dev</a>.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">2. Servizio</h2>
              <p className="text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Delibero</strong> è un servizio di{" "}
                <a href="https://www.energizzo.it" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">energizzo</a>{" "}
                by UNVRS Labs che raccoglie, analizza e sintetizza le delibere pubblicate dall'Autorità di Regolazione per Energia Reti e Ambiente (ARERA), 
                rendendole accessibili in formato semplificato.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">3. Dati Raccolti</h2>
              <p className="text-muted-foreground leading-relaxed">
                Il servizio può raccogliere i seguenti dati:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
                <li><strong className="text-foreground">Dati di navigazione:</strong> indirizzo IP, tipo di browser, sistema operativo, pagine visitate, orari di accesso</li>
                <li><strong className="text-foreground">Dati tecnici:</strong> log del server, dati di performance del sito</li>
                <li><strong className="text-foreground">Dati forniti volontariamente:</strong> eventuali informazioni inviate tramite form di contatto o iscrizione</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">4. Finalità del Trattamento</h2>
              <p className="text-muted-foreground leading-relaxed">
                I dati sono trattati per le seguenti finalità:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
                <li>Erogazione e miglioramento del servizio</li>
                <li>Analisi statistiche anonime sull'utilizzo della piattaforma</li>
                <li>Adempimento di obblighi di legge</li>
                <li>Comunicazioni relative al servizio</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">5. Base Giuridica</h2>
              <p className="text-muted-foreground leading-relaxed">
                Il trattamento dei dati si basa su: legittimo interesse del titolare per l'erogazione del servizio, 
                consenso dell'utente ove richiesto, e adempimento di obblighi legali ai sensi del Regolamento (UE) 2016/679 (GDPR).
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">6. Cookie</h2>
              <p className="text-muted-foreground leading-relaxed">
                Il sito utilizza esclusivamente cookie tecnici necessari al funzionamento del servizio. 
                Non vengono utilizzati cookie di profilazione o di terze parti a scopo pubblicitario.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">7. Condivisione dei Dati</h2>
              <p className="text-muted-foreground leading-relaxed">
                I dati non vengono venduti a terzi. Possono essere condivisi con fornitori di servizi tecnici 
                (hosting, analytics) che agiscono come responsabili del trattamento, nel rispetto del GDPR.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">8. Conservazione dei Dati</h2>
              <p className="text-muted-foreground leading-relaxed">
                I dati personali sono conservati per il tempo strettamente necessario alle finalità per cui sono stati raccolti, 
                e comunque non oltre i termini previsti dalla normativa vigente.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">9. Diritti dell'Utente</h2>
              <p className="text-muted-foreground leading-relaxed">
                Ai sensi degli articoli 15-22 del GDPR, l'utente ha diritto di:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
                <li>Accedere ai propri dati personali</li>
                <li>Richiederne la rettifica o la cancellazione</li>
                <li>Limitare o opporsi al trattamento</li>
                <li>Richiedere la portabilità dei dati</li>
                <li>Revocare il consenso in qualsiasi momento</li>
                <li>Proporre reclamo all'autorità di controllo (Garante per la Protezione dei Dati Personali)</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                Per esercitare i propri diritti, contattare:{" "}
                <a href="mailto:privacy@unvrslabs.dev" className="text-primary hover:underline">privacy@unvrslabs.dev</a>.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">10. Modifiche alla Privacy Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Il titolare si riserva il diritto di modificare questa privacy policy in qualsiasi momento. 
                Le modifiche saranno pubblicate su questa pagina con indicazione della data di ultimo aggiornamento.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
