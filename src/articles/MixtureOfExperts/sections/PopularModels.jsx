import React from 'react';
import { FileText } from 'lucide-react';
import Section from '../../../components/Section';

const PopularModels = () => {
    return (
        <Section title="Popular MoE Models" icon={FileText}>
            <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Switch Transformer (Google, 2021)</h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Scaled to 1.6 trillion parameters using <strong>Top-1 routing</strong>. Simplified the routing mechanism to reduce communication overhead.
                    </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Mixtral 8x7B (Mistral AI, 2024)</h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        A high-performing open-weights model. Uses 8 experts with Top-2 routing. 47B total parameters, but only ~13B active per token. Matches Llama 2 70B performance.
                    </p>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">DeepSeek-V2 (2024)</h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Introduced <strong>Multi-Head Latent Attention (MLA)</strong> and DeepSeekMoE. Uses fine-grained experts (many small experts) to improve specialization and efficiency.
                    </p>
                </div>

                <div className="border-l-4 border-orange-500 pl-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">MegaBlocks (Stanford/Databricks, 2022)</h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Not a model, but a system. Enables <strong>dropless MoE training</strong> by using block-sparse GPU kernels to handle variable-length sequences efficiently.
                    </p>
                </div>

                <div className="border-l-4 border-red-500 pl-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">QMoE (2023)</h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        A compression framework that quantizes MoE models to <strong>&lt;1 bit per parameter</strong>, enabling trillion-parameter models to run on commodity hardware.
                    </p>
                </div>
            </div>
        </Section>
    );
};

export default PopularModels;
