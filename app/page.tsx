import { BlogPosts } from 'app/components/posts'
import { Database, Code, Server, GraduationCap, Briefcase, Cpu, ArrowRight } from 'lucide-react'

export default function Page() {
  return (
    <section className="w-full">
      
      {/* --- GRID LAYOUT (Split Screen) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

        {/* --- LINKE SPALTE (Bild, Intro & Timeline) --- */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          
          {/* --- PROFILBILD BEREICH --- */}
          {/* Flex-Start richtet es am PC links aus, 'lg:justify-start' */}
          <div className="flex justify-start">
            <div className="relative w-32 h-32 md:w-40 md:h-40 overflow-hidden rounded-full border-4 border-neutral-100 dark:border-neutral-800 shadow-lg bg-neutral-200">
                {/* HIER DEIN BILD EINFÜGEN:
                   1. Lege dein Bild in den Ordner 'public' (z.B. me.jpg)
                   2. Ändere src="/placeholder-avatar.jpg" zu src="/me.jpg"
                */}
                <img 
                  src="data:image/jpeg;base64,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" 
                  alt="Achmet Chakseven" 
                  className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
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
              {/* HIER IST DER GEÄNDERTE TEXT: */}
              <p className="text-xs text-neutral-500 mb-3">
                Fokus auf Machine Learning, Deep Learning und explorative Datenanalyse.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2 py-0.5 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-700 rounded text-xs">Tensorflow</span>
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
                   <span className="px-2 py-0.5 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-700 rounded text-xs">C++</span>
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