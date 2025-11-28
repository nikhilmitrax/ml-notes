import React from 'react';
import { Star } from 'lucide-react';
import Section from '../../../components/Section';
import Paragraph from '../../../components/Paragraph';
import VLMsForGeneration from './VLMsForGeneration';
import VLMsForUnderstanding from './VLMsForUnderstanding';
import MedicalVLMs from './MedicalVLMs';
import IndicVLMs from './IndicVLMs';

export default function PopularVLMs() {
    return (
        <Section title="Popular VLMs" icon={Star}>
            <Paragraph className="mb-4 text-gray-700 dark:text-gray-300">
                This section covers some of the most popular Vision-Language Models, categorized by their primary function.
            </Paragraph>
            <VLMsForGeneration />
            <VLMsForUnderstanding />
            <MedicalVLMs />
            <IndicVLMs />
        </Section>
    );
}
