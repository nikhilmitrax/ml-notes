import React from 'react';
import ModalityFusionTypes from './visualizers/ModalityFusionTypes';
import TransformerFusion from './visualizers/TransformerFusion';
import ClipTraining from './visualizers/ClipTraining';
import Header3 from '../../../components/Header3';

export default function ArchitectureDetails() {
    return (
        <div className="mt-6">
            <Header3>
                Architecture of Vision-Language Models
            </Header3>
            <ol className="list-decimal pl-6 space-y-4 text-gray-700 dark:text-gray-300">
                <li>
                    <strong>Modality Fusion</strong>:
                    <ModalityFusionTypes />
                </li>
                <li>
                    <strong>Modality Alignment</strong>:
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                        <li>
                            <strong>Cross-Modal Attention</strong>: Models often use attention mechanisms, like transformers, to align elements of one modality (e.g., objects in an image) with elements of another (e.g., words in a sentence). This helps the model understand how specific parts of an image correlate with specific textual elements.
                            <TransformerFusion />
                        </li>
                        <li>
                            <strong>Joint Embedding Space</strong>: Creating a joint/shared representation space where both visual and textual features are projected. This space is designed so that semantically similar concepts from both modalities are close to each other.
                        </li>
                    </ul>
                </li>
                <li>
                    <strong>Training Strategies</strong>:
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                        <li>
                            <strong>Contrastive Learning</strong>: Often used for alignment, this involves training the model to bring closer the representations of text and images that are semantically similar and push apart those that are not.
                            <ClipTraining />
                        </li>
                        <li>
                            <strong>Multi-Task Learning</strong>: Training the model on various tasks (e.g., image captioning, visual question answering) to improve its ability to understand and integrate both modalities.
                        </li>
                    </ul>
                </li>
            </ol>
        </div>
    );
}
