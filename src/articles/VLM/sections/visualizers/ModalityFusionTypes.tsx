import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Image as ImageIcon, Type, ArrowRight, GitMerge } from 'lucide-react';
import Header4 from '../../../../components/Header4';

const FusionType = ({ type, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400'
            }`}
    >
        {type}
    </button>
);

const Block = ({ label, icon: Icon, color = "bg-white dark:bg-gray-800", textColor = "text-gray-800 dark:text-gray-200" }) => (
    <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className={`${color} border border-gray-200 dark:border-gray-700 p-3 rounded-lg shadow-sm flex flex-col items-center justify-center min-w-[80px] z-10`}
    >
        {Icon && <Icon className="w-5 h-5 mb-1 text-blue-500" />}
        <span className={`text-xs font-medium ${textColor}`}>{label}</span>
    </motion.div>
);

const Arrow = () => (
    <div className="flex items-center justify-center text-gray-400">
        <ArrowRight className="w-4 h-4" />
    </div>
);

const descriptions = {
    Early: (
        <>
            <strong className="block mb-2 text-blue-600 dark:text-blue-400">Early Fusion</strong>
            In this approach, visual and textual inputs are combined at an <em>early stage</em>, often before any deep processing.
            <ul className="list-disc list-inside mt-2 text-left pl-4">
                <li>Concatenates low-level features or shallow embeddings</li>
                <li>Embeds both into a shared space immediately</li>
            </ul>
        </>
    ),
    Intermediate: (
        <>
            <strong className="block mb-2 text-purple-600 dark:text-purple-400">Intermediate Fusion</strong>
            Fusion occurs after some <strong>independent processing</strong> of each modality. It allows each stream to develop an intermediate understanding before integration.
        </>
    ),
    Late: (
        <>
            <strong className="block mb-2 text-green-600 dark:text-green-400">Late Fusion</strong>
            Both modalities are processed independently through deep layers, and fusion occurs <strong>near the output</strong>.
        </>
    )
};

export default function ModalityFusionTypes() {
    const [activeType, setActiveType] = useState('Early');

    return (
        <div className="my-8 p-6 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
            <Header4 className="flex items-center gap-2 text-gray-800 dark:text-white">
                <GitMerge className="w-5 h-5" />
                Fusion Architectures
            </Header4>

            <div className="flex gap-2 mb-8 justify-center">
                {['Early', 'Intermediate', 'Late'].map((type) => (
                    <FusionType
                        key={type}
                        type={type}
                        isActive={activeType === type}
                        onClick={() => setActiveType(type)}
                    />
                ))}
            </div>

            <div className="h-48 flex items-center justify-center relative overflow-hidden">
                <AnimatePresence mode="wait">
                    {activeType === 'Early' && (
                        <motion.div
                            key="early"
                            className="flex items-center gap-4"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <div className="flex flex-col gap-4">
                                <Block label="Image" icon={ImageIcon} />
                                <Block label="Text" icon={Type} />
                            </div>
                            <Arrow />
                            <Block label="Joint Encoder" icon={Layers} color="bg-blue-50 dark:bg-blue-900/20" />
                            <Arrow />
                            <Block label="Output" />
                        </motion.div>
                    )}

                    {activeType === 'Intermediate' && (
                        <motion.div
                            key="intermediate"
                            className="flex items-center gap-2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <div className="flex flex-col gap-8">
                                <div className="flex items-center gap-2">
                                    <Block label="Image" icon={ImageIcon} />
                                    <Arrow />
                                    <Block label="Encoder A" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <Block label="Text" icon={Type} />
                                    <Arrow />
                                    <Block label="Encoder B" />
                                </div>
                            </div>
                            <div className="flex flex-col justify-center h-full">
                                <div className="w-4 border-t-2 border-b-2 border-gray-300 h-16 border-r-2 rounded-r-xl absolute left-[50%] top-[50%] -translate-y-1/2 -translate-x-6 opacity-20"></div>
                            </div>
                            <Arrow />
                            <Block label="Cross-Modal Fusion" icon={GitMerge} color="bg-purple-50 dark:bg-purple-900/20" />
                            <Arrow />
                            <Block label="Output" />
                        </motion.div>
                    )}

                    {activeType === 'Late' && (
                        <motion.div
                            key="late"
                            className="flex items-center gap-2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <div className="flex flex-col gap-8">
                                <div className="flex items-center gap-2">
                                    <Block label="Image" icon={ImageIcon} />
                                    <Arrow />
                                    <Block label="Vision Model" />
                                    <Arrow />
                                    <Block label="Scores or Embeddings" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <Block label="Text" icon={Type} />
                                    <Arrow />
                                    <Block label="Lang Model" />
                                    <Arrow />
                                    <Block label="Scores or Embeddings" />
                                </div>
                            </div>
                            <Arrow />
                            <Block label="Decision Fusion" icon={GitMerge} color="bg-green-50 dark:bg-green-900/20" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="mt-6 text-sm text-gray-600 dark:text-gray-400 text-center bg-white dark:bg-gray-800 p-4 rounded-lg">
                {descriptions[activeType]}
            </div>
        </div>
    );
}
