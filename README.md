Achmet Chakseven – Portfolio & Blog

Dies ist der Quellcode für mein persönliches Portfolio mit integriertem Blog. Die Anwendung basiert auf Next.js mit App Router und zeigt, wie sich moderne Web-Technologien mit Machine Learning direkt im Browser kombinieren lassen.

Live-Demo:
[https://portfolio-blog-starter.vercel.app](https://portfolio-blog-starter.vercel.app)

Features

Die Anwendung nutzt den Next.js App Router für serverseitiges Rendering und statische Generierung.

Ein zentrales Element ist eine interaktive Handschrift-Ziffernerkennung. Dabei wird ein in PyTorch trainiertes Modell als ONNX-Datei eingebunden und mithilfe von ONNX Runtime Web direkt im Browser ausgeführt. Die Inferenz erfolgt vollständig clientseitig über WebAssembly – es ist keine Serververarbeitung erforderlich.

Der Blog basiert auf MDX. Beiträge werden in Markdown bzw. MDX verfasst und inklusive Syntax-Highlighting dargestellt.

Das Styling erfolgt mit Tailwind CSS v4, inklusive Unterstützung für einen Dark Mode.

Die Seite ist suchmaschinenoptimiert und generiert automatisch Sitemap, robots.txt, JSON-LD-Schema sowie Open-Graph-Bilder.

Für Performance-Analysen kommen Vercel Speed Insights und Analytics zum Einsatz.

Tech Stack

Framework: Next.js
Sprache: TypeScript
Styling: Tailwind CSS
Machine Learning: ONNX Runtime Web mit WASM-Backend
Content: MDX Remote
Deployment: Vercel

Installation und Start

Stelle sicher, dass Node.js installiert ist. Das Projekt verwendet pnpm.

1. Repository klonen

```bash
git clone https://github.com/achmetcha/achmetchakseven.git
cd achmetchakseven
```

2. Abhängigkeiten installieren

```bash
pnpm install
```

3. KI-Modell bereitstellen

Damit die Ziffernerkennung funktioniert, muss sich das trainierte ONNX-Modell im public-Ordner befinden.

Wenn du das Python-Projekt digit-recognizer-py verwendet hast, kopiere die Datei digit_net.onnx in das Verzeichnis public.

Stelle sicher, dass folgende Datei existiert:
./public/digit_net.onnx

4. Entwicklungsserver starten

```bash
pnpm dev
```

Anschließend ist die Anwendung unter [http://localhost:3000](http://localhost:3000) im Browser erreichbar.

Funktionsweise der KI-Erkennung

Das Kernstück der Live-Demo ist die Komponente DigitRecognizer im Verzeichnis app/components/digit-recognizer.tsx.

Training in Python
Ein Convolutional Neural Network wurde mit PyTorch auf dem MNIST-Datensatz trainiert und anschließend in das ONNX-Format exportiert.

Inferenz im Browser
Die Anwendung lädt die Datei digit_net.onnx über onnxruntime-web und führt das Modell direkt im Browser aus.

Preprocessing in TypeScript
Das gezeichnete Canvas-Bild wird analysiert und auf die relevante Zeichenfläche begrenzt. Anschließend wird es auf 28 × 28 Pixel skaliert, zentriert und normalisiert. Die Normalisierung erfolgt nach dem Schema (pixel - mean) / std, um exakt dem Trainings-Setup in PyTorch zu entsprechen.

Berechnung
Die eigentliche Modellberechnung erfolgt über WebAssembly auf der CPU des jeweiligen Nutzers.

Projektstruktur

```text
achmetchakseven/
├── app/
│   ├── blog/              Blog-Logik und MDX-Posts
│   ├── components/        React-Komponenten wie Navigation, Footer, DigitRecognizer
│   ├── layout.tsx         Hauptlayout
│   └── page.tsx           Startseite (Portfolio)
├── public/
│   ├── digit_net.onnx     Trainiertes KI-Modell
│   └── ...                Bilder und statische Assets
├── next.config.js         Next.js Konfiguration
└── tailwind.config.ts     Tailwind Konfiguration
```

Lizenz

Das Projekt steht unter der MIT-Lizenz.
