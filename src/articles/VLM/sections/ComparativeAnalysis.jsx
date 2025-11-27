import React from 'react';
import { GitCompare } from 'lucide-react';
import Section from '../../../components/Section';
import { getAssetPath } from '../../../utils/assetUtils';

export default function ComparativeAnalysis() {
    return (
        <Section title="Comparative Analysis" icon={GitCompare}>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                    A comparative analysis <a href="https://docs.llamaindex.ai/en/latest/module_guides/models/multi_modal.html#" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">(source)</a> of some popular VLMs across the areas of (i) single image reasoning, (ii) multiple images reasoning, (iii) image embeddings, and (iv) simple query engine is as follows:
                </li>
            </ul>
            <div className="my-4">
                <img
                    src={getAssetPath("/assets/VLM/LMcomparativeanalysis.jpg")}
                    alt="Comparative Analysis"
                    className="w-full rounded-lg shadow-md"
                />
            </div>
        </Section>
    );
}
