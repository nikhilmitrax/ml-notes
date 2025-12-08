import React from 'react';
import Header3 from '../../../components/Header3';
import Paragraph from '../../../components/Paragraph';

export default function ArchitectureExamples() {
    return (
        <div className="mt-8">
            <Header3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                Examples of Popular VLMs and Their Architectural Choices
            </Header3>
            <Paragraph className="mb-4 text-gray-700 dark:text-gray-300">
                Each of the below models represents a unique approach to integrating and aligning text and image data, showcasing the diverse methodologies within the field of VLMs. The choice of architecture and fusion strategy depends largely on the specific application and the nature of the tasks the model is designed to perform.
            </Paragraph>
            <ol className="list-decimal pl-6 space-y-4 text-gray-700 dark:text-gray-300">
                <li>
                    <strong>CLIP (Contrastive Language--Image Pretraining)</strong>:
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                        <li>
                            <strong>Architecture</strong>: Uses a transformer for text and a ResNet (or a Vision Transformer) for images.
                        </li>
                        <li>
                            <strong>Fusion Strategy</strong>: Late fusion, with a focus on learning a joint embedding space.
                        </li>
                        <li>
                            <strong>Alignment Method</strong>: Trained using contrastive learning, where image-text pairs are aligned in a shared embedding space.
                        </li>
                    </ul>
                </li>
                <li>
                    <strong>DALL-E</strong>:
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                        <li>
                            <strong>Architecture</strong>: Based on the GPT-3 architecture, adapted to handle both text and image tokens.
                        </li>
                        <li>
                            <strong>Fusion Strategy</strong>: Early to intermediate fusion, where text and image features are processed in an intertwined manner.
                        </li>
                        <li>
                            <strong>Alignment Method</strong>: Uses an autoregressive model that understands text and image features in a sequential manner.
                        </li>
                    </ul>
                </li>
                <li>
                    <strong>VisualBERT</strong>:
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                        <li>
                            <strong>Architecture</strong>: A BERT-like model that processes both visual and textual information.
                        </li>
                        <li>
                            <strong>Fusion Strategy</strong>: Intermediate fusion with cross-modal attention mechanisms.
                        </li>
                        <li>
                            <strong>Alignment Method</strong>: Aligns text and image features using attention within a transformer framework.
                        </li>
                    </ul>
                </li>
                <li>
                    <strong>LXMERT (Learning Cross-Modality Encoder Representations from Transformers)</strong>:
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                        <li>
                            <strong>Architecture</strong>: Specifically designed for vision-and-language tasks, uses separate encoders for language and vision, followed by a cross-modality encoder.
                        </li>
                        <li>
                            <strong>Fusion Strategy</strong>: Intermediate fusion with a dedicated cross-modal encoder.
                        </li>
                        <li>
                            <strong>Alignment Method</strong>: Employs cross-modal attention between language and vision encoders.
                        </li>
                    </ul>
                </li>
            </ol>
        </div>
    );
}
