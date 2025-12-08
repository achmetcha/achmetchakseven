import { BlogPosts } from '@/app/components/posts'
import { Database, Code, Server, GraduationCap, Briefcase, Cpu, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { DigitRecognizer } from '@/app/components/digit-recognizer'

export default function Page() {
  return (
    <section className="w-full">
      
      {/* --- OBERER BEREICH: PROFIL & PROJEKTE --- */}
      {/* Abstände reduziert (gap-8, mb-8), damit die Skills höher kommen */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">

        {/* --- LINKE SPALTE (Profil) --- */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          <div className="flex justify-start">
            <div className="relative w-32 h-32 md:w-40 md:h-40 overflow-hidden rounded-full border-4 border-neutral-100 dark:border-neutral-800 shadow-lg bg-neutral-200">
                <Image 
                  src="/image.jpg" 
                  alt="Achmet Chakseven" 
                  fill
                  priority
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  sizes="(max-width: 768px) 128px, 160px"
                />
            </div>
          </div>

          <div>
            <h1 className="text-4xl font-bold tracking-tighter mb-4">
              Achmet Chakseven
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Informatikstudent & Software-Entwickler aus Nürnberg.
            </p>
          </div>

          <div className="prose prose-neutral dark:prose-invert">
            <p>
              Ich verbinde akademische Tiefe mit praktischer Entwicklung. 
              Während mein Studium an der <strong>FAU</strong> mir das Fundament in Mathe und Algorithmen gibt, 
              baue ich in meiner Freizeit echte Lösungen.
            </p>
            <p>
              Mein Fokus: Data Science, Softwareentwicklung und moderne Web-Apps, die funktionieren.
            </p>
          </div>

          <div className="flex flex-col gap-3 border-l-2 border-neutral-200 dark:border-neutral-800 pl-4 mt-2">
            <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
                <GraduationCap className="w-4 h-4 mr-3" />
                <span>B.Sc. Informatik (FAU)</span>
            </div>
            <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
                <Briefcase className="w-4 h-4 mr-3" />
                <span>Werkstudent IT @ STAEDTLER</span>
            </div>
            <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
                <Cpu className="w-4 h-4 mr-3" />
                <span>Data Science, Front End & Software Engineering</span>
            </div>
          </div>
        </div>


        {/* --- RECHTE SPALTE (Featured Project & Blog) --- */}
        <div className="lg:col-span-7 flex flex-col gap-8">

          {/* Featured Project */}
          <div className="w-full">
            <div className="flex items-center gap-2 mb-3">
                <h2 className="text-lg font-bold text-neutral-900 dark:text-white">
                    Featured Project: Live KI Demo
                </h2>
            </div>
            
            {/* Etwas kompakteres Padding (p-5 statt p-6) */}
            <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 bg-neutral-50 dark:bg-neutral-900/50">
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 text-center max-w-md mx-auto leading-relaxed">
                        Dieses <strong>Convolutional Neural Network (CNN)</strong> läuft live in deinem Browser (TensorFlow.js).
                        Zeichne eine Ziffer, und das Modell analysiert die Pixelstruktur in Echtzeit.
                    </p>
                    <DigitRecognizer />
            </div>
          </div>

          {/* Blog Posts */}
          <div>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Blog & Updates</h2>
                <ArrowRight className="w-4 h-4 text-neutral-400" />
            </div>
            <BlogPosts />
          </div>

        </div>
      </div>


      {/* --- UNTERER BEREICH: SKILLS (Waagerecht & Kompakt) --- */}
      <div className="w-full">
        <h2 className="text-xl font-bold mb-4 tracking-tight">Technische Expertise</h2>
        
        {/* Grid: 3 Spalten Desktop, 1 Spalte Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Skill 1 - Padding reduziert (p-4) */}
            <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 hover:shadow-md transition-all">
              <div className="flex items-center mb-2 text-blue-600 dark:text-blue-400">
                <Database className="w-5 h-5 mr-2" />
                <h3 className="font-bold text-sm">Data Science</h3>
              </div>
              <p className="text-xs text-neutral-500 mb-3">
                Machine Learning, Deep Learning & Analytics.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2 py-0.5 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-700 rounded text-[10px] uppercase tracking-wider font-medium">PyTorch</span>
                <span className="px-2 py-0.5 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-700 rounded text-[10px] uppercase tracking-wider font-medium">Python</span>
                <span className="px-2 py-0.5 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-700 rounded text-[10px] uppercase tracking-wider font-medium">Pandas</span>
              </div>
            </div>

            {/* Skill 2 */}
            <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 hover:shadow-md transition-all">
              <div className="flex items-center mb-2 text-teal-600 dark:text-teal-400">
                <Code className="w-5 h-5 mr-2" />
                <h3 className="font-bold text-sm">Web Dev</h3>
              </div>
              <p className="text-xs text-neutral-500 mb-3">
                Interaktive Next.js Apps & Responsive Design.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2 py-0.5 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-700 rounded text-[10px] uppercase tracking-wider font-medium">React</span>
                <span className="px-2 py-0.5 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-700 rounded text-[10px] uppercase tracking-wider font-medium">Next.js</span>
              </div>
            </div>

            {/* Skill 3 */}
            <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 hover:shadow-md transition-all">
              <div className="flex items-center mb-2 text-purple-600 dark:text-purple-400">
                <Server className="w-5 h-5 mr-2" />
                <h3 className="font-bold text-sm">Software Engineering</h3>
              </div>
              <div className="flex flex-col justify-between h-full">
                <p className="text-xs text-neutral-500 mb-3">
                  Algorithmen, Systemarchitektur & Low-Level.
                </p>
                <div className="flex flex-wrap gap-1.5 mt-auto">
                   <span className="px-2 py-0.5 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-700 rounded text-[10px] uppercase tracking-wider font-medium">Java</span>
                   <span className="px-2 py-0.5 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-700 rounded text-[10px] uppercase tracking-wider font-medium">C</span>
                   <span className="px-2 py-0.5 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-700 rounded text-[10px] uppercase tracking-wider font-medium">Python</span>
                </div>
              </div>
            </div>

        </div>
      </div>

    </section>
  )
}