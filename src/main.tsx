import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import '../styles.css';
import type { Article, ArticleModule } from './types';

// Dynamic import of articles
// We use eager: true to have the components ready. 
// For a larger app, you might switch to lazy loading with React.Suspense.
const articleModules = import.meta.glob<ArticleModule>('./articles/*/index.tsx', { eager: true });

const articles: Article[] = Object.entries(articleModules)
  .map(([path, module]) => {
    // Extract folder name: ./articles/PositionalEncoding/index.tsx -> PositionalEncoding
    const parts = path.split('/');
    const folderName = parts[parts.length - 2];

    // Use custom name if provided, otherwise add space before capital letters
    const name = module.name || folderName.replace(/([A-Z])/g, ' $1').trim();
    const routePath = folderName.toLowerCase();

    return {
      path: routePath,
      name: name,
      component: module.default,
      unfinished: module.unfinished || false,
      section: module.section || 'coalesced'
    };
  })
  .filter(article => {
    // Show all articles in DEV mode
    if (import.meta.env.DEV) return true;
    // In production, hide unfinished articles
    return !article.unfinished;
  });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout articles={articles} />}>
          <Route index element={<Navigate to={articles[0]?.path || ''} replace />} />
          {articles.map((article) => (
            <Route
              key={article.path}
              path={article.path}
              element={<article.component />}
            />
          ))}
        </Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>
);