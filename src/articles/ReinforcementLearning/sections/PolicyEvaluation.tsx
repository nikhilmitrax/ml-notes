import React from 'react';
import { Search } from 'lucide-react';
import Section from '../../../components/Section';
import Header4 from '../../../components/Header4';
import Paragraph from '../../../components/Paragraph';

const PolicyEvaluation = () => {
    return (
        <Section title="Policy Evaluation" icon={Search}>
            <Paragraph>
                Evaluating how good a policy is before deploying it is critical, especially in high-stakes environments.
            </Paragraph>
            <div className="mt-4 space-y-4">
                <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                    <Header4 className="mt-0">Online Policy Evaluation</Header4>
                    <Paragraph variant="small">
                        Evaluate the policy by running it in the real environment. Accurate but risky and expensive.
                    </Paragraph>
                </div>
                <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                    <Header4 className="mt-0">Offline Policy Evaluation (OPE)</Header4>
                    <Paragraph variant="small">
                        Evaluate using historical data logs without new interaction. Safer but challenging due to distribution shift. Techniques include <strong>Importance Sampling</strong> and <strong>Doubly Robust</strong> methods.
                    </Paragraph>
                </div>
            </div>
        </Section>
    );
};

export default PolicyEvaluation;
