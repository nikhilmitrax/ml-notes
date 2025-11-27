import React from 'react';
import { Search } from 'lucide-react';
import Section from '../../../components/Section';

const PolicyEvaluation = () => {
    return (
        <Section title="Policy Evaluation" icon={Search}>
            <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                Evaluating how good a policy is before deploying it is critical, especially in high-stakes environments.
            </p>
            <div className="mt-4 space-y-4">
                <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Online Policy Evaluation</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Evaluate the policy by running it in the real environment. Accurate but risky and expensive.
                    </p>
                </div>
                <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Offline Policy Evaluation (OPE)</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Evaluate using historical data logs without new interaction. Safer but challenging due to distribution shift. Techniques include <strong>Importance Sampling</strong> and <strong>Doubly Robust</strong> methods.
                    </p>
                </div>
            </div>
        </Section>
    );
};

export default PolicyEvaluation;
