import React from 'react';
import { Layers, Check, X } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';
import EquationBlock from '../../../components/EquationBlock';
import CodeBlock from '../../../components/CodeBlock';
import Header3 from '../../../components/Header3';
import Header4 from '../../../components/Header4';
import Paragraph from '../../../components/Paragraph';
import SideBySide from '../../../components/SideBySide';

const BatchNormalization = () => {
    return (
        <Section title="Batch Normalization (BatchNorm)" icon={Layers}>
            <Paragraph className="mb-4 text-gray-700 dark:text-gray-300">
                <strong>Batch Normalization</strong> normalizes each feature independently across the mini-batch. It computes the mean and variance for channel <Equation>c</Equation> using data from all samples in the batch.
            </Paragraph>

            <EquationBlock><Equation>
                {`\\hat{x}_{b,c} = \\frac{x_{b,c} - \\mu_c}{\\sqrt{\\sigma_c^2 + \\epsilon}}`}
            </Equation></EquationBlock>

            <SideBySide className="mt-6">
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800">
                    <Header4 className="font-bold text-green-800 dark:text-green-300 mb-2 flex items-center gap-2"><Check size={16} /> Pros</Header4>
                    <ul className="list-disc pl-5 text-sm text-green-800 dark:text-green-200 space-y-1">
                        <li>Standard for CNNs (ResNet, EfficientNet).</li>
                        <li>Strong regularization effect.</li>
                        <li>Can fold into Conv layers during inference for zero overhead.</li>
                    </ul>
                </div>
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-800">
                    <Header4 className="font-bold text-red-800 dark:text-red-300 mb-2 flex items-center gap-2"><X size={16} /> Cons</Header4>
                    <ul className="list-disc pl-5 text-sm text-red-800 dark:text-red-200 space-y-1">
                        <li><strong>Requires large batches</strong> (BS &ge; 32).</li>
                        <li>Fails with small batches (unstable stats).</li>
                        <li>Complex train/inference logic (running stats).</li>
                        <li>Bad for RNNs/Sequences.</li>
                    </ul>
                </div>
            </SideBySide>

            <div className="mt-6 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
                <Header3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Training vs. Inference Behavior</Header3>
                <Paragraph className="mb-4 text-gray-700 dark:text-gray-300">
                    A unique (and often painful) characteristic of BatchNorm is that it behaves differently during training and inference.
                </Paragraph>

                <SideBySide>
                    <div>
                        <Header4 className="font-bold text-blue-600 dark:text-blue-400 mb-2">Training Mode</Header4>
                        <Paragraph variant="small" className="mb-2">
                            Uses the <strong>current batch statistics</strong> (<Equation>\mu_B, \sigma_B</Equation>) to normalize.
                            Simultaneously updates global "running statistics" using exponential moving average.
                        </Paragraph>
                        <CodeBlock code={`# Training
mean = batch.mean()
var = batch.var()
x_hat = (x - mean) / sqrt(var + eps)

# Update running stats
running_mean = 0.9 * running_mean + 0.1 * mean`} />
                    </div>
                    <div>
                        <Header4 className="font-bold text-purple-600 dark:text-purple-400 mb-2">Inference Mode</Header4>
                        <Paragraph variant="small" className="mb-2">
                            Uses the <strong>pre-computed running statistics</strong>. The batch statistics are ignored.
                            This ensures deterministic output for a single input.
                        </Paragraph>
                        <CodeBlock code={`# Inference
x_hat = (x - running_mean) / sqrt(running_var + eps)`} />
                    </div>
                </SideBySide>

                <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 text-sm rounded border border-yellow-200 dark:border-yellow-800">
                    <strong>⚠️ Common Pitfall:</strong> Forgetting to switch to <code>model.eval()</code> during inference will cause the model to use batch statistics (which might be garbage for a single image) and update running stats, ruining the model.
                </div>
            </div>
        </Section>
    );
};

export default BatchNormalization;
