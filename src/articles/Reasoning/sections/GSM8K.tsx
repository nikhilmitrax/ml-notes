import React from 'react';
import { Calculator } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';
import EquationBlock from '../../../components/EquationBlock';
import Header3 from '../../../components/Header3';
import Paragraph from '../../../components/Paragraph';

export default function GSM8K() {
    return (
        <Section title="GSM8K (grade-school math reasoning)" icon={Calculator}>
            <div className="space-y-6">
                <Paragraph>
                    <strong>GSM8K</strong> (<a href="https://arxiv.org/abs/2110.14168" className="text-blue-600 hover:underline">Cobbe et al., 2021</a>) is the "Hello World" of LLM reasoning. It consists of 8.5k high-quality grade school math word problems.
                </Paragraph>
                <Paragraph>
                    <strong>Why it matters:</strong> Before Chain-of-Thought, even GPT-3 struggled here (approx. 20% accuracy). With CoT, models now exceed 90%. It proves that <strong>verbalizing the intermediate steps</strong> is sufficient for simple multi-step reasoning.
                </Paragraph>

                <Header3 className="text-2xl font-semibold text-slate-800 mt-8">Example</Header3>
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 font-mono text-sm">
                    <Paragraph className="font-bold text-slate-700">Question:</Paragraph>
                    <Paragraph className="mb-2">Natalia sold clips to 48 of her friends in April, and then she sold half as many clips in May. How many clips did Natalia sell altogether in April and May?</Paragraph>

                    <Paragraph className="font-bold text-slate-700 mt-4">Standard Prompting (Fail):</Paragraph>
                    <Paragraph className="text-red-600">72</Paragraph>

                    <Paragraph className="font-bold text-slate-700 mt-4">CoT Prompting (Success):</Paragraph>
                    <Paragraph className="text-green-700">
                        Natalia sold 48/2 = 24 clips in May.<br />
                        Natalia sold 48 + 24 = 72 clips altogether.<br />
                        Answer: 72
                    </Paragraph>
                </div>

                <Header3 className="text-2xl font-semibold text-slate-800 mt-8">Key Metric: Pass@1 vs. Pass@K</Header3>
                <Paragraph>
                    Because reasoning is brittle, we often evaluate using <strong>Pass@K</strong> (generate <Equation>K</Equation> solutions, check if <em>any</em> are correct) or <strong>Majority Vote@K</strong> (generate <Equation>K</Equation>, take the most common answer).
                </Paragraph>
                <EquationBlock><Equation>
                    {`\\text{Maj@K} = \\text{mode}(\\{y_1, y_2, \\dots, y_K\\})`}
                </Equation></EquationBlock>
                <Paragraph>
                    On GSM8K, Majority Vote often boosts performance by 5-10% over greedy decoding.
                </Paragraph>
            </div>
        </Section>
    );
}
