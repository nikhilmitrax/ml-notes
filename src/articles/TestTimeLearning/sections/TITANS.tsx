import React from 'react';
import { Cpu } from 'lucide-react';
import Section from '../../../components/Section';
import Header3 from '../../../components/Header3';
import Paragraph from '../../../components/Paragraph';
import Equation from '../../../components/Equation';
import EquationBlock from '../../../components/EquationBlock';

const TITANS: React.FC = () => {
    return (
        <Section title="TITANS" icon={Cpu}>
            <Paragraph className="mb-4 text-slate-700 leading-relaxed">
                First practical implementation of sequence model designed around TTM.
            </Paragraph>
            <Paragraph className="mb-6 text-slate-700 leading-relaxed">
                <strong>Hybrid 3-branch design:</strong> Core Branch, LTM, Persistent Memory
            </Paragraph>

            <Header3 className="text-xl font-semibold text-slate-800 mb-4">Core Branch</Header3>
            <ul className="list-disc list-inside space-y-2 mb-6 text-slate-700 ml-4">
                <li>Standard Attention</li>
                <li>Responsible for high-fidelity retrieval of immediate context, handling local syntactic dependencies.</li>
                <li>Limiting attention window makes it effectively linear (<Equation>{'O(n)'}</Equation> or <Equation>{'O(W \\cdot N)'}</Equation> for a window size <Equation>{'W'}</Equation>)</li>
            </ul>

            <Header3 className="text-xl font-semibold text-slate-800 mb-4">Neural Long-term Memory</Header3>
            <ul className="list-disc list-inside space-y-2 mb-6 text-slate-700 ml-4">
                <li>The LTM is a deep neural network (specifically, an MLP) whose weights <Equation>{'W_t'}</Equation> serve as the memory state.</li>
                <li>Acts as a function that maps keys to values.</li>
                <li>For every input token <Equation>{'x_t'}</Equation>, calculates a 'surprise' loss <Equation>{'\\mathcal{L}(W_{t-1}, x_t)'}</Equation> and updates the weights of LTM using gradient descent.</li>
                <li>Because it's a deep network, it learns to store <em>abstractions</em> of data rather than raw tokens. This allows it to compress vast amounts of information.</li>
            </ul>

            <Header3 className="text-xl font-semibold text-slate-800 mb-4">Persistent Memory</Header3>
            <Paragraph className="mb-6 text-slate-700 leading-relaxed">
                A set of learnable parameters that are fixed during inference. These weights encode the <strong>semantic knowledge</strong> and <strong>reasoning patterns</strong> acquired during pre-training. They represent the "crystallized intelligence" of the model (facts about the world, grammar rules) that should not be overwritten by the transient context of a specific test document.
            </Paragraph>

            <Header3 className="text-xl font-semibold text-slate-800 mb-4">The Mechanism of Surprise and Momentum</Header3>
            <Paragraph className="mb-4 text-slate-700 leading-relaxed">
                Not a simple gradient descent, but momentum based update:
            </Paragraph>
            <EquationBlock>
                <Equation>{'\\mathcal{S}_t = \\eta_t \\mathcal{S}_{t-1} - \\theta_t \\nabla \\mathcal{L}(\\mathcal{M}_{t-1}; \\mathbf{k}_t, \\mathbf{v}_t)'}</Equation>
                <Equation>{'\\mathcal{M}_t = (1 - \\alpha_t) \\mathcal{M}_{t-1} + \\mathcal{S}_t'}</Equation>
            </EquationBlock>
            <Paragraph className="mb-2 text-slate-700 leading-relaxed">where:</Paragraph>
            <ul className="list-disc list-inside space-y-3 mb-6 text-slate-700 ml-4">
                <li><Equation>{'\\mathcal{S}_t'}</Equation> represents <strong>Momentum of surprise</strong>. It aggregates the gradients over time, allowing the model to smooth out noise and focus on sustained trends in the data. This addresses the issue where a single token might not be surprising on its own, but a <em>sequence</em> of tokens reveals a significant shift in context.</li>
                <li><Equation>{'\\mathcal{M}_t'}</Equation> is the state of the Neural Memory (weights).</li>
                <li><Equation>{'\\alpha_t'}</Equation> is the <strong>Adaptive Forgetting Gate</strong>. This parameter is data-dependent and learnable. It allows the model to aggressively decay (forget) information when a context shift is detected, or to retain information strictly when dealing with critical dependencies. This acts as the <strong>Retention</strong> pillar of the MIRAS framework.</li>
                <li><Equation>{'\\eta_t'}</Equation> and <Equation>{'\\theta_t'}</Equation> control the decay of the surprise momentum and the learning rate of the momentary surprise, respectively.</li>
            </ul>

            <Header3 className="text-xl font-semibold text-slate-800 mb-4">Empirical Results</Header3>
            <ul className="list-disc list-inside space-y-3 mb-6 text-slate-700 ml-4">
                <li><strong>Context Window</strong>: TITANS effectively scales to context windows exceeding <strong>2M tokens</strong>.</li>
                <li><strong>Needle-in-a-Haystack (NIAH)</strong>: In tasks requiring the retrieval of a specific key buried in a massive document, TITANS achieves higher accuracy than both Transformers (which often fail due to memory limits) and modern linear RNNs (which forget the needle due to lossy compression).</li>
                <li><strong>Beyond Text</strong>: The model demonstrates versatility in <strong>Genomic Modeling (DNA)</strong> and <strong>Time-Series Forecasting</strong>, domains characterized by extremely long interaction ranges. In DNA modeling, the ability to capture dependencies across millions of base pairs allows TITANS to identify gene expressions that linear models miss.</li>
            </ul>
        </Section>
    );
};

export default TITANS;
