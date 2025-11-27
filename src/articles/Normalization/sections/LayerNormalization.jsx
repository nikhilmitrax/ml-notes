import React from 'react';
import { Layers, Check, X } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';
import EquationBlock from '../../../components/EquationBlock';

const LayerNormalization = () => {
    return (
        <Section title="Layer Normalization (LayerNorm)" icon={Layers}>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
                <strong>Layer Normalization</strong> normalizes all features within a single sample. It computes statistics using all channels for a given input, independent of other samples in the batch.
            </p>

            <EquationBlock><Equation>
                {`\\hat{x}_{b,c} = \\frac{x_{b,c} - \\mu_b}{\\sqrt{\\sigma_b^2 + \\epsilon}}`}
            </Equation></EquationBlock>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800">
                    <h4 className="font-bold text-green-800 dark:text-green-300 mb-2 flex items-center gap-2"><Check size={16} /> Pros</h4>
                    <ul className="list-disc pl-5 text-sm text-green-800 dark:text-green-200 space-y-1">
                        <li><strong>Batch size independent</strong> (works with BS=1).</li>
                        <li>Standard for Transformers (BERT, GPT) & RNNs.</li>
                        <li>Same behavior in train and inference.</li>
                    </ul>
                </div>
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-800">
                    <h4 className="font-bold text-red-800 dark:text-red-300 mb-2 flex items-center gap-2"><X size={16} /> Cons</h4>
                    <ul className="list-disc pl-5 text-sm text-red-800 dark:text-red-200 space-y-1">
                        <li>Often performs worse than BN on CNNs.</li>
                        <li>No regularization effect from batch noise.</li>
                    </ul>
                </div>
            </div>
        </Section>
    );
};

export default LayerNormalization;
