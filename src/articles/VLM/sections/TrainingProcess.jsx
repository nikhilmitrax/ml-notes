import React from 'react';
import { GraduationCap } from 'lucide-react';
import Section from '../../../components/Section';
import { getAssetPath } from '../../../utils/assetUtils';

export default function TrainingProcess() {
    return (
        <Section title="Training Process" icon={GraduationCap}>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
                The diagram below illustrates the structure of a typical vision language model, depicting its components during different phases: pre-training and fine-tuning.
            </p>
            {/* Image placeholder */}
            {/* <img src="/assets/VLM/VLMArch.jpg" alt="VLM Architecture" className="my-4 rounded-lg shadow-md" /> */}
            <div className="mt-4">
                <img
                    src={getAssetPath("/assets/VLM/VLMArch.jpg")}
                    alt="VLM Architecture Diagram"
                    className="rounded-lg shadow-md max-w-full h-auto"
                />
            </div>

            <ol className="list-decimal pl-6 space-y-4 text-gray-700 dark:text-gray-300 mt-4">
                <li>
                    <strong>Image Encoder</strong>:
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                        <li>
                            This component is responsible for processing the input image and encoding it into a feature-rich representation.
                        </li>
                        <li>
                            In both the pre-training and fine-tuning phases, the Image Encoder is used to process the visual information.
                        </li>
                    </ul>
                </li>
                <li>
                    <strong>Multimodal Projector</strong>:
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                        <li>
                            This bridges the gap between the visual information encoded by the Image Encoder and the textual data processed or produced by the Text Decoder.
                        </li>
                        <li>
                            It helps integrate or align the features from both modalities (text and image).
                        </li>
                    </ul>
                </li>
                <li>
                    <strong>Text Decoder (LLM)</strong>:
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                        <li>
                            The Text Decoder generates text outputs based on the combined features provided by the Multimodal Projector.
                        </li>
                        <li>
                            In the pre-training phase, the output is typically a caption that describes the image (Ground Truth Text Output), i.e., the data is in the form of <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">(image, text)</code> pairs. In the fine-tuning phase, the output is an answer or a response to an instruction (Text Output).
                        </li>
                    </ul>
                </li>
                <li>
                    <strong>Text Input</strong>:
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                        <li>
                            In pre-training, the model might receive a question or some form of textual prompt to guide the generation of the image caption.
                        </li>
                        <li>
                            In fine-tuning, the input text could be an instruction or specific question that guides the model to provide a more focused or contextual answer.
                        </li>
                    </ul>
                </li>
                <li>
                    <strong>Frozen vs. Not Frozen Components</strong>:
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                        <li>
                            The diagram indicates that certain parts of the model may be frozen (not updated) during the fine-tuning phase. Typically, this would be the Image Encoder to preserve the learned visual features.
                        </li>
                        <li>
                            While the Multimodal Projector is fine-tuned during both the pre-training and fine-tuning phases, the Text Decoder (LLM) is fine-tuned only during the fine-tuning phase (and kept frozen during pre-training).
                        </li>
                    </ul>
                </li>
            </ol>
            <p className="mt-4 text-gray-700 dark:text-gray-300">
                This structure enables the model to leverage both visual and textual information effectively, adapting to various tasks by fine-tuning specific components.
            </p>
        </Section>
    );
}
