import React from 'react';
import { Activity } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';
import EquationBlock from '../../../components/EquationBlock';

const DerivingELBO = () => {
    return (
        <Section title="Deriving the ELBO" icon={Activity}>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
                Why do we maximize the ELBO? Our goal is to maximize the log-likelihood of the data <Equation>\log p(x)</Equation>.
                However, the marginal likelihood <Equation>p(x) = \int p(x,z) dz</Equation> is intractable.
            </p>

            <p className="mb-4 text-gray-700 dark:text-gray-300">
                We introduce an approximate posterior <Equation>q(z|x)</Equation> and use Jensen's Inequality:
            </p>

            <EquationBlock>
                <Equation>{`\\log p(x) = \\log \\int p(x, z) dz`}</Equation>
                <Equation hidden>{`= \\log \\int q(z|x) \\frac{p(x, z)}{q(z|x)} dz`}</Equation>
                <Equation hidden>{`= \\log \\mathbb{E}_{q(z|x)} \\left[ \\frac{p(x, z)}{q(z|x)} \\right]`}</Equation>
                <Equation hidden>{`\\ge \\mathbb{E}_{q(z|x)} \\left[ \\log \\frac{p(x, z)}{q(z|x)} \\right] \\quad (\\text{Jensen's Inequality})`}</Equation>
                <Equation hidden>{`\\ge \\mathbb{E}_q [\\log p(x|z) + \\log p(z) - \\log q(z|x)]`}</Equation>
                <Equation>{`\\ge \\underbrace{\\mathbb{E}_q [\\log p(x|z)]}_{\\text{Reconstruction}} - \\underbrace{D_{KL}(q(z|x) || p(z))}_{\\text{Regularization}}`}</Equation>
            </EquationBlock>

            <p className="mt-4 text-gray-700 dark:text-gray-300">
                The term on the right is the <strong>Evidence Lower Bound (ELBO)</strong>. Maximizing this lower bound (which is tractable)
                indirectly maximizes <Equation>\log p(x)</Equation>.
            </p>
        </Section>
    );
};

export default DerivingELBO;
