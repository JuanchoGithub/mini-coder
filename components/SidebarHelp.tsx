
import React from 'react';
import { manualData } from '../data/manual';
import { BookOpen, HelpCircle, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SidebarHelpProps {
  currentWord: string;
}

const SidebarHelp: React.FC<SidebarHelpProps> = ({ currentWord }) => {
  const normalizedWord = currentWord.toUpperCase();
  
  // Find help in manual data.
  // Search by exact title match first, then try to find it in the syntax or ID.
  const helpEntry = manualData.find(e => {
      const titleParts = e.title.toUpperCase().split(/[ /]/); // Split "IF ... THEN" or "DO WHILE"
      return titleParts.includes(normalizedWord) || e.id.toUpperCase() === normalizedWord;
  });

  // Fallback for keywords not explicitly main manual entries but related
  const secondaryMap: Record<string, string> = {
      'THEN': 'if', 'ELSE': 'else', 'ELSEIF': 'else', 'END': 'if', // rough mapping
      'TO': 'for', 'STEP': 'for', 'NEXT': 'for',
      'WHILE': 'do', 'LOOP': 'do', 'UNTIL': 'do'
  };

  const finalEntry = helpEntry || (secondaryMap[normalizedWord] ? manualData.find(e => e.id === secondaryMap[normalizedWord]) : null);

  return (
    <div className="h-full bg-[#e8e8e8] border-l border-slate-300 p-4 flex flex-col font-mono">
      <div className="flex items-center gap-2 mb-4 text-blue-800 font-bold uppercase tracking-wider text-sm border-b border-blue-800 pb-2">
        <BookOpen size={18} />
        <span>Ayuda Rápida</span>
      </div>
      
      {finalEntry ? (
        <div className="bg-white p-4 rounded-sm border-2 border-blue-800 shadow-[4px_4px_0px_0px_rgba(30,64,175,0.3)] animate-fadeIn flex flex-col gap-3">
          <h3 className="text-lg font-bold text-blue-700 leading-none">{finalEntry.title}</h3>
          <div className="text-slate-600 text-xs font-bold uppercase tracking-wider">{finalEntry.category}</div>
          <p className="text-slate-800 text-sm leading-relaxed line-clamp-6">{finalEntry.description.replace(/\*\*/g, '')}</p>
          
          {finalEntry.syntax && (
              <div className="bg-slate-100 p-2 rounded border border-slate-200 text-xs font-mono whitespace-pre-wrap text-slate-700">
                  {finalEntry.syntax}
              </div>
          )}

          <Link to={`/manual?topic=${finalEntry.id}`} target="_blank" className="mt-2 text-xs font-bold text-primary flex items-center gap-1 hover:underline self-start">
              Ver en Manual <ExternalLink size={12}/>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-40 text-slate-500 text-center p-4 border-2 border-dashed border-slate-400 rounded-sm">
          <HelpCircle size={32} className="mb-2 opacity-50" />
          <p className="text-xs">Coloca el cursor sobre una palabra clave (como <span className="text-blue-700 font-bold">PRINT</span>) para ver ayuda.</p>
        </div>
      )}

      <div className="mt-auto pt-4">
         <Link to="/manual" target="_blank" className="block w-full text-center py-2 px-4 bg-white border-2 border-slate-400 text-slate-600 font-bold text-xs rounded-sm hover:bg-slate-100 hover:border-slate-500 transition-colors">
             ABRIR MANUAL COMPLETO
         </Link>
      </div>
    </div>
  );
};

export default SidebarHelp;
