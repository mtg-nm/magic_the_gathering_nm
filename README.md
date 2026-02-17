# Magic The Gathering - Norgesmesterskapet
En moderne Next.js-basert nettside for Norges Mesterskapsturneringer i Magic: The Gathering. Siden presenterer turneringsprogram, bye-turneringer, og tilhørende informasjon.
## 🎯 Oversikt
Dette prosjektet er bygget for å gi en intuitiv brukeropplevelse for Magic-spillere som ønsker å:
- Se fullt program for Norgesmesterskapet
- Finne informasjon om bye-turneringer
- Melde seg på turneringer
- Få oversikt over turneringsdetaljer (regler, format, pris, deltakere, etc.)
## 🛠️ Tech Stack
- **Frontend Framework**: [Next.js 15](https://nextjs.org) (React)
- **Language**: TypeScript
- **CMS**: [Contentful](https://www.contentful.com) (headless CMS)
- **Styling**: CSS (custom variables)
- **Deployment**: [Vercel](https://vercel.com)

## 📁 Prosjektstruktur

```
src/
├── app/                      # Next.js App Router
│  ├── layout.tsx             # Root layout
│  ├── page.tsx               # Hjemmeside
│  ├── [slug]/
│  │  └── page.tsx            # Dynamiske sider
│  ├── fullt-program/
│  │  └── page.tsx            # Fullstendig program
│  └── bye-turneringer/
│  └── page.tsx               # Bye-turneringer
├── components/
│  └── layout/
│  ├── Header.tsx             # Navigasjonsheader
│  └── Footer.tsx             # Footer
├── lib/
│  └── contentful.ts          # Contentful API-integrering
└── styles/
└── globals.css               # Global styling
```
 ## 🚀 Getting Started
### Forutsetninger
- Node.js 18+ 
- npm/yarn/pnpm/bun
- Contentful-konto med API-nøkkler
                              ### Installasjon
1. **Klone repositoriet**
```bash
git clone https://github.com/manilpit/magic_the_gathering_nm.git
cd magic_the_gathering_nm
```
2. **Installer avhengigheter**
```bash
npm install
                              # eller
yarn install
pnpm install
bun install
```
3. **Sett opp miljøvariabler**
Opprett en `.env.local` fil i rotmappen:
```bash
                              # Contentful API-nøkkler
NEXT_PUBLIC_CONTENTFUL_SPACE_ID=your_space_id_here
NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=your_access_token_here
```
Du finner disse i:
- Contentful Dashboard → Settings → API Keys
4. **Kjør utviklingsserver**
```bash
npm run dev
```
Åpne [http://localhost:3000](http://localhost:3000) i nettleseren din.
                              ## 📖 Tilgjengelige kommandoer
```bash
                              # Kjør dev-server
npm run dev
                              # Build for produksjon
npm run build
                              # Start produksjon-server
npm run start
                              # Kjør linter
npm run lint
```

## 🔌 Contentful-integrering
### Datasettup
Prosjektet forventer følgende content types i Contentful:
**Events (Arrangementer)**
- `title` (Text)
- `description` (Text)
- `day` (Text) - "day one", "day two", "day three"
- `startTime` (Text)
- `endTime` (Text)
- `entryFee` (Number)
- `maxParticipants` (Number)
- `deltakere` (Text)
- `format` (Text)
- `schedule` (Text)
- `rulesv2` (Text)
- `url` (Text) - Påmeldingslenke
**Bye Tournament Info**
- `title` (Text)
- `description` (Text)
- `format` (Text)
- `rounds` (Number)
- `deltakere` (Text)
- `rulesv2` (Text)
**Navigation**
- `title` (Text)
- `slug` (Text)
- `url` (Text)

### API-funksjoner
Se `src/lib/contentful.ts` for følgende funksjoner:
- `getNavigation()` - Henter navigasjonselementer
- `getEvents()` - Henter alle arrangementer
- `getByeTournamentInfo()` - Henter bye-turnerings-info
- `getPage(slug)` - Henter spesifikk side
                              ## 🌐 Deployment på Vercel
Prosjektet er konfigurert for automatisk deployment på [Vercel](https://vercel.com).
 ### Deployment-steg:
 1. Push koden til GitHub
2. Gå til [Vercel Dashboard](https://vercel.com/dashboard)
3. Klikk "Add New..." → "Project"
4. Velg GitHub-repositoriet
5. Legg til miljøvariabler:
  - `NEXT_PUBLIC_CONTENTFUL_SPACE_ID`
  - `NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN`
6. Deploy!
Hver push til `main` triggerer automatisk en ny deploy.
## 🎨 Styling
Prosjektet bruker CSS custom properties (variabler) for konsistent styling:
```css
--primary-color
--secondary-color
--text-primary
--text-muted
--box-primary
```
Disse defineres i `src/styles/globals.css`.

## 📄 Lisens
Dette prosjektet er lisensiert under MIT-lisensen. Se [LICENSE](LICENSE) for detaljer.
## 👤 Forfatter
**Manilpit**
- GitHub: [@manilpit](https://github.com/manilpit)
- Email: [din-email@example.com]

## 🔗 Nyttige ressurser
- [Next.js Dokumentasjon](https://nextjs.org/docs)
- [Contentful API Reference](https://www.contentful.com/developers/docs/references/content-management-api/)
- [Vercel Deployment Guide](https://vercel.com/docs)
- [React Documentation](https://react.dev)