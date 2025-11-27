import React from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

const Sidebar = ({ articles }) => {
  return (
    <aside className="w-64 h-screen bg-slate-50 border-r border-slate-200 flex flex-col fixed top-0 left-0 overflow-y-auto z-50">
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center gap-2 text-slate-800 font-bold text-xl">
          <BookOpen className="w-6 h-6 text-blue-600" />
          <span>Notes</span>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {articles.map((article) => (
          <NavLink
            key={article.path}
            to={article.path}
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                isActive
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`
            }
          >
            {article.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
