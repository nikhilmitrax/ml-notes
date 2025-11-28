import React from 'react';
import { LayoutGrid } from 'lucide-react';
import Section from '../../../components/Section';
import Paragraph from '../../../components/Paragraph';

export default function Applications() {
    return (
        <Section title="Applications" icon={LayoutGrid}>
            <Paragraph className="mb-4 text-gray-700 dark:text-gray-300">
                Let's look at a few VLM applications:
            </Paragraph>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                    <strong>Image Captioning</strong>: Generating descriptive text for images.
                </li>
                <li>
                    <strong>Visual Question Answering</strong>: Answering questions based on visual content.
                </li>
                <li>
                    <strong>Cross-modal Retrieval</strong>: Finding images based on text queries and vice versa.
                </li>
            </ul>
        </Section>
    );
}
