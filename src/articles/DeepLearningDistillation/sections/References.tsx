import React from 'react';
import { BookOpen } from 'lucide-react';
import Section from '../../../components/Section';
import Header3 from '../../../components/Header3';
import Header4 from '../../../components/Header4';
import Paragraph from '../../../components/Paragraph';
import List from '../../../components/List';
import ListItem from '../../../components/ListItem';

const References = () => {
    return (
        <Section title="References" icon={BookOpen}>
            <Header3>Foundational Papers</Header3>
            <List>
                <ListItem>
                    <a href="https://arxiv.org/abs/1503.02531" className="text-blue-600 hover:underline">
                        Hinton et al., "Distilling the Knowledge in a Neural Network" (2015)
                    </a> — The original knowledge distillation paper introducing soft targets and temperature.
                </ListItem>
                <ListItem>
                    <a href="https://arxiv.org/abs/1412.6550" className="text-blue-600 hover:underline">
                        Romero et al., "FitNets: Hints for Thin Deep Nets" (2015)
                    </a> — Feature-based distillation from intermediate layers.
                </ListItem>
                <ListItem>
                    <a href="https://arxiv.org/abs/1612.00847" className="text-blue-600 hover:underline">
                        Zagoruyko & Komodakis, "Paying More Attention to Attention" (2017)
                    </a> — Attention transfer distillation.
                </ListItem>
            </List>

            <Header3>Architecture and Variants</Header3>
            <List>
                <ListItem>
                    <a href="https://arxiv.org/abs/2203.08679" className="text-blue-600 hover:underline">
                        Zhao et al., "Decoupled Knowledge Distillation" (CVPR 2022)
                    </a> — Separating target and non-target class knowledge.
                </ListItem>
                <ListItem>
                    <a href="https://arxiv.org/abs/1805.04770" className="text-blue-600 hover:underline">
                        Furlanello et al., "Born Again Neural Networks" (2018)
                    </a> — Self-distillation with identical architectures.
                </ListItem>
                <ListItem>
                    <a href="https://arxiv.org/abs/1706.00384" className="text-blue-600 hover:underline">
                        Zhang et al., "Deep Mutual Learning" (2018)
                    </a> — Online distillation between peer networks.
                </ListItem>
            </List>

            <Header3>LLM Distillation</Header3>
            <List>
                <ListItem>
                    <a href="https://arxiv.org/abs/2306.08543" className="text-blue-600 hover:underline">
                        Gu et al., "MiniLLM: Knowledge Distillation of Large Language Models" (ICLR 2024)
                    </a> — Reverse KL for text generation.
                </ListItem>
                <ListItem>
                    <a href="https://proceedings.iclr.cc/paper_files/paper/2024/file/5be69a584901a26c521c2b51e40a4c20-Paper-Conference.pdf" className="text-blue-600 hover:underline">
                        Agarwal et al., "On-Policy Distillation of Language Models" (ICLR 2024)
                    </a> — GKD for addressing exposure bias.
                </ListItem>
                <ListItem>
                    <a href="https://arxiv.org/abs/2305.11206" className="text-blue-600 hover:underline">
                        Mukherjee et al., "Orca: Progressive Learning from Complex Explanation Traces" (2023)
                    </a> — Chain-of-thought distillation at scale.
                </ListItem>
                <ListItem>
                    <a href="https://arxiv.org/abs/2305.18290" className="text-blue-600 hover:underline">
                        Rafailov et al., "Direct Preference Optimization" (2023)
                    </a> — Preference distillation without reward models.
                </ListItem>
            </List>

            <Header3>Generative Model Distillation</Header3>
            <List>
                <ListItem>
                    <a href="https://arxiv.org/abs/2311.18828" className="text-blue-600 hover:underline">
                        Yin et al., "One-step Diffusion with Distribution Matching Distillation" (CVPR 2024)
                    </a> — DMD for one-step diffusion.
                </ListItem>
                <ListItem>
                    <a href="https://tianweiy.github.io/dmd2/" className="text-blue-600 hover:underline">
                        Yin et al., "Improved Distribution Matching Distillation (DMD2)" (NeurIPS 2024)
                    </a> — Pure distribution matching with TTUR and GAN integration.
                </ListItem>
                <ListItem>
                    <a href="https://arxiv.org/abs/2511.13649" className="text-blue-600 hover:underline">
                        "Distribution Matching Distillation Meets Reinforcement Learning" (DMDR)
                    </a> — Exceeding teacher quality with RL.
                </ListItem>
                <ListItem>
                    <a href="https://arxiv.org/abs/2303.01469" className="text-blue-600 hover:underline">
                        Song et al., "Consistency Models" (2023)
                    </a> — Self-consistency for fast diffusion sampling.
                </ListItem>
            </List>

            <Header3>Efficiency and Deployment</Header3>
            <List>
                <ListItem>
                    <a href="https://arxiv.org/abs/1910.01108" className="text-blue-600 hover:underline">
                        Sanh et al., "DistilBERT" (2019)
                    </a> — Practical distillation for BERT deployment.
                </ListItem>
                <ListItem>
                    <a href="https://arxiv.org/abs/2305.14314" className="text-blue-600 hover:underline">
                        "QLoRA: Efficient Finetuning of Quantized LLMs" (2023)
                    </a> — Combining quantization with adaptation.
                </ListItem>
            </List>

            <Header3>Surveys and Resources</Header3>
            <List>
                <ListItem>
                    <a href="https://arxiv.org/abs/2006.05525" className="text-blue-600 hover:underline">
                        Gou et al., "Knowledge Distillation: A Survey" (2021)
                    </a> — Comprehensive survey of KD techniques.
                </ListItem>
                <ListItem>
                    <a href="https://huggingface.co/docs/trl/gkd_trainer" className="text-blue-600 hover:underline">
                        HuggingFace TRL: GKD Trainer
                    </a> — Practical implementation of GKD.
                </ListItem>
            </List>
        </Section>
    );
};

export default References;
