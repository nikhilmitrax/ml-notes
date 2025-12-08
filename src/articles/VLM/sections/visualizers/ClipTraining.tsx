import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Check, X } from 'lucide-react';
import Header4 from '../../../../components/Header4';

export default function ClipTraining() {
    const [step, setStep] = useState(0); // 0: Random, 1: Aligned
    const size = 4; // 4x4 batch size

    const toggleTraining = () => {
        setStep((prev) => (prev === 0 ? 1 : 0));
    };

    return (
        <div className="my-8 p-6 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
            <div className="flex justify-between items-center mb-6">
                <Header4 className="text-gray-800 dark:text-white mt-0 mb-0">
                    CLIP Contrastive Training
                </Header4>
                <button
                    onClick={toggleTraining}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                    <RefreshCw className={`w-4 h-4 ${step === 0 ? '' : 'animate-spin-once'}`} />
                    {step === 0 ? 'Run Training Step' : 'Reset Weights'}
                </button>
            </div>

            <div className="flex flex-col items-center">
                {/* Top Labels (Images) */}
                <div className="flex gap-2 mb-2 ml-8">
                    {Array.from({ length: size }).map((_, i) => (
                        <div key={i} className="w-12 text-center text-xs font-mono text-gray-500">
                            Img {i + 1}
                        </div>
                    ))}
                </div>

                <div className="flex gap-2">
                    {/* Left Labels (Texts) */}
                    <div className="flex flex-col gap-2 mt-1">
                        {Array.from({ length: size }).map((_, i) => (
                            <div key={i} className="h-12 flex items-center justify-end text-xs font-mono text-gray-500">
                                Text {i + 1}
                            </div>
                        ))}
                    </div>

                    {/* Matrix */}
                    <div className="grid grid-cols-4 gap-2">
                        {Array.from({ length: size * size }).map((_, idx) => {
                            const row = Math.floor(idx / size);
                            const col = idx % size;
                            const isDiagonal = row === col;

                            // Determine color based on step
                            // Step 0: Random gray shades
                            // Step 1: Diagonal green, others faded red/gray

                            const isAligned = step === 1;

                            let bgColor = "bg-gray-200 dark:bg-gray-700";
                            let opacity = 1;
                            let scale = 1;

                            if (isAligned) {
                                if (isDiagonal) {
                                    bgColor = "bg-green-500";
                                    scale = 1.1;
                                } else {
                                    bgColor = "bg-red-100 dark:bg-red-900/30";
                                    opacity = 0.5;
                                    scale = 0.9;
                                }
                            }

                            return (
                                <motion.div
                                    key={idx}
                                    className={`w-12 h-12 rounded-lg flex items-center justify-center text-xs font-bold text-white ${bgColor}`}
                                    initial={false}
                                    animate={{
                                        backgroundColor: isAligned
                                            ? (isDiagonal ? "#22c55e" : "#fee2e2") // green-500 : red-100
                                            : "#e5e7eb", // gray-200
                                        scale: scale,
                                        opacity: opacity
                                    }}
                                    transition={{ duration: 0.5 }}
                                >
                                    {isAligned && isDiagonal && <Check className="w-5 h-5 text-white" />}
                                    {isAligned && !isDiagonal && <X className="w-4 h-4 text-red-400" />}
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="mt-6 text-sm text-gray-600 dark:text-gray-400 text-center max-w-lg mx-auto">
                {step === 0
                    ? "Initially, image and text embeddings are randomly aligned. The similarity matrix shows random values."
                    : "After contrastive training, the model maximizes the similarity of correct pairs (diagonal) and minimizes incorrect ones (off-diagonal)."
                }
            </div>
        </div>
    );
}
