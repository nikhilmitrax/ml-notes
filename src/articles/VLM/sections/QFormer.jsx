import React from 'react';

import { getAssetPath } from '../../../utils/assetUtils';
import Header4 from '../../../components/Header4';
import Paragraph from '../../../components/Paragraph';

export default function QFormer() {
    return (
        <div className="mt-8">
            <Header4>
                Q-Former
            </Header4>
            <Paragraph>
                The Querying Transformer (Q-Former) proposed in <a href="https://arxiv.org/abs/2301.12597" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">BLIP-2: Bootstrapping Language-Image Pre-training with Frozen Image Encoders and Large Language Models</a> is a critical component designed to carry out modality alignment and bridge the gap between a frozen image encoder and a frozen Large Language Model (LLM) in the BLIP-2 framework. Put simply, Q-Former is a trainable module designed to connect a frozen image encoder with a LLM.
            </Paragraph>
            <Paragraph>
                It features two transformer submodules: an image transformer for visual feature extraction from the image encoder, and a text transformer that serves as both text encoder and decoder. The module uses learnable query embeddings for the image transformer, facilitating interactions through self-attention and cross-attention layers with the frozen image features. The queries interact with each other through self-attention layers, and interact with frozen image features through cross-attention layers (inserted every other transformer block). These queries additionally interact with text via the same self-attention layers. The Q-Former is initialized with BERTbase pre-trained weights, while its cross-attention layers are randomly initialized. It comprises 188M parameters and employs 32 queries, each with a dimension of 768. The output query representation is significantly smaller than the frozen image features, allowing the architecture to focus on extracting visual information most relevant to the text.
            </Paragraph>
            <Paragraph>
                Here's an overview of its structure and role.
            </Paragraph>

            <h5 className="text-md font-semibold text-gray-800 dark:text-white mb-2 mt-4">
                Internal Architecture of Q-Former
            </h5>
            <ol className="list-decimal pl-6 space-y-4 text-gray-700 dark:text-gray-300">
                <li>
                    <strong>Two Transformer Submodules</strong>: The Q-Former is composed of two main parts:
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                        <li>
                            <strong>Image Transformer</strong>: This submodule interacts with the frozen image encoder. It is responsible for extracting visual features.
                        </li>
                        <li>
                            <strong>Text Transformer</strong>: This part can function as both a text encoder and a text decoder. It deals with processing and generating text.
                        </li>
                    </ul>
                </li>
                <li>
                    <strong>Learnable Query Embeddings</strong>: Q-Former utilizes a set of learnable query embeddings as input to the image transformer. These queries are designed to interact with the frozen image features through cross-attention layers.
                </li>
                <li>
                    <strong>Shared Self-Attention Layers</strong>: Both the image and text transformers share the same self-attention layers. This design allows the queries to interact with each other and with the text, facilitating a unified processing mechanism.
                </li>
            </ol>

            <h5 className="text-md font-semibold text-gray-800 dark:text-white mb-2 mt-4">
                Q-Former: A Visual Summary
            </h5>
            <Paragraph>
                The following figure from the paper shows the Q-Former architecture. On the left, we see the model architecture of Q-Former, which contains two transformer submodules that share the same self-attention layers: (1) an image transformer that interacts with the frozen image encoder for visual feature extraction; (2) a text transformer that can function as both a text encoder and a text decoder. On the right, we see the model architecture of BLIP-2. A fully connected layer adapts from the output dimension of the Q-Former to the input dimension of the chosen LLM.
            </Paragraph>
            {/* Image placeholder - assuming path needs to be adjusted or image moved */}
            {/* <img src="/assets/VLM/BLIP-2_2.jpg" alt="BLIP-2 Architecture" className="my-4 rounded-lg shadow-md" /> */}
            <div className="mt-4">
                <img
                    src={getAssetPath("/assets/VLM/BLIP-2_2.jpg")}
                    alt="BLIP-2 Architecture"
                    className="rounded-lg shadow-md max-w-full h-auto"
                />
                <p className="text-sm text-gray-500 mt-2 text-center">BLIP-2 Architecture</p>
            </div>

            <h5 className="text-md font-semibold text-gray-800 dark:text-white mb-2 mt-4">
                Role of Q-Former
            </h5>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                    <strong>Bridging Modalities</strong>: The primary function of the Q-Former is to serve as a trainable module that connects the visual information from the image encoder with the linguistic capabilities of the LLM.
                </li>
                <li>
                    <strong>Feature Extraction and Interaction</strong>: It extracts a fixed number of output features from the image encoder, irrespective of the input image resolution, and enables interactions between these visual features and textual components.
                </li>
                <li>
                    <strong>Adapting to Different Pre-training Tasks</strong>: Through its flexible architecture and self-attention masking strategy, the Q-Former can adapt to various pre-training tasks, effectively facilitating the integration of visual and textual data.
                </li>
            </ul>

            <h5 className="text-md font-semibold text-gray-800 dark:text-white mb-2 mt-4">
                Summary
            </h5>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                    To reiterate, the Q-Former in the BLIP-2 framework, as described in the document, comprises two transformer submodules - an image transformer and a text transformer. These submodules share self-attention layers. The image transformer interacts with the frozen image encoder for visual feature extraction, while the text transformer can function both as a text encoder and a text decoder. The Q-Former uses a set number of learnable query embeddings as input to the image transformer, which interacts with frozen image features through cross-attention layers (inserted in every other transformer block) and with the text through self-attention layers. The model applies different self-attention masks to control query-text interaction based on the pre-training task. The Q-Former is initialized with the pre-trained weights of BERTbase, and it contains a total of 188M parameters
                </li>
                <li>
                    In summary, the Q-Former in the BLIP-2 framework plays a pivotal role in merging visual and textual information, making it a key element in enhancing the model's ability to understand and generate contextually relevant responses in multimodal scenarios.
                </li>
            </ul>
        </div>
    );
}
