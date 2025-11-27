import React from 'react';
import { BookOpen } from 'lucide-react';
import Section from '../../../components/Section';

const Overview = () => {
    return (
        <Section title="Overview" icon={BookOpen}>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
                Artificial neural networks (ANNs) have become the cornerstone of modern deep learning, providing a powerful mechanism for discovering complex patterns and extracting meaningful insights from massive datasets. However, the performance and expressiveness of such networks often scale with their parameter count — larger models tend to perform better but at the cost of exponentially increasing computational and memory demands.
            </p>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
                <strong>Mixture-of-Experts (MoE)</strong> offers an elegant and efficient solution to this scaling bottleneck. Rather than activating all parameters for every input, MoE adopts a <strong>conditional computation</strong> paradigm — selectively activating only a small subset of "experts" based on the data. This approach allows models to achieve near-linear parameter scaling without a proportional increase in compute cost, making it a cornerstone of today's ultra-large architectures.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-3">Modern Implementations: Hardware-Aware and Domain-Adaptive MoEs</h3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
                The following generation of research, exemplified by <strong>Dropless MoE</strong> by Gale et al. (2022), shifted focus toward <em>hardware-aware sparsity</em>. By reformulating MoE computation as block-sparse matrix operations, Dropless MoE (via the <strong>MegaBlocks</strong> framework) removed routing constraints and improved FLOPs utilization — allowing modern accelerators to exploit MoE sparsity efficiently. This efficiency breakthrough laid the foundation for <strong>industrial-scale distributed MoEs</strong>, particularly those powering multimodal and multilingual systems.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-3">Influence on Next-Generation Models</h3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
                Modern models such as <strong>Mixtral-8×7B</strong>, <strong>DeepSeek-V2</strong>, <strong>Gemini 1.5</strong>, and <strong>Claude 3</strong> continue this lineage by embedding MoE principles not only in feed-forward layers but also in attention and cross-modal fusion mechanisms.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                <li><strong>Mixtral-8×7B</strong> by Mistral AI (2024) integrates expert routing across decoder blocks, combining the efficiency of sparse activation with the expressivity of dense transformers.</li>
                <li><strong>DeepSeek-V2</strong> extends MoE routing into multimodal alignment, using shared experts for vision-language fusion.</li>
                <li><strong>Gemini 1.5</strong> by Google DeepMind (2024) applies hierarchical expert routing to unify text, image, and code understanding — marking one of the first large-scale commercial systems to employ <em>joint MoE</em> across modalities.</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-3">The Continuing Trajectory</h3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
                Across these stages, the Mixture-of-Experts paradigm has evolved from an ensemble-learning curiosity into a <strong>core architectural principle of scalable intelligence</strong>. By selectively activating computation, MoEs align compute expenditure with information complexity — a concept increasingly central to the sustainability and interpretability of trillion-parameter AI systems.
            </p>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
                Future directions now explore <strong>structural routing</strong>, <strong>expert specialization across modalities</strong>, and <strong>dynamic compute allocation</strong>, heralding a new era of adaptable, efficient, and semantically aware expert networks.
            </p>
        </Section>
    );
};

export default Overview;
