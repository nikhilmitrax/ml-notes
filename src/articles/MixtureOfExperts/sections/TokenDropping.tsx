import React from 'react';
import { AlertTriangle } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';
import EquationBlock from '../../../components/EquationBlock';
import Header3 from '../../../components/Header3';
import Header4 from '../../../components/Header4';
import Paragraph from '../../../components/Paragraph';

const TokenDropping = () => {
    return (
        <Section title="Token Dropping" icon={AlertTriangle}>
            <Paragraph className="mb-4 text-gray-700 dark:text-gray-300">
                Token dropping occurs when an expert reaches its capacity limit <Equation>C</Equation>. Excess tokens are skipped (passed through residual connections) or rerouted.
            </Paragraph>

            <Header3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-3">Mathematical Formulation</Header3>
            <Paragraph className="mb-4 text-gray-700 dark:text-gray-300">
                The <strong>drop rate</strong> <Equation>r</Equation> is the fraction of tokens that are not processed by any expert:
            </Paragraph>
            <EquationBlock><Equation>
                {`r = \\frac{1}{T} \\sum_{i=1}^N \\max(0, T_i - C)`}
            </Equation></EquationBlock>
            <Paragraph className="mb-4 text-gray-700 dark:text-gray-300">
                Where <Equation>T_i</Equation> is the number of tokens assigned to expert <Equation>i</Equation>.
            </Paragraph>

            <Header3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-3">Mitigation Strategies</Header3>
            <div className="space-y-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <Header4 className="font-bold text-gray-900 dark:text-white">1. Increase Capacity Factor (<Equation>\alpha</Equation>)</Header4>
                    <Paragraph variant="small" className="mt-1">
                        Increasing <Equation>\alpha</Equation> (e.g., to 1.5 or 2.0) reduces dropping but increases computation and memory cost linearly.
                    </Paragraph>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <Header4 className="font-bold text-gray-900 dark:text-white">2. Auxiliary Load-Balancing Loss</Header4>
                    <Paragraph variant="small" className="mt-1">
                        Stronger regularization (<Equation>\lambda</Equation>) forces the router to distribute tokens more evenly, reducing the likelihood of any single expert overflowing.
                    </Paragraph>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <Header4 className="font-bold text-gray-900 dark:text-white">3. Rerouting / Expert Choice</Header4>
                    <Paragraph variant="small" className="mt-1">
                        <strong>Expert Choice Routing</strong> (Zhou et al., 2022) inverts the problem: experts choose the top-k tokens, ensuring perfect load balancing and zero dropping by design.
                    </Paragraph>
                </div>
            </div>
        </Section>
    );
};

export default TokenDropping;
