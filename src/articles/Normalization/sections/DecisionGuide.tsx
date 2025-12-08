import React from 'react';
import { Settings } from 'lucide-react';
import Section from '../../../components/Section';
import DecisionStep from '../../../components/DecisionStep';

const DecisionGuide = () => {
    return (
        <Section title="Decision Guide" icon={Settings}>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
                Use this decision tree to choose the right normalization layer for your model.
            </p>

            <div className="space-y-4">
                <DecisionStep number="1" title="Is it a Transformer or RNN?">
                    Yes &rarr; Use <strong>LayerNorm</strong>. (Standard for NLP/Sequential data).
                </DecisionStep>

                <DecisionStep number="2" title="Is it a CNN (Vision)?">
                    <div className="mt-2 space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                            <span><strong>Large Batch (BS &ge; 32):</strong> Use <strong>BatchNorm</strong> (ResNet, etc).</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                            <span><strong>Small Batch (BS &lt; 16):</strong> Use <strong>GroupNorm</strong> (Detection, Segmentation).</span>
                        </div>
                    </div>
                </DecisionStep>

                <DecisionStep number="3" title="Batch Size = 1? (Online Learning / RL)">
                    Use <strong>LayerNorm</strong> or <strong>GroupNorm</strong>. BatchNorm will fail.
                </DecisionStep>
            </div>
        </Section>
    );
};

export default DecisionGuide;
