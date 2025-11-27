import React from 'react';
import { Shuffle } from 'lucide-react';
import Section from '../../../components/Section';

export default function AnyToAnyVLMs() {
    return (
        <Section title="Any-to-Any VLMs" icon={Shuffle}>

            <div className="space-y-8">
                {/* CoDi */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        <a href="https://arxiv.org/abs/2305.11846" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                            CoDi
                        </a>
                    </h4>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            Proposed in <a href="https://arxiv.org/abs/2305.11846" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Any-to-Any Generation via Composable Diffusion</a> by Tang et al. from UNCC and Microsoft, Composable Diffusion (CoDi) is a state-of-the-art generative model. CoDi uniquely generates any combination of output modalities (language, image, video, audio) from any combination of input modalities.
                        </li>
                        <li>
                            CoDi stands out from existing generative AI systems by its ability to generate multiple modalities in parallel without being limited to specific input modalities. This is achieved by aligning modalities in both input and output space, allowing CoDi to condition on any input combination and generate any group of modalities, including those not present in the training data.
                        </li>
                        <li>
                            The model employs a novel composable generation strategy. This involves building a shared multimodal space by bridging alignment in the diffusion process, enabling the synchronized generation of intertwined modalities, such as temporally aligned video and audio.
                        </li>
                        <li>
                            The following figure from the paper shows CoDi's architecture: (a) they first train individual diffusion models with aligned prompt encoder by "bridging alignments"; (b) diffusion models learn to attend with each other via "latent alignment"; (c) CoDi achieves any-to-any generation with a linear number of training objectives.
                        </li>
                    </ul>
                    <div className="my-4">
                        <img
                            src="/assets/VLM/CoDi.jpg"
                            alt="CoDi Architecture"
                            className="w-full rounded-lg shadow-md"
                        />
                    </div>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            The methodology includes two key stages: training a latent diffusion model (LDM) for each modality and enabling cross-modal generation through a cross-attention module in each diffuser and an environment encoder. These elements project the latent variables of different LDMs into a shared space.
                        </li>
                        <li>
                            The model demonstrates exceptional performance in both single-modality synthesis and joint-modality generation, maintaining coherence and consistency across generated outputs. This includes high fidelity in generating images and videos from various inputs and strong joint-modality generation quality.
                        </li>
                        <li>
                            The process that the model uses to output text tokens is as follows. CoDi involves the use of a Variational Autoencoder (VAE) within the Text Diffusion Model. Specifically:
                            <ul className="list-disc pl-6 mt-2">
                                <li>
                                    <strong>Text VAE Encoder and Decoder:</strong> The text Latent Diffusion Model (LDM) utilizes the OPTIMUS model as its VAE. The encoder and decoder for this text VAE are based on the architectures of BERT and GPT-2, respectively.
                                </li>
                                <li>
                                    <strong>Denoising UNet for Text:</strong> In the denoising process, the UNet architecture is employed. However, unlike in image diffusion where 2D convolutions are used in the residual blocks, the text diffusion model replaces these with 1D convolutions. This adjustment is essential for handling the one-dimensional nature of text data.
                                </li>
                                <li>
                                    <strong>Joint Multimodal Generation:</strong> The final step involves enabling cross-attention between the diffusion flows of different modalities. This is critical for joint generation, i.e., generating outputs that comprise two or more modalities simultaneously, including text.
                                </li>
                                <li>
                                    This process highlights the model's ability to seamlessly integrate text generation within its broader multimodal generative framework, ensuring coherent and contextually aligned outputs across different modalities.
                                </li>
                            </ul>
                        </li>
                        <li>
                            The process for outputting image or speech tokens in the Composable Diffusion (CoDi) model is distinct from the process for text tokens:
                            <ol className="list-decimal pl-6 mt-2">
                                <li>
                                    <strong>Image Tokens</strong>:
                                    <ul className="list-disc pl-6 mt-1">
                                        <li>
                                            <strong>Image VAE Encoder and Decoder</strong>: The image Latent Diffusion Model (LDM) uses a VAE architecture for encoding and decoding. The encoder projects the images into a compressed latent space, and the decoder maps the latent variables back to the image space.
                                        </li>
                                        <li>
                                            <strong>Image Diffusion Model</strong>: Similar to the text model, an image diffusion model is employed. The details of the specific architectures used for the encoder and decoder, however, differ from those used for text.
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Speech Tokens</strong>:
                                    <ul className="list-disc pl-6 mt-1">
                                        <li>
                                            <strong>Audio VAE Encoder and Decoder</strong>: For audio synthesis, the CoDi model employs a VAE encoder to encode the mel-spectrogram of the audio into a compressed latent space. A VAE decoder then maps the latent variable back to the mel-spectrogram.
                                        </li>
                                        <li>
                                            <strong>Vocoder for Audio Generation</strong>: After the mel-spectrogram is reconstructed, a vocoder generates the final audio sample from it. This step is crucial in converting the spectrogram representation back into audible sound.
                                        </li>
                                    </ul>
                                </li>
                            </ol>
                        </li>
                        <li>
                            In summary, while the process for all modalities involves encoding into and decoding from a latent space using a VAE, the specifics of the VAE architectures and the additional steps (like the use of a vocoder for audio) vary depending on whether the modality is text, image, or speech.
                        </li>
                        <li>
                            CoDi is evaluated using datasets like Laion400M, AudioSet, and Webvid10M. The individual LDMs for text, image, video, and audio feature unique mechanisms; for instance, the video diffuser extends the image diffuser with temporal modules, and the audio diffuser uses a VAE encoder for mel-spectrogram encoding.
                        </li>
                        <li>
                            The authors provide comprehensive quantitative and qualitative evaluations, showcasing CoDi's potential for applications requiring simultaneous multimodal outputs.
                        </li>
                        <li>
                            <a href="https://codi-gen.github.io/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Code</a>
                        </li>
                    </ul>
                </div>

                {/* CoDi-2 */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        <a href="https://arxiv.org/abs/2311.18775" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                            CoDi-2
                        </a>
                    </h4>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            Proposed in <a href="https://arxiv.org/abs/2311.18775" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">CoDi-2: In-Context Interleaved and Interactive Any-to-Any Generation</a> by Tang et al. from UC Berkeley, Microsoft Azure AI, Zoom, and UNC Chapel Hill, CoDi-2 is a multimodal generation model that builds upon CoDi.
                        </li>
                        <li>
                            CoDi-2 can seamlessly interpret and generate content in any modality (text, image, audio, video) in an interleaved manner.
                        </li>
                        <li>
                            CoDi-2's architecture features a multimodal encoder that transforms inputs from different modalities into a shared feature space, and a diffusion-based decoder that generates multimodal outputs.
                        </li>
                        <li>
                            The model is trained on a large-scale dataset of interleaved multimodal sequences, enabling it to learn complex cross-modal dependencies and perform in-context learning.
                        </li>
                        <li>
                            CoDi-2 demonstrates impressive capabilities in various tasks, such as multimodal chat, video editing, and audio generation, showcasing its versatility as a general-purpose multimodal assistant.
                        </li>
                        <li>
                            The figure below from the paper shows the architecture of CoDi-2, which comprises a multimodal large language model that encodes interleaved inputs and a diffusion-based decoder that generates multimodal outputs.
                        </li>
                    </ul>
                    <div className="my-4">
                        <img
                            src="/assets/VLM/CoDi-2.jpg"
                            alt="CoDi-2 Architecture"
                            className="w-full rounded-lg shadow-md"
                        />
                    </div>
                    <div className="my-4">
                        <img
                            src="/assets/VLM/CoDi-2_2.jpg"
                            alt="CoDi-2 Examples"
                            className="w-full rounded-lg shadow-md"
                        />
                    </div>
                </div>

                {/* Gemini */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        <a href="https://storage.googleapis.com/deepmind-media/gemini/gemini_1_report.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                            Gemini
                        </a>
                    </h4>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            Proposed in <a href="https://storage.googleapis.com/deepmind-media/gemini/gemini_1_report.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Gemini: A Family of Highly Capable Multimodal Models</a>, Google's Gemini series represents a milestone in AI development.
                        </li>
                        <li>
                            Gemini models are built with a transformative architecture that allows them to seamlessly understand and reason across text, images, audio, video, and code.
                        </li>
                        <li>
                            The figure below from the paper illustrates that Gemini supports interleaved sequences of text, image, audio, and video as inputs.
                        </li>
                    </ul>
                    <div className="my-4">
                        <img
                            src="/assets/VLM/Gemini1.jpg"
                            alt="Gemini Capabilities"
                            className="w-full rounded-lg shadow-md"
                        />
                    </div>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            The training infrastructure for Gemini utilizes Google's latest TPU v4 pods, enabling efficient scaling to massive datasets and model sizes.
                        </li>
                        <li>
                            Gemini Ultra showcases extraordinary capabilities across various benchmarks, outperforming GPT-4 in 30 out of 32 academic benchmarks.
                        </li>
                        <li>
                            The figure below shows Gemini verifying a student's solution to a physics problem. The model can understand the handwritten text and mathematical formulas, identify the error, and provide the correct solution.
                        </li>
                    </ul>
                    <div className="my-4">
                        <img
                            src="/assets/VLM/Gemini2.jpg"
                            alt="Gemini Physics Problem"
                            className="w-full rounded-lg shadow-md"
                        />
                    </div>
                    <div className="my-4">
                        <img
                            src="/assets/VLM/Gemini3.jpg"
                            alt="Gemini Reasoning"
                            className="w-full rounded-lg shadow-md"
                        />
                    </div>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            Gemini outperforms OpenAI's GPT-4 in 30 out of 32 benchmarks. Furthermore, it's worth noting is that Gemini Ultra is the first model to outperform human experts on MMLU (Massive Multitask Language Understanding), achieving a score of 90.0%.
                        </li>
                    </ul>
                    <div className="my-4">
                        <img
                            src="/assets/VLM/Gemini4.jpg"
                            alt="Gemini Performance"
                            className="w-full rounded-lg shadow-md"
                        />
                    </div>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            For image understanding, Gemini Ultra sets new standards by achieving state-of-the-art results on MMMU and other vision-language benchmarks.
                        </li>
                    </ul>
                    <div className="my-4">
                        <img
                            src="/assets/VLM/Gemini5.jpg"
                            alt="Gemini Vision"
                            className="w-full rounded-lg shadow-md"
                        />
                    </div>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            Gemini's training involves Reinforcement Learning from Human Feedback (RLHF) to ensure the model aligns with human values and safety guidelines.
                        </li>
                        <li>
                            Despite its remarkable capabilities, specific details about Gemini's architecture and training data are not fully disclosed in the technical report.
                        </li>
                        <li>
                            Safety and responsibility are central to Gemini's development, with extensive red-teaming and safety evaluations conducted before release.
                        </li>
                        <li>
                            Gemini's capabilities and its development approach reflect Google's commitment to advancing AI responsibly and making it accessible to everyone.
                        </li>
                        <li>
                            <a href="https://blog.google/technology/ai/google-gemini-ai/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Blog</a>
                        </li>
                    </ul>
                </div>

                {/* NExT-GPT */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        <a href="https://arxiv.org/abs/2309.05519" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                            NExT-GPT
                        </a>
                    </h4>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            Proposed in <a href="https://arxiv.org/abs/2309.05519" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">NExT-GPT: Any-to-Any Multimodal LLM</a>.
                        </li>
                        <li>
                            Not all information can be efficiently captured and conveyed with text; as such, multimodal representations will lead to a deeper, more robust understanding of the world.
                        </li>
                        <li>
                            While recently Multimodal Large Language Models (MM-LLMs) have made exciting strides, they mostly fall prey to the limitation of only input-side multimodal understanding, without the ability to produce content in multiple modalities. As they humans always perceive the world and communicate with people through various modalities, developing any-to-any MM-LLMs capable of accepting and delivering content in any modality becomes essential to human-level AI.
                        </li>
                        <li>
                            This paper by Wu et al. from NExT++ at NUS seeks to address this gap and presents an end-to-end general-purpose any-to-any MM-LLM system, NExT-GPT.
                        </li>
                        <li>
                            NExT-GPT is trained on four different modalities in parallel: text, image, audio and video. But more importantly, it can also output any of these modalities. NExT-GPT encompasses Vicuna, a Transformer-decoder LLM, and connects it to different Diffusion Models and Multimodal Adapter research. The former are well-known for their success in Stable Diffusion and Midjourney, the latter is one of the most promising techniques for adding any modality you want to your model. This enables NExT-GPT to perceive inputs and generate outputs in arbitrary combinations of text, images, videos, and audio.
                        </li>
                        <li>
                            By leveraging the existing well-trained highly-performing encoders and decoders, NExT-GPT is tuned with only a small amount of parameter (1%) of certain projection layers, which not only benefits low-cost training and also facilitates convenient expansion to more potential modalities. Moreover, they introduce a modality-switching instruction tuning (MosIT) and manually curate a high-quality dataset for MosIT, based on which NExT-GPT is empowered with complex cross-modal semantic understanding and content generation.
                        </li>
                        <li>
                            Overall, NExT-GPT showcases the promising possibility of building an AI agent capable of modeling universal modalities, paving the way for more human-like AI research in the community.
                        </li>
                        <li>
                            <strong>Architecture</strong>:
                            <ul className="list-disc pl-6 mt-2">
                                <li>
                                    <strong>Multimodal Encoding Stage:</strong> Leveraging existing well-established models to encode inputs of various modalities. Here they adopt ImageBind, which is a unified high-performance encoder across six modalities. Then, via the linear projection layer, different input representations are mapped into language-like representations that are comprehensible to the LLM.
                                </li>
                                <li>
                                    <strong>LLM Understanding and Reasoning Stage:</strong> Vicuna, an LLM, is used as the core agent of NExT-GPT. LLM takes as input the representations from different modalities and carries out semantic understanding and reasoning over the inputs. It outputs 1) the textual responses directly, and 2) signal tokens of each modality that serve as instructions to dictate the decoding layers whether to generate multimodal contents, and what content to produce if yes.
                                </li>
                                <li>
                                    <strong>Multimodal Generation Stage:</strong> Receiving the multimodal signals with specific instructions from LLM (if any), the Transformer-based output projection layers map the signal token representations into the ones that are understandable to following multimodal decoders. Technically, they employ the current off-the-shelf latent conditioned diffusion models of different modal generations, i.e., Stable Diffusion (SD) for image synthesis, Zeroscope for video synthesis, and AudioLDM for audio synthesis.
                                </li>
                                <li>
                                    The following figure from the paper illustrates the fact that by connecting LLM with multimodal adapters and diffusion decoders, NExT-GPT achieves universal multimodal understanding and any-to-any modality input and output.
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <div className="my-4">
                        <img
                            src="/assets/VLM/NExT-GPT1.png"
                            alt="NExT-GPT Architecture"
                            className="w-full rounded-lg shadow-md"
                        />
                    </div>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            <strong>System Inference</strong>:
                            <ul className="list-disc pl-6 mt-2">
                                <li>
                                    The figure below from the paper illustrates the inference procedure of NExT-GPT (grey colors denote the deactivation of the modules). Given certain user inputs of any combination of modalities, the corresponding modal encoders and projectors transform them into feature representations and passed to LLM (except the text inputs, which will be directly fed into LLM). Then, LLM decides what content to generate, i.e., textual tokens, and modality signal tokens. If LLM identifies a certain modality content (except language) to be produced, a special type of token will be output indicating the activation of that modality; otherwise, no special token output means deactivation of that modality. Technically, they design the <code>'&lt;IMGi&gt;'</code> (i=0,...,4) as image signal tokens; <code>'&lt;AUDi&gt;'</code> (i=0,...,8) as audio signal tokens; and <code>'&lt;VIDi&gt;'</code> (i=0,...,24) as video signal tokens. After LLM, the text responses are output to the user; while the representations of the signal tokens of certain activated modalities are passed to the corresponding diffusion decoders for content generation.
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <div className="my-4">
                        <img
                            src="/assets/VLM/NExT-GPT2.png"
                            alt="NExT-GPT Inference"
                            className="w-full rounded-lg shadow-md"
                        />
                    </div>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            <strong>Lightweight Multimodal Alignment Learning</strong>:
                            <ul className="list-disc pl-6 mt-2">
                                <li>
                                    They design the system with mainly three tiers in loose coupling, and they only need to update the two projection layers at encoding side and decoding side.
                                    <ul className="list-disc pl-6 mt-1">
                                        <li>
                                            <strong>Encoding-side LLM-centric Multimodal Alignment:</strong> They align different inputting multimodal features with the text feature space, the representations that are understandable to the core LLM.
                                        </li>
                                        <li>
                                            <strong>Decoding-side Instruction-following Alignment:</strong> They minimize the distance between the LLM's modal signal token representations (after each Transformer-based project layer) and the conditional text representations of the diffusion models. Since only the textual condition encoders are used (with the diffusion backbone frozen), the learning is merely based on the purely captioning texts, i.e., without any visual or audio inputs.
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    The figure below from the paper offers an illustrates of the lightweight multimodal alignment learning of encoding and decoding.
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <div className="my-4">
                        <img
                            src="/assets/VLM/NExT-GPT3.png"
                            alt="NExT-GPT Alignment"
                            className="w-full rounded-lg shadow-md"
                        />
                    </div>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            <strong>Modality-switching Instruction Tuning (MosIT)</strong>:
                            <ul className="list-disc pl-6 mt-2">
                                <li>
                                    Further instruction tuning (IT) is necessary to enhance the capabilities and controllability of LLM. To facilitate the development of any-to-any MM-LLM, they propose a novel Modality-switching Instruction Tuning (MosIT). As illustrated in Figure 4, when an IT dialogue sample is fed into the system, the LLM reconstructs and generates the textual content of input (and represents the multimodal content with the multimodal signal tokens). The optimization is imposed based on gold annotations and LLM's outputs. In addition to the LLM tuning, they also fine-tune the decoding end of NExT-GPT. they align the modal signal token representation encoded by the output projection with the gold multimodal caption representation encoded by the diffusion condition encoder. Thereby, the comprehensive tuning process brings closer to the goal of faithful and effective interaction with users.
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <div className="my-4">
                        <img
                            src="/assets/VLM/NExT-GPT4.png"
                            alt="NExT-GPT MosIT"
                            className="w-full rounded-lg shadow-md"
                        />
                    </div>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            <strong>MosIT Data</strong>:
                            <ul className="list-disc pl-6 mt-2">
                                <li>
                                    All the existing IT datasets fail to meet the requirements for our any-to-any MM-LLM scenario. They thus construct the MosIT dataset of high quality. The data encompasses a wide range of multimodal inputs and outputs, offering the necessary complexity and variability to facilitate the training of MM-LLMs that can handle diverse user interactions and deliver desired responses accurately.
                                </li>
                                <li>
                                    The figure below from the paper offers a summary and comparison of existing datasets for multimodal instruction tuning. T: text, I: image, V: video, A: audio, B: bounding box, PC: point cloud, Tab: table, Web: web page.
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <div className="my-4">
                        <img
                            src="/assets/VLM/NExT-GPT5.png"
                            alt="NExT-GPT Datasets"
                            className="w-full rounded-lg shadow-md"
                        />
                    </div>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            While NExT-GPT isn't the first project that went in this direction, it's arguably the first one that provides a convincing demo and workflow heralding the future of Generative AI.
                        </li>
                        <li>
                            <a href="https://next-gpt.github.io/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Code</a>; <a href="https://452d28ab5aadbe531a.gradio.live/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Demo</a>; <a href="https://github.com/NExT-GPT/NExT-GPT" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Dataset</a>; <a href="https://www.youtube.com/watch?v=aqw2SCWeWD0" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">YouTube</a>.
                        </li>
                    </ul>
                </div>
            </div>
        </Section>
    );
}
