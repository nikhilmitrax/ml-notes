import React from 'react';
import Header3 from '../../../components/Header3';
import Paragraph from '../../../components/Paragraph';

export default function ArchitectureDifferences() {
    return (
        <div className="mt-8">
            <Header3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                VLM: Differences from Large Language Models (LLMs)
            </Header3>
            <ol className="list-decimal pl-6 space-y-4 text-gray-700 dark:text-gray-300">
                <li>
                    <strong>Input Modalities</strong>:
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                        <li>
                            <strong>VLMs</strong>: Handle both visual (images) and textual (language) inputs.
                        </li>
                        <li>
                            <strong>LLMs</strong>: Primarily focused on processing and generating textual content.
                        </li>
                    </ul>
                </li>
                <li>
                    <strong>Task Versatility</strong>:
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                        <li>
                            <strong>VLMs</strong>: Capable of tasks that require understanding and correlating information from both visual and textual data, like image captioning, visual storytelling, etc.
                        </li>
                        <li>
                            <strong>LLMs</strong>: Specialize in tasks that involve only text, such as language translation, text generation, question answering purely based on text, etc.
                        </li>
                    </ul>
                </li>
                <li>
                    <strong>Complexity in Integration</strong>: VLMs involve a more complex architecture due to the need to integrate and correlate information from two different modalities (visual and textual), whereas LLMs deal with a single modality.
                </li>
                <li>
                    <strong>Use Cases</strong>: VLMs are particularly useful in scenarios where both visual and textual understanding is crucial, such as in social media analysis, where both image and text content are prevalent. LLMs are more focused on applications like text summarization, chatbots, and content creation where the primary medium is text.
                </li>
            </ol>
            <Paragraph className="mt-4 text-gray-700 dark:text-gray-300">
                In summary, while both VLMs and LLMs are advanced AI models leveraging deep learning, VLMs stand out for their ability to understand and synthesize information from both visual and textual data, offering a broader range of applications that require multimodal understanding.
            </Paragraph>
        </div>
    );
}
