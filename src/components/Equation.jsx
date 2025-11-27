import React, { useEffect, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

const Equation = ({ children, hidden = false, className = '', block = false }) => {
    const containerRef = useRef(null);
    const Container = block ? 'div' : 'span';

    useEffect(() => {
        if (containerRef.current) {
            let latex = children;

            // Handle non-string children (e.g., numbers, arrays of strings)
            if (Array.isArray(children)) {
                latex = children.join('');
            } else if (typeof children !== 'string' && children !== undefined && children !== null) {
                latex = String(children);
            }

            // Ensure we have a string
            if (typeof latex !== 'string') {
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

    return (
        <Container
            ref={containerRef}
            className={combinedClassName}
            onClick={(e) => e.stopPropagation()} // Prevent clicks from bubbling if needed
        />
    );
};

export default Equation;