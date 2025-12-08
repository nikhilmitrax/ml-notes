import React from 'react';
import { BookOpen } from 'lucide-react';
import Section from '../../../components/Section';

export default function Overview() {
    return (
        <Section title="Overview" icon={BookOpen}>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                    Vision-Language Models (VLMs) integrate both visual (image) and textual (language) information processing. They are designed to understand and generate content that involves both images and text, enabling them to perform tasks like image captioning, visual question answering, and text-to-image generation.
                </li>
                <li>
                    This primer offers an overview of their architecture and how they differ from Large Language Models (LLMs).
                </li>
            </ul>
        </Section>
    );
}
