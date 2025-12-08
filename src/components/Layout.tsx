import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import type { Article } from '../types';

interface LayoutProps {
  articles: Article[];
}

const Layout: React.FC<LayoutProps> = ({ articles }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-40 flex items-center px-4">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <span className="ml-2 font-bold text-lg text-slate-800">Notes</span>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Sidebar
        articles={articles}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className={`min-h-screen relative pt-16 md:pt-0 transition-all duration-300 ${'md:ml-64'
        }`}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
