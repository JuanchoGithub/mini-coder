

import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Home, BookOpen, Search, Hash } from 'lucide-react';
import { manualData, ManualEntry } from '../data/manual';
import CodePlayground from '../components/CodePlayground';
import ReactMarkdown from 'react-markdown';

const Manual = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentId = searchParams.get('topic') || manualData[0].id;
  const [searchTerm, setSearchTerm] = useState('');

  const currentEntry = manualData.find(e => e.id === currentId) || manualData[0];

  const filteredData = useMemo(() => {
      if (!searchTerm) return manualData;
      return manualData.filter(e => 
          e.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
          e.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [searchTerm]);

  const categories = useMemo(() => {
      const cats: Record<string, ManualEntry[]> = {};
      filteredData.forEach(entry => {
          if (!cats[entry.category]) cats[entry.category] = [];
          cats[entry.category].push(entry);
      });
      return cats;
  }, [filteredData]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 md:flex-row">
        {/* Mobile Header */}
        <header className="bg-white border-b border-slate-200 p-4 flex items-center justify-between md:hidden sticky top-0 z-20">
             <div className="flex items-center gap-2 font-bold text-slate-800">
                 <BookOpen className="text-primary" size={24} /> Manual MiniCode
             </div>
             <Link to="/" className="p-2 text-slate-500 hover:bg-slate-100 rounded-full"><Home size={24} /></Link>
        </header>

      {/* Sidebar Navigation */}
      <aside className="bg-white border-r border-slate-200 w-full md:w-64 md:h-screen md:sticky md:top-0 flex flex-col">
        <div className="p-4 border-b border-slate-100 hidden md:flex items-center justify-between">
             <div className="flex items-center gap-2 font-bold text-slate-800 text-lg">
                 <BookOpen className="text-primary" /> Manual
             </div>
             <Link to="/" className="p-1.5 text-slate-400 hover:text-primary hover:bg-indigo-50 rounded-lg transition-colors" title="Volver al Inicio"><Home size={20} /></Link>
        </div>
        
        <div className="p-4">
            <div className="relative text-slate-400 focus-within:text-primary">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Search size={16} />
                </span>
                <input 
                    type="text"
                    className="w-full py-2 pl-10 pr-4 text-sm bg-slate-100 border-transparent rounded-lg focus:bg-white focus:border-primary focus:ring-0 transition-colors"
                    placeholder="Buscar comando..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 pt-0">
            {/* FIX: Use Object.keys to avoid a type inference issue with Object.entries that caused the `entries` array to be typed as `unknown`. */}
            {Object.keys(categories).map((category) => (
                <div key={category} className="mb-6">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{category}</h3>
                    <ul className="space-y-1">
                        {categories[category].map(entry => (
                            <li key={entry.id}>
                                <button
                                    onClick={() => setSearchParams({ topic: entry.id })}
                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${currentId === entry.id ? 'bg-primary text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}`}
                                >
                                    {entry.title}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
            {filteredData.length === 0 && (
                <div className="text-center text-slate-400 text-sm py-8">
                    No se encontraron resultados
                </div>
            )}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 lg:p-12 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
            <div className="mb-8 animate-fadeIn">
                <div className="flex items-center gap-2 mb-2 text-primary text-sm font-bold uppercase tracking-wider">
                    <Hash size={14} /> {currentEntry.category}
                </div>
                <h1 className="text-4xl font-extrabold text-slate-900 mb-6">{currentEntry.title}</h1>
                <div className="prose prose-slate max-w-none prose-lg prose-headings:text-slate-800 prose-code:text-pink-600 prose-code:bg-pink-50 prose-code:px-1 prose-code:rounded">
                    <ReactMarkdown>{currentEntry.description}</ReactMarkdown>
                </div>
            </div>

            {currentEntry.syntax && (
                <div className="mb-8 bg-slate-100 p-4 rounded-xl border border-slate-200 font-mono text-sm text-slate-700 animate-fadeIn">
                    <div className="text-xs font-bold text-slate-400 uppercase mb-2">Sintaxis</div>
                    <pre className="whitespace-pre-wrap">{currentEntry.syntax}</pre>
                </div>
            )}

            <div className="animate-fadeIn animation-delay-200">
                <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                   Ejemplo Interactivo 
                   <span className="text-xs font-normal text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">¡Pruébalo tú mismo!</span>
                </h2>
                <CodePlayground initialCode={currentEntry.example} />
            </div>
        </div>
      </main>
    </div>
  );
};

export default Manual;