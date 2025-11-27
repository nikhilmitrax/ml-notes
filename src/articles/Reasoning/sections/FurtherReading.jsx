import React from 'react';
import { BookOpen } from 'lucide-react';
import Section from '../../../components/Section';

export default function FurtherReading() {
    return (
        <Section title="Further Reading" icon={BookOpen}>
            <div className="space-y-4">
                <p>
                    Explore these resources for deeper understanding:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-blue-600">
                    <li><a href="https://arcprize.org" className="hover:underline">ARC Prize: Advancing Human-Level Reasoning</a></li>
                    <li><a href="https://openai.com/research" className="hover:underline">OpenAI Research: Reasoning in GPT Models</a></li>
                    <li><a href="https://www.anthropic.com/research" className="hover:underline">Anthropic: Constitutional AI</a></li>
                    <li><a href="https://deepmind.google/discover/blog" className="hover:underline">Google DeepMind: Towards AGI-Level Reasoning</a></li>
                    <li><a href="https://github.com/deepseek-ai/DeepSeek-R1" className="hover:underline">DeepSeek-R1 Technical Overview</a></li>
                </ul>
            </div>
        </Section>
    );
}
