import React from 'react';
import { Server } from 'lucide-react';
import Section from '../../../components/Section';
import Header3 from '../../../components/Header3';
import Header4 from '../../../components/Header4';
import Paragraph from '../../../components/Paragraph';
import SideBySide from '../../../components/SideBySide';

const ExpertParallelism = () => {
    return (
        <Section title="Expert Parallelism" icon={Server}>
            <Paragraph className="mb-4 text-gray-700 dark:text-gray-300">
                Training massive MoE models requires specialized parallelism strategies. <strong>Expert Parallelism (EP)</strong> distributes experts across different devices (GPUs/TPUs).
            </Paragraph>

            <SideBySide className="my-6">
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <Header4 className="font-bold text-gray-900 dark:text-white mb-2">Data Parallelism</Header4>
                    <Paragraph variant="small">
                        Replicates the full model on every GPU. Good for small models.
                    </Paragraph>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <Header4 className="font-bold text-blue-900 dark:text-blue-100 mb-2">Expert Parallelism</Header4>
                    <Paragraph variant="small" className="text-blue-800 dark:text-blue-200">
                        Places different experts on different GPUs. Tokens are sent to the GPU hosting their assigned expert.
                    </Paragraph>
                </div>
            </SideBySide>

            <Header3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-3">All-to-All Communication</Header3>
            <Paragraph className="mb-4 text-gray-700 dark:text-gray-300">
                EP introduces a communication bottleneck.
            </Paragraph>
            <ol className="list-decimal pl-5 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
                <li><strong>Dispatch:</strong> Tokens are grouped by expert assignment and sent to the corresponding GPU.</li>
                <li><strong>Compute:</strong> Experts process their assigned tokens.</li>
                <li><strong>Combine:</strong> Results are sent back to the original token location.</li>
            </ol>
            <Paragraph className="mb-4 text-gray-700 dark:text-gray-300">
                This requires high-bandwidth interconnects (like NVLink or TPU interconnects).
            </Paragraph>
        </Section>
    );
};

export default ExpertParallelism;
