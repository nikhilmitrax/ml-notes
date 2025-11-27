import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import '../styles.css';

// Dynamic import of articles
// We use eager: true to have the components ready. 
// For a larger app, you might switch to lazy loading with React.Suspense.
const articleModules = import.meta.glob('./articles/*/index.jsx', { eager: true });

const articles = Object.entries(articleModules)
  .map(([path, module]) => {
    // Extract folder name: ./articles/PositionalEncoding/index.jsx -> PositionalEncoding
    const parts = path.split('/');
    const folderName = parts[parts.length - 2];

    // Simple regex to add space before capital letters
    const name = folderName.replace(/([A-Z])/g, ' $1').trim();
    const routePath = folderName.toLowerCase();

    return {
      path: routePath,
      name: name,
      component: module.default,
      unfinished: module.unfinished || false
    };
  })
  .filter(article => {
    // Show all articles in DEV mode
    if (import.meta.env.DEV) return true;
    // In production, hide unfinished articles
    return !article.unfinished;
  });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
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
    </BrowserRouter>
  </React.StrictMode>
);