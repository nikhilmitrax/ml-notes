import React from 'react';
import { Zap } from 'lucide-react';
import Section from '../../../components/Section';
import Header3 from '../../../components/Header3';
import Paragraph from '../../../components/Paragraph';
import Equation from '../../../components/Equation';
import EquationBlock from '../../../components/EquationBlock';

const ATLAS: React.FC = () => {
    return (
        <Section title="ATLAS: Optimizing Context with DeepTransformers" icon={Zap}>
            <ul className="list-disc list-inside space-y-2 mb-6 text-slate-700 ml-4">
                <li>While TITANS established the viability of Test-Time Memorization, the <strong>ATLAS</strong> architecture (arXiv:2505.23735) represents a second-generation refinement.</li>
                <li>Specifically targets the theoretical limitations of <em>online</em> updates.</li>
                <li>Introduces the <strong>DeepTransformer</strong> family, a set of architectures that generalize the original Transformer by integrating deep, optimizable memory modules.</li>
            </ul>

            <Header3 className="text-xl font-semibold text-slate-800 mb-4">The Limits of Online Updates</Header3>
            <Paragraph className="mb-4 text-slate-700 leading-relaxed">
                The authors of ATLAS critique the "online" nature of standard recurrent updates (including the basic TITANS implementation). In an online setting, the memory <Equation>{'\\mathcal{M}_t'}</Equation> is updated solely to minimize the surprise of the <em>current</em> token <Equation>{'x_t'}</Equation>.
            </Paragraph>
            <ul className="list-disc list-inside space-y-3 mb-6 text-slate-700 ml-4">
                <li><strong>The Greedy Problem</strong>: The greedy approach can lead to <strong>Catastrophic Interference</strong>, where updating the memory to fit the current token degrades its ability to recall past tokens. The model effectively "overfits" to the present moment at the expense of the global context history.</li>
                <li><strong>Limited Capacity</strong>: Even with neural memory, optimizing for a single data point at a time prevents the memory from organizing itself into a coherent structure that captures the relationships <em>between</em> past tokens.</li>
            </ul>

            <Header3 className="text-xl font-semibold text-slate-800 mb-4">Sliding-Window Memory Optimization</Header3>
            <Paragraph className="mb-4 text-slate-700 leading-relaxed">
                ATLAS addresses this by shifting from single-step updates to Sliding-Window Optimization. Instead of minimizing <Equation>{'\\mathcal{L}(\\mathcal{M}_{t-1}, x_t)'}</Equation>, ATLAS minimizes the loss over a local window of history:
            </Paragraph>
            <Equation block>{'\\mathcal{L}_{\\text{window}} = \\sum_{i=0}^{k} \\mathcal{L}(\\mathcal{M}, x_{t-i})'}</Equation>
            <Paragraph className="mb-6 text-slate-700 leading-relaxed">
                This transitions the memory update from Stochastic Gradient Descent (SGD) on a single point to Mini-Batch Optimization. By optimizing the memory to explain a window of recent tokens simultaneously, ATLAS forces the memory to find a more stable and generalizable configuration. This allows the model to "consolidate" recent history into a robust representation before moving forward, significantly reducing the rate of forgetting.
            </Paragraph>

            <Header3 className="text-xl font-semibold text-slate-800 mb-4">The Omega Rule and Muon Optimization</Header3>
            <ul className="list-disc list-inside space-y-3 mb-6 text-slate-700 ml-4">
                <li><strong>The Omega Rule</strong>: This learning rule generalizes the update to handle <strong>polynomial kernels</strong> and non-linear mappings within the memory optimization step. It allows the memory to capture higher-order interactions between tokens (e.g., <Equation>{'x_i'}</Equation> interacts with <Equation>{'x_j'}</Equation> if both are present), increasing the effective capacity of the memory without adding parameters to the base model.</li>
                <li><strong>The Muon Optimizer</strong>: ATLAS employs a <strong>Second-Order</strong> optimization method called Muon for the memory updates. Unlike first-order methods (SGD/Adam) that only look at the slope (gradient), second-order methods consider the curvature (Hessian) of the loss landscape.</li>
                <li><strong>Impact</strong>: This allows the memory to converge to an optimal state much faster (in fewer steps) and to avoid shallow local minima. In the context of test-time learning, where the model has limited compute per token to update its memory, the efficiency of the Muon optimizer is a critical enabler of high performance.</li>
            </ul>

            <Header3 className="text-xl font-semibold text-slate-800 mb-4">Empirical Dominance: The BABILong Benchmark</Header3>
            <Paragraph className="mb-4 text-slate-700 leading-relaxed">
                A challenging suite of tasks designed to test reasoning over ultra-long contexts.
            </Paragraph>
            <ul className="list-disc list-inside space-y-3 mb-6 text-slate-700 ml-4">
                <li><strong>The 10M Token Frontier</strong>: While TITANS performs well up to 2M tokens, ATLAS achieves <strong>+80% accuracy</strong> at context lengths of <strong>10 million tokens</strong>.</li>
                <li><strong>Comparison</strong>: At this scale, standard Transformers are computationally impossible to run, and linear RNNs typically collapse to random chance performance due to the dilution of the hidden state. ATLAS's ability to maintain coherent memory over 10 million steps validates the efficacy of the sliding-window optimization and the deep neural memory structure.</li>
            </ul>

            <Header3 className="text-xl font-semibold text-slate-800 mb-4">The DeepTransformer Family</Header3>
            <Paragraph className="mb-4 text-slate-700 leading-relaxed">
                ATLAS is presented as part of a broader class of models called <strong>DeepTransformers</strong>. This family includes:
            </Paragraph>
            <ul className="list-disc list-inside space-y-2 mb-6 text-slate-700 ml-4">
                <li><strong>OmegaNet</strong>: Uses the Omega learning rule with polynomial kernels.</li>
                <li><strong>Dot</strong>: Integrates exponential kernel mappings.</li>
                <li><strong>ATLAS</strong>: The flagship model combining deep memory, sliding-window optimization, and the Muon optimizer.</li>
            </ul>
            <Paragraph className="mb-6 text-slate-700 leading-relaxed">
                This categorization frames ATLAS not just as a specific model, but as a strict generalization of the Transformer, where the "Attention" mechanism is simply a special case of a memory optimizer running with a specific (linear) learning rule.
            </Paragraph>
        </Section>
    );
};

export default ATLAS;
