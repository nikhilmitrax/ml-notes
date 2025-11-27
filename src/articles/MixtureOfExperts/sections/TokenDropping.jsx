import React from 'react';
import { AlertTriangle } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';
import EquationBlock from '../../../components/EquationBlock';

const TokenDropping = () => {
    return (
        <Section title="Token Dropping" icon={AlertTriangle}>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
                Token dropping occurs when an expert reaches its capacity limit <Equation>C</Equation>. Excess tokens are skipped (passed through residual connections) or rerouted.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-3">Mathematical Formulation</h3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
                The <strong>drop rate</strong> <Equation>r</Equation> is the fraction of tokens that are not processed by any expert:
            </p>
            <EquationBlock><Equation>
                {`r = \\frac{1}{T} \\sum_{i=1}^N \\max(0, T_i - C)`}
            </Equation></EquationBlock>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
                Where <Equation>T_i</Equation> is the number of tokens assigned to expert <Equation>i</Equation>.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-3">Mitigation Strategies</h3>
            <div className="space-y-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h4 className="font-bold text-gray-900 dark:text-white">1. Increase Capacity Factor (<Equation>\alpha</Equation>)</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Increasing <Equation>\alpha</Equation> (e.g., to 1.5 or 2.0) reduces dropping but increases computation and memory cost linearly.
                    </p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h4 className="font-bold text-gray-900 dark:text-white">2. Auxiliary Load-Balancing Loss</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Stronger regularization (<Equation>\lambda</Equation>) forces the router to distribute tokens more evenly, reducing the likelihood of any single expert overflowing.
                    </p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h4 className="font-bold text-gray-900 dark:text-white">3. Rerouting / Expert Choice</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        <strong>Expert Choice Routing</strong> (Zhou et al., 2022) inverts the problem: experts choose the top-k tokens, ensuring perfect load balancing and zero dropping by design.
                    </p>
                </div>
            </div>
        </Section>
    );
};

export default TokenDropping;
