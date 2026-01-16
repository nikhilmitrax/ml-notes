import React from 'react';
import { FileText } from 'lucide-react';
import Section from '../../../components/Section';
import Header3 from '../../../components/Header3';
import Paragraph from '../../../components/Paragraph';

const References = () => {
    return (
        <Section title="References" icon={FileText}>
            <Paragraph>
                This article draws on the following key papers and resources. Papers are grouped by method family.
            </Paragraph>

            <Header3>Foundational Work</Header3>
            <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                <li>
                    <strong>Deep Residual Learning for Image Recognition</strong> (He et al., 2015) — The original ResNet paper introducing skip connections.
                </li>
                <li>
                    <strong>Identity Mappings in Deep Residual Networks</strong> (He et al., 2016) — Analysis of Pre-activation ResNets and the importance of identity shortcuts.
                </li>
                <li>
                    <strong>Attention Is All You Need</strong> (Vaswani et al., 2017) — Original Transformer with Post-LN.
                </li>
            </ul>

            <Header3>Fixed Residual Scaling</Header3>
            <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                <li>
                    <strong>DeepNet: Scaling Transformers to 1,000 Layers</strong> (Wang et al., 2022) — DeepNorm with theoretically-derived scaling constants.
                </li>
                <li>
                    <strong>BranchNorm: Dynamic Residual Scaling for Deep Transformers</strong> (Wang et al., 2023) — Time-varying scaling that transitions during training.
                </li>
            </ul>

            <Header3>Normalization-Free Methods</Header3>
            <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                <li>
                    <strong>Fixup Initialization: Residual Learning Without Normalization</strong> (Zhang et al., 2019) — Training deep residual networks without BatchNorm.
                </li>
                <li>
                    <strong>Batch Normalization Biases Deep Residual Networks Towards Shallow Paths</strong> (De & Smith, 2020) — SkipInit and the identity bias interpretation of BN.
                </li>
            </ul>

            <Header3>Learnable Gates</Header3>
            <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                <li>
                    <strong>ReZero is All You Need: Fast Convergence at Large Depth</strong> (Bachlechner et al., 2020) — Zero-initialized residual gates for dynamical isometry.
                </li>
                <li>
                    <strong>Going Deeper with Image Transformers</strong> (Touvron et al., 2021) — CaiT and LayerScale for deep ViTs.
                </li>
            </ul>

            <Header3>Generalized Residuals</Header3>
            <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                <li>
                    <strong>LAuReL: Learned Augmented Residual Layer</strong> (2024) — Low-rank augmentation of skip connections.
                </li>
            </ul>

            <Header3>Residual Stream Scaling</Header3>
            <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                <li>
                    <strong>Hyper-Connections</strong> (DeepSeek, 2024) — Multi-stream residual pathways for increased information bandwidth.
                </li>
                <li>
                    <strong>Manifold-Constrained Hyper-Connections (mHC)</strong> (DeepSeek, 2024) — Stabilizing HC via doubly stochastic constraints.
                </li>
            </ul>

            <Header3>Theoretical Foundations</Header3>
            <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                <li>
                    <strong>Dynamical Isometry and a Mean Field Theory of CNNs/RNNs</strong> (Pennington et al., 2017/2018) — Jacobian spectrum analysis and conditions for trainability.
                </li>
                <li>
                    <strong>Neural Ordinary Differential Equations</strong> (Chen et al., 2018) — Continuous-depth networks and the ODE perspective on ResNets.
                </li>
                <li>
                    <strong>On the Expressive Power of Deep Polynomial Neural Networks</strong> — Theoretical analysis of depth scaling in neural networks.
                </li>
            </ul>

            <Header3>Pre-LN vs Post-LN Analysis</Header3>
            <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                <li>
                    <strong>On Layer Normalization in the Transformer Architecture</strong> (Xiong et al., 2020) — Analysis of gradient flow in Pre-LN vs Post-LN.
                </li>
                <li>
                    <strong>ResiDual: Transformer with Dual Residual Connections</strong> (2023) — Hybrid approach combining Pre-LN stability with Post-LN expressivity.
                </li>
            </ul>

            <Header3>Related Vision Transformer Work</Header3>
            <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                <li>
                    <strong>DeiT III: Revenge of the ViT</strong> (Touvron et al., 2022) — Practical training recipes including LayerScale.
                </li>
                <li>
                    <strong>ConvNeXt: A ConvNet for the 2020s</strong> (Liu et al., 2022) — Modern ConvNet using LayerScale.
                </li>
                <li>
                    <strong>Swin Transformer V2</strong> (Liu et al., 2022) — Scaled window attention with residual post-normalization.
                </li>
            </ul>
        </Section>
    );
};

export default References;
