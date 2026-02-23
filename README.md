Achmet Chakseven - Portfolio & Blog

Dies ist der Quellcode für mein persönliches Portfolio und meinen Blog. Die Seite wurde mit Next.js (App Router) gebaut und zeigt, wie sich moderne Web-Technologien mit Machine Learning direkt im Browser kombinieren lassen.

Live Demo: https://portfolio-blog-starter.vercel.app

---

Features

Next.js App Router: Modernes React-Framework für Server-Side Rendering (SSR) und statische Generierung.

Client-Side AI: Ein interaktiver Handwritten Digit Recognizer, der ein PyTorch-Modell via ONNX Runtime Web direkt im Browser ausführt (WebAssembly) — ohne Server-Inferenz.

MDX Blog: Blog-Posts werden in Markdown/MDX geschrieben, inklusive Syntax-Highlighting.

Tailwind CSS v4: Modernes Styling mit Dark Mode Support.

SEO: Automatische Generierung von Sitemap, Robots.txt, JSON-LD Schema und Open Graph Bildern.

Performance: Optimiert mit Vercel Speed Insights und Analytics.

---

Tech Stack

Framework: Next.js  
Sprache: TypeScript  
Styling: Tailwind CSS  
Machine Learning: ONNX Runtime Web (WASM Backend)  
Content: MDX Remote  
Deployment: Vercel

---

Installation & Start

Voraussetzung: Node.js muss installiert sein. Das Projekt nutzt pnpm.

1. Repository klonen

   git clone https://github.com/achmetcha/achmetchakseven.git
   cd achmetchakseven

2. Abhängigkeiten installieren

   pnpm install

3. Das KI-Modell platzieren

   Damit die Ziffernerkennung funktioniert, muss das trainierte ONNX-Modell im public-Ordner liegen.
   Falls du das Python-Projekt digit-recognizer-py verwendet hast, kopiere die digit_net.onnx von dort.
   Die Datei sollte unter folgendem Pfad liegen:

   ./public/digit_net.onnx

4. Entwicklungsserver starten

   pnpm dev

   Danach einfach http://localhost:3000 im Browser öffnen.

---

Wie die KI-Erkennung funktioniert

Das Herzstück der Live-Demo ist die Komponente DigitRecognizer (app/components/digit-recognizer.tsx).

Training (Python): Ein CNN wurde in PyTorch auf dem MNIST-Datensatz trainiert und anschließend nach ONNX exportiert.

Inferenz (Browser): Die Seite lädt digit_net.onnx über onnxruntime-web.

Preprocessing (TypeScript):
- Das Canvas-Bild wird analysiert und eine Bounding-Box um die Zeichnung gelegt.
- Das Bild wird auf 28x28 Pixel skaliert und zentriert.
- Die Pixelwerte werden normalisiert ((pixel - mean) / std), passend zum Training-Setup in PyTorch.

Berechnung: Das Modell läuft via WebAssembly (WASM) auf der CPU des Nutzers.

---

Projektstruktur

achmetchakseven/
├── app/
│   ├── blog/              # Blog-Logik und MDX-Posts
│   ├── components/        # React-Komponenten (Nav, Footer, DigitRecognizer...)
│   ├── layout.tsx         # Haupt-Layout
│   └── page.tsx           # Startseite (Portfolio)
├── public/
│   ├── digit_net.onnx     # Das trainierte KI-Modell
│   └── ...                # Bilder und statische Assets
├── next.config.js         # Next.js Konfiguration
└── tailwind.config.ts     # Tailwind Konfiguration

---

Lizenz

MIT Licensed.