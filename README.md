Achmet Chakseven - Portfolio & Blog
````markdown
Achmet Chakseven – Portfolio & Blog

Dies ist der Quellcode für mein persönliches Portfolio und meinen Blog. Die Seite wurde mit Next.js (App Router) gebaut und zeigt, wie sich moderne Web-Technologien mit Machine Learning direkt im Browser kombinieren lassen.
Dies ist der Quellcode für mein persönliches Portfolio mit integriertem Blog. Die Anwendung basiert auf Next.js mit App Router und zeigt, wie sich moderne Web-Technologien mit Machine Learning direkt im Browser kombinieren lassen.

Live Demo: https://portfolio-blog-starter.vercel.app

---

Features

Next.js App Router: Modernes React-Framework für Server-Side Rendering (SSR) und statische Generierung.

Client-Side AI: Ein interaktiver Handwritten Digit Recognizer, der ein PyTorch-Modell via ONNX Runtime Web direkt im Browser ausführt (WebAssembly) — ohne Server-Inferenz.

MDX Blog: Blog-Posts werden in Markdown/MDX geschrieben, inklusive Syntax-Highlighting.

Tailwind CSS v4: Modernes Styling mit Dark Mode Support.

SEO: Automatische Generierung von Sitemap, Robots.txt, JSON-LD Schema und Open Graph Bildern.

Performance: Optimiert mit Vercel Speed Insights und Analytics.
Live-Demo:
[https://portfolio-blog-starter.vercel.app](https://portfolio-blog-starter.vercel.app)

Features

Die Anwendung nutzt den Next.js App Router für serverseitiges Rendering und statische Generierung.

Ein zentrales Element ist eine interaktive Handschrift-Ziffernerkennung. Dabei wird ein in PyTorch trainiertes Modell als ONNX-Datei eingebunden und mithilfe von ONNX Runtime Web direkt im Browser ausgeführt. Die Inferenz erfolgt vollständig clientseitig über WebAssembly – es ist keine Serververarbeitung erforderlich.

Der Blog basiert auf MDX. Beiträge werden in Markdown bzw. MDX verfasst und inklusive Syntax-Highlighting dargestellt.

Das Styling erfolgt mit Tailwind CSS v4, inklusive Unterstützung für einen Dark Mode.

Die Seite ist suchmaschinenoptimiert und generiert automatisch Sitemap, robots.txt, JSON-LD-Schema sowie Open-Graph-Bilder.

Für Performance-Analysen kommen Vercel Speed Insights und Analytics zum Einsatz.

---

Tech Stack
Tech Stack

Framework: Next.js  
Sprache: TypeScript  
Styling: Tailwind CSS  
Machine Learning: ONNX Runtime Web (WASM Backend)  
Content: MDX Remote  
Deployment: Vercel
Framework: Next.js
Sprache: TypeScript
Styling: Tailwind CSS
Machine Learning: ONNX Runtime Web mit WASM-Backend
Content: MDX Remote
Deployment: Vercel

---

Installation & Start
Installation und Start

Voraussetzung: Node.js muss installiert sein. Das Projekt nutzt pnpm.
Stelle sicher, dass Node.js installiert ist. Das Projekt verwendet pnpm.

1. Repository klonen

   git clone https://github.com/achmetcha/achmetchakseven.git
   cd achmetchakseven
1. Repository klonen

```bash
git clone https://github.com/achmetcha/achmetchakseven.git
cd achmetchakseven
```

2. Abhängigkeiten installieren
2. Abhängigkeiten installieren

   pnpm install
```bash
pnpm install
```

3. Das KI-Modell platzieren
3. KI-Modell bereitstellen

Damit die Ziffernerkennung funktioniert, muss sich das trainierte ONNX-Modell im public-Ordner befinden.

   Damit die Ziffernerkennung funktioniert, muss das trainierte ONNX-Modell im public-Ordner liegen.
   Falls du das Python-Projekt digit-recognizer-py verwendet hast, kopiere die digit_net.onnx von dort.
   Die Datei sollte unter folgendem Pfad liegen:
Wenn du das Python-Projekt digit-recognizer-py verwendet hast, kopiere die Datei digit_net.onnx in das Verzeichnis public.

   ./public/digit_net.onnx
Stelle sicher, dass folgende Datei existiert:
./public/digit_net.onnx

4. Entwicklungsserver starten
4. Entwicklungsserver starten

   pnpm dev
```bash
pnpm dev
```

   Danach einfach http://localhost:3000 im Browser öffnen.
Anschließend ist die Anwendung unter [http://localhost:3000](http://localhost:3000) im Browser erreichbar.

---

Wie die KI-Erkennung funktioniert
Funktionsweise der KI-Erkennung

Das Herzstück der Live-Demo ist die Komponente DigitRecognizer (app/components/digit-recognizer.tsx).
Das Kernstück der Live-Demo ist die Komponente DigitRecognizer im Verzeichnis app/components/digit-recognizer.tsx.

Training (Python): Ein CNN wurde in PyTorch auf dem MNIST-Datensatz trainiert und anschließend nach ONNX exportiert.

Inferenz (Browser): Die Seite lädt digit_net.onnx über onnxruntime-web.

Preprocessing (TypeScript):
- Das Canvas-Bild wird analysiert und eine Bounding-Box um die Zeichnung gelegt.
- Das Bild wird auf 28x28 Pixel skaliert und zentriert.
- Die Pixelwerte werden normalisiert ((pixel - mean) / std), passend zum Training-Setup in PyTorch.

Berechnung: Das Modell läuft via WebAssembly (WASM) auf der CPU des Nutzers.
Training in Python
Ein Convolutional Neural Network wurde mit PyTorch auf dem MNIST-Datensatz trainiert und anschließend in das ONNX-Format exportiert.

Inferenz im Browser
Die Anwendung lädt die Datei digit_net.onnx über onnxruntime-web und führt das Modell direkt im Browser aus.

Preprocessing in TypeScript
Das gezeichnete Canvas-Bild wird analysiert und auf die relevante Zeichenfläche begrenzt. Anschließend wird es auf 28 × 28 Pixel skaliert, zentriert und normalisiert. Die Normalisierung erfolgt nach dem Schema (pixel - mean) / std, um exakt dem Trainings-Setup in PyTorch zu entsprechen.

Berechnung
Die eigentliche Modellberechnung erfolgt über WebAssembly auf der CPU des jeweiligen Nutzers.

---

Projektstruktur
Projektstruktur

achmetchakseven/
├── app/
│   ├── blog/              Blog-Logik und MDX-Posts
│   ├── components/        React-Komponenten wie Navigation, Footer, DigitRecognizer
│   ├── layout.tsx         Hauptlayout
│   └── page.tsx           Startseite (Portfolio)
├── public/
│   ├── digit_net.onnx     # Das trainierte KI-Modell
│   └── ...                # Bilder und statische Assets
├── next.config.js         # Next.js Konfiguration
└── tailwind.config.ts     # Tailwind Konfiguration

---
│   ├── digit_net.onnx     Trainiertes KI-Modell
│   └── ...                Bilder und statische Assets
├── next.config.js         Next.js Konfiguration
└── tailwind.config.ts     Tailwind Konfiguration
```

Lizenz
Lizenz

MIT Licensed.
Das Projekt steht unter der MIT-Lizenz.
