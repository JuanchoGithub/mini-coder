
import React from 'react';
import { Link } from 'react-router-dom';
import { lessons } from '../data/lessons';
import { Rocket, Code2, BookOpen, Star, Box, ChevronRight, Play } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="bg-primary text-white py-12 md:py-20 px-4 sm:px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            {/* Decorative background pattern */}
            <Code2 size={400} className="absolute -top-20 -left-20 rotate-12"/>
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-2xl mb-6 backdrop-blur-sm border border-white/20">
                <Rocket size={32} className="text-accent mr-3" />
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">MiniCoder</h1>
            </div>
            <p className="text-indigo-100 text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed mb-8">
            ¡Aprende a programar jugando! Un curso paso a paso diseñado para mentes curiosas.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a href="#lessons" className="px-8 py-3 bg-accent text-amber-900 font-bold rounded-xl shadow-lg hover:shadow-xl hover:bg-amber-400 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2">
                   <Rocket size={20}/> Empezar Curso
                </a>
                <Link to="/sandbox" className="px-8 py-3 bg-white text-primary font-bold rounded-xl shadow-lg hover:shadow-xl hover:bg-indigo-50 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2">
                    <Box size={20}/> Sandbox (Crear)
                </Link>
            </div>
            <div className="mt-6 flex justify-center">
                <Link to="/manual" className="px-6 py-2 bg-white/10 text-indigo-100 font-semibold rounded-lg hover:bg-white/20 backdrop-blur-sm transition-all flex items-center gap-2 text-sm">
                    <BookOpen size={16}/> Manual de Referencia
                </Link>
            </div>
        </div>
      </div>

      {/* Lesson Grid */}
      <main id="lessons" className="max-w-5xl mx-auto py-12 md:py-16 px-4 sm:px-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-3">
            <BookOpen className="text-primary"/> Tu camino de aprendizaje
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {lessons.map((lesson) => {
            const hasProgress = document.cookie.split('; ').some((item) => item.trim().startsWith(`lessonProgress_${lesson.id}=`));
            
            return (
              <Link to={`/lesson/${lesson.id}`} key={lesson.id} className="group">
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 h-full flex flex-col transform hover:-translate-y-1">
                  <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-indigo-100 text-primary rounded-xl flex items-center justify-center font-bold text-xl group-hover:bg-primary group-hover:text-white transition-colors">
                      {lesson.id}
                      </div>
                      {hasProgress ? (
                        <div className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                          <Play size={12} className="-ml-1"/> Continuar
                        </div>
                      ) : (
                        lesson.id <= 5 && <Star size={20} className="text-accent fill-accent" />
                      )}
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-primary transition-colors">{lesson.title}</h3>
                  <p className="text-slate-600 leading-relaxed flex-1">{lesson.description}</p>
                  <div className="mt-6 text-primary font-semibold flex items-center gap-1 text-sm group-hover:underline">
                      Empezar lección <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </main>
        
        <footer className="text-center py-8 text-slate-500 text-sm border-t border-slate-200">
            Hecho con 💜 para futuros programadores.
        </footer>
    </div>
  );
};

export default Home;
