import React, { useEffect, useRef, createContext, useContext, useState, Suspense } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { Copy, Check, Maximize2, X, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { getConceptById, getConceptComponent } from '../concepts/index';

export const EquationContext = createContext({ isInsideBlock: false });

interface EquationProps {
    children?: string | string[];
    hidden?: boolean;
    className?: string;
    block?: boolean;
    conceptId?: string;
}

const Equation: React.FC<EquationProps> = ({ children, hidden = false, className = '', block = false, conceptId }) => {
    const containerRef = useRef<HTMLElement>(null);
    const { isInsideBlock } = useContext(EquationContext);
    const [copied, setCopied] = useState(false);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [isConceptOpen, setIsConceptOpen] = useState(false);
    const copyResetTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    const concept = conceptId ? getConceptById(conceptId) : null;
    const ConceptComponent = conceptId ? getConceptComponent(conceptId) : null;

    useEffect(() => {
        if (containerRef.current) {
            let latex: string;

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
                containerRef.current.textContent = latex;
            }
        }
    }, [children, block]);

    const getLatex = (): string => {
        if (Array.isArray(children)) return children.join('');
        if (typeof children === 'string') return children;
        return String(children || '');
    };

    const handleCopy = async (e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            await navigator.clipboard.writeText(getLatex());
            setCopied(true);
            if (copyResetTimeout.current) clearTimeout(copyResetTimeout.current);
            copyResetTimeout.current = setTimeout(() => setCopied(false), 1500);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    if (hidden) return null;

    const baseClassName = block
        ? 'w-full overflow-x-auto overflow-y-hidden py-2'
        : 'mx-1 inline-block align-middle';

    const renderContent = (isBlock: boolean) => (
        isBlock ? (
            <div
                ref={containerRef as React.RefObject<HTMLDivElement>}
                className={`${baseClassName} ${className}`}
                onClick={(e) => e.stopPropagation()}
            />
        ) : (
            <span
                ref={containerRef as React.RefObject<HTMLSpanElement>}
                className={`${baseClassName} ${className}`}
                onClick={(e) => e.stopPropagation()}
            />
        )
    );

    const conceptModal = concept && isConceptOpen && createPortal(
        <AnimatePresence mode="wait">
            <div
                className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/80 backdrop-blur-md p-4"
                onClick={(e) => {
                    e.stopPropagation();
                    console.log(`[v2] Closing concept [${conceptId}] via backdrop`);
                    setIsConceptOpen(false);
                }}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 30 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 30 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    className="relative w-full max-w-2xl bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden dark:bg-slate-900 border border-white/10"
                    onClick={e => e.stopPropagation()}
                >
                    <div className="flex justify-between items-center p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
                        <div className="flex items-center gap-4">
                            <div className="p-2.5 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-500/20">
                                <BookOpen size={22} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">{concept.name}</h2>
                                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-0.5">Core Concept Card</p>
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                console.log(`[v2] Closing concept [${conceptId}] via button`);
                                setIsConceptOpen(false);
                            }}
                            className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all dark:hover:bg-slate-800 active:scale-90"
                            type="button"
                            aria-label="Close"
                        >
                            <X size={24} />
                        </button>
                    </div>
                    <div className="p-8 max-h-[75vh] overflow-y-auto custom-scrollbar">
                        <Suspense fallback={
                            <div className="flex flex-col items-center justify-center p-20 gap-5">
                                <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent shadow-inner"></div>
                                <p className="text-slate-500 font-semibold text-lg animate-pulse">Initializing component...</p>
                            </div>
                        }>
                            {ConceptComponent && <ConceptComponent />}
                        </Suspense>
                    </div>
                    <div className="p-5 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
                        <button
                            onClick={() => setIsConceptOpen(false)}
                            className="px-6 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-all active:scale-95 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                            type="button"
                        >
                            Back to Article
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>,
        document.body
    );

    // Case 1: Standalone block equation (NOT inside EquationBlock)
    if (block && !isInsideBlock) {
        return (
            <div className="group relative my-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-xl hover:border-blue-200/50 dark:border-slate-700 dark:bg-slate-800/50">
                <div className="absolute right-4 top-4 flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100 z-10">
                    <button
                        onClick={handleCopy}
                        className={`inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/90 text-slate-500 shadow-sm backdrop-blur-md transition-all hover:bg-white hover:text-blue-600 dark:bg-slate-900/90 dark:text-slate-400 dark:hover:bg-slate-800 ${copied ? 'text-emerald-600 dark:text-emerald-500' : ''}`}
                        title={copied ? "Copied!" : "Copy LaTeX"}
                        type="button"
                    >
                        {copied ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                    <button
                        onClick={() => setIsLightboxOpen(true)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/90 text-slate-500 shadow-sm backdrop-blur-md transition-all hover:bg-white hover:text-blue-600 dark:bg-slate-900/90 dark:text-slate-400 dark:hover:bg-slate-800"
                        title="Focus Mode"
                        type="button"
                    >
                        <Maximize2 size={16} />
                    </button>
                </div>

                {concept && (
                    <div className="absolute left-4 top-4 z-20">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                console.log(`[v2] Opening concept [${conceptId}] from standalone block`);
                                setIsConceptOpen(true);
                            }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600 text-white shadow-lg shadow-blue-500/30 hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all cursor-pointer pointer-events-auto"
                            type="button"
                        >
                            <BookOpen size={14} />
                            <span className="text-[11px] font-black uppercase tracking-widest">{concept.name}</span>
                        </button>
                    </div>
                )}

                <div className="px-8 py-10">
                    {renderContent(true)}
                </div>

                {isLightboxOpen && createPortal(
                    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/80 backdrop-blur-md" onClick={() => setIsLightboxOpen(false)}>
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="relative flex w-[95%] max-w-4xl flex-col overflow-hidden rounded-3xl bg-white p-16 shadow-2xl dark:bg-slate-900"
                            onClick={e => e.stopPropagation()}
                        >
                            <button
                                className="absolute right-6 top-6 inline-flex h-12 w-12 items-center justify-center rounded-full text-slate-400 transition-all hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 active:scale-90"
                                onClick={() => setIsLightboxOpen(false)}
                                type="button"
                            >
                                <X size={32} />
                            </button>
                            <div className="flex items-center justify-center overflow-x-auto text-3xl py-10">
                                <Equation block>{getLatex()}</Equation>
                            </div>
                        </motion.div>
                    </div>,
                    document.body
                )}
                {conceptModal}
            </div>
        );
    }

    // Case 2: Equation (block or inline) with metadata, likely inside a list or derivation
    if (concept) {
        if (block) {
            return (
                <div className="relative w-full group/concept flex items-center justify-center py-4">
                    <div className="w-full">
                        {renderContent(true)}
                    </div>
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center z-50">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                console.log(`[v2] Opening concept [${conceptId}] from block content`);
                                setIsConceptOpen(true);
                            }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-blue-600 border border-blue-100 shadow-xl hover:bg-blue-50 hover:scale-110 active:scale-95 transition-all dark:bg-slate-800 dark:text-blue-400 dark:border-blue-900/50 cursor-pointer pointer-events-auto"
                            type="button"
                        >
                            <BookOpen size={16} />
                            <span className="text-[11px] font-black uppercase tracking-widest">{concept.name}</span>
                        </button>
                    </div>
                    {conceptModal}
                </div>
            );
        }

        return (
            <span className="inline-flex items-center gap-3 group/concept relative z-10 px-1 py-0.5 rounded-lg hover:bg-blue-50/50 transition-colors dark:hover:bg-blue-900/10">
                {renderContent(false)}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        console.log(`[v2] Opening concept [${conceptId}] from inline content`);
                        setIsConceptOpen(true);
                    }}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-blue-600 text-white shadow-md hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all z-50 cursor-pointer pointer-events-auto"
                    type="button"
                >
                    <BookOpen size={12} />
                    {concept.name}
                </button>
                {conceptModal}
            </span>
        );
    }

    return renderContent(block);
};

export default Equation;