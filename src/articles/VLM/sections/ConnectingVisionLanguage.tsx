import React from 'react';
import Header3 from '../../../components/Header3';
import Paragraph from '../../../components/Paragraph';
import Adapters from './Adapters';
import QFormer from './QFormer';
import PerceiverResampler from './PerceiverResampler';

export default function ConnectingVisionLanguage() {
    return (
        <div className="mt-8">
            <Header3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                Connecting Vision and Language via VLMs
            </Header3>
            <Paragraph className="mb-4 text-gray-700 dark:text-gray-300">
                Vision-Language Models (VLMs) are designed to understand and generate content that combines both visual and textual data. To effectively integrate these two distinct modalities—vision and language—VLMs use specialized mechanisms, such as adapters and linear layers.
            </Paragraph>
            <Paragraph className="mb-4 text-gray-700 dark:text-gray-300">
                This section details popular building blocks that various VLMs utilize to link visual and language input. Let's delve into how these components work in the context of VLMs.
            </Paragraph>
            <Adapters />
            <QFormer />
            <PerceiverResampler />
        </div>
    );
}
