import React from 'react';
import { GitBranch } from 'lucide-react';
import Section from '../../../components/Section';
import Header4 from '../../../components/Header4';
import Paragraph from '../../../components/Paragraph';

const Taxonomy = () => {
    return (
        <Section title="Taxonomy of Modern MoE Architectures" icon={GitBranch}>
            <Paragraph className="mb-4 text-gray-700 dark:text-gray-300">
                As Mixture-of-Experts architectures have evolved, researchers have introduced a variety of formulations tailored for efficiency, specialization, and scalability across modalities and tasks. Modern MoE systems can be organized into several key categories:
            </Paragraph>

            <div className="space-y-6">
                <div>
                    <Header4 className="font-bold text-gray-900 dark:text-white">Sparse MoE Architectures</Header4>
                    <Paragraph className="text-gray-700 dark:text-gray-300 mt-1">
                        Sparse MoE models activate only a small subset of experts for each input, achieving massive parameter scaling while maintaining computational efficiency.
                    </Paragraph>
                    <ul className="list-disc pl-5 mt-2 text-gray-700 dark:text-gray-300">
                        <li><strong>Switch Transformer</strong> (Fedus et al., 2021): Uses <em>top-1 routing</em> to send each token to a single expert.</li>
                        <li><strong>GLaM</strong> (Du et al., 2021): Extends this with balanced token-to-expert assignments and importance-weighted routing.</li>
                        <li><strong>Mixtral-8×7B</strong> (Mistral AI, 2024): Improves upon Switch's efficiency with optimized load balancing and routing parallelism.</li>
                    </ul>
                </div>

                <div>
                    <Header4 className="font-bold text-gray-900 dark:text-white">Dense-Hybrid MoE Architectures</Header4>
                    <Paragraph className="text-gray-700 dark:text-gray-300 mt-1">
                        Dense-Hybrid models blend the efficiency of sparse MoE layers with the robustness of dense transformer blocks. They selectively introduce MoE layers into deeper or more specialized parts of the network.
                    </Paragraph>
                    <ul className="list-disc pl-5 mt-2 text-gray-700 dark:text-gray-300">
                        <li><strong>T5-MoE</strong> (Zoph et al., 2022): Incorporates sparse experts within the feed-forward layers of T5.</li>
                        <li><strong>DeepSeek-V2</strong> (2024): Introduces hybrid routing within both encoder and decoder stacks.</li>
                    </ul>
                </div>

                <div>
                    <Header4 className="font-bold text-gray-900 dark:text-white">Hierarchical and Structured MoE Architectures</Header4>
                    <Paragraph className="text-gray-700 dark:text-gray-300 mt-1">
                        Hierarchical MoEs introduce multiple layers or levels of routing, enabling structured specialization. Experts can operate at different semantic or abstraction levels (e.g., local vs. global).
                    </Paragraph>
                    <ul className="list-disc pl-5 mt-2 text-gray-700 dark:text-gray-300">
                        <li><strong>Hierarchical Mixture of Experts (HMoE)</strong> (Zhou et al., 2022): Models expert hierarchies explicitly.</li>
                        <li><strong>Sparse-Transformer++</strong> (Xu et al., 2025): Implements multi-stage routing.</li>
                    </ul>
                </div>

                <div>
                    <Header4 className="font-bold text-gray-900 dark:text-white">Joint MoE and Multimodal Architectures</Header4>
                    <Paragraph className="text-gray-700 dark:text-gray-300 mt-1">
                        Joint MoE architectures extend conditional computation to multimodal data, routing inputs from different modalities (text, image, audio) to shared or modality-specific experts.
                    </Paragraph>
                    <ul className="list-disc pl-5 mt-2 text-gray-700 dark:text-gray-300">
                        <li><strong>MoE-LLaVA</strong> (Lin et al., 2024): Adapts LLaVA with sparse experts for visual instruction tuning.</li>
                        <li><strong>Gemini 1.5</strong> (Google, 2024): Uses a massive joint MoE to handle long-context multimodal inputs.</li>
                    </ul>
                </div>
            </div>
        </Section>
    );
};

export default Taxonomy;
