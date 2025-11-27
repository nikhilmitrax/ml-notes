import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeBlock = ({ code, language = "python" }) => (
    <div className="relative rounded-lg overflow-hidden my-4 shadow-lg border border-gray-700 dark:border-gray-800">
        <div className="absolute top-2 right-2 text-[10px] text-gray-400 uppercase font-bold select-none z-10 bg-gray-900/50 px-2 py-1 rounded">
            {language}
        </div>
        <SyntaxHighlighter
            language={language}
            style={vscDarkPlus}
            customStyle={{
                margin: 0,
                padding: '1.5rem',
                fontSize: '0.875rem',
                lineHeight: '1.5',
                backgroundColor: '#1e1e1e', // Match vscDarkPlus bg
            }}
            wrapLongLines={true}
        >
            {code}
        </SyntaxHighlighter>
    </div>
);

export default CodeBlock;
