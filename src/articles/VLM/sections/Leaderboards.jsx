import React from 'react';
import { Trophy } from 'lucide-react';
import Section from '../../../components/Section';
import Header3 from '../../../components/Header3';

export default function Leaderboards() {
    return (
        <Section title="Leaderboards" icon={Trophy}>
            <div className="mt-6">
                <Header3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                    <a href="https://huggingface.co/spaces/opencompass/open_vlm_leaderboard" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                        🤗 Open VLM Leaderboard
                    </a>
                </Header3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                    <li>
                        Based on <a href="https://github.com/open-compass/VLMEvalKit" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">VLMEvalKit: A Toolkit for Evaluating Large Vision-Language Models</a> which is an open-source evaluation toolkit for VLMs.
                    </li>
                    <li>
                        As of this writing, the Open VLM Leaderboard covers 54 different VLMs (including GPT-4V, Gemini, QwenVL-Plus, LLaVA, etc.) and 22 different multi-modal benchmarks.
                    </li>
                </ul>
                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-center text-gray-500 dark:text-gray-400 italic mt-4">
                    [Image: Open VLM Leaderboard]
                </div>
            </div>

            <div className="mt-6">
                <Header3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                    <a href="https://huggingface.co/spaces/hf-vision/object_detection_leaderboard" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                        🤗 Open Object Detection Leaderboard
                    </a>
                </Header3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                    <li>
                        The 🤗 Open Object Detection Leaderboard aims to track, rank and evaluate vision models available in the hub designed to detect objects in images.
                    </li>
                </ul>
                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-center text-gray-500 dark:text-gray-400 italic mt-4">
                    [Image: Open Object Detection Leaderboard]
                </div>
            </div>
        </Section>
    );
}
