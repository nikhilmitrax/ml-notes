import React from 'react';
import { Settings } from 'lucide-react';
import Section from '../../../components/Section';
import Header3 from '../../../components/Header3';
import Paragraph from '../../../components/Paragraph';

export default function FineTuningProcess() {
    return (
        <Section title="Fine-Tuning Process" icon={Settings}>
            <Paragraph>
                When fine-tuning a VLM, the decision of which layers to fine-tune is guided by the model's architecture and the specific objectives of the fine-tuning task. Here's a detailed breakdown:
            </Paragraph>

            <div className="mt-6">
                <Header3>
                    Vision Encoder Layers
                </Header3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                    <li>
                        <strong>Role:</strong> These layers process and encode the visual input, such as images. They capture features from the visual data that are then used by the model to understand and integrate with text.
                    </li>
                    <li>
                        <strong>When to Fine-Tune:</strong> Fine-tuning these layers is particularly beneficial if the visual data domain of your task differs from the domain on which the model was originally pre-trained. For example, if the model was pre-trained on general image datasets but your task involves medical images or satellite imagery, fine-tuning these layers can help the model better adapt to the new visual domain.
                    </li>
                </ul>
            </div>

            <div className="mt-6">
                <Header3>
                    Language Model (LLM) Layers
                </Header3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                    <li>
                        <strong>Role:</strong> These layers are responsible for processing and encoding textual input, such as captions or descriptions. They interpret and generate text based on the information received from the vision encoder and projection layers.
                    </li>
                    <li>
                        <strong>When to Fine-Tune:</strong> Fine-tuning the LLM layers is crucial when the textual data in your task contains characteristics that differ significantly from the pre-training data. For instance, if your task involves domain-specific language, such as technical jargon or legal terminology, fine-tuning the LLM layers will enable the model to generate and understand text that is more accurate and relevant to that specific domain.
                    </li>
                </ul>
            </div>

            <div className="mt-6">
                <Header3>
                    Projection/Cross-Attention Layers
                </Header3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                    <li>
                        <strong>Role:</strong> In many VLM architectures, projection/cross-attention layers allow the model to integrate and align visual and textual inputs, facilitating the interaction between these modalities.
                    </li>
                    <li>
                        <strong>When to Fine-Tune:</strong> Fine-tuning the projection layers is particularly important for tasks that require a strong correlation between visual and textual data, such as visual question answering, image captioning, or tasks involving multimodal reasoning. These layers adapt the visual features to be compatible with the language model.
                    </li>
                </ul>
            </div>

            <div className="mt-6">
                <Header3>
                    Common Fine-Tuning Strategies
                </Header3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                    <li>
                        <strong>Fine-Tuning the Entire Model:</strong> This involves fine-tuning all layers (vision encoder, LLM, and projection layers). While this approach is resource-intensive, it allows the model to fully adapt to the new task, making it the most comprehensive strategy.
                    </li>
                    <li>
                        <strong>Partial Fine-Tuning:</strong> In this approach, some layers, often the lower layers, are kept frozen to retain the general features learned during pre-training, while others, typically the higher layers or projection layers, are fine-tuned. This reduces computational costs and is effective when the new task is similar to the original pre-training tasks.
                    </li>
                    <li>
                        <strong>Adapter-Based Fine-Tuning:</strong> Instead of fine-tuning the main layers directly, small adapter layers are inserted into the model, and only these adapters are fine-tuned. This is a parameter-efficient approach that allows for task-specific tuning without modifying the original model weights extensively.
                    </li>
                </ul>
            </div>

            <div className="mt-6">
                <Header3>
                    Use of LoRA (Low-Rank Adaptation)
                </Header3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                    <li>
                        <strong>LoRA Application:</strong> LoRA can be applied to any of these layers (Vision Encoder, LLM, or Projection) to introduce efficient, lightweight fine-tuning. By adding trainable low-rank matrices to the existing model parameters, LoRA allows for fine-tuning with minimal additional computational overhead. This approach is particularly useful in scenarios where full model fine-tuning is impractical due to resource constraints.
                    </li>
                </ul>
            </div>

            <div className="mt-6">
                <Header3>
                    Summary
                </Header3>
                <Paragraph>
                    In summary, whether you fine-tune the Vision Encoder layers, LLM layers, or Projection layers depends on the nature of your task:
                </Paragraph>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                    <li>
                        Fine-tune <strong>Vision Encoder Layers</strong> for tasks involving new or different visual domains.
                    </li>
                    <li>
                        Fine-tune <strong>LLM Layers</strong> when dealing with domain-specific textual data.
                    </li>
                    <li>
                        Fine-tune <strong>Projection Layers</strong> for tasks that require strong integration of visual and textual information.
                    </li>
                    <li>
                        <strong>LoRA</strong> can be effectively used to fine-tune these layers in a resource-efficient manner, enabling the model to adapt to new tasks with minimal changes to its original structure.
                    </li>
                </ul>
            </div>
        </Section>
    );
}
