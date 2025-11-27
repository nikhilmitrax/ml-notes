import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Image as ImageIcon, ArrowDown } from 'lucide-react';

export default function TransformerFusion() {
    const [hoveredToken, setHoveredToken] = useState(null);

    // Simulated attention weights: which image patches each word focuses on
    const attentionMap = {
        0: [0, 1, 4, 5], // "A" -> top left background
        1: [2, 3, 6, 7], // "cat" -> the cat face
        2: [8, 9, 12, 13], // "sitting" -> body/posture
        3: [10, 11, 14, 15], // "mat" -> the mat below
    };

    const tokens = ["A", "cat", "sitting", "on", "a", "mat"];
    const patches = Array.from({ length: 16 }); // 4x4 grid

    return (
        <div className="my-8 p-6 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                Cross-Modal Attention Mechanism
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                Hover over the text tokens to see how the language model "attends" to relevant parts of the image.
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-12">
                {/* Text Modality (Queries) */}
                <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-2">
                        <MessageSquare className="w-4 h-4" /> Text Tokens (Queries)
                    </div>
                    <div className="flex gap-2">
                        {tokens.map((token, idx) => (
                            <motion.div
                                key={idx}
                                onMouseEnter={() => setHoveredToken(idx)}
                                onMouseLeave={() => setHoveredToken(null)}
                                className={`cursor-pointer px-3 py-2 rounded-md border text-sm font-medium transition-colors ${hoveredToken === idx
                                        ? 'bg-blue-500 text-white border-blue-600 scale-110'
                                        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                                    }`}
                                whileHover={{ y: -2 }}
                            >
                                {token}
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Attention Connection */}
                <div className="hidden md:flex flex-col items-center text-gray-400">
                    <span className="text-xs font-mono mb-1">Attention</span>
                    <ArrowDown className="w-6 h-6 rotate-[-90deg]" />
                </div>

                {/* Image Modality (Keys/Values) */}
                <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-2">
                        <ImageIcon className="w-4 h-4" /> Image Patches (Keys/Values)
                    </div>
                    <div className="grid grid-cols-4 gap-1 p-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                        {patches.map((_, idx) => {
                            // Determine if this patch is attended to by the hovered token
                            // For simplicity, we map token index modulo 4 to some pattern if not defined
                            const isAttended = hoveredToken !== null &&
                                (attentionMap[hoveredToken] ? attentionMap[hoveredToken].includes(idx) : idx % 5 === 0);

                            return (
                                <motion.div
                                    key={idx}
                                    className={`w-8 h-8 rounded-sm transition-colors duration-300 ${isAttended
                                            ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]'
                                            : 'bg-gray-200 dark:bg-gray-700'
                                        }`}
                                    animate={{
                                        scale: isAttended ? 1.1 : 1,
                                    }}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
