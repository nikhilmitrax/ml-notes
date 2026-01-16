import React from 'react';
import { Zap } from 'lucide-react';
import Section from '../../../components/Section';
import Header3 from '../../../components/Header3';
import Header4 from '../../../components/Header4';
import Paragraph from '../../../components/Paragraph';
import List from '../../../components/List';
import ListItem from '../../../components/ListItem';
import Equation from '../../../components/Equation';
import Callout from '../../../components/Callout';

const GenerativeDistillation = () => {
    return (
        <Section title="Generative Model Distillation" icon={Zap}>
            <Header3>Diffusion Model Distillation</Header3>
            <Paragraph>
                Diffusion models achieve state-of-the-art image quality but require 20-100+ sampling steps for inference. Distillation aims to compress this into 1-4 steps while maintaining quality.
            </Paragraph>

            <Header4>Trajectory Distillation</Header4>
            <Paragraph>
                Match student's single step to teacher's multiple steps:
            </Paragraph>
            <Equation block>
                {`\\mathcal{L}_{trajectory} = \\|G_S(x_T) - \\text{Teacher}_{N\\text{ steps}}(x_T)\\|^2`}
            </Equation>
            <List>
                <ListItem>
                    <strong>Progressive Distillation:</strong> Halve steps iteratively: 256 → 128 → 64 → ... → 1. Each stage trains student to match two teacher steps in one.
                </ListItem>
                <ListItem>
                    <strong>Consistency Models:</strong> Enforce that points on the same trajectory map to the same clean image. Self-consistency constraint.
                </ListItem>
            </List>

            <Header3>Distribution Matching Distillation (DMD)</Header3>
            <Paragraph>
                DMD (Yin et al., CVPR 2024) takes a different approach: match the <strong>output distribution</strong> rather than individual trajectories. The one-step student should produce samples indistinguishable from the teacher's distribution.
            </Paragraph>

            <Header4>Score Function Matching</Header4>
            <Paragraph>
                The key innovation is computing KL divergence gradients via score functions:
            </Paragraph>
            <Equation block>
                {`\\nabla_\\theta \\mathcal{L}_{DMD} \\approx \\mathbb{E}_{z} \\left[ (S_{real}(G_\\theta(z)) - S_{fake}(G_\\theta(z))) \\nabla_\\theta G_\\theta(z) \\right]`}
            </Equation>
            <Paragraph>
                where <Equation>{`S_{real}`}</Equation> is the teacher's score function and <Equation>{`S_{fake}`}</Equation> is trained on student outputs.
            </Paragraph>

            <Header4>DMD v1: Score + Regression</Header4>
            <Paragraph>
                The original DMD combined score matching with a regression term to stabilize training:
            </Paragraph>
            <Equation block>
                {`\\mathcal{L}_{DMD v1} = \\mathcal{L}_{score} + \\lambda \\|G_\\theta(z) - \\text{Teacher}(z)\\|^2`}
            </Equation>
            <Paragraph>
                This required precomputing (noise, image) pairs from the teacher—expensive and limiting.
            </Paragraph>

            <Header4>DMD2: Pure Distribution Matching</Header4>
            <Paragraph>
                DMD2 (NeurIPS 2024 Oral) eliminates the regression loss via:
            </Paragraph>
            <List>
                <ListItem>
                    <strong>Two-Time Scale Update Rule (TTUR):</strong> Update critic faster than generator. Ensures stable score estimates.
                </ListItem>
                <ListItem>
                    <strong>GAN Integration:</strong> Add discriminator loss for perceptual quality. Score matching for distribution coverage; GAN for sharpness.
                </ListItem>
                <ListItem>
                    <strong>Inference-Time Training:</strong> Train on exact inference conditions (pure Gaussian noise input).
                </ListItem>
            </List>
            <Paragraph>
                Results: FID 1.28 on ImageNet (one step), matching or exceeding multi-step teachers.
            </Paragraph>

            <Header3>DMDR: Distribution Matching + Reinforcement Learning</Header3>
            <Paragraph>
                Standard distillation caps student quality at teacher quality. DMDR adds reinforcement learning to <strong>exceed</strong> the teacher:
            </Paragraph>
            <List>
                <ListItem>
                    <strong>Reward Signal:</strong> External quality metric (aesthetics, CLIP alignment, human preference).
                </ListItem>
                <ListItem>
                    <strong>DMD as Regularizer:</strong> Score matching loss prevents reward hacking—keeps generations realistic while optimizing for reward.
                </ListItem>
                <ListItem>
                    <strong>Dynamic Renoise Sampling:</strong> Curriculum over noise levels: high noise (global structure) → low noise (details).
                </ListItem>
            </List>

            <Header3>Adversarial Diffusion Distillation (ADD)</Header3>
            <Paragraph>
                Combines score distillation with adversarial training:
            </Paragraph>
            <Equation block>
                {`\\mathcal{L}_{ADD} = \\mathcal{L}_{SDS} + \\lambda_{adv} \\mathcal{L}_{GAN}`}
            </Equation>
            <Paragraph>
                Score Distillation Sampling (SDS) provides mode coverage; GAN loss provides perceptual sharpness. Used in fast personalized generation (DreamBooth distillation).
            </Paragraph>

            <Header3>Comparison of Diffusion Distillation Methods</Header3>
            <div className="overflow-x-auto my-6">
                <table className="min-w-full text-sm text-left text-slate-700 border border-slate-200">
                    <thead className="text-xs text-slate-800 uppercase bg-slate-100 font-bold">
                        <tr>
                            <th className="px-3 py-2 border-b">Method</th>
                            <th className="px-3 py-2 border-b">Core Objective</th>
                            <th className="px-3 py-2 border-b">Steps</th>
                            <th className="px-3 py-2 border-b">Stability</th>
                            <th className="px-3 py-2 border-b">FID (ImageNet)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b">
                            <td className="px-3 py-2 font-medium">Progressive Distillation</td>
                            <td className="px-3 py-2">Trajectory matching</td>
                            <td className="px-3 py-2">4-8</td>
                            <td className="px-3 py-2">High</td>
                            <td className="px-3 py-2">~4.0</td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-3 py-2 font-medium">Consistency Models</td>
                            <td className="px-3 py-2">Trajectory consistency</td>
                            <td className="px-3 py-2">1-2</td>
                            <td className="px-3 py-2">High</td>
                            <td className="px-3 py-2">~3.5</td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-3 py-2 font-medium">DMD v1</td>
                            <td className="px-3 py-2">Score + Regression</td>
                            <td className="px-3 py-2">1</td>
                            <td className="px-3 py-2">Moderate</td>
                            <td className="px-3 py-2">2.62</td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-3 py-2 font-medium">DMD2</td>
                            <td className="px-3 py-2">Score + GAN (no reg.)</td>
                            <td className="px-3 py-2">1</td>
                            <td className="px-3 py-2">High (TTUR)</td>
                            <td className="px-3 py-2">1.28</td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-3 py-2 font-medium">ADD</td>
                            <td className="px-3 py-2">SDS + GAN</td>
                            <td className="px-3 py-2">1-4</td>
                            <td className="px-3 py-2">Low (GAN)</td>
                            <td className="px-3 py-2">~2.0</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <Callout type="tip" title="Choosing a Diffusion Distillation Method">
                <List>
                    <ListItem><strong>Maximum quality, 1 step:</strong> DMD2</ListItem>
                    <ListItem><strong>Simple, stable training:</strong> Consistency Models</ListItem>
                    <ListItem><strong>Exceed teacher quality:</strong> DMDR</ListItem>
                    <ListItem><strong>Fast personalization:</strong> ADD</ListItem>
                </List>
            </Callout>

            <Header3>Distillation for Other Generative Models</Header3>

            <Header4>GAN Distillation</Header4>
            <Paragraph>
                Compress large GANs (StyleGAN) into smaller ones. Common approach: match intermediate features and discriminator logits in addition to generated outputs.
            </Paragraph>

            <Header4>VAE Distillation</Header4>
            <Paragraph>
                Distill encoder-decoder jointly. Match latent distributions (KL between posteriors) and reconstructions.
            </Paragraph>
        </Section>
    );
};

export default GenerativeDistillation;
