Hier ist der vollständige und korrigierte Inhalt für die `README.md` deines Next.js-Projekts. Er enthält keine Emojis und stellt die Ordnerstruktur dank des Code-Blocks korrekt dar.

Du kannst diesen Code kopieren und damit den Inhalt deiner `achmetchakseven/README.md` überschreiben.

````markdown
# Achmet Chakseven - Portfolio & Blog

Dies ist der Quellcode für mein persönliches Portfolio und meinen Blog. Die Seite wurde mit Next.js (App Router) erstellt und demonstriert moderne Web-Technologien sowie die Integration von Machine Learning direkt im Browser.

Live Demo: https://portfolio-blog-starter.vercel.app

## Features

- **Next.js App Router:** Modernes React-Framework für Server-Side Rendering (SSR) und statische Generierung.
- **Client-Side AI:** Ein interaktiver Handwritten Digit Recognizer, der ein PyTorch-Modell via ONNX Runtime Web direkt im Browser ausführt (WebAssembly). Keine Server-Inferenz nötig.
- **MDX Blog:** Blog-Posts werden in Markdown/MDX geschrieben, komplett mit Syntax-Highlighting.
- **Tailwind CSS v4:** Modernes Styling mit Dark Mode Support.
- **SEO Optimiert:** Automatische Generierung von Sitemap, Robots.txt, JSON-LD Schema und Open Graph Bildern.
- **Performance:** Optimiert mit Vercel Speed Insights und Analytics.

## Tech Stack

- **Framework:** Next.js
- **Sprache:** TypeScript
- **Styling:** Tailwind CSS
- **Machine Learning:** ONNX Runtime Web (WASM Backend)
- **Content:** MDX Remote
- **Deployment:** Vercel

## Installation & Start

Stelle sicher, dass du Node.js installiert hast. Dieses Projekt nutzt pnpm.

1. **Repository klonen**

   ```bash
   git clone [https://github.com/achmetcha/achmetchakseven.git](https://github.com/achmetcha/achmetchakseven.git)
   cd achmetchakseven
````

2.  **Abhängigkeiten installieren**

    ```bash
    pnpm install
    ```

3.  **Das KI-Modell platzieren**

    Damit die Ziffernerkennung funktioniert, muss das trainierte ONNX-Modell im `public` Ordner liegen.
    Falls du das Python-Projekt `digit-recognizer-py` genutzt hast, kopiere die `digit_net.onnx` von dort.

    Stelle sicher, dass die Datei existiert:
    `./public/digit_net.onnx`

4.  **Entwicklungsserver starten**

    ```bash
    pnpm dev
    ```

    Öffne http://localhost:3000 in deinem Browser.

## Wie die KI-Erkennung funktioniert

Das Herzstück der "Live KI Demo" ist die Komponente `DigitRecognizer` (`app/components/digit-recognizer.tsx`).

1.  **Training (Python):** Ein CNN wurde in PyTorch auf dem MNIST-Datensatz trainiert und nach ONNX exportiert.
2.  **Inferenz (Browser):** Die Seite lädt `digit_net.onnx` mittels `onnxruntime-web`.
3.  **Preprocessing (TypeScript):**
      - Das Canvas-Bild wird analysiert und eine Bounding-Box um die Zeichnung gelegt.
      - Das Bild wird auf 28x28 Pixel skaliert und zentriert.
      - Die Pixelwerte werden normalisiert (`(pixel - mean) / std`), um exakt dem Training-Setup von PyTorch zu entsprechen.
4.  **Berechnung:** Das Modell läuft via WebAssembly (WASM) auf der CPU des Nutzers.

## Projektstruktur

```text
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
```

## Lizenz

MIT Licensed.

