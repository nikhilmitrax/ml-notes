import React from 'react';
import { Book } from 'lucide-react';
import Section from '../../../components/Section';

export default function FurtherReading() {
    return (
        <Section title="Further Reading" icon={Book}>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                    Lilian Weng's blog on <a href="https://lilianweng.github.io/posts/2022-06-09-vlm/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Generalized Visual Language Models</a>
                </li>
                <li>
                    <a href="https://theaisummer.com/vision-language-models/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Vision Language models: towards multi-modal deep learning</a>
                </li>
                <li>
                    CVPR2023 Tutorial Talk: <a href="https://www.youtube.com/watch?v=mkI7EPD1vp8" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Large Multimodal Models -- Towards Building and Surpassing Multimodal GPT-4</a>; <a href="https://datarelease.blob.core.windows.net/tutorial/vision_foundation_models_2023/slides/Chunyuan_cvpr2023_tutorial_lmm.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Slides: Large Multimodal Models</a>
                </li>
                <li>
                    CMU course: <a href="https://cmu-multicomp-lab.github.io/mmml-course/fall2022/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">11-777 MMML</a>
                </li>
                <li>
                    Salesforce's <a href="https://github.com/salesforce/LAVIS" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">LAVIS</a>
                </li>
            </ul>
        </Section>
    );
}
