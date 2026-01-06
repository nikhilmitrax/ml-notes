import React from 'react';
import { Brain } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';
import Header3 from '../../../components/Header3';
import Header4 from '../../../components/Header4';
import Paragraph from '../../../components/Paragraph';
import SideBySide from '../../../components/SideBySide';

const ObjectiveFunction = () => {
    return (
        <Section title="The Objective Function (ELBO)" icon={Brain}>
            <Paragraph className="mb-4">
                We train VAEs by maximizing the Evidence Lower Bound (ELBO). The loss function generally consists of two opposing terms:
            </Paragraph>

            <Equation block>
                {`\\mathcal(L) = \\underbrace{\\mathbb{E}_{q(z|x)}[\\log p(x|z)]}_{\\text{Reconstruction Loss}} - \\underbrace{D_{KL}(q(z|x) || p(z))}_{\\text{Regularization}}`}
            </Equation>

            <SideBySide className="mt-6">
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <Header4 className="font-bold !text-green-600 dark:!text-green-400 mb-2">1. Reconstruction Loss</Header4>
                    <Paragraph variant="small">
                        Encourages the decoder to be good at reconstructing the original input. It wants the latent distribution variance to be small (point-like).
                    </Paragraph>
                </div>
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <Header4 className="font-bold !text-orange-600 dark:!text-orange-400 mb-2">2. KL Divergence</Header4>
                    <Paragraph variant="small">
                        Acts as a regularizer. It forces the learned distributions to be close to a standard normal distribution <Equation>\mathcal(N)(0, I)</Equation>.
                        This prevents the model from "cheating" by spreading clusters too far apart.
                    </Paragraph>
                </div>
            </SideBySide>

            <Header3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-2">Reconstruction Loss & Likelihood</Header3>
            <Paragraph className="mb-4 text-gray-700 dark:text-gray-300">
                The exact form of the reconstruction loss isn't arbitrary—it is determined by the <strong>likelihood distribution <Equation>p_\theta(x|z)</Equation></strong> you choose for your data.
            </Paragraph>

            <div className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <Header4 className="font-semibold !text-gray-900 dark:!text-white mb-1">1. Bernoulli Likelihood (for binary/0-1 data)</Header4>
                    <Paragraph variant="small" className="mb-2">
                        If you assume each pixel is a Bernoulli variable, the negative log-likelihood <Equation>-\log p_\theta(x|z)</Equation> becomes <strong>Binary Cross Entropy (BCE)</strong>.
                    </Paragraph>
                    <Equation block>
                        {`-\\log p(x|z) = \\text{BCE}(x, \\hat{x})`}
                    </Equation>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <Header4 className="font-semibold !text-gray-900 dark:!text-white mb-1">2. Gaussian Likelihood (for continuous RGB)</Header4>
                    <Paragraph variant="small" className="mb-2">
                        If you assume the data follows a Gaussian distribution <Equation>{`p(x|z) = \\mathcal{N}(\\mu_\\theta(z), \\sigma^2 I)`}</Equation>, the loss is proportional to <strong>Mean Squared Error (MSE)</strong>.
                    </Paragraph>
                    <Equation block>
                        {`-\\log p(x|z) \\propto ||x - \\mu_\\theta(z)||^2`}
                    </Equation>
                </div>
            </div>

            <Paragraph className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                <em>Advanced VAEs may use other likelihoods like discretized logistic mixtures, which again result in cross-entropy style losses.</em>
            </Paragraph>
        </Section>
    );
};

export default ObjectiveFunction;
