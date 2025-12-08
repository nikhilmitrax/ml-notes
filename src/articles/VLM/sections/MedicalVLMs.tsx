import React from 'react';

import { getAssetPath } from '../../../utils/assetUtils';
import Header3 from '../../../components/Header3';
import Header4 from '../../../components/Header4';

export default function MedicalVLMs() {
    return (
        <div className="mt-8">
            <Header3>
                Medical VLMs for Generation
            </Header3>

            <div className="space-y-8">
                {/* Med-Flamingo */}
                <div>
                    <Header4>
                        <a href="https://arxiv.org/abs/2307.15189" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                            Med-Flamingo
                        </a>
                    </Header4>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            Proposed in <a href="https://arxiv.org/abs/2307.15189" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Med-Flamingo: a Multimodal Medical Few-shot Learner</a>.
                        </li>
                        <li>
                            Medicine, by its nature, is a multifaceted domain that requires the synthesis of information across various modalities. Medical generative vision-language models (VLMs) make a first step in this direction and promise many exciting clinical applications. However, existing models typically have to be fine-tuned on sizeable down-stream datasets, which poses a significant limitation as in many medical applications data is scarce, necessitating models that are capable of learning from few examples in real-time.
                        </li>
                        <li>
                            This paper by Moor et al. from Stanford University, Stanford Medicine, Hospital Israelita Albert Einstein, and Harvard Medical School proposes Med-Flamingo, a multimodal few-shot learner adapted to the medical domain. Based on OpenFlamingo-9B, they continue pre-training on paired and interleaved medical image-text data from publications and textbooks.
                        </li>
                        <li>
                            The following figure from the paper shows an overview of the Med-Flamingo model using three steps. First, they pre-train their Med-Flamingo model using paired and interleaved image-text data from the general medical domain (sourced from publications and textbooks). They initialize their model at the OpenFlamingo checkpoint continue pre-training on medical image-text data. Second, we perform few-shot generative visual question answering (VQA). For this, we leverage two existing medical VQA datasets, and a new one, Visual USMLE. Third, we conduct a human rater study with clinicians to rate generations in the context of a given image, question and correct answer. The human evaluation was conducted with a dedicated app and results in a clinical evaluation score that serves as their main metric for evaluation.
                        </li>
                    </ul>
                    <div className="my-4">
                        <img
                            src={getAssetPath("/assets/VLM/Med-Flamingo.jpg")}
                            alt="Med-Flamingo"
                            className="w-full rounded-lg shadow-md"
                        />
                    </div>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            Med-Flamingo unlocks few-shot generative medical visual question answering (VQA) abilities, which they evaluate on several datasets including a novel challenging open-ended VQA dataset of visual USMLE-style problems.
                        </li>
                        <li>
                            Furthermore, they conduct the first human evaluation for generative medical VQA where physicians review the problems and blinded generations in an interactive app. Med-Flamingo improves performance in generative medical VQA by up to 20% in clinician's rating and firstly enables multimodal medical few-shot adaptations, such as rationale generation.
                        </li>
                        <li>
                            <a href="https://github.com/mlfoundations/open_flamingo" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Code</a>
                        </li>
                    </ul>
                </div>

                {/* Med-PaLM M */}
                <div>
                    <Header4>
                        <a href="https://arxiv.org/abs/2307.14334" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                            Med-PaLM M
                        </a>
                    </Header4>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            Proposed in <a href="https://arxiv.org/abs/2307.14334" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Towards Generalist Biomedical AI</a> by Tu et al. from Google Research and Google DeepMind, Med-PaLM M is a large multimodal generative model that flexibly encodes and interprets biomedical data including clinical language, imaging, and genomics with the same set of model weights.
                        </li>
                        <li>
                            Medicine is inherently multimodal, with rich data modalities including text, imaging, genomics, and more. Generalist biomedical artificial intelligence (AI) systems that flexibly encode, integrate, and interpret this data at scale hold great potential for impactful applications ranging from scientific discovery to care delivery. To enable the development of such systems, they curate MultiMedBench, a new multimodal biomedical benchmark. MultiMedBench encompasses 14 diverse tasks such as medical question answering, mammography and dermatology image interpretation, radiology report generation and summarization, and genomic variant calling.
                        </li>
                        <li>
                            They train Med-PaLM M by fine-tuning PaLM-E, a pretrained multimodal model, on MultiMedBench.
                        </li>
                        <li>
                            Med-PaLM M reaches performance competitive with or exceeding the state of the art on all MultiMedBench tasks, often surpassing specialist models by a wide margin.
                        </li>
                        <li>
                            They also report zero-shot generalization to novel medical concepts and tasks, positive transfer learning across tasks, and emergent zero-shot medical reasoning.
                        </li>
                        <li>
                            To their knowledge, this work constitutes the first demonstration of a single generalist biomedical AI system that performs competitively on a diverse span of clinical tasks and modalities.
                        </li>
                        <li>
                            The figure below from the paper shows an overview of Med-PaLM M. Med-PaLM M is a large multimodal generative model that flexibly encodes and interprets biomedical data including clinical language, imaging, and genomics with the same set of model weights. Med-PaLM M is a generalist biomedical AI system that performs competitively on a diverse span of clinical tasks and modalities.
                        </li>
                    </ul>
                    <div className="my-4">
                        <img
                            src={getAssetPath("/assets/VLM/Med-PaLM-M.jpg")}
                            alt="Med-PaLM M"
                            className="w-full rounded-lg shadow-md"
                        />
                    </div>
                </div>

                {/* LLaVA-Med */}
                <div>
                    <Header4>
                        <a href="https://arxiv.org/abs/2306.00890" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                            LLaVA-Med
                        </a>
                    </Header4>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            Proposed in <a href="https://arxiv.org/abs/2306.00890" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">LLaVA-Med: Training a Large Language-and-Vision Assistant for Biomedicine in One Day</a> by Li et al. from Microsoft Research, UW-Madison, and Columbia University.
                        </li>
                        <li>
                            Biomedical chat is an emerging field with broad applications. However, training a general-purpose LMM for the biomedical domain is challenging due to the high cost of acquiring large-scale biomedical image-text pairs.
                        </li>
                        <li>
                            This paper proposes a cost-efficient approach for training a large language-and-vision assistant for the biomedical domain, termed LLaVA-Med.
                        </li>
                        <li>
                            The key idea is to leverage the large-scale biomedical figure-caption pairs extracted from PubMed Central to construct a biomedical visual instruction-following dataset.
                        </li>
                        <li>
                            They construct a biomedical visual instruction-following dataset by using GPT-4 to generate diverse instructions from the figure-caption pairs.
                        </li>
                        <li>
                            They then fine-tune LLaVA, a general-purpose LMM, on this dataset to adapt it to the biomedical domain.
                        </li>
                        <li>
                            The figure below from the paper shows the data generation pipeline for LLaVA-Med. They first extract figure-caption pairs from PubMed Central. Then, they use GPT-4 to generate diverse instructions from the figure-caption pairs. Finally, they fine-tune LLaVA on this dataset to adapt it to the biomedical domain.
                        </li>
                    </ul>
                    <div className="my-4">
                        <img
                            src={getAssetPath("/assets/VLM/LLaVA-Med.jpg")}
                            alt="LLaVA-Med"
                            className="w-full rounded-lg shadow-md"
                        />
                    </div>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            LLaVA-Med demonstrates strong performance on biomedical visual question answering (VQA) and visual chat capabilities, outperforming supervised state-of-the-art models on some datasets.
                        </li>
                        <li>
                            The model can be trained in less than 15 hours on 8 A100 GPUs, making it a cost-effective solution for building biomedical LMMs.
                        </li>
                        <li>
                            <a href="https://github.com/microsoft/LLaVA-Med" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Code</a>
                        </li>
                    </ul>
                </div>

                {/* Med-Gemini */}
                <div>
                    <Header4>
                        <a href="https://arxiv.org/abs/2404.18416" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                            Med-Gemini
                        </a>
                    </Header4>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            Proposed in <a href="https://arxiv.org/abs/2404.18416" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Capabilities of Gemini Models in Medicine</a> by Google Research and Google DeepMind.
                        </li>
                        <li>
                            This paper introduces Med-Gemini, a family of highly capable multimodal medical models built upon the Gemini architecture.
                        </li>
                        <li>
                            Med-Gemini inherits Gemini's core capabilities, including long-context reasoning, multimodal understanding, and advanced reasoning, and further refines them for the medical domain.
                        </li>
                        <li>
                            Key features of Med-Gemini include:
                            <ul className="list-disc pl-6 mt-2">
                                <li>
                                    <strong>Advanced Reasoning:</strong> Med-Gemini demonstrates superior performance on complex medical reasoning tasks, surpassing GPT-4 on the MedQA (USMLE) benchmark.
                                </li>
                                <li>
                                    <strong>Multimodal Understanding:</strong> The model can process and interpret various medical modalities, including images, videos, and electronic health records (EHRs).
                                </li>
                                <li>
                                    <strong>Long-Context Processing:</strong> Med-Gemini can handle long medical documents and EHRs, enabling comprehensive analysis of patient history.
                                </li>
                                <li>
                                    <strong>Web Search Integration:</strong> The model can leverage web search to access up-to-date medical information, enhancing its accuracy and reliability.
                                </li>
                            </ul>
                        </li>
                        <li>
                            Med-Gemini achieves state-of-the-art results on 14 medical benchmarks, demonstrating its potential to assist clinicians in diagnosis, treatment planning, and research.
                        </li>
                        <li>
                            The paper also discusses the safety and ethical considerations of deploying such powerful models in healthcare, emphasizing the need for rigorous evaluation and responsible AI practices.
                        </li>
                        <li>
                            <a href="https://research.google/blog/capabilities-of-gemini-models-in-medicine/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Blog</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
