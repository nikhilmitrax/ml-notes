import React from 'react';
import { Puzzle } from 'lucide-react';
import Section from '../../../components/Section';

export default function ArchitecturalChallenges() {
    return (
        <Section title="Architectural Challenges" icon={Puzzle}>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
                Put succinctly, VLMs need to overcome the following challenges as part of their architectural definition and training:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                    <strong>Data Alignment</strong>: Ensuring proper alignment between visual and textual data is challenging.
                </li>
                <li>
                    <strong>Complexity</strong>: The integration of two modalities adds complexity to the model architecture and training process.
                </li>
            </ul>
        </Section>
    );
}
