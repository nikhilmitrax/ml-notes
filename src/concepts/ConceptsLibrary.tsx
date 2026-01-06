import React, { useState, Suspense } from 'react';
import { createPortal } from 'react-dom';
import { X, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Article from '../components/Article';

import { CONCEPTS_LIST, getConceptComponent, ConceptMetadata } from './index';

export default function ConceptsPage() {
    const [selectedConcept, setSelectedConcept] = useState<ConceptMetadata | null>(null);

    const handleSelect = (concept: ConceptMetadata) => {
        console.log('Selecting concept:', concept.name);
        setSelectedConcept(concept);
    };

    const closeLightbox = () => {
        console.log('Closing lightbox');
        setSelectedConcept(null);
    };

    // Get the lazy component for the selected concept
    const SelectedComponent = selectedConcept ? getConceptComponent(selectedConcept.id) : null;

    return (
        <Article
            title="Concepts Library"
            description="A collection of foundational machine learning concepts, equations, and derivations that can be cited across articles."
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {CONCEPTS_LIST.map((concept) => (
                    <motion.div
                        key={concept.id}
                        whileHover={{ y: -4 }}
                        className="group relative flex flex-col p-6 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer"
                        onClick={() => handleSelect(concept)}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                                {concept.name}
                            </h3>
                            <div className="p-2 text-slate-400 group-hover:text-blue-500 transition-colors">
                                <Maximize2 size={18} />
                            </div>
                        </div>
                        <p className="text-sm text-slate-600 line-clamp-2">
                            {concept.description}
                        </p>
                    </motion.div>
                ))}
            </div>

            {selectedConcept && createPortal(
                <AnimatePresence>
                    <div
                        className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4"
                        onClick={closeLightbox}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden dark:bg-slate-900"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center p-6 border-b border-slate-100 dark:border-slate-800">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedConcept.name}</h2>
                                <button
                                    onClick={closeLightbox}
                                    className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors dark:hover:bg-slate-800"
                                >
                                    <X size={24} />
                                </button>
                            </div>
                            <div className="p-8 max-h-[70vh] overflow-y-auto">
                                <Suspense fallback={
                                    <div className="flex flex-col items-center justify-center p-12 gap-4">
                                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
                                        <p className="text-slate-500 font-medium">Loading concept details...</p>
                                    </div>
                                }>
                                    {SelectedComponent && <SelectedComponent />}
                                </Suspense>
                            </div>
                            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                                <button
                                    onClick={closeLightbox}
                                    className="px-4 py-2 bg-white text-slate-700 font-semibold rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-700"
                                >
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </AnimatePresence>,
                document.body
            )}
        </Article>
    );
}


