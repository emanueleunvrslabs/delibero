

## Privacy Policy Page

### Cosa faremo
Creeremo una pagina Privacy Policy accessibile dal footer del sito, con lo stesso stile grafico (dark theme, glassmorphism, sfondo mesh gradient).

### Modifiche

**1. Nuova pagina `src/pages/PrivacyPolicy.tsx`**
- Stessa struttura grafica delle altre pagine (mesh-gradient, aurora-bg, grain-overlay)
- Contenuto in `liquid-glass-card-lg` con la privacy policy di Delibero/UNVRS Labs
- Include: titolare del trattamento (UNVRS Labs Limited), dati raccolti, finalita, base giuridica, cookie, diritti dell'utente, contatti
- Navbar e Footer inclusi

**2. Modifica `src/App.tsx`**
- Aggiunta route `/privacy-policy`

**3. Modifica `src/components/landing/Footer.tsx`**
- Aggiunta link "Privacy Policy" nel footer, prima del disclaimer ARERA

### Link risultante
Una volta pubblicato, la pagina sara disponibile a:
**https://delibero.lovable.app/privacy-policy**

### Dettagli tecnici
- La privacy policy sara una pagina statica con testo in italiano
- Il contenuto coprira i requisiti base per un'app LinkedIn (raccolta dati, finalita, contatti del titolare)
- Stile coerente con il resto del sito

