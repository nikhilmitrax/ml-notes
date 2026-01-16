import React from 'react';
import { Box } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';
import Header3 from '../../../components/Header3';
import Header4 from '../../../components/Header4';
import Paragraph from '../../../components/Paragraph';
import List from '../../../components/List';
import ListItem from '../../../components/ListItem';
import Callout from '../../../components/Callout';
import CodeBlock from '../../../components/CodeBlock';

const CoreLayers = () => {
    return (
        <Section title="Core Layers & Building Blocks" icon={Box}>
            <Header3>Pooling Layers</Header3>

            <Header4>Max Pooling</Header4>
            <List>
                <ListItem>Takes maximum value in each pooling window</ListItem>
                <ListItem>Provides spatial invariance — small translations don't change output</ListItem>
                <ListItem>Preserves strongest activations (edges, textures)</ListItem>
                <ListItem>Common: 2×2 kernel, stride 2 → halves spatial dimensions</ListItem>
            </List>

            <Header4>Average Pooling</Header4>
            <List>
                <ListItem>Takes mean value in pooling window</ListItem>
                <ListItem>Smoother than max pooling, preserves more information</ListItem>
                <ListItem>Less common in classification, used in some detection networks</ListItem>
            </List>

            <Header4>Global Average Pooling (GAP)</Header4>
            <List>
                <ListItem>Averages entire feature map to single value per channel</ListItem>
                <ListItem><Equation>{`H \\times W \\times C \\rightarrow 1 \\times 1 \\times C`}</Equation></ListItem>
                <ListItem>Replaces fully connected layers at network end (modern standard)</ListItem>
                <ListItem>Benefits:
                    <List nested>
                        <ListItem>No parameters (reduces overfitting)</ListItem>
                        <ListItem>Input size agnostic at inference</ListItem>
                        <ListItem>Strong spatial invariance</ListItem>
                    </List>
                </ListItem>
            </List>

            <Header4>When Pooling Helps vs Hurts</Header4>
            <List>
                <ListItem><strong>Helps</strong>:
                    <List nested>
                        <ListItem>Classification — want spatial invariance</ListItem>
                        <ListItem>Reducing computation in later layers</ListItem>
                        <ListItem>Increasing receptive field quickly</ListItem>
                    </List>
                </ListItem>
                <ListItem><strong>Hurts</strong>:
                    <List nested>
                        <ListItem>Dense prediction (segmentation) — need spatial precision</ListItem>
                        <ListItem>Small object detection — aggressive pooling loses detail</ListItem>
                        <ListItem>Localization tasks — hurts precise coordinates</ListItem>
                    </List>
                </ListItem>
                <ListItem><strong>Modern trend</strong>: replace pooling with strided convolutions (learnable downsampling)</ListItem>
            </List>

            <Header3>Normalization (CNN-Specific Notes)</Header3>
            <Callout type="info" title="See Also">
                For full normalization coverage, see the dedicated Normalization article. Here we cover CNN-specific aspects.
            </Callout>

            <Header4>BatchNorm in CNNs</Header4>
            <List>
                <ListItem>Standard for CNN training — compute stats across <Equation>{`(N, H, W)`}</Equation> per channel</ListItem>
                <ListItem>Shape: normalize over batch and spatial dimensions, learnable <Equation>{`\\gamma, \\beta`}</Equation> per channel</ListItem>
                <ListItem><strong>Folding</strong>: at inference, BN can be fused into preceding conv (zero overhead):
                    <Equation block>{`W_{fused} = \\frac{\\gamma}{\\sqrt{\\sigma^2 + \\epsilon}} W, \\quad b_{fused} = \\frac{\\gamma(b - \\mu)}{\\sqrt{\\sigma^2 + \\epsilon}} + \\beta`}</Equation>
                </ListItem>
                <ListItem>Requires batch size ≥ 32 for stable statistics</ListItem>
            </List>

            <Header4>LayerNorm in CNNs</Header4>
            <List>
                <ListItem>Normalize over <Equation>{`(C, H, W)`}</Equation> per sample</ListItem>
                <ListItem>Less common in CNNs — doesn't leverage batch statistics</ListItem>
                <ListItem>Used in: Vision Transformers (ViT), some detection heads</ListItem>
            </List>

            <Header4>GroupNorm</Header4>
            <List>
                <ListItem>Divide channels into groups, normalize within each group</ListItem>
                <ListItem>Works with any batch size (including batch size = 1)</ListItem>
                <ListItem>Good for: detection, segmentation with varied batch sizes</ListItem>
                <ListItem>Typical: 32 groups (each group has <Equation>{`C/32`}</Equation> channels)</ListItem>
            </List>

            <Header4>Norm Placement: Pre vs Post Activation</Header4>
            <List>
                <ListItem><strong>Post-activation (original)</strong>: Conv → BN → ReLU</ListItem>
                <ListItem><strong>Pre-activation</strong>: BN → ReLU → Conv
                    <List nested>
                        <ListItem>From "Identity Mappings in Deep Residual Networks"</ListItem>
                        <ListItem>Cleaner gradient flow through residual paths</ListItem>
                        <ListItem>Often better for very deep networks</ListItem>
                    </List>
                </ListItem>
            </List>

            <Header3>Activations</Header3>
            <Paragraph className="mb-4 text-slate-600">
                Brief overview of common activations in CNNs. See dedicated Activations article for full coverage.
            </Paragraph>

            <Header4>ReLU Family</Header4>
            <List>
                <ListItem><strong>ReLU</strong>: <Equation>{`\\max(0, x)`}</Equation>
                    <List nested>
                        <ListItem>Simple, fast, sparse activations</ListItem>
                        <ListItem>Issue: <strong>dead ReLUs</strong> — neurons stuck at 0 if inputs always negative</ListItem>
                    </List>
                </ListItem>
                <ListItem><strong>LeakyReLU</strong>: <Equation>{`\\max(\\alpha x, x)`}</Equation> where <Equation>{`\\alpha = 0.01`}</Equation>
                    <List nested>
                        <ListItem>Small gradient for negative inputs → prevents dead neurons</ListItem>
                    </List>
                </ListItem>
                <ListItem><strong>PReLU</strong>: <Equation>{`\\alpha`}</Equation> is learned per channel</ListItem>
            </List>

            <Header4>Modern Activations</Header4>
            <List>
                <ListItem><strong>GELU</strong>: <Equation>{`x \\cdot \\Phi(x)`}</Equation> where <Equation>{`\\Phi`}</Equation> is Gaussian CDF
                    <List nested>
                        <ListItem>Smooth, used in Transformers (BERT, GPT)</ListItem>
                        <ListItem>Becoming more common in modern CNNs</ListItem>
                    </List>
                </ListItem>
                <ListItem><strong>SiLU/Swish</strong>: <Equation>{`x \\cdot \\sigma(x)`}</Equation>
                    <List nested>
                        <ListItem>Smooth approximation to ReLU</ListItem>
                        <ListItem>Used in EfficientNet, ConvNeXt</ListItem>
                    </List>
                </ListItem>
            </List>

            <Callout type="tip" title="Avoiding Dead ReLUs">
                Use proper initialization (He init), careful learning rate selection, or switch to LeakyReLU/GELU if you see many neurons with zero gradient.
            </Callout>

            <Header3>Dropout Variants</Header3>

            <Header4>Standard Dropout</Header4>
            <List>
                <ListItem>Randomly zero elements with probability <Equation>{`p`}</Equation></ListItem>
                <ListItem>Scale remaining by <Equation>{`1/(1-p)`}</Equation> during training</ListItem>
                <ListItem>Typically applied after FC layers, not conv layers</ListItem>
            </List>

            <Header4>Spatial Dropout (Dropout2d)</Header4>
            <List>
                <ListItem>Drop entire feature maps (channels), not individual pixels</ListItem>
                <ListItem>Better for conv layers — dropping individual pixels not effective due to spatial correlation</ListItem>
                <ListItem>Shape: <Equation>{`(N, C, H, W)`}</Equation> → zero out entire <Equation>{`(H, W)`}</Equation> slices</ListItem>
            </List>

            <CodeBlock language="python" code={`# Standard dropout (for FC layers)
nn.Dropout(p=0.5)

# Spatial dropout (for conv layers)
nn.Dropout2d(p=0.1)  # drops entire channels

# Usage in forward pass
x = self.conv(x)
x = self.bn(x)
x = F.relu(x)
x = self.dropout2d(x)  # spatial dropout after activation`} />

            <Header3>Residual Connections & Skip Connections</Header3>

            <Header4>Basic Residual Block</Header4>
            <List>
                <ListItem>Core idea: <Equation>{`y = F(x) + x`}</Equation></ListItem>
                <ListItem>Network learns residual <Equation>{`F(x) = H(x) - x`}</Equation>, easier to optimize</ListItem>
                <ListItem>Enables training of very deep networks (100+ layers)</ListItem>
                <ListItem>Gradient flows directly through skip connection</ListItem>
            </List>

            <Header4>Bottleneck Block</Header4>
            <List>
                <ListItem>1×1 conv (reduce channels) → 3×3 conv → 1×1 conv (expand channels)</ListItem>
                <ListItem>Reduces computation: bottleneck channels typically <Equation>{`C/4`}</Equation></ListItem>
                <ListItem>Standard in ResNet-50 and deeper</ListItem>
            </List>

            <CodeBlock language="python" code={`# Basic block (ResNet-18/34)
class BasicBlock(nn.Module):
    def forward(self, x):
        identity = x
        out = self.conv1(x)      # 3x3
        out = self.bn1(out)
        out = self.relu(out)
        out = self.conv2(out)    # 3x3
        out = self.bn2(out)
        out += identity          # residual connection
        return self.relu(out)

# Bottleneck block (ResNet-50+)
class Bottleneck(nn.Module):
    def forward(self, x):
        identity = x
        out = self.conv1(x)      # 1x1 reduce
        out = self.bn1(out)
        out = self.relu(out)
        out = self.conv2(out)    # 3x3
        out = self.bn2(out)
        out = self.relu(out)
        out = self.conv3(out)    # 1x1 expand
        out = self.bn3(out)
        out += identity
        return self.relu(out)`} />

            <Header4>Pre-Activation ResNet</Header4>
            <List>
                <ListItem>Move BN and ReLU before convolution</ListItem>
                <ListItem>Cleaner identity path: <Equation>{`y = x + F(\\text{BN}(\\text{ReLU}(x)))`}</Equation></ListItem>
                <ListItem>Better gradient flow, especially for very deep networks</ListItem>
                <ListItem>Used in: ResNet-v2, DenseNet, various modern architectures</ListItem>
            </List>

            <Header4>Projection Shortcuts</Header4>
            <List>
                <ListItem>When dimensions change (stride or channels), can't do simple addition</ListItem>
                <ListItem>Options:
                    <List nested>
                        <ListItem>1×1 conv + BN to match dimensions (most common)</ListItem>
                        <ListItem>Strided 1×1 conv for downsampling</ListItem>
                        <ListItem>Pooling + padding (parameter-free, rarely used)</ListItem>
                    </List>
                </ListItem>
            </List>

            <Callout type="warning" title="Zero-Initialized Residuals">
                Some architectures (Fixup, ReZero) initialize the last layer before the residual addition to zero, making the initial network an identity function. This can help training stability.
            </Callout>
        </Section>
    );
};

export default CoreLayers;
