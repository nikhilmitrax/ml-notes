import React from 'react';
import { Sparkles } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';
import Header3 from '../../../components/Header3';
import Header4 from '../../../components/Header4';
import List from '../../../components/List';
import ListItem from '../../../components/ListItem';
import Callout from '../../../components/Callout';
import CodeBlock from '../../../components/CodeBlock';

const AdvancedConvolutions = () => {
    return (
        <Section title="Advanced Convolution Variants" icon={Sparkles}>
            <Header3>1D / 2D / 3D Convolutions</Header3>

            <Header4>Conv1D</Header4>
            <List>
                <ListItem><strong>Input shape</strong>: <Equation>{`(N, C_{in}, L)`}</Equation> — sequence length L</ListItem>
                <ListItem><strong>Use cases</strong>: audio waveforms, time series, text (character-level)</ListItem>
                <ListItem>Kernel slides along 1 dimension</ListItem>
                <ListItem>Same padding/stride/dilation concepts as 2D</ListItem>
            </List>

            <Header4>Conv2D</Header4>
            <List>
                <ListItem><strong>Input shape</strong>: <Equation>{`(N, C_{in}, H, W)`}</Equation></ListItem>
                <ListItem><strong>Use cases</strong>: images, spectrograms</ListItem>
                <ListItem>Standard CNN convolution</ListItem>
            </List>

            <Header4>Conv3D</Header4>
            <List>
                <ListItem><strong>Input shape</strong>: <Equation>{`(N, C_{in}, D, H, W)`}</Equation> — depth D (frames or slices)</ListItem>
                <ListItem><strong>Use cases</strong>: video, 3D medical imaging (CT/MRI), point clouds</ListItem>
                <ListItem>Kernel is 3D: <Equation>{`K_D \\times K_H \\times K_W`}</Equation></ListItem>
                <ListItem>Much more compute/memory intensive</ListItem>
                <ListItem>Often use (2+1)D factorization: 2D spatial conv + 1D temporal conv</ListItem>
            </List>

            <Header3>Grouped Convolution</Header3>
            <List>
                <ListItem>Split input channels into <Equation>{`G`}</Equation> groups, convolve independently</ListItem>
                <ListItem>Each group: <Equation>{`C_{in}/G`}</Equation> input channels → <Equation>{`C_{out}/G`}</Equation> output channels</ListItem>
                <ListItem>Parameter reduction: <Equation>{`1/G`}</Equation> of regular conv</ListItem>
                <ListItem>FLOPs reduction: <Equation>{`1/G`}</Equation> of regular conv</ListItem>
                <ListItem>History: AlexNet used 2 groups to fit on 2 GPUs</ListItem>
                <ListItem>Used in: ResNeXt (cardinality), ShuffleNet, RegNet</ListItem>
                <ListItem>Trade-off: no cross-group information flow (need channel shuffle or 1×1 conv)</ListItem>
            </List>

            <Header3>Depthwise Separable Convolution</Header3>
            <List>
                <ListItem>Factor standard conv into two operations:
                    <List nested>
                        <ListItem><strong>Depthwise conv</strong>: one filter per input channel (groups = <Equation>{`C_{in}`}</Equation>)</ListItem>
                        <ListItem><strong>Pointwise conv</strong>: 1×1 conv to mix channels</ListItem>
                    </List>
                </ListItem>
                <ListItem>
                    <strong>Computation comparison</strong> for <Equation>{`K \\times K`}</Equation> kernel:
                    <List nested>
                        <ListItem>Regular: <Equation>{`K^2 \\cdot C_{in} \\cdot C_{out} \\cdot H \\cdot W`}</Equation></ListItem>
                        <ListItem>Separable: <Equation>{`K^2 \\cdot C_{in} \\cdot H \\cdot W + C_{in} \\cdot C_{out} \\cdot H \\cdot W`}</Equation></ListItem>
                        <ListItem>Ratio: <Equation>{`\\frac{1}{C_{out}} + \\frac{1}{K^2} \\approx \\frac{1}{K^2}`}</Equation> for large <Equation>{`C_{out}`}</Equation></ListItem>
                    </List>
                </ListItem>
                <ListItem>~8-9× fewer operations for 3×3 kernel</ListItem>
                <ListItem>Used in: MobileNet, Xception, EfficientNet</ListItem>
            </List>

            <CodeBlock language="python" code={`# Regular 3x3 conv
nn.Conv2d(in_channels=64, out_channels=128, kernel_size=3, padding=1)
# Params: 64 * 128 * 3 * 3 = 73,728

# Depthwise separable equivalent
nn.Sequential(
    # Depthwise: one 3x3 filter per input channel
    nn.Conv2d(64, 64, kernel_size=3, padding=1, groups=64),  # 64 * 1 * 3 * 3 = 576
    # Pointwise: 1x1 to mix channels
    nn.Conv2d(64, 128, kernel_size=1),  # 64 * 128 * 1 * 1 = 8,192
)
# Total params: 8,768 (~8.4x reduction)`} />

            <Header3>Transposed Convolution (Deconvolution)</Header3>
            <List>
                <ListItem><strong>Purpose</strong>: learned upsampling (increase spatial resolution)</ListItem>
                <ListItem>Not a true inverse — learns to upsample</ListItem>
                <ListItem>Implementation: insert zeros between input pixels, then regular conv</ListItem>
                <ListItem>
                    <strong>Output size</strong>:
                    <Equation block>{`H_{out} = (H_{in} - 1) \\times s - 2p + K + p_{out}`}</Equation>
                </ListItem>
                <ListItem>Used in: decoder networks, GANs, semantic segmentation</ListItem>
            </List>

            <Callout type="warning" title="Checkerboard Artifacts">
                Transposed convolutions with stride &gt; 1 often produce checkerboard patterns in outputs due to uneven overlap. Mitigations:
                <List>
                    <ListItem>Use kernel size divisible by stride (e.g., 4×4 with stride 2)</ListItem>
                    <ListItem>Prefer resize + conv (bilinear upsample → 3×3 conv)</ListItem>
                    <ListItem>Use sub-pixel convolution (pixel shuffle)</ListItem>
                </List>
            </Callout>

            <Header3>Upsampling Methods</Header3>

            <Header4>Nearest Neighbor + Conv</Header4>
            <List>
                <ListItem>Upsample by repeating pixels, then 3×3 conv to smooth</ListItem>
                <ListItem>Simple, no artifacts, but less expressive</ListItem>
            </List>

            <Header4>Bilinear/Bicubic + Conv</Header4>
            <List>
                <ListItem>Interpolate using weighted average of neighbors</ListItem>
                <ListItem>Smoother than nearest neighbor</ListItem>
                <ListItem>Common pattern: <code>F.interpolate(..., mode='bilinear')</code> → Conv</ListItem>
                <ListItem>No learnable parameters in upsampling itself</ListItem>
            </List>

            <Header4>Sub-Pixel Convolution (Pixel Shuffle)</Header4>
            <List>
                <ListItem>Conv to increase channels by <Equation>{`r^2`}</Equation>, then rearrange to increase spatial size by <Equation>{`r`}</Equation></ListItem>
                <ListItem>Shape: <Equation>{`(N, C \\cdot r^2, H, W) \\rightarrow (N, C, H \\cdot r, W \\cdot r)`}</Equation></ListItem>
                <ListItem>Efficient: all computation in the convolution</ListItem>
                <ListItem>Avoids checkerboard: learned filters, no overlap issues</ListItem>
                <ListItem>Used in: super-resolution (ESPCN), generative models</ListItem>
            </List>

            <CodeBlock language="python" code={`# Sub-pixel upsampling (2x)
class PixelShuffleUpsample(nn.Module):
    def __init__(self, in_channels, out_channels, scale=2):
        super().__init__()
        self.conv = nn.Conv2d(in_channels, out_channels * scale**2, kernel_size=3, padding=1)
        self.shuffle = nn.PixelShuffle(scale)
    
    def forward(self, x):
        return self.shuffle(self.conv(x))

# Example: 64 channels, 32x32 → 64 channels, 64x64
# Conv: (N, 64, 32, 32) → (N, 256, 32, 32)
# PixelShuffle: (N, 256, 32, 32) → (N, 64, 64, 64)`} />

            <Header3>Deformable Convolution</Header3>
            <List>
                <ListItem><strong>Key idea</strong>: learn sampling offsets for each kernel position</ListItem>
                <ListItem>Regular conv samples on fixed grid; deformable learns where to sample</ListItem>
                <ListItem>Two components:
                    <List nested>
                        <ListItem><strong>Offset conv</strong>: predicts 2D offsets for each kernel weight</ListItem>
                        <ListItem><strong>Deformed conv</strong>: samples at (x + Δx, y + Δy) using bilinear interpolation</ListItem>
                    </List>
                </ListItem>
                <ListItem>Offsets are <Equation>{`2K^2`}</Equation> channels (x, y for each kernel position)</ListItem>
                <ListItem>Benefits:
                    <List nested>
                        <ListItem>Adapts to object shape/scale</ListItem>
                        <ListItem>Handles geometric transformations</ListItem>
                        <ListItem>Better for non-rigid objects</ListItem>
                    </List>
                </ListItem>
                <ListItem>Used in: object detection (DCN in Faster R-CNN), video understanding</ListItem>
                <ListItem>DCNv2: adds modulation (learned importance per offset)</ListItem>
            </List>

            <Header3>Equivariant / Group Convolutions</Header3>
            <List>
                <ListItem><strong>Standard CNNs</strong>: translation equivariant only</ListItem>
                <ListItem><strong>Group equivariant CNNs</strong>: equivariant to rotation, reflection, etc.</ListItem>
                <ListItem>Key idea: convolve with transformed versions of filters simultaneously</ListItem>
                <ListItem>Groups:
                    <List nested>
                        <ListItem><strong>p4</strong>: 90° rotations (4 orientations)</ListItem>
                        <ListItem><strong>p4m</strong>: rotations + reflections (8 orientations)</ListItem>
                        <ListItem><strong>SE(2)</strong>: continuous rotations</ListItem>
                        <ListItem><strong>SO(3)</strong>: 3D rotations (for point clouds, molecules)</ListItem>
                    </List>
                </ListItem>
                <ListItem>Benefits: more data-efficient, built-in geometric invariance</ListItem>
                <ListItem>Used in: medical imaging, satellite imagery, molecular property prediction</ListItem>
                <ListItem>Libraries: e2cnn, escnn (PyTorch)</ListItem>
            </List>

            <Callout type="info" title="Equivariance vs Invariance">
                <List>
                    <ListItem><strong>Equivariant</strong>: rotating input rotates features correspondingly</ListItem>
                    <ListItem><strong>Invariant</strong>: output unchanged by rotation (achieved via pooling over group)</ListItem>
                </List>
                Equivariant features are more useful for dense prediction; invariant for classification.
            </Callout>
        </Section>
    );
};

export default AdvancedConvolutions;
