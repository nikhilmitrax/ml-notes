import React from 'react';
import ArticleHeader from './ArticleHeader';

export default function Article({ title, description, children }) {
    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <ArticleHeader
                title={title}
                description={description}
            />
            {children}
        </div>
    );
}
