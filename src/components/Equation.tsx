import React, { useEffect, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface EquationProps {
    children?: string | string[];
    hidden?: boolean;
    className?: string;
    block?: boolean;
}

const Equation: React.FC<EquationProps> = ({ children, hidden = false, className = '', block = false }) => {
    const containerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            let latex: string;

            // Handle non-string children (e.g., numbers, arrays of strings)
            if (Array.isArray(children)) {
                latex = children.join('');
            } else if (typeof children === 'string') {
                latex = children;
            } else if (children !== undefined && children !== null) {
                latex = String(children);
            } else {
                latex = '';
            }

            try {
                katex.render(latex, containerRef.current, {
                    throwOnError: false,
                    displayMode: block,
                });
            } catch (error) {
                console.error("KaTeX rendering error:", error);
                // Fallback to displaying text content if rendering fails
                containerRef.current.textContent = latex;
            }
        }
    }, [children, block]);

    if (hidden) return null;

    const baseClassName = block
        ? 'my-3 max-w-full overflow-x-auto overflow-y-hidden animate-fade-in'
        : 'mx-1 inline-block align-middle';

    const combinedClassName = [
        baseClassName,
        className,
    ].filter(Boolean).join(' ');

    if (block) {
        return (
            <div
                ref={containerRef as React.RefObject<HTMLDivElement>}
                className={combinedClassName}
                onClick={(e) => e.stopPropagation()}
            />
        );
    }

    return (
        <span
            ref={containerRef as React.RefObject<HTMLSpanElement>}
            className={combinedClassName}
            onClick={(e) => e.stopPropagation()}
        />
    );
};

export default Equation;