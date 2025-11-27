import React from 'react';
import { Layers, Check, X } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';

const GroupNormalization = () => {
    return (
        <Section title="Group Normalization (GroupNorm)" icon={Layers}>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
                <strong>Group Normalization</strong> is a hybrid. It divides channels into <Equation>G</Equation> groups and normalizes within each group for each sample. It's like LayerNorm applied to subsets of channels.
            </p>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800 mb-6">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                    <strong>Intuition:</strong> In vision, channels often group by features (e.g., "vertical edges", "horizontal edges"). Normalizing them together makes sense, while keeping independence from the batch size.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800">
                    <h4 className="font-bold text-green-800 dark:text-green-300 mb-2 flex items-center gap-2"><Check size={16} /> Pros</h4>
                    <ul className="list-disc pl-5 text-sm text-green-800 dark:text-green-200 space-y-1">
                        <li><strong>Best for small-batch CNNs</strong> (Object Detection, Segmentation).</li>
                        <li>Stable performance independent of batch size.</li>
                        <li>Better than LayerNorm for vision tasks.</li>
                    </ul>
                </div>
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-800">
                    <h4 className="font-bold text-red-800 dark:text-red-300 mb-2 flex items-center gap-2"><X size={16} /> Cons</h4>
                    <ul className="list-disc pl-5 text-sm text-red-800 dark:text-red-200 space-y-1">
                        <li>Hyperparameter <Equation>G</Equation> (groups) needs tuning (usually 32).</li>
                        <li>Slightly higher computational cost than BN/LN.</li>
                    </ul>
                </div>
            </div>
        </Section>
    );
};

export default GroupNormalization;
