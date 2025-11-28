import React from 'react';

import { getAssetPath } from '../../../utils/assetUtils';
import Header3 from '../../../components/Header3';
import Header4 from '../../../components/Header4';

export default function VLMsForUnderstanding() {
    return (
        <div className="mt-8">
            <Header3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                VLMs for Understanding
            </Header3>

            <div className="space-y-8">
                {/* CLIP */}
                <div>
                    <Header4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        <a href="https://arxiv.org/abs/2103.00020" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                            CLIP
                        </a>
                    </Header4>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            Proposed in <a href="https://arxiv.org/abs/2103.00020" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Learning Transferable Visual Models From Natural Language Supervision</a> by Radford et al. from OpenAI, Contrastive Language-Image Pre-training (CLIP) is a pre-training task which efficiently learns visual concepts from natural language supervision. CLIP uses vision and language encoders trained in isolation and uses a contrastive loss to bring similar image-text pairs closer, while pulling apart dissimilar pairs as a part of pretaining. CLIP's unique aspect is its departure from traditional models reliant on fixed object categories, instead utilizing a massive dataset of 400 million image-text pairs.
                        </li>
                        <li>
                            CLIP's core methodology revolves around a pre-training task using vision and language encoders, which are trained in isolation. These encoders are optimized using a contrastive loss, effectively narrowing the gap between similar image-text pairs while distancing dissimilar ones. This process is crucial for the model's pretraining.
                        </li>
                        <li>
                            The encoders in CLIP are designed to predict the pairing of images with corresponding texts in the dataset. This predictive capability is then harnessed to transform CLIP into a robust zero-shot classifier. For classification, CLIP utilizes captions (e.g., "a photo of a dog") to predict the class of a given image, mirroring the zero-shot capabilities seen in models like GPT-2 and GPT-3.
                        </li>
                        <li>
                            CLIP's architecture consists of an image encoder and a text encoder, both fine-tuned to maximize the cosine similarity of embeddings from the correct pairs and minimize it for incorrect pairings. This structure enhances the efficiency of the model, enabling accurate prediction of pairings from a batch of training examples. The following figure from the paper offers an illustration of CLIP's architecture. While standard image models jointly train an image feature extractor and a linear classifier to predict some label, CLIP jointly trains an image encoder and a text encoder to predict the correct pairings of a batch of <code>(image, text)</code> training examples. At test time the learned text encoder synthesizes a zero-shot linear classifier by embedding the names or descriptions of the target dataset's classes.
                        </li>
                    </ul>
                    <div className="my-4">
                        <img
                            src={getAssetPath("/assets/VLM/CLIP.jpg")}
                            alt="CLIP Architecture"
                            className="w-full rounded-lg shadow-md"
                        />
                    </div>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            The model exhibits exceptional zero-shot transfer capabilities, allowing it to classify images into categories it has never encountered during training, using only category names or descriptions.
                        </li>
                        <li>
                            CLIP has been thoroughly evaluated on over 30 diverse datasets, encompassing tasks from OCR to object classification. It often matches or surpasses fully supervised baselines, despite not receiving dataset-specific training.
                        </li>
                        <li>
                            The paper also explores the impact of prompt engineering and ensembling techniques on zero-shot classification performance. These techniques involve tailoring text prompts for each classification task, providing more context to the model.
                        </li>
                        <li>
                            CLIP's ability to rival the generalization of state-of-the-art ImageNet models is highlighted, thanks to its training on a diverse and extensive dataset. This versatility makes it particularly suitable for zero-shot image classification and cross-modal searches.
                        </li>
                        <li>
                            The innovation of CLIP lies in its capacity to understand and learn from natural language supervision, a much more expansive and adaptable source than traditional methods. This feature positions CLIP as a pivotal tool in computer vision, capable of comprehending and categorizing a broad range of visual concepts with minimal specific training data.
                        </li>
                        <li>
                            OpenAI <a href="https://openai.com/blog/clip/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">article</a>
                        </li>
                    </ul>
                </div>

                {/* MetaCLIP */}
                <div>
                    <Header4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        <a href="https://arxiv.org/abs/2309.16671" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                            MetaCLIP
                        </a>
                    </Header4>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            Proposed in <a href="https://arxiv.org/abs/2309.16671" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Demystifying CLIP Data</a> by Xu et al. from FAIR Meta, NYU, and the University of Washington, MetaCLIP focuses on the Contrastive Language-Image Pre-training (CLIP) approach, which has significantly advanced research in computer vision. The authors believe the key to CLIP's success lies in its data curation rather than its model architecture or pre-training objective.
                        </li>
                        <li>
                            The paper introduces Metadata-Curated Language-Image Pre-training (MetaCLIP), which uses metadata derived from CLIP's concepts to curate a balanced subset from a raw data pool. This method outperforms CLIP on multiple benchmarks, achieving 70.8% accuracy on zero-shot ImageNet classification with ViT-B models and even higher with larger data sets.
                        </li>
                        <li>
                            MetaCLIP's methodology involves creating a balanced subset from a raw data pool using metadata, focusing solely on data impact and excluding other factors. CLIP's Per Radford et al. (2021), WIT400M is curated with an information retrieval method: "... we constructed a new dataset of 400 million (image, text) pairs collected from a variety of publicly available sources on the Internet. To attempt to cover as broad a set of visual concepts as possible, we search for (image, text) pairs as part of the construction process whose text includes one of a set of 500,000 queries We approximately class balance the results by including up to 20,000 (image, text) pairs per query."
                        </li>
                        <li>
                            They start by re-building CLIP's 500,000-query metadata, similar to the procedure laid out in Radford et al. (2021): "The base query list is all words occurring at least 100 times in the English version of Wikipedia. This is augmented with bi-grams with high pointwise mutual information as well as the names of all Wikipedia articles above a certain search volume. Finally all WordNet synsets not already in the query list are added."
                        </li>
                        <li>
                            Experimentation was conducted on CommonCrawl with 400M image-text data pairs, showing significant performance improvements over CLIP's data.
                        </li>
                        <li>
                            The paper presents various model sizes and configurations, exemplified by ViT-H achieving 80.5% without additional modifications.
                        </li>
                        <li>
                            Curation code and training data distribution on metadata are made available, marking a step towards transparency in data curation processes.
                        </li>
                        <li>
                            The study isolates the model and training settings to concentrate on the impact of training data, making several observations about good data quality.
                        </li>
                        <li>
                            MetaCLIP's approach is particularly noted for its scalability and reduction in space complexity, making it adaptable to different data pools and not reliant on external model filters.
                        </li>
                        <li>
                            The paper includes an empirical study on data curation with a frozen model architecture and training schedule, emphasizing the importance of the curation process.
                        </li>
                        <li>
                            The authors' contribution lies in revealing CLIP's data curation approach and providing a more transparent and community-accessible version with MetaCLIP, which significantly outperforms CLIP's data in terms of performance on various standard benchmarks.
                        </li>
                    </ul>
                </div>

                {/* Alpha-CLIP */}
                <div>
                    <Header4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        <a href="https://arxiv.org/abs/2312.03818" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                            Alpha-CLIP
                        </a>
                    </Header4>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            Proposed in <a href="https://arxiv.org/abs/2312.03818" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Alpha-CLIP: A CLIP Model Focusing on Wherever You Want</a>.
                        </li>
                        <li>
                            This paper by Sun et al. from Shanghai Jiao Tong University, Fudan University, The Chinese University of Hong Kong, Shanghai AI Laboratory, University of Macau, and MThreads Inc., introduces Alpha-CLIP, an enhanced version of the CLIP model that focuses on specific image regions.
                        </li>
                        <li>
                            Alpha-CLIP modifies the CLIP image encoder to accommodate an additional alpha channel along with the traditional RGB channels to suggest attentive regions, fine-tuned with millions of RGBA (Red, Green, Blue, Alpha) region-text pairs. This alpha channel is designed to highlight specific regions of interest in the image, guiding the model to focus on relevant parts. Alpha-CLIP incorporates This enables precise control over image contents and maintains the visual recognition ability of CLIP.
                        </li>
                        <li>
                            The structure of the Alpha-CLIP Image Encoder involves integrating the alpha channel with the original CLIP's image encoder. This integration allows the model to process RGBA images, with the alpha channel providing spatial information about the area of interest. Specifically:
                            <ul className="list-disc pl-6 mt-2">
                                <li>
                                    In the CLIP image encoder's ViT structure, an RGB convolution is applied to the image in the first layer. As shown in the figure below, they introduce an additional Alpha Conv layer parallel to the RGB Conv layer, which enables the CLIP image encoder to accept an extra alpha channel as input. The alpha channel input is set to range from [0, 1], where 1 represents the foreground and 0 indicates the background. They initialize the Alpha Conv kernel weights to zero, ensuring that the initial Alpha-CLIP ignores the alpha channel as input. Both conv outputs are combined using element-wise addition as follows:
                                    <code className="block mt-1 p-2 bg-gray-100 dark:bg-gray-800 rounded text-sm">x = self.relu1(self.bn1(self.conv1(x) + self.conv1_alpha(alpha)))</code>
                                </li>
                                <li>
                                    During training, they keep the CLIP text encoder fixed and entirely train the Alpha-CLIP image encoder. Compared to the first convolution layer that processes the alpha channel input, they apply a lower learning rate to the subsequent transformer blocks. To preserve CLIP's global recognition capability for full images, they adopt a specific data sampling strategy during training. They set the sample ratio, denoted as \(r_s\) = 0.1 to occasionally replace their generated RGBA-text pairs with the original image-text pairs and set the alpha channel to full 1.
                                </li>
                            </ul>
                        </li>
                        <li>
                            For training, the Alpha-CLIP utilizes a loss function that combines the original CLIP loss, which is a contrastive loss measuring the alignment between image and text embeddings, with an additional term. This additional term ensures that the model pays more attention to regions highlighted by the alpha channel, thus enhancing its ability to focus on specified areas in the image. This could be achieved by applying a weighted loss mechanism where regions marked by the alpha channel contribute more to the loss calculation, encouraging the model to focus more on these areas.
                        </li>
                        <li>
                            The figure below from the paper shows the pipeline of Alpha-CLIP's data generation method and model architecture. (a) They generate millions of RGBA-region text pairs. (b) Alpha-CLIP modifies the CLIP image encoder to take an additional alpha channel along with RGB.
                        </li>
                    </ul>
                    <div className="my-4">
                        <img
                            src={getAssetPath("/assets/VLM/Alpha-CLIP.jpg")}
                            alt="Alpha-CLIP Architecture"
                            className="w-full rounded-lg shadow-md"
                        />
                    </div>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            The figure below from the paper shows the usage of Alpha-CLIP. Alpha-CLIP can seamlessly replace the original CLIP in a wide range of tasks to allow the whole system to focus on any specified region given by points, strokes or masks. Alpha-CLIP possesses the capability to focus on a specified region and controlled editing. Alpha-CLIP can enhance CLIP's performance on various baselines in a plug-and-play fashion, across various downstream tasks like recognition, MLLM, and 2D/3D generation. Cases marked with are generated with the original CLIP. Cases marked with are generated with Alpha-CLIP. All cases shown here are made simply by replacing the original CLIP of the system with a plug-in Alpha-CLIP without further tuning.
                        </li>
                    </ul>
                    <div className="my-4">
                        <img
                            src={getAssetPath("/assets/VLM/Alpha-CLIP2.jpg")}
                            alt="Alpha-CLIP Usage"
                            className="w-full rounded-lg shadow-md"
                        />
                    </div>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            Experiments demonstrate Alpha-CLIP's superior performance in zero-shot image classification, REC (Referring Expression Comprehension), and open vocabulary detection. It outperforms baselines like MaskCLIP, showing significant improvement in classification accuracy.
                        </li>
                        <li>
                            The model showcases versatility in enhancing region-focused tasks while seamlessly replacing the original CLIP in multiple applications.
                        </li>
                        <li>
                            Future work aims to address limitations like focusing on multiple objects and enhancing the model's resolution for recognizing small objects.
                        </li>
                        <li>
                            <a href="https://aleafy.github.io/alpha-clip" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Code</a>
                        </li>
                    </ul>
                </div>

                {/* GLIP */}
                <div>
                    <Header4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        <a href="https://arxiv.org/abs/2112.03857" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                            GLIP
                        </a>
                    </Header4>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            Proposed in <a href="https://arxiv.org/abs/2112.03857" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Grounded Language-Image Pre-training (GLIP)</a>.
                        </li>
                        <li>
                            This paper by Li et al. from UCLA, Microsoft Research, University of Washington, University of Wisconsin-Madison, Microsoft Cloud and AI, International Digital Economy Academy, presents the GLIP model, a novel approach for learning object-level, language-aware, and semantic-rich visual representations.
                        </li>
                        <li>
                            GLIP innovatively unifies object detection and phrase grounding for pre-training, leveraging 27M grounding data, including 3M human-annotated and 24M web-crawled image-text pairs. This unification allows GLIP to benefit from both data types, improving grounding models and learning from massive image-text pairs.
                        </li>
                        <li>
                            A standout feature of GLIP is its reformulation of object detection as a phrase grounding task, which takes both an image and a text prompt as input. This approach leads to language-aware visual representations and superior transfer learning performance.
                        </li>
                        <li>
                            The model introduces deep fusion between image and text encoders, enabling enhanced phrase grounding performance and making visual features language-aware. This deep fusion significantly contributes to the model's ability to serve various downstream detection tasks.
                        </li>
                        <li>
                            The figure below from the paper shows a unified framework for detection and grounding. Unlike a classical object detection model which predicts a categorical class for each detected object, we reformulate detection as a grounding task by aligning each region/box to phrases in a text prompt. GLIP jointly trains an image encoder and a language encoder to predict the correct pairings of regions and words. They further add the cross-modality deep fusion to early fuse information from two modalities and to learn a language-aware visual representation.
                        </li>
                    </ul>
                    <div className="my-4">
                        <img
                            src={getAssetPath("/assets/VLM/GLIP.jpg")}
                            alt="GLIP Architecture"
                            className="w-full rounded-lg shadow-md"
                        />
                    </div>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            Experimentally, GLIP demonstrates impressive zero-shot and few-shot transferability to multiple object-level recognition tasks, surpassing many supervised baselines on benchmarks like COCO and LVIS. The paper also explores the model's robustness across 13 different object detection tasks, highlighting its versatility.
                        </li>
                        <li>
                            The figure below from the paper shows that GLIP zero-shot transfers to various detection tasks, by writing the categories of interest into a text prompt.
                        </li>
                    </ul>
                    <div className="my-4">
                        <img
                            src={getAssetPath("/assets/VLM/GLIP2.jpg")}
                            alt="GLIP Zero-shot Transfer"
                            className="w-full rounded-lg shadow-md"
                        />
                    </div>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            A key observation is that pre-training with both detection and grounding data is advantageous, enabling significant improvements in rare category detection and overall performance. The model's data efficiency and ability to adapt to various tasks are also emphasized.
                        </li>
                        <li>
                            The authors provide comprehensive implementation details, including model architecture, training strategies, and performance metrics across different datasets, offering valuable insights into the model's practical applications and effectiveness.
                        </li>
                        <li>
                            <a href="https://github.com/microsoft/GLIP" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Code</a>
                        </li>
                    </ul>
                </div>

                {/* ImageBind */}
                <div>
                    <Header4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        <a href="https://arxiv.org/abs/2305.05665" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                            ImageBind
                        </a>
                    </Header4>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            Proposed in <a href="https://arxiv.org/abs/2305.05665" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">ImageBind: One Embedding Space To Bind Them All</a> by Girdhar et al. from Meta in CVPR 2023, ImageBind is an approach to learn a joint embedding across six different modalities - images, text, audio, depth, thermal, and IMU data.
                        </li>
                        <li>
                            They show that all combinations of paired data are not necessary to train such a joint embedding, and only image-paired data is sufficient to bind the modalities together.
                        </li>
                        <li>
                            ImageBind can leverage recent large scale vision-language models, and extends their zero-shot capabilities to new modalities just by using their natural pairing with images. It enables novel emergent applications 'out-of-the-box' including cross-modal retrieval, composing modalities with arithmetic, cross-modal detection, and generation.
                        </li>
                        <li>
                            The emergent capabilities improve with the strength of the image encoder and we set a new state-of-the-art on emergent zero-shot recognition tasks across modalities, outperforming specialist supervised models. Finally, they show strong few-shot recognition results outperforming prior work, and that ImageBind serves as a new way to evaluate vision models for visual and non-visual tasks.
                        </li>
                        <li>
                            This figure below from the paper shows ImageBind's joint embedding space which enables novel multimodal capabilities. By aligning six modalities' embedding into a common space, IMAGEBIND enables: (i) Cross-Modal Retrieval, which shows emergent alignment of modalities such as audio, depth or text, that aren't observed together, (ii) Adding embeddings from different modalities naturally composes their semantics, and (iii) Audio-to-Image generation, by using their audio embeddings with a pre-trained DALLE-2 decoder designed to work with CLIP text embeddings.
                        </li>
                    </ul>
                    <div className="my-4">
                        <img
                            src={getAssetPath("/assets/VLM/ImageBind.jpg")}
                            alt="ImageBind"
                            className="w-full rounded-lg shadow-md"
                        />
                    </div>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            <a href="https://imagebind.metademolab.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Demo</a>; <a href="https://facebookresearch.github.io/ImageBind" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Code</a>
                        </li>
                    </ul>
                </div>

                {/* SigLIP */}
                <div>
                    <Header4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        <a href="https://arxiv.org/abs/2303.15343" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                            SigLIP
                        </a>
                    </Header4>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            Proposed in <a href="https://arxiv.org/abs/2303.15343" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Sigmoid Loss for Language Image Pre-Training</a> by Zhai et al. from Google DeepMind, SigLIP (short for Sigmoid CLIP) is a novel approach to language-image pre-training, by proposing to replace the loss function used in CLIP by a simple pairwise Sigmoid loss. Put simply, SigLIP introduces a Sigmoid loss, contrasting with the softmax normalization used in OpenAI's CLIP, a prior breakthrough in image-text understanding. The pairwise Sigmoid results in better performance in terms of zero-shot classification accuracy on ImageNet.
                        </li>
                        <li>
                            Standard contrastive learning methods, as in CLIP, require softmax normalization, computing similarities across all pairs in a batch. Softmax normalization in standard contrastive learning, including in CLIP, involves calculating the exponential of a score for each image-text pair and dividing it by the sum of exponentials for all pairs in a batch. This process creates a probability distribution over the batch, helping the model to differentiate between correct and incorrect pairs. This approach, while effective, is computationally intensive and sensitive to batch size.
                        </li>
                        <li>
                            SigLIP's Sigmoid loss evaluates image-text pairs independently, allowing for larger batch sizes and better performance in smaller batches. This independence from global pairwise normalization enhances scaling and efficiency.
                        </li>
                        <li>
                            The paper showcases Locked-image Tuning's effectiveness on limited hardware, achieving 84.5% ImageNet zero-shot accuracy with minimal resources.
                        </li>
                        <li>
                            SigLIP's robustness is evident in its superior performance in zero-shot image classification and image-text retrieval tasks, outperforming the traditional softmax approach, especially under data noise and large-scale training.
                        </li>
                        <li>
                            Extensive multilingual experiments involving over 100 languages demonstrate that a 32k batch size is optimal, challenging previous assumptions in large language models like CogVLM or Llava.
                        </li>
                        <li>
                            The research contributes to advancements in multimodal large language models, including applications in generative models, text-based segmentation, object detection, and 3D understanding.
                        </li>
                        <li>
                            <a href="https://huggingface.co/docs/transformers/main/en/model_doc/siglip" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Hugging Face</a>; <a href="https://huggingface.co/collections/google/siglip-659d5e62f0ae1a57ae0e83ba" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Models</a>; <a href="https://github.com/NielsRogge/Transformers-Tutorials/blob/master/SigLIP/Inference_with_(multilingual)_SigLIP%2C_a_better_CLIP_model.ipynb" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Notebook</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
