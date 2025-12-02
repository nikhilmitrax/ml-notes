import React, { useState, Children, cloneElement, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Maximize2, ChevronDown, ChevronUp, X, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Equation from './Equation';

const EquationBlock = ({ children }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const copyResetTimeout = useRef(null);

    const childrenArray = Children.toArray(children);
    const iconButtonClasses = 'inline-flex h-9 w-9 items-center justify-center rounded-md text-slate-500 transition hover:bg-slate-100 hover:text-slate-700';

    // Check if there are any hidden equations to determine if we need the toggle button
    const hasHiddenEquations = childrenArray.some(child => React.isValidElement(child) && child.props.hidden);

    const toggleExpand = () => setIsExpanded(!isExpanded);
    const openLightbox = () => setIsLightboxOpen(true);
    const closeLightbox = () => setIsLightboxOpen(false);

    useEffect(() => {
        return () => {
            if (copyResetTimeout.current) {
                clearTimeout(copyResetTimeout.current);
            }
        };
    }, []);

    const getEquationText = (child) => {
        const content = child.props.children;

        if (typeof content === 'string') {
            return content;
        }

        return Children.toArray(content).join('');
    };

    const handleCopyVisibleEquations = async () => {
        const visibleEquations = childrenArray.filter(child => isExpanded || (React.isValidElement(child) && !child.props.hidden));

        if (!visibleEquations.length) return;

        const latexText = visibleEquations
            .map(getEquationText)
            .join('\n\n');

        try {
            await navigator.clipboard.writeText(latexText);
            setCopied(true);
            if (copyResetTimeout.current) {
                clearTimeout(copyResetTimeout.current);
            }
            copyResetTimeout.current = setTimeout(() => setCopied(false), 1500);
        } catch (err) {
            // Silently fail if clipboard access is unavailable
        }
    };

    return (
        <div className="relative my-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="absolute right-3 top-3 flex items-center gap-1.5">
                {hasHiddenEquations && (
                    <button
                        onClick={toggleExpand}
                        className={iconButtonClasses}
                        title={isExpanded ? "Hide Derivation" : "Show Derivation"}
                    >
                        {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>
                )}
                <button
                    onClick={handleCopyVisibleEquations}
                    className={`${iconButtonClasses} ${copied ? 'text-emerald-600' : ''}`}
                    title={copied ? "Copied!" : "Copy Visible Equations"}
                    aria-label="Copy visible equations"
                >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                </button>
                <button
                    onClick={openLightbox}
                    className={iconButtonClasses}
                    title="Expand to Full Screen"
                >
                    <Maximize2 size={16} />
                </button>
            </div>

            <div className="space-y-4 px-6 pb-4 pt-4">
                <AnimatePresence initial={false}>
                    {childrenArray.map((child, index) => {
                        // Skip non-element children (like whitespace strings) to avoid cloneElement errors
                        if (!React.isValidElement(child)) return null;

                        const isHidden = child.props.hidden;
                        const shouldShow = isExpanded || !isHidden;

                        if (!shouldShow) return null;

                        return (
                            <motion.div
                                key={index}
                                initial={isHidden ? { height: 0, opacity: 0 } : false}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={isHidden ? { height: 0, opacity: 0 } : undefined}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="overflow-hidden"
                            >
                                {cloneElement(child, { hidden: false, block: true })}
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            {isLightboxOpen && createPortal(
                <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-900/70 backdrop-blur-sm" onClick={closeLightbox}>
                    <div className="relative flex w-11/12 max-w-3xl max-h-[90vh] flex-col overflow-hidden rounded-xl bg-white p-8 shadow-2xl" onClick={e => e.stopPropagation()}>
                        <button
                            className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                            onClick={closeLightbox}
                        >
                            <X size={24} />
                        </button>
                        <div className="flex-1 space-y-4 overflow-y-auto pr-2">
                            {childrenArray.map((child, index) => (
                                cloneElement(child, { key: index, hidden: false, block: true })
                            ))}
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
};

export default EquationBlock;