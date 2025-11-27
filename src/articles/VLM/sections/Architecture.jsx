import React from 'react';
import { Cpu } from 'lucide-react';
import Section from '../../../components/Section';
import ArchitectureDetails from './ArchitectureDetails';
import ArchitectureExamples from './ArchitectureExamples';
import ArchitectureDifferences from './ArchitectureDifferences';
import ConnectingVisionLanguage from './ConnectingVisionLanguage';

export default function Architecture() {
    return (
        <Section title="Architecture" icon={Cpu}>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
                The architecture of VLMs is centered around the effective fusion of visual and linguistic modalities, a process that requires sophisticated mechanisms to align and integrate information from both text and images.
            </p>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
                Let's delve deeper into this architecture, focusing on modality fusion and alignment, and then look at some examples of popular VLMs and their architectural choices.
            </p>
            <ArchitectureDetails />
            <ArchitectureExamples />
            <ArchitectureDifferences />
            <ConnectingVisionLanguage />
        </Section>
    );
}
