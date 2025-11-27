import React from 'react';
import { Scale } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';
import EquationBlock from '../../../components/EquationBlock';

const LoadBalancing = () => {
    return (
        <Section title="Load Balancing" icon={Scale}>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
                Load balancing ensures that all experts are used evenly. Without it, a "rich gets richer" effect occurs where a few experts handle all tokens, degrading performance and wasting capacity.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-3">Total Load on Expert</h3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
                The load on expert <Equation>i</Equation> is defined by the <strong>fraction of tokens</strong> assigned to it (<Equation>f_i</Equation>) and the <strong>average routing probability</strong> (<Equation>P_i</Equation>).
            </p>
            <EquationBlock><Equation>
                {`\\text{Load}_i = f_i \\times P_i`}
            </Equation></EquationBlock>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
                Where:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
                <li><Equation>{`f_i = \\frac{1}{T} \\sum_{x \\in \\mathcal{B}} \\mathbf{1}\\{\\text{expert}(x) = i\\}`}</Equation> (Fraction of tokens routed to expert <Equation>i</Equation>)</li>
                <li><Equation>{`P_i = \\frac{1}{T} \\sum_{x \\in \\mathcal{B}} p_i(x)`}</Equation> (Average probability assigned to expert <Equation>i</Equation>)</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-3">Auxiliary Load-Balancing Loss</h3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
                To encourage balanced routing, an auxiliary loss term is added to the training objective:
            </p>
            <EquationBlock><Equation>
                {`\\mathcal{L}_{balance} = \\alpha N \\sum_{i=1}^N f_i P_i`}
            </Equation></EquationBlock>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
                This loss is minimized when routing is uniform (<Equation>{`f_i = P_i = \\frac{1}{N}`}</Equation>).
            </p>
        </Section>
    );
};

export default LoadBalancing;
