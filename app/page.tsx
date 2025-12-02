import { BlogPosts } from 'app/components/posts'
import { Database, Code, Server, GraduationCap, Briefcase, Cpu, ArrowRight } from 'lucide-react'
import Image from 'next/image'

export default function Page() {
  return (
    <section className="w-full">
      
      {/* --- GRID LAYOUT (Split Screen) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

        {/* --- LINKE SPALTE (Bild, Intro & Timeline) --- */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          
          {/* --- PROFILBILD BEREICH --- */}
          <div className="flex justify-start">
            <div className="relative w-32 h-32 md:w-40 md:h-40 overflow-hidden rounded-full border-4 border-neutral-100 dark:border-neutral-800 shadow-lg bg-neutral-200">
                {/* KORRIGIERT: Nutzung von next/image für automatische Optimierung.
                   Das Bild 'image.png' muss im Ordner 'public/achmetchakseven/public' liegen 
                   oder (besser) direkt im Root 'public' Ordner. 
                   Hier gehe ich davon aus, dass es unter /image.png erreichbar ist.
                */}
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

          {/* Timeline / Quick Facts */}
          <div className="flex flex-col gap-4 border-l-2 border-neutral-200 dark:border-neutral-800 pl-4 mt-4">
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
                <span>Data Science, Front End Development & Software Engineering</span>
            </div>
          </div>
        </div>


        {/* --- RECHTE SPALTE (Skills & Content) --- */}
        <div className="lg:col-span-7 flex flex-col gap-10">

          {/* Skill Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Card 1: Data Science */}
            <div className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 hover:shadow-md transition-all">
              <div className="flex items-center mb-3 text-blue-600 dark:text-blue-400">
                <Database className="w-5 h-5 mr-2" />
                <h3 className="font-bold">Data Science</h3>
              </div>
              <p className="text-xs text-neutral-500 mb-3">
                Fokus auf Machine Learning, Deep Learning und explorative Datenanalyse.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2 py-0.5 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-700 rounded text-xs">PyTorch</span>
                <span className="px-2 py-0.5 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-700 rounded text-xs">Python</span>
                <span className="px-2 py-0.5 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-700 rounded text-xs">Pandas</span>
              </div>
            </div>

            {/* Card 2: Web Dev */}
            <div className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 hover:shadow-md transition-all">
              <div className="flex items-center mb-3 text-teal-600 dark:text-teal-400">
                <Code className="w-5 h-5 mr-2" />
                <h3 className="font-bold">Web Dev</h3>
              </div>
              <p className="text-xs text-neutral-500 mb-3">
                Interaktive Next.js Apps & Responsive Design.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2 py-0.5 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-700 rounded text-xs">React</span>
                <span className="px-2 py-0.5 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-700 rounded text-xs">Next.js</span>
              </div>
            </div>

            {/* Card 3: Engineering */}
            <div className="sm:col-span-2 p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 hover:shadow-md transition-all">
              <div className="flex items-center mb-3 text-purple-600 dark:text-purple-400">
                <Server className="w-5 h-5 mr-2" />
                <h3 className="font-bold">Software Engineering</h3>
              </div>
              <div className="flex justify-between items-end">
                <p className="text-xs text-neutral-500 max-w-[70%]">
                  Java, Python, C und Low Coding.
                </p>
                <div className="flex gap-1.5">
                   <span className="px-2 py-0.5 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-700 rounded text-xs">Java</span>
                   <span className="px-2 py-0.5 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-700 rounded text-xs">C</span>
                   <span className="px-2 py-0.5 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-700 rounded text-xs">Python</span>
                </div>
              </div>
            </div>
          </div>

          {/* PROJEKTE & BLOG BEREICH */}
          <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Projekte & Beiträge</h2>
                <ArrowRight className="w-4 h-4 text-neutral-400" />
            </div>
            
            <div className="mb-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800/50 text-center">
                <p className="text-blue-800 dark:text-blue-200 text-sm font-medium">
                    🚀 Hier erscheint bald meine erste interaktive Data-Science App.
                </p>
            </div>

            <BlogPosts />
          </div>

        </div>
      </div>
    </section>
  )
}