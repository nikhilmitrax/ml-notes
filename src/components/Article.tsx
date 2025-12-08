import React, { ReactNode } from 'react';
import ArticleHeader from './ArticleHeader';

interface ArticleProps {
    title: string;
    description: string;
    children?: ReactNode;
}

export default function Article({ title, description, children }: ArticleProps) {
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
