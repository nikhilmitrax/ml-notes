import React from 'react';

export default function PerceiverResampler() {
    return (
        <div className="mt-8">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Perceiver Resampler
            </h4>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
                The Perceiver Resampler, utilized in the <a href="https://arxiv.org/abs/2204.14198" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Flamingo: a Visual Language Model for Few-Shot Learning</a> is an integral component designed to efficiently bridge the gap between vision and language processing in the model. Here's a breakdown of its composition and role:
            </p>

            <h5 className="text-md font-semibold text-gray-800 dark:text-white mb-2 mt-4">
                Composition of Perceiver Resampler
            </h5>
            <ol className="list-decimal pl-6 space-y-4 text-gray-700 dark:text-gray-300">
                <li>
                    <strong>Function</strong>: The Perceiver Resampler's primary function is to take a variable number of image or video features from the vision encoder and convert them into a fixed number of visual outputs.
                </li>
                <li>
                    <strong>Output Generation</strong>: It produces 64 visual outputs regardless of the input size.
                </li>
                <li>
                    <strong>Reducing Computational Complexity</strong>: By converting varying-size large feature maps into a few visual tokens, it significantly reduces the computational complexity involved in vision-text cross-attention.
                </li>
                <li>
                    <strong>Latent Input Queries</strong>: Similar to the Perceiver and DETR models, it utilizes a predefined number of latent input queries. These queries are fed to a Transformer module.
                </li>
                <li>
                    <strong>Cross-Attention Mechanism</strong>: The latent queries cross-attend to the visual features, facilitating the integration of visual information into the language processing workflow.
                </li>
            </ol>

            <h5 className="text-md font-semibold text-gray-800 dark:text-white mb-2 mt-4">
                Flamingo: A Visual Summary
            </h5>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
                The following figure from the paper shows the Flamingo architecture overview.
            </p>
            {/* Image placeholder */}
            {/* <img src="/assets/VLM/flamingo2.jpg" alt="Flamingo Architecture" className="my-4 rounded-lg shadow-md" /> */}
            <div className="mt-4">
                <img
                    src="/assets/VLM/flamingo2.jpg"
                    alt="Flamingo Architecture"
                    className="rounded-lg shadow-md max-w-full h-auto"
                />
                <p className="text-sm text-gray-500 mt-2 text-center">Flamingo Architecture</p>
            </div>

            <h5 className="text-md font-semibold text-gray-800 dark:text-white mb-2 mt-4">
                Role of Perceiver Resampler
            </h5>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                    <strong>Connecting Vision and Language Models</strong>: It serves as a crucial link between the vision encoder and the frozen language model, enabling the model to process and integrate visual data efficiently.
                </li>
                <li>
                    <strong>Efficiency and Performance</strong>: The Perceiver Resampler enhances the model's ability to handle vision-language tasks more effectively compared to using a plain Transformer or a Multilayer Perceptron (MLP).
                </li>
            </ul>

            <h5 className="text-md font-semibold text-gray-800 dark:text-white mb-2 mt-4">
                Summary
            </h5>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                    To recap, the Perceiver Resampler is designed to convert varying-size large feature maps into a smaller number of visual tokens, thus reducing the computational complexity in vision-text cross-attention. It employs a set of latent input queries that interact with visual features through a Transformer, facilitating efficient integration of visual and textual data. In essence, the Perceiver Resampler plays a pivotal role in reducing the complexity of handling large visual data and efficiently integrating it with language processing, thereby enhancing the overall capability of the model in multimodal tasks.
                </li>
            </ul>
        </div>
    );
}
