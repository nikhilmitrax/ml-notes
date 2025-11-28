import React from 'react';
import { Layers } from 'lucide-react';
import Section from '../../../components/Section';
import Header3 from '../../../components/Header3';
import Paragraph from '../../../components/Paragraph';

const MoEBeyondMLP = () => {
    return (
        <Section title="MoE Beyond MLP Layers" icon={Layers}>
            <Paragraph className="mb-4 text-gray-700 dark:text-gray-300">
                While most MoEs apply sparsity to the Feed-Forward Network (FFN), recent works extend it to other components.
            </Paragraph>

            <Header3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-3">Mixture of Attention (MoA)</Header3>
            <Paragraph className="mb-4 text-gray-700 dark:text-gray-300">
                Replaces the standard self-attention layer with multiple attention experts. Each expert might specialize in different context lengths or dependency types (syntactic vs. semantic).
            </Paragraph>

            <Header3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-3">Vision MoE (V-MoE)</Header3>
            <Paragraph className="mb-4 text-gray-700 dark:text-gray-300">
                Applies MoE to Vision Transformers (ViT). Riquelme et al. (2021) showed that sparse ViTs scale effectively to 15B parameters.
            </Paragraph>
            <Paragraph className="mb-4 text-gray-700 dark:text-gray-300">
                <strong>CuMo</strong> (Li et al., 2024) integrates MoE into the vision encoder and MLP connector of multimodal LLMs, improving visual grounding.
            </Paragraph>
        </Section>
    );
};

export default MoEBeyondMLP;
