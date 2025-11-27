import React from 'react';
import { ArrowRight } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';

const WhyRelative = () => {
    return (
        <Section title="Why Relative Encoding?" icon={ArrowRight}>
            <p className="mb-4 text-slate-700 leading-7">
                Absolute position often doesn't matter as much as <strong>relative distance</strong>.
                If I say "Hello World" at the start of a doc or the end, "World" should still attend to "Hello" (distance -1) similarly.
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-700 mb-6">
                <li><strong>Translation Invariance:</strong> Attention patterns should depend on <Equation>m - n</Equation>, not <Equation>m</Equation> or <Equation>n</Equation> individually.</li>
                <li><strong>Extrapolation:</strong> Absolute schemes struggle when testing on sequences longer than training ones. Relative schemes generalize better (sometimes).</li>
            </ul>
        </Section>
    );
};

export default WhyRelative;
