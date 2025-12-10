import React from 'react';
import { Lightbulb } from 'lucide-react';
import Section from '../../../components/Section';
import Paragraph from '../../../components/Paragraph';

const NewFamilyOfApproaches: React.FC = () => {
    return (
        <Section title="A New Family of Approaches" icon={Lightbulb}>
            <ul className="list-disc list-inside space-y-2 mb-6 text-slate-700 ml-4">
                <li>Test time learning or test-time memorization</li>
                <li>TTM architectures treat the inference phase as a continuous learning process.</li>
                <li>"Memory" in a neural network should not be a static vector or a growing cache, but a <strong>dynamic optimization problem</strong> where the model actively updates its own parameters in real-time to minimize a "surprise" metric.</li>
            </ul>
        </Section>
    );
};

export default NewFamilyOfApproaches;
