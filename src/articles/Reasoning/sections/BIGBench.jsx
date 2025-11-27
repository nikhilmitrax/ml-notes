import React from 'react';
import { Layers } from 'lucide-react';
import Section from '../../../components/Section';

export default function BIGBench() {
    return (
        <Section title="BIG-bench and BIG-bench Hard" icon={Layers}>
            <div className="space-y-6">
                <p>
                    The <strong>Beyond the Imitation Game Benchmark (BIG-bench)</strong> (<a href="https://arxiv.org/abs/2206.04615" className="text-blue-600 hover:underline">Srivastava et al., 2022</a>) is a massive collaborative suite of over 200 tasks designed to probe <strong>general reasoning and knowledge</strong>. It covers everything from linguistics and commonsense to symbolic manipulation and social intelligence.
                </p>
                <p>
                    Its subset, <strong>BIG-bench Hard (BBH)</strong> (<a href="https://arxiv.org/abs/2210.09261" className="text-blue-600 hover:underline">Suzgun et al., 2022</a>), focuses on 23 challenging tasks where small models fail (performing at chance) but large models show steep performance gains—making it a prime detector of <strong>emergent reasoning</strong>.
                </p>

                <h3 className="text-2xl font-semibold text-slate-800 mt-8">Key Insights</h3>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Emergence with scale:</strong> Tasks like logical deduction show abrupt "aha" transitions as model size increases.</li>
                    <li><strong>Prompt sensitivity:</strong> CoT and self-consistency often unlock latent capabilities in these tasks.</li>
                    <li><strong>Task diversity:</strong> While symbolic tasks scale predictably, commonsense and ethical reasoning tasks often show flatter scaling curves.</li>
                </ul>
            </div>
        </Section>
    );
}
