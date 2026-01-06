import React from 'react';
import { Zap } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';
import Header3 from '../../../components/Header3';
import Paragraph from '../../../components/Paragraph';

const SparselyGatedMoE = () => {
    return (
        <Section title="The Deep Learning Way: Sparsely-Gated MoE" icon={Zap}>
            <Paragraph className="mb-4 text-gray-700 dark:text-gray-300">
                In 2017, Shazeer et al. proposed the <strong>Sparsely-Gated Mixture-of-Experts Layer</strong>, a paradigm shift that made MoE viable for modern deep learning.
            </Paragraph>
            <Paragraph className="mb-4 text-gray-700 dark:text-gray-300">
                In standard dense models, increasing capacity (parameters) leads to a quadratic blow-up in training costs. Shazeer's approach allowed models to scale capacity by <strong>1000x</strong> with only minor computational overhead by activating only a few experts per token.
            </Paragraph>

            <Header3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-3">The Sparsely-Gated Layer</Header3>
            <Paragraph className="mb-4 text-gray-700 dark:text-gray-300">
                The layer consists of <Equation>N</Equation> expert networks (simple FFNs) and a trainable <strong>Gating Network</strong>.
            </Paragraph>
            <Equation block>
                {`y = \\sum_{i=1}^N G(x)_i E_i(x)`}
            </Equation>
            <Paragraph className="mb-4 text-gray-700 dark:text-gray-300">
                Crucially, the gating function <Equation>G(x)</Equation> is sparse. The authors introduced <strong>Noisy Top-k Gating</strong> to ensure effective training:
            </Paragraph>
            <Equation block>
                {`G(x) = \\text{Softmax}(\\text{TopK}(H(x), k))`}
            </Equation>
            <Paragraph className="mb-4 text-gray-700 dark:text-gray-300">
                Where <Equation>H(x)</Equation> includes a tunable Gaussian noise term to aid exploration and load balancing:
            </Paragraph>
            <Equation block>
                {`H(x)_i = (x \\cdot W_g)_i + \\text{StandardNormal}() \\cdot \\text{Softplus}((x \\cdot W_{noise})_i)`}
            </Equation>
        </Section>
    );
};

export default SparselyGatedMoE;
