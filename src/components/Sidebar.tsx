import React from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, Layers, FileText, LucideIcon } from 'lucide-react';
import type { Article } from '../types';

interface SectionConfig {
  key: string;
  label: string;
  icon: LucideIcon;
}

const SECTIONS: SectionConfig[] = [
  { key: 'coalesced', label: 'Coalesced', icon: Layers },
  { key: 'papers', label: 'Papers', icon: FileText },
];

interface SidebarProps {
  articles: Article[];
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ articles, isOpen, onClose }) => {
  const renderArticleLink = (article: Article) => (
    <NavLink
      key={article.path}
      to={article.path}
      onClick={() => onClose?.()}
      className={({ isActive }) =>
        `block px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${isActive
          ? 'bg-blue-50 text-blue-700'
          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
        }`
      }
    >
      {article.name}
    </NavLink>
  );

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-slate-50 border-r border-slate-200 
        flex flex-col transition-transform duration-300 ease-in-out
        md:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      <div className="p-6 border-b border-slate-200 flex justify-between items-center">
        <div className="flex items-center gap-2 text-slate-800 font-bold text-xl">
          <BookOpen className="w-6 h-6 text-blue-600" />
          <span>Notes</span>
        </div>
        {/* Close button for mobile */}
        <button
          onClick={onClose}
          className="md:hidden p-2 -mr-2 text-slate-500 hover:bg-slate-100 rounded-lg"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <nav className="flex-1 p-4 overflow-y-auto">
        {SECTIONS.map(({ key, label, icon: Icon }) => {
          const sectionArticles = articles.filter(a => a.section === key);
          if (sectionArticles.length === 0) return null;

          return (
            <div key={key} className="mb-4">
              <div className="flex items-center gap-2 px-2 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </div>
              <div className="space-y-1">
                {sectionArticles.map(renderArticleLink)}
              </div>
            </div>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
