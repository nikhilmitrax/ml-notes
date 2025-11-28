import React from 'react';
import { Activity } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';
import Header3 from '../../../components/Header3';
import Header4 from '../../../components/Header4';
import Paragraph from '../../../components/Paragraph';

const PosteriorCollapse = () => {
    return (
        <Section title="Posterior Collapse" icon={Activity}>
            <Paragraph className="mb-4 text-gray-700 dark:text-gray-300">
                A common failure mode in VAEs, especially when paired with powerful autoregressive decoders (like PixelCNN or LSTMs), is <strong>Posterior Collapse</strong>.
            </Paragraph>
            <Paragraph className="mb-4 text-gray-700 dark:text-gray-300">
                This happens when the decoder is so powerful that it can model the data distribution <Equation>p(x)</Equation> without using the latent code <Equation>z</Equation> at all.
                The encoder then learns to output a standard normal distribution regardless of the input (<Equation>q(z|x) \approx p(z)</Equation>), making the KL divergence term zero.
            </Paragraph>

            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800 mb-6">
                <Header4 className="font-bold text-red-800 dark:text-red-300 mb-2">The Symptom</Header4>
                <Paragraph variant="small" className="text-red-800 dark:text-red-200">
                    The model ignores the latent variable. The reconstructions might look good (because the decoder is strong), but the latent space is useless—it contains no information about the input.
                </Paragraph>
            </div>

            <Header3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Solution: KL Annealing</Header3>
            <Paragraph className="mb-4 text-gray-700 dark:text-gray-300">
                To prevent this, we can use <strong>KL Annealing</strong>. We start training with <Equation>\beta = 0</Equation> (treating it as a standard autoencoder) and slowly increase <Equation>\beta</Equation> to 1 over thousands of steps.
                This forces the model to use <Equation>z</Equation> early on to minimize reconstruction error before the regularization penalty kicks in.
            </Paragraph>
        </Section>
    );
};

export default PosteriorCollapse;
