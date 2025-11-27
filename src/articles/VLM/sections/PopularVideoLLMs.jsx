import React from 'react';
import { Video } from 'lucide-react';
import Section from '../../../components/Section';
import { getAssetPath } from '../../../utils/assetUtils';

export default function PopularVideoLLMs() {
    return (
        <Section title="Popular Video LLMs" icon={Video}>
            <div className="space-y-8">
                {/* VideoPoet */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        <a href="https://arxiv.org/abs/2312.14125" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                            VideoPoet
                        </a>
                    </h4>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            Proposed in <a href="https://arxiv.org/abs/2312.14125" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">VideoPoet: A Large Language Model for Zero-Shot Video Generation</a> by Kondratyuk et al. from Google Research.
                        </li>
                        <li>
                            VideoPoet is a large language model (LLM) capable of synthesizing high-quality video from a variety of input signals, including text, images, and video.
                        </li>
                        <li>
                            The model employs a decoder-only transformer architecture that processes multimodal inputs—images, video, and audio—as discrete tokens. This unified vocabulary allows the model to handle various generation tasks seamlessly.
                        </li>
                        <li>
                            VideoPoet uses a two-stage training protocol: pre-training on a massive dataset of video-text pairs and fine-tuning on specific tasks to enhance zero-shot generation capabilities.
                        </li>
                        <li>
                            The model demonstrates state-of-the-art performance in zero-shot video generation, outperforming existing models in terms of video quality and coherence.
                        </li>
                        <li>
                            VideoPoet can also perform video editing, inpainting, and outpainting, showcasing its versatility as a general-purpose video generation tool.
                        </li>
                        <li>
                            <a href="https://sites.research.google/videopoet/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Project Page</a>
                        </li>
                    </ul>
                    <div className="my-4">
                        <img
                            src={getAssetPath("/assets/VLM/VideoPoet1.jpg")}
                            alt="VideoPoet"
                            className="w-full rounded-lg shadow-md"
                        />
                    </div>
                </div>

                {/* LLaMA-VID */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        <a href="https://arxiv.org/abs/2311.17043" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                            LLaMA-VID
                        </a>
                    </h4>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            Proposed in <a href="https://arxiv.org/abs/2311.17043" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">LLaMA-VID: An Image is Worth 2 Tokens in Large Language Models</a> by Li et al. from The Chinese University of Hong Kong and SmartMore.
                        </li>
                        <li>
                            LLaMA-VID addresses the challenge of token efficiency in multimodal language models, specifically for video understanding where long sequences of frames can overwhelm the context window.
                        </li>
                        <li>
                            The core idea is to represent each video frame with only two tokens: a context token and a content token. The context token captures the global visual context, while the content token encodes specific visual details.
                        </li>
                        <li>
                            This efficient representation allows LLaMA-VID to process long videos with minimal computational overhead, enabling it to handle hour-long movies within the context limit of standard LLMs.
                        </li>
                        <li>
                            The model is trained on a large-scale dataset of video-text pairs and demonstrates strong performance on various video understanding benchmarks, including video question answering and captioning.
                        </li>
                        <li>
                            LLaMA-VID achieves competitive results compared to more computationally expensive models, highlighting the effectiveness of its token compression strategy.
                        </li>
                        <li>
                            <a href="https://github.com/dvlab-research/LLaMA-VID" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Code</a>
                        </li>
                    </ul>
                </div>

                {/* Video-LLaMA */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        <a href="https://arxiv.org/abs/2306.02858" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                            Video-LLaMA
                        </a>
                    </h4>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            Proposed in <a href="https://arxiv.org/abs/2306.02858" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Video-LLaMA: An Instruction-tuned Audio-Visual Language Model for Video Understanding</a> by Zhang et al. from DAMO Academy, Alibaba Group.
                        </li>
                        <li>
                            Video-LLaMA is a multimodal framework that empowers Large Language Models (LLMs) with audio-visual understanding capabilities.
                        </li>
                        <li>
                            The model integrates a video encoder and an audio encoder with a frozen LLM (LLaMA) using a multi-branch cross-modal pre-training strategy. This aligns the visual and audio representations with the text embedding space.
                        </li>
                        <li>
                            Video-LLaMA is instruction-tuned on a diverse set of video-instruction data, enabling it to follow user instructions and perform various video-centric tasks such as video captioning, question answering, and audio-visual reasoning.
                        </li>
                        <li>
                            The authors introduce a Video Q-Former to capture temporal information in videos and an Audio Q-Former to handle audio signals, effectively fusing multimodal information for the LLM.
                        </li>
                        <li>
                            Video-LLaMA demonstrates impressive capabilities in understanding and reasoning about complex audio-visual content, bridging the gap between vision, audio, and language.
                        </li>
                        <li>
                            <a href="https://github.com/DAMO-NLP-SG/Video-LLaMA" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Code</a>
                        </li>
                    </ul>
                </div>

                {/* VideoMAE */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        <a href="https://arxiv.org/abs/2203.12602" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                            VideoMAE
                        </a>
                    </h4>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            Proposed in <a href="https://arxiv.org/abs/2203.12602" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">VideoMAE: Masked Autoencoders are Data-Efficient Learners for Self-Supervised Video Pre-training</a> by Tong et al. from Nanjing University, SenseTime Research, and Shanghai AI Laboratory.
                        </li>
                        <li>
                            VideoMAE introduces a masked autoencoder approach for self-supervised video pre-training, inspired by MAE for images.
                        </li>
                        <li>
                            It achieves high masking ratios (e.g., 90%) for video frames, forcing the model to learn robust spatiotemporal representations by reconstructing the masked patches.
                        </li>
                        <li>
                            The model demonstrates strong performance on various downstream video tasks, including action recognition and video retrieval, with significantly less pre-training data compared to previous methods.
                        </li>
                        <li>
                            VideoMAE highlights the effectiveness of masked autoencoding for learning efficient and transferable video representations.
                        </li>
                        <li>
                            <a href="https://github.com/MCG-NJU/VideoMAE" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Code</a>
                        </li>
                    </ul>
                    <div className="my-4">
                        <img
                            src={getAssetPath("/assets/VLM/VideoMAE.jpg")}
                            alt="VideoMAE"
                            className="w-full rounded-lg shadow-md"
                        />
                    </div>
                </div>

                {/* VideoCoCa */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        <a href="https://arxiv.org/abs/2211.09807" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                            VideoCoCa
                        </a>
                    </h4>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            Proposed in <a href="https://arxiv.org/abs/2211.09807" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">VideoCoCa: Video-Text Modeling with Zero-Shot Transfer from Contrastive Captioners</a> by Yan et al. from Google Research.
                        </li>
                        <li>
                            VideoCoCa adapts the Contrastive Captioners (CoCa) model for video-text tasks with minimal training.
                        </li>
                        <li>
                            The model leverages the strong image-text representations learned by CoCa and extends them to the video domain by introducing a lightweight video adaptation module.
                        </li>
                        <li>
                            VideoCoCa achieves state-of-the-art results on several zero-shot video classification and text-to-video retrieval benchmarks, demonstrating the effectiveness of transferring image-text knowledge to videos.
                        </li>
                        <li>
                            The approach is highly efficient, as it reuses the pre-trained CoCa weights and only trains a small number of additional parameters for temporal modeling.
                        </li>
                    </ul>
                </div>

                {/* Video-ChatGPT */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        <a href="https://arxiv.org/abs/2306.05424" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                            Video-ChatGPT
                        </a>
                    </h4>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            Proposed in <a href="https://arxiv.org/abs/2306.05424" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Video-ChatGPT: Towards Detailed Video Understanding via Large Vision and Language Models</a> by Maaz et al. from MBZUAI.
                        </li>
                        <li>
                            Video-ChatGPT is a multimodal model designed to generate detailed and coherent descriptions of videos, as well as answer complex questions about them.
                        </li>
                        <li>
                            The model utilizes a video encoder to extract spatial-temporal features and a linear projection layer to map these features to the LLM's input space.
                        </li>
                        <li>
                            It is fine-tuned on a newly curated dataset of high-quality video-instruction pairs, which are generated using a semi-automatic annotation pipeline involving human assistance and off-the-shelf vision models.
                        </li>
                        <li>
                            The authors also introduce a quantitative evaluation framework for video captioning and QA, addressing the lack of robust metrics for open-ended video generation tasks.
                        </li>
                        <li>
                            <a href="https://github.com/mbzuai-oryx/Video-ChatGPT" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Code</a>
                        </li>
                    </ul>
                </div>

                {/* Verbalize Videos */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        <a href="https://arxiv.org/abs/2308.12879" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                            Verbalize Videos
                        </a>
                    </h4>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            Proposed in <a href="https://arxiv.org/abs/2308.12879" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">LlaVA-Hound: Exploring the Boundaries of Video-LLMs</a> by Zhang et al.
                        </li>
                        <li>
                            This work investigates the capabilities of Video-LLMs in verbalizing video content, focusing on temporal understanding and detailed description generation.
                        </li>
                        <li>
                            The authors propose LlaVA-Hound, a model trained to detect and describe events in videos with high temporal precision.
                        </li>
                        <li>
                            They introduce a new dataset and evaluation benchmark to assess the model's ability to localize and describe actions and events in videos.
                        </li>
                        <li>
                            The study reveals that while current Video-LLMs are good at general understanding, they struggle with fine-grained temporal localization and detailed event description, highlighting directions for future research.
                        </li>
                    </ul>
                </div>

                {/* Emu2 */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        <a href="https://arxiv.org/abs/2312.10840" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                            Emu2
                        </a>
                    </h4>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            Proposed in <a href="https://arxiv.org/abs/2312.10840" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Generative Multimodal Models are In-Context Learners</a> by Sun et al. from BAAI.
                        </li>
                        <li>
                            Emu2 is a generative multimodal model that demonstrates strong in-context learning capabilities for both multimodal understanding and generation tasks.
                        </li>
                        <li>
                            The model is trained with a unified autoregressive objective on a massive dataset of interleaved image-text and video-text sequences.
                        </li>
                        <li>
                            Emu2 can perform a wide range of tasks, including visual question answering, image captioning, and text-to-image/video generation, by simply prompting it with a few examples in context.
                        </li>
                        <li>
                            It achieves state-of-the-art performance on several few-shot multimodal benchmarks, showcasing the power of in-context learning for generative multimodal models.
                        </li>
                        <li>
                            <a href="https://github.com/baaivision/Emu" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Code</a>
                        </li>
                    </ul>
                </div>

                {/* LLaVA-NeXT (Video) */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        <a href="https://llava-vl.github.io/blog/2024-04-30-llava-next-video/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                            LLaVA-NeXT (Video)
                        </a>
                    </h4>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            Proposed in <a href="https://llava-vl.github.io/blog/2024-04-30-llava-next-video/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">LLaVA-NeXT: A Strong Zero-shot Video Understanding Model</a>.
                        </li>
                        <li>
                            This work extends the LLaVA-NeXT framework to the video domain, leveraging the strong image understanding capabilities of LLaVA-NeXT for zero-shot video reasoning.
                        </li>
                        <li>
                            The model treats video frames as a sequence of images and processes them using the LLaVA-NeXT architecture, enabling it to answer questions about video content without specific video training.
                        </li>
                        <li>
                            LLaVA-NeXT (Video) demonstrates impressive performance on zero-shot video QA benchmarks, showing that strong image models can be effectively adapted for video understanding.
                        </li>
                        <li>
                            <a href="https://github.com/LLaVA-VL/LLaVA-NeXT" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Code</a>
                        </li>
                    </ul>
                </div>

                {/* VideoCLIP */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        <a href="https://arxiv.org/abs/2109.14084" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                            VideoCLIP
                        </a>
                    </h4>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            Proposed in <a href="https://arxiv.org/abs/2109.14084" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">VideoCLIP: Contrastive Pre-training for Zero-shot Video-Text Understanding</a> by Xu et al. from Facebook AI.
                        </li>
                        <li>
                            VideoCLIP adapts the CLIP paradigm to the video domain, learning aligned video and text representations via contrastive pre-training.
                        </li>
                        <li>
                            The model introduces a novel sampling strategy to handle the temporal dimension of videos and a transformer-based video encoder to capture spatiotemporal features.
                        </li>
                        <li>
                            VideoCLIP achieves state-of-the-art results on zero-shot video-text retrieval and video classification tasks, demonstrating the effectiveness of contrastive learning for video understanding.
                        </li>
                        <li>
                            <a href="https://github.com/facebookresearch/FairSeq/tree/main/examples/MMPT" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Code</a>
                        </li>
                    </ul>
                </div>
            </div>
        </Section>
    );
}
