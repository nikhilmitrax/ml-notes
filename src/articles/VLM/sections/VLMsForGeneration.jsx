import React from 'react';

export default function VLMsForGeneration() {
    return (
        <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                VLMs for Generation
            </h3>

            <div className="space-y-12">
                {/* GPT-4V */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        <a href="https://openai.com/research/gpt-4v-system-card" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                            GPT-4V
                        </a>
                    </h4>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            GPT-4 with vision (GPT-4V) enables users to instruct GPT-4 to analyze image inputs provided by the user.
                        </li>
                        <li>
                            In the <a href="https://openai.com/research/gpt-4v-system-card" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">GPT-4V system card</a>, OpenAI has analyzed the safety properties of GPT-4V.
                        </li>
                    </ul>
                </div>

                {/* LLaVA */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        <a href="https://llava-vl.github.io/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                            LLaVA
                        </a>
                    </h4>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            <a href="https://arxiv.org/abs/2304.08485" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">LLaVA</a> is the most popular open-source multimodal framework.
                        </li>
                        <li>
                            Proposed in <a href="https://arxiv.org/abs/2304.08485" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Visual Instruction Tuning</a> by Liu et al. from UW-Madison, Microsoft Research, and Columbia University.
                        </li>
                        <li>
                            Instruction tuning large language models (LLMs) using machine-generated instruction-following data has improved zero-shot capabilities on new tasks, but the idea is less explored in the multimodal field.
                        </li>
                        <li>
                            The paper presents the first attempt to use language-only GPT-4 to generate multimodal language-image instruction-following data. By instruction tuning on such generated data, they introduce Large Language-and-Vision Assistant (LLaVA), an end-to-end trained large multimodal model that connects a vision encoder and LLM for general-purpose visual and language understanding.
                        </li>
                        <li>
                            LLaVA is a minimal extension of the LLaMA series which conditions the model on visual inputs besides just text. The model leverages a pre-trained CLIP's vision encoder to provide image features to the LLM, with a lightweight projection module in between.
                        </li>
                        <li>
                            The model is first pre-trained on image-text pairs to align the features of the LLM and the CLIP encoder, keeping both frozen, and only training the projection layer. Next, the entire model is fine-tuned end-to-end, only keeping CLIP frozen, on visual instruction data to turn it into a multimodal chatbot.
                        </li>
                        <li>
                            Their early experiments show that LLaVA demonstrates impressive multimodel chat abilities, sometimes exhibiting the behaviors of multimodal GPT-4 on unseen images/instructions, and yields a 85.1% relative score compared with GPT-4 on a synthetic multimodal instruction-following dataset.
                        </li>
                    </ul>
                    <div className="mt-4">
                        <img
                            src="/assets/VLM/LLaVA.jpg"
                            alt="LLaVA Architecture"
                            className="rounded-lg shadow-md max-w-full h-auto"
                        />
                        <p className="text-sm text-gray-500 mt-2 text-center">LLaVA Architecture</p>
                    </div>
                </div>

                {/* Frozen */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        <a href="https://arxiv.org/abs/2106.13884" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                            Frozen
                        </a>
                    </h4>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            Proposed in <a href="https://arxiv.org/abs/2106.13884" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Multimodal Few-Shot Learning with Frozen Language Models</a> by Tsimpoukelli et al. from DeepMind.
                        </li>
                        <li>
                            This work introduces a method to transform a pre-trained, frozen language model into a multimodal model capable of few-shot learning.
                        </li>
                        <li>
                            The key idea is to train a vision encoder to represent images as continuous embeddings that are compatible with the language model's input space. This allows the language model to process visual information as if it were text tokens.
                        </li>
                        <li>
                            The vision encoder is trained on image-caption pairs, while the language model remains frozen. This approach leverages the strong few-shot capabilities of large language models and extends them to the visual domain.
                        </li>
                        <li>
                            Frozen demonstrates the ability to perform tasks like visual question answering and few-shot image classification without any task-specific fine-tuning.
                        </li>
                    </ul>
                    <div className="mt-4">
                        <img
                            src="/assets/VLM/Frozen.jpg"
                            alt="Frozen Architecture"
                            className="rounded-lg shadow-md max-w-full h-auto"
                        />
                        <p className="text-sm text-gray-500 mt-2 text-center">Frozen Architecture</p>
                    </div>
                </div>

                {/* Flamingo */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        <a href="https://arxiv.org/abs/2204.14198" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                            Flamingo
                        </a>
                    </h4>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            Proposed in <a href="https://arxiv.org/abs/2204.14198" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Flamingo: a Visual Language Model for Few-Shot Learning</a> by Alayrac et al. from DeepMind.
                        </li>
                        <li>
                            Flamingo is a family of Visual Language Models (VLMs) designed for few-shot learning on a wide range of open-ended vision and language tasks.
                        </li>
                        <li>
                            It bridges powerful pre-trained vision-only and language-only models using novel architectural components: the Perceiver Resampler and Gated Cross-Attention-Dense layers.
                        </li>
                        <li>
                            The Perceiver Resampler converts varying numbers of visual features into a fixed number of visual tokens, while the Gated Cross-Attention layers allow the language model to attend to these visual tokens.
                        </li>
                        <li>
                            Flamingo is trained on a large-scale mixture of complementary multimodal data, including interleaved image/video and text data from the web.
                        </li>
                        <li>
                            It sets a new state-of-the-art in few-shot learning on various benchmarks, often outperforming fine-tuned models with just a few examples.
                        </li>
                    </ul>
                    <div className="mt-4">
                        <img
                            src="/assets/VLM/flamingo.jpg"
                            alt="Flamingo Architecture"
                            className="rounded-lg shadow-md max-w-full h-auto"
                        />
                        <p className="text-sm text-gray-500 mt-2 text-center">Flamingo Architecture</p>
                    </div>
                </div>

                {/* OpenFlamingo */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        <a href="https://laion.ai/blog/open-flamingo/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                            OpenFlamingo
                        </a>
                    </h4>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            <a href="https://laion.ai/blog/open-flamingo/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">OpenFlamingo</a> is an open-source reproduction of the Flamingo model.
                        </li>
                        <li>
                            It aims to provide a transparent and accessible version of Flamingo for the research community.
                        </li>
                        <li>
                            OpenFlamingo replicates the architectural choices and training procedures of Flamingo, offering pre-trained checkpoints and code for training and evaluation.
                        </li>
                    </ul>
                </div>

                {/* Idefics */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        <a href="https://huggingface.co/HuggingFaceM4/idefics-80b-instruct" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                            Idefics
                        </a>
                    </h4>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            <a href="https://github.com/huggingface/m4-logs/blob/master/memos/README.md" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Knowledge sharing memo for IDEFICS, an open-source reproduction of Flamingo</a>
                        </li>
                        <li>
                            <a href="https://huggingface.co/blog/idefics2" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Idefics2: A Powerful 8B Vision-Language Model for the Community</a>
                        </li>
                    </ul>
                    <div className="mt-4 space-y-4">
                        <div>
                            <img
                                src="/assets/VLM/Idefics.png"
                                alt="Idefics Architecture"
                                className="rounded-lg shadow-md max-w-full h-auto"
                            />
                            <p className="text-sm text-gray-500 mt-2 text-center">Idefics Architecture</p>
                        </div>
                        <div>
                            <img
                                src="/assets/VLM/Idefics2.jpg"
                                alt="Idefics2 Architecture"
                                className="rounded-lg shadow-md max-w-full h-auto"
                            />
                            <p className="text-sm text-gray-500 mt-2 text-center">Idefics2 Architecture</p>
                        </div>
                    </div>
                </div>

                {/* PaLI */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        <a href="https://arxiv.org/abs/2209.06794" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                            PaLI
                        </a>
                    </h4>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            Proposed in <a href="https://arxiv.org/abs/2209.06794" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">PaLI: A Jointly-Scaled Multilingual Language-Image Model</a> by Chen et al. from Google Research.
                        </li>
                        <li>
                            PaLI (Pathways Language and Image model) scales both vision and language components jointly to achieve state-of-the-art performance.
                        </li>
                        <li>
                            It uses a ViT-e (Vision Transformer-enormous) for the vision component and a large mT5 encoder-decoder for the language component.
                        </li>
                        <li>
                            PaLI is trained on a massive multilingual dataset of image-text pairs, enabling it to handle tasks in over 100 languages.
                        </li>
                    </ul>
                    <div className="mt-4">
                        <img
                            src="/assets/VLM/PaLI.jpg"
                            alt="PaLI Architecture"
                            className="rounded-lg shadow-md max-w-full h-auto"
                        />
                        <p className="text-sm text-gray-500 mt-2 text-center">PaLI Architecture</p>
                    </div>
                </div>

                {/* PaLM-E */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        <a href="https://arxiv.org/abs/2303.03378" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                            PaLM-E
                        </a>
                    </h4>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            Proposed in <a href="https://arxiv.org/abs/2303.03378" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">PaLM-E: An Embodied Multimodal Language Model</a> by Driess et al. from Google Research.
                        </li>
                        <li>
                            PaLM-E is an embodied multimodal language model that integrates continuous sensor modalities (like images and state estimates) into a large language model.
                        </li>
                        <li>
                            It is designed for robotic tasks, enabling robots to perform complex sequences of actions based on visual and textual instructions.
                        </li>
                        <li>
                            PaLM-E demonstrates positive transfer, where learning from diverse tasks improves performance on individual tasks.
                        </li>
                    </ul>
                    <div className="mt-4">
                        <img
                            src="/assets/VLM/PaLM-E.jpg"
                            alt="PaLM-E Architecture"
                            className="rounded-lg shadow-md max-w-full h-auto"
                        />
                        <p className="text-sm text-gray-500 mt-2 text-center">PaLM-E Architecture</p>
                    </div>
                </div>

                {/* Qwen-VL */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        <a href="https://arxiv.org/abs/2308.12966" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                            Qwen-VL
                        </a>
                    </h4>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            Introduced in <a href="https://arxiv.org/abs/2308.12966" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Qwen-VL: A Frontier Large Vision-Language Model with Versatile Abilities</a>, the Qwen-VL series are a set of large-scale vision-language models designed to perceive and understand both text and images.
                        </li>
                        <li>
                            Comprising Qwen-VL and Qwen-VL-Chat, these models exhibit remarkable performance in tasks like image captioning, question answering, visual localization, and flexible interaction.
                        </li>
                    </ul>
                    <div className="mt-4 space-y-4">
                        <img
                            src="/assets/VLM/Qwen-VL.jpg"
                            alt="Qwen-VL Performance"
                            className="rounded-lg shadow-md max-w-full h-auto"
                        />
                        <img
                            src="/assets/VLM/Qwen-VL_2.jpg"
                            alt="Qwen-VL Chat Examples"
                            className="rounded-lg shadow-md max-w-full h-auto"
                        />
                        <img
                            src="/assets/VLM/Qwen-VL_3.jpg"
                            alt="Qwen-VL Training Pipeline"
                            className="rounded-lg shadow-md max-w-full h-auto"
                        />
                    </div>
                </div>

                {/* Fuyu-8B */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        <a href="https://huggingface.co/adept/fuyu-8b" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                            Fuyu-8B
                        </a>
                    </h4>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            <a href="https://www.adept.ai/blog/fuyu-8b" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Fuyu-8B</a> is a multi-modal text and image transformer trained by Adept AI.
                        </li>
                        <li>
                            Architecturally, Fuyu is a vanilla decoder-only transformer - there is no image encoder. Image patches are instead linearly projected into the first layer of the transformer.
                        </li>
                    </ul>
                    <div className="mt-4">
                        <img
                            src="/assets/VLM/fuyu.png"
                            alt="Fuyu Architecture"
                            className="rounded-lg shadow-md max-w-full h-auto"
                        />
                    </div>
                </div>

                {/* SPHINX */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        SPHINX
                    </h4>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            SPHINX is a versatile multi-modal large language model (MLLM) with a mixer of training tasks, data domains, and visual embeddings.
                        </li>
                    </ul>
                    <div className="mt-4 space-y-4">
                        <img
                            src="/assets/VLM/SPHINX.png"
                            alt="SPHINX Architecture"
                            className="rounded-lg shadow-md max-w-full h-auto"
                        />
                        <img
                            src="/assets/VLM/LongSPHINX.png"
                            alt="LongSPHINX"
                            className="rounded-lg shadow-md max-w-full h-auto"
                        />
                    </div>
                </div>

                {/* MIRASOL3B */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        <a href="https://arxiv.org/abs/2311.05698" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                            MIRASOL3B
                        </a>
                    </h4>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            Proposed in <a href="https://arxiv.org/abs/2311.05698" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">MIRASOL3B: A Multimodal Autoregressive Model for Time-Aligned and Contextual Modalities</a>.
                        </li>
                        <li>
                            It is a multimodal autoregressive model adept at processing time-aligned modalities (audio and video) and non-time-aligned modality (text).
                        </li>
                    </ul>
                    <div className="mt-4">
                        <img
                            src="/assets/VLM/MIRASOL.jpg"
                            alt="MIRASOL3B Architecture"
                            className="rounded-lg shadow-md max-w-full h-auto"
                        />
                    </div>
                </div>

                {/* BLIP */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        <a href="https://arxiv.org/abs/2201.12086" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                            BLIP
                        </a>
                    </h4>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            Proposed in <a href="https://arxiv.org/abs/2201.12086" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">BLIP: Bootstrapping Language-Image Pre-training</a>.
                        </li>
                        <li>
                            BLIP introduces a Multimodal Mixture of Encoder-Decoder (MED) architecture and a Captioning and Filtering (CapFilt) method for effective pre-training.
                        </li>
                    </ul>
                    <div className="mt-4">
                        <img
                            src="/assets/VLM/BLIP.jpg"
                            alt="BLIP Architecture"
                            className="rounded-lg shadow-md max-w-full h-auto"
                        />
                    </div>
                </div>

                {/* BLIP-2 */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        <a href="https://arxiv.org/abs/2301.12597" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                            BLIP-2
                        </a>
                    </h4>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            Proposed in <a href="https://arxiv.org/abs/2301.12597" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">BLIP-2</a>.
                        </li>
                        <li>
                            BLIP-2 utilizes a Q-Former to bridge the gap between frozen image encoders and large language models.
                        </li>
                    </ul>
                    <div className="mt-4 space-y-4">
                        <img
                            src="/assets/VLM/BLIP-2.jpg"
                            alt="BLIP-2 Framework"
                            className="rounded-lg shadow-md max-w-full h-auto"
                        />
                        <img
                            src="/assets/VLM/BLIP-2_1.jpg"
                            alt="Q-Former Architecture"
                            className="rounded-lg shadow-md max-w-full h-auto"
                        />
                        <img
                            src="/assets/VLM/BLIP-2_2.jpg"
                            alt="BLIP-2 Second Stage"
                            className="rounded-lg shadow-md max-w-full h-auto"
                        />
                    </div>
                </div>

                {/* InstructBLIP */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        InstructBLIP
                    </h4>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            Proposed in <a href="https://arxiv.org/abs/2305.06500" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">InstructBLIP</a>.
                        </li>
                        <li>
                            It conducts a systematic study on vision-language instruction tuning based on pre-trained BLIP-2 models.
                        </li>
                    </ul>
                    <div className="mt-4 space-y-4">
                        <img
                            src="/assets/VLM/InstructBLIP.jpg"
                            alt="InstructBLIP Architecture"
                            className="rounded-lg shadow-md max-w-full h-auto"
                        />
                        <img
                            src="/assets/VLM/InstructBLIP2.jpg"
                            alt="InstructBLIP Examples"
                            className="rounded-lg shadow-md max-w-full h-auto"
                        />
                    </div>
                </div>

                {/* MiniGPT-4 */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        <a href="https://arxiv.org/abs/2304.10592" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                            MiniGPT-4
                        </a>
                    </h4>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            Proposed in <a href="https://arxiv.org/abs/2304.10592" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">MiniGPT-4</a>.
                        </li>
                        <li>
                            Aligns visual features with advanced LLMs like Vicuna using a single projection layer.
                        </li>
                    </ul>
                    <div className="mt-4">
                        <img
                            src="/assets/VLM/MiniGPT.jpg"
                            alt="MiniGPT-4 Architecture"
                            className="rounded-lg shadow-md max-w-full h-auto"
                        />
                    </div>
                </div>

                {/* MiniGPT-v2 */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        <a href="https://arxiv.org/abs/2310.09478" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                            MiniGPT-v2
                        </a>
                    </h4>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            Proposed in <a href="https://arxiv.org/abs/2310.09478" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">MiniGPT-v2</a>.
                        </li>
                        <li>
                            Incorporates task-specific identifiers for multi-task learning.
                        </li>
                    </ul>
                    <div className="mt-4 space-y-4">
                        <img
                            src="/assets/VLM/MiniGPT2.jpg"
                            alt="MiniGPT-v2 Architecture"
                            className="rounded-lg shadow-md max-w-full h-auto"
                        />
                        <img
                            src="/assets/VLM/MiniGPT2_2.jpg"
                            alt="MiniGPT-v2 Performance"
                            className="rounded-lg shadow-md max-w-full h-auto"
                        />
                    </div>
                </div>

                {/* LLaVA-Plus */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        <a href="https://llava-vl.github.io/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                            LLaVA-Plus
                        </a>
                    </h4>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            LLaVA-Plus is a general-purpose multimodal assistant that systematically expands capabilities through visual instruction tuning and tool use.
                        </li>
                    </ul>
                    <div className="mt-4 space-y-4">
                        <img
                            src="/assets/VLM/LLaVA-Plus1.jpg"
                            alt="LLaVA-Plus Capabilities"
                            className="rounded-lg shadow-md max-w-full h-auto"
                        />
                        <img
                            src="/assets/VLM/LLaVA-Plus2.jpg"
                            alt="LLaVA-Plus Pipeline"
                            className="rounded-lg shadow-md max-w-full h-auto"
                        />
                    </div>
                </div>

                {/* BakLLaVA */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        <a href="https://huggingface.co/SkunkworksAI/BakLLaVA-1" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                            BakLLaVA
                        </a>
                    </h4>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            BakLLaVA uses a Mistral 7B base augmented with the LLaVA 1.5 architecture.
                        </li>
                    </ul>
                </div>

                {/* LLaVA-1.5 */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        <a href="https://llava-vl.github.io/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                            LLaVA-1.5
                        </a>
                    </h4>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            Introduced in <a href="https://arxiv.org/abs/2310.03744" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Improved Baselines with Visual Instruction Tuning</a>.
                        </li>
                        <li>
                            LLaVA-1.5 achieves state-of-the-art performance with simple modifications like an MLP connector and academic-task-oriented data.
                        </li>
                    </ul>
                    <div className="mt-4">
                        <img
                            src="/assets/VLM/LLaVA-1.5.jpg"
                            alt="LLaVA-1.5 Performance"
                            className="rounded-lg shadow-md max-w-full h-auto"
                        />
                    </div>
                </div>

                {/* CogVLM */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        <a href="https://github.com/THUDM/CogVLM" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                            CogVLM
                        </a>
                    </h4>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            CogVLM integrates a trainable visual expert module with a pretrained language model for deep fusion.
                        </li>
                    </ul>
                    <div className="mt-4 space-y-4">
                        <img
                            src="/assets/VLM/CogVLM2.jpg"
                            alt="CogVLM Architecture"
                            className="rounded-lg shadow-md max-w-full h-auto"
                        />
                        <img
                            src="/assets/VLM/CogVLM1.jpg"
                            alt="CogVLM Performance"
                            className="rounded-lg shadow-md max-w-full h-auto"
                        />
                    </div>
                </div>

                {/* CogVLM 2 */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        <a href="https://github.com/THUDM/CogVLM2" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                            CogVLM 2
                        </a>
                    </h4>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            CogVLM 2 beats GPT4-V, Gemini Pro on TextVQA, DocVQA and ChartQA.
                        </li>
                    </ul>
                </div>

                {/* FERRET */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        <a href="https://arxiv.org/abs/2310.07704" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                            FERRET
                        </a>
                    </h4>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            Proposed in <a href="https://arxiv.org/abs/2310.07704" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">FERRET</a>.
                        </li>
                        <li>
                            Ferret employs a hybrid region representation and spatial-aware visual sampler for referring and grounding.
                        </li>
                    </ul>
                    <div className="mt-4 space-y-4">
                        <img
                            src="/assets/VLM/Ferret2.jpg"
                            alt="Ferret Capabilities"
                            className="rounded-lg shadow-md max-w-full h-auto"
                        />
                        <img
                            src="/assets/VLM/Ferret.jpg"
                            alt="Ferret Architecture"
                            className="rounded-lg shadow-md max-w-full h-auto"
                        />
                    </div>
                </div>

                {/* KOSMOS-1 */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        <a href="https://arxiv.org/abs/2302.14045" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                            KOSMOS-1
                        </a>
                    </h4>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            Proposed in <a href="https://arxiv.org/abs/2302.14045" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Language Is Not All You Need</a>.
                        </li>
                        <li>
                            KOSMOS-1 is an MLLM designed to perceive various modalities, learn in context, and follow instructions.
                        </li>
                    </ul>
                    <div className="mt-4">
                        <img
                            src="/assets/VLM/KOSMOS-1.jpg"
                            alt="KOSMOS-1 Architecture"
                            className="rounded-lg shadow-md max-w-full h-auto"
                        />
                    </div>
                </div>

                {/* KOSMOS-2 */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        <a href="https://arxiv.org/abs/2306.14824" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                            KOSMOS-2
                        </a>
                    </h4>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            Proposed in <a href="https://arxiv.org/abs/2306.14824" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">KOSMOS-2</a>.
                        </li>
                        <li>
                            KOSMOS-2 enhances MLLMs with grounding capabilities using bounding boxes.
                        </li>
                    </ul>
                    <div className="mt-4">
                        <img
                            src="/assets/VLM/Kosmos2.jpg"
                            alt="KOSMOS-2 Capabilities"
                            className="rounded-lg shadow-md max-w-full h-auto"
                        />
                    </div>
                </div>

                {/* OFAMultiInstruct */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        <a href="https://arxiv.org/abs/2212.10773" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                            OFAMultiInstruct
                        </a>
                    </h4>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            Proposed in <a href="https://arxiv.org/abs/2212.10773" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">MultiInstruct</a>.
                        </li>
                        <li>
                            MultiInstruct is a benchmark dataset for multimodal instruction tuning.
                        </li>
                    </ul>
                    <div className="mt-4">
                        <img
                            src="/assets/VLM/MultiInstruct.jpg"
                            alt="MultiInstruct Tasks"
                            className="rounded-lg shadow-md max-w-full h-auto"
                        />
                    </div>
                </div>

                {/* LaVIN */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        <a href="https://arxiv.org/abs/2305.15023" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                            LaVIN
                        </a>
                    </h4>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            Proposed in <a href="https://arxiv.org/abs/2305.15023" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Cheap and Quick</a>.
                        </li>
                        <li>
                            LaVIN utilizes Mixture-of-Modality Adaptation (MMA) for efficient vision-language instruction tuning.
                        </li>
                    </ul>
                    <div className="mt-4 space-y-4">
                        <img
                            src="/assets/VLM/LaVIN.jpg"
                            alt="LaVIN Comparison"
                            className="rounded-lg shadow-md max-w-full h-auto"
                        />
                        <img
                            src="/assets/VLM/LaVIN2.jpg"
                            alt="LaVIN Architecture"
                            className="rounded-lg shadow-md max-w-full h-auto"
                        />
                    </div>
                </div>

                {/* TinyGPT-V */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        <a href="https://arxiv.org/abs/2312.16862" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                            TinyGPT-V
                        </a>
                    </h4>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            Proposed in <a href="https://arxiv.org/abs/2312.16862" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">TinyGPT-V</a>.
                        </li>
                        <li>
                            TinyGPT-V integrates Phi-2 with pre-trained vision modules for efficient multimodal learning.
                        </li>
                    </ul>
                    <div className="mt-4 space-y-4">
                        <img
                            src="/assets/VLM/TinyGPT1.jpg"
                            alt="TinyGPT-V Training"
                            className="rounded-lg shadow-md max-w-full h-auto"
                        />
                        <img
                            src="/assets/VLM/TinyGPT2.jpg"
                            alt="TinyGPT-V Architecture"
                            className="rounded-lg shadow-md max-w-full h-auto"
                        />
                    </div>
                </div>

                {/* CoVLM */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        <a href="https://arxiv.org/abs/2311.03354" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                            CoVLM
                        </a>
                    </h4>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            Proposed in <a href="https://arxiv.org/abs/2311.03354" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">CoVLM</a>.
                        </li>
                        <li>
                            CoVLM introduces communication tokens for dynamic interaction between vision and language systems.
                        </li>
                    </ul>
                    <div className="mt-4 space-y-4">
                        <img
                            src="/assets/VLM/CoVLM.jpg"
                            alt="CoVLM Comparison"
                            className="rounded-lg shadow-md max-w-full h-auto"
                        />
                        <img
                            src="/assets/VLM/CoVLM2.jpg"
                            alt="CoVLM Framework"
                            className="rounded-lg shadow-md max-w-full h-auto"
                        />
                    </div>
                </div>

                {/* FireLLaVA */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        <a href="https://fireworks.ai/blog/firellava-the-first-commercially-permissive-oss-llava-model" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                            FireLLaVA
                        </a>
                    </h4>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            FireLLaVA is the first commercially permissive OSS multi-modality model available under the Llama 2 Community License.
                        </li>
                    </ul>
                </div>

                {/* MoE-LLaVA */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        <a href="https://arxiv.org/abs/2401.15947" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                            MoE-LLaVA
                        </a>
                    </h4>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            Proposed in <a href="https://arxiv.org/abs/2401.15947" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">MoE-LLaVA</a>.
                        </li>
                        <li>
                            MoE-LLaVA employs a Mixture-of-Experts strategy for efficient training and inference.
                        </li>
                    </ul>
                    <div className="mt-4">
                        <img
                            src="/assets/VLM/MoE-LLaVA.jpg"
                            alt="MoE-LLaVA Tuning"
                            className="rounded-lg shadow-md max-w-full h-auto"
                        />
                    </div>
                </div>

                {/* BLIVA */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        <a href="https://arxiv.org/abs/2308.09936" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                            BLIVA
                        </a>
                    </h4>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            Proposed in <a href="https://arxiv.org/abs/2308.09936" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">BLIVA</a>.
                        </li>
                        <li>
                            BLIVA integrates InstructBLIP's query embeddings and LLaVA-inspired encoded patch embeddings.
                        </li>
                    </ul>
                    <div className="mt-4 space-y-4">
                        <img
                            src="/assets/VLM/BLIVA1.jpg"
                            alt="BLIVA Comparison"
                            className="rounded-lg shadow-md max-w-full h-auto"
                        />
                        <img
                            src="/assets/VLM/BLIVA2.jpg"
                            alt="BLIVA Architecture"
                            className="rounded-lg shadow-md max-w-full h-auto"
                        />
                    </div>
                </div>

                {/* PALO */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        <a href="https://arxiv.org/abs/2402.14818" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                            PALO
                        </a>
                    </h4>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            Proposed in <a href="https://arxiv.org/abs/2402.14818" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">PALO</a>.
                        </li>
                        <li>
                            PALO is a polyglot large multimodal model covering ten key languages.
                        </li>
                    </ul>
                    <div className="mt-4 space-y-4">
                        <img
                            src="/assets/VLM/PALO2.jpg"
                            alt="PALO vs English VLMs"
                            className="rounded-lg shadow-md max-w-full h-auto"
                        />
                        <img
                            src="/assets/VLM/PALO.jpg"
                            alt="PALO Architecture"
                            className="rounded-lg shadow-md max-w-full h-auto"
                        />
                    </div>
                </div>

                {/* DeepSeek-VL */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        <a href="https://github.com/deepseek-ai/DeepSeek-VL" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                            DeepSeek-VL
                        </a>
                    </h4>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            DeepSeek-VL is an open-source Vision-Language model designed for real-world applications.
                        </li>
                    </ul>
                    <div className="mt-4">
                        <img
                            src="/assets/VLM/DeepSeek.jpg"
                            alt="DeepSeek-VL Training"
                            className="rounded-lg shadow-md max-w-full h-auto"
                        />
                    </div>
                </div>

                {/* Chameleon */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        <a href="https://arxiv.org/abs/2405.09818" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                            Chameleon
                        </a>
                    </h4>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            Proposed in <a href="https://arxiv.org/abs/2405.09818" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Chameleon: Mixed-Modal Early-Fusion Foundation Models</a> by Meta FAIR.
                        </li>
                        <li>
                            Chameleon is a family of mixed-modal foundation models capable of understanding and generating both images and text in any arbitrary sequence.
                        </li>
                        <li>
                            Unlike late-fusion models, Chameleon uses an early-fusion token-based architecture where all modalities are projected into a shared representation space.
                        </li>
                        <li>
                            This allows for seamless reasoning and generation across modalities.
                        </li>
                    </ul>
                </div>

                {/* Phi-3.5-Vision */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        <a href="https://aka.ms/phi3.5-techblog" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                            Phi-3.5-Vision
                        </a>
                    </h4>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            Phi-3.5-Vision is a lightweight, state-of-the-art open multimodal model built upon datasets which include synthetic data and filtered publicly available websites.
                        </li>
                        <li>
                            The model belongs to the Phi-3 model family, and the multimodal version comes with 128k context length (in tokens) and it supports multiple image inputs.
                        </li>
                    </ul>
                </div>

                {/* Molmo */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        <a href="https://molmo.allenai.org/paper.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                            Molmo
                        </a>
                    </h4>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            Molmo is a family of open vision-language models developed by the Allen Institute for AI.
                        </li>
                        <li>
                            It focuses on high-quality visual understanding and reasoning.
                        </li>
                    </ul>
                </div>

                {/* Pixtral */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        <a href="https://mistral.ai/news/pixtral-12b/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                            Pixtral
                        </a>
                    </h4>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            Pixtral 12B is Mistral AI's first multimodal model.
                        </li>
                        <li>
                            It is a 12 billion parameter model capable of understanding both images and text.
                        </li>
                    </ul>
                </div>

                {/* NVLM */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        <a href="https://arxiv.org/abs/2409.11402" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                            NVLM
                        </a>
                    </h4>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            Proposed in <a href="https://arxiv.org/abs/2409.11402" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">NVLM: Open Frontier-Class Multimodal LLMs</a> by NVIDIA.
                        </li>
                        <li>
                            NVLM is a family of open-source multimodal large language models that achieve state-of-the-art performance on vision-language tasks while maintaining strong text-only capabilities.
                        </li>
                        <li>
                            NVLM-1.0 72B demonstrates performance competitive with proprietary models like GPT-4o and Claude 3.5 Sonnet.
                        </li>
                        <li>
                            <strong>Architectures</strong>: NVLM-D (decoder-only), NVLM-X (cross-attention based), and NVLM-H (hybrid).
                        </li>
                        <li>
                            <strong>Training Process</strong>: Two stages - pretraining (modality alignment) and supervised fine-tuning (SFT).
                        </li>
                        <li>
                            <strong>High-Resolution Handling</strong>: Uses a dynamic high-resolution approach with tile-tagging.
                        </li>
                    </ul>
                </div>

                {/* PaliGemma */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        <a href="https://huggingface.co/blog/paligemma" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                            PaliGemma
                        </a>
                    </h4>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            PaliGemma is a family of vision-language models with an architecture consisting of SigLIP as the image encoder and Gemma-2B as text decoder.
                        </li>
                        <li>
                            Proposed in <a href="https://arxiv.org/abs/2407.07726" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">PaliGemma: A versatile 3B VLM for transfer</a>.
                        </li>
                    </ul>
                    <div className="mt-4">
                        <img
                            src="/assets/VLM/PaliGemma.jpg"
                            alt="PaliGemma Architecture"
                            className="rounded-lg shadow-md max-w-full h-auto"
                        />
                    </div>
                </div>

            </div>
        </div>
    );
}
