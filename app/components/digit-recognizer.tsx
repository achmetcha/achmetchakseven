'use client'

import { useState, useRef, useEffect } from 'react'
import { Eraser, Scan, BrainCircuit, CheckCircle2, RotateCcw, Loader2 } from 'lucide-react'
import * as ort from 'onnxruntime-web'

export function DigitRecognizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<number | null>(null)
  const [confidence, setConfidence] = useState(0)
  const [session, setSession] = useState<ort.InferenceSession | null>(null)
  const [logs, setLogs] = useState<string[]>([])

  // 1. ONNX Modell laden
  useEffect(() => {
    async function loadModel() {
      try {
        // Pfade definieren
        const modelUrl = `${window.location.origin}/digit_net.onnx`;
        const dataUrl = `${window.location.origin}/digit_net.onnx.data`;

        // Session mit externalData Konfiguration erstellen
        const sess = await ort.InferenceSession.create(modelUrl, {
          executionProviders: ['wasm'],
          externalData: [
            {
              path: 'digit_net.onnx.data', // Muss exakt dem Dateinamen entsprechen, den das ONNX-Modell erwartet
              data: dataUrl                // Die URL, von der die Datei geladen wird
            }
          ]
        });
        
        setSession(sess);
        console.log('ONNX Modell geladen');
      } catch (err) {
        console.error('Fehler beim Laden des ONNX Modells:', err);
        setLogs(prev => [...prev, `Fehler: ${err}`]);
      }
    }
    loadModel();
  }, []);
  
  // Canvas Setup
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return

    canvas.width = 280
    canvas.height = 280

    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.strokeStyle = 'black'
    ctx.lineWidth = 25
  }, [])

  // --- ZEICHNEN LOGIK ---
  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true)
    draw(e)
  }
  const stopDrawing = () => {
    setIsDrawing(false)
    const ctx = canvasRef.current?.getContext('2d')
    ctx?.beginPath()
  }
  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    let x, y

    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left
      y = e.touches[0].clientY - rect.top
    } else {
      x = (e as React.MouseEvent).clientX - rect.left
      y = (e as React.MouseEvent).clientY - rect.top
    }

    ctx.lineTo(x, y)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    setResult(null)
    setLogs([])
    setConfidence(0)
  }

  // --- PREPROCESSING FÜR ONNX ---
  // Wandelt Canvas -> 28x28 Float32Array (Normalisiert)
  // KORREKTUR: Hier stand vorher "processCanvas toTensor"
  const processCanvas = (): Float32Array | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // 1. Bounding Box finden
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;
    let minX = canvas.width, minY = canvas.height, maxX = 0, maxY = 0;
    let found = false;

    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        const idx = (y * canvas.width + x) * 4;
        if (data[idx] < 240) { // Wenn Pixel dunkel
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
          found = true;
        }
      }
    }

    if (!found) return null;

    // 2. Skalieren auf 20x20 in 28x28 Box
    const width = maxX - minX;
    const height = maxY - minY;
    const size = Math.max(width, height);
    const scale = 20 / size;

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = 28;
    tempCanvas.height = 28;
    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) return null;

    tempCtx.fillStyle = 'white'; // Hintergrund weiß
    tempCtx.fillRect(0, 0, 28, 28);
    tempCtx.translate(14, 14);
    tempCtx.scale(scale, scale);
    tempCtx.translate(-(minX + width / 2), -(minY + height / 2));
    tempCtx.drawImage(canvas, 0, 0);

    // 3. Pixel auslesen und normalisieren
    const scaledData = tempCtx.getImageData(0, 0, 28, 28).data;
    const input = new Float32Array(28 * 28);

    for (let i = 0; i < 28 * 28; i++) {
      const pixelValue = scaledData[i * 4];

      // Invertieren & Normalisieren (0-1)
      let norm = 1.0 - (pixelValue / 255.0);

      // PyTorch Normalize Standardwerte
      input[i] = (norm - 0.1307) / 0.3081;
    }

    return input;
  }

  const predictDigit = async () => {
    if (!session) return;

    setIsProcessing(true);
    setResult(null);
    setLogs([]);

    // UI-Logs
    const steps = ['Extrahiere Pixel...', 'Normalisiere (Mean/Std)...', 'ONNX Inferenz...', 'Berechne Softmax...'];
    steps.forEach((step, i) => setTimeout(() => setLogs(prev => [...prev, step]), i * 400));

    try {
      await new Promise(r => setTimeout(r, 100));

      const inputData = processCanvas();
      if (!inputData) {
        setIsProcessing(false);
        return;
      }

      // Tensor erstellen: Shape [1, 1, 28, 28]
      const inputTensor = new ort.Tensor('float32', inputData, [1, 1, 28, 28]);

      // Inferenz ausführen
      const feeds = { input: inputTensor };
      const results = await session.run(feeds);

      // Ergebnis holen
      const outputData = results.output.data as Float32Array;

      // Argmax
      let maxVal = -Infinity;
      let maxIdx = -1;
      for (let i = 0; i < outputData.length; i++) {
        if (outputData[i] > maxVal) {
          maxVal = outputData[i];
          maxIdx = i;
        }
      }

      // Softmax für Konfidenz
      const exps = outputData.map(Math.exp);
      const sumExps = exps.reduce((a, b) => a + b, 0);
      const probs = exps.map(e => e / sumExps); 

      let confPercent = probs[maxIdx] * 100;
      setConfidence(parseFloat(confPercent.toFixed(2)));
      setResult(maxIdx);

    } catch (e) {
      console.error(e);
      setLogs(prev => [...prev, 'Fehler bei der Inferenz!']);
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden relative font-sans">

      {/* Header */}
      <div className="bg-neutral-50 dark:bg-neutral-800/50 p-4 border-b border-neutral-200 dark:border-neutral-800 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <BrainCircuit className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
          <span className="font-bold text-neutral-800 dark:text-neutral-100 text-sm">PyTorch ONNX Modell</span>
        </div>
        <div className={`text-[10px] font-mono px-2 py-0.5 rounded flex items-center gap-1 ${session ? 'text-green-600 bg-green-100 dark:bg-green-900/20' : 'text-yellow-600 bg-yellow-100'}`}>
          {session ? (
            <>
              <CheckCircle2 className="w-3 h-3" />
              <span>READY</span>
            </>
          ) : (
            <>
              <Loader2 className="w-3 h-3 animate-spin" />
              <span>LOADING</span>
            </>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 flex flex-col items-center gap-6 relative">

        <div className="relative group p-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseUp={stopDrawing}
            onMouseOut={stopDrawing}
            onMouseMove={draw}
            onTouchStart={startDrawing}
            onTouchEnd={stopDrawing}
            onTouchMove={draw}
            className={`rounded border border-neutral-200 dark:border-neutral-700 cursor-crosshair touch-none bg-white ${isProcessing ? 'blur-[2px] opacity-50' : ''}`}
            style={{ width: '280px', height: '280px', touchAction: 'none' }}
          />
          {!isDrawing && !result && !isProcessing && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-neutral-400 text-sm">
              Zeichne eine Ziffer (0-9)
            </div>
          )}
        </div>

        <div className="flex gap-4 w-full justify-center">
          <button
            onClick={clearCanvas}
            disabled={isProcessing}
            className="flex items-center px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors disabled:opacity-50"
          >
            <Eraser className="w-4 h-4 mr-2" />
            Reset
          </button>
          <button
            onClick={predictDigit}
            disabled={isProcessing || !session}
            className="flex items-center px-6 py-2 text-sm font-medium text-white bg-neutral-900 dark:bg-white dark:text-black rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? 'Berechne...' : 'Erkennen'}
            {!isProcessing && <Scan className="w-4 h-4 ml-2" />}
          </button>
        </div>
      </div>

      {/* LOGS OVERLAY */}
      {isProcessing && (
        <div className="absolute inset-0 bg-neutral-900/95 z-20 flex flex-col items-center justify-center p-6 font-mono">
          <div className="text-[10px] text-green-500 space-y-1 h-32 overflow-hidden border-l border-green-500/30 pl-3 font-mono">
            {logs.map((log, i) => (
              <p key={i} className="animate-fade-in">{`> ${log}`}</p>
            ))}
          </div>
        </div>
      )}

      {/* RESULT OVERLAY */}
      {result !== null && !isProcessing && (
        <div className="absolute inset-0 bg-white/95 dark:bg-neutral-900/95 z-20 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300">
          <CheckCircle2 className="w-12 h-12 text-green-500 mb-4" />
          <h4 className="text-xs text-neutral-500 uppercase tracking-widest font-medium">Prediction</h4>
          <div className="text-8xl font-black text-neutral-900 dark:text-white my-2 tracking-tighter">
            {result}
          </div>
          <p className="text-neutral-500 text-sm mb-6">
            Confidence: <span className="text-green-600 font-mono font-bold">{confidence}%</span>
          </p>
          <button
            onClick={clearCanvas}
            className="flex items-center px-6 py-2 border border-neutral-200 dark:border-neutral-700 rounded-full hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors text-sm"
          >
            <RotateCcw className="w-3 h-3 mr-2" />
            Nochmal
          </button>
        </div>
      )}
    </div>
  )
}