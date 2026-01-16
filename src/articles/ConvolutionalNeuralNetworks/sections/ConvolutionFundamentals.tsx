import React from 'react';
import { Grid3X3 } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';
import Header3 from '../../../components/Header3';
import Header4 from '../../../components/Header4';
import Paragraph from '../../../components/Paragraph';
import List from '../../../components/List';
import ListItem from '../../../components/ListItem';
import Callout from '../../../components/Callout';
import CodeBlock from '../../../components/CodeBlock';

const ConvolutionFundamentals = () => {
    return (
        <Section title="Convolution Fundamentals" icon={Grid3X3}>
            <Header3>Convolution vs Cross-Correlation</Header3>
            <List>
                <ListItem>
                    <strong>True convolution</strong> — kernel is flipped before sliding:
                    <Equation block>{`(f * g)[n] = \\sum_{k} f[k] \\cdot g[n - k]`}</Equation>
                </ListItem>
                <ListItem>
                    <strong>Cross-correlation</strong> — no flip, direct sliding:
                    <Equation block>{`(f \\star g)[n] = \\sum_{k} f[k] \\cdot g[n + k]`}</Equation>
                </ListItem>
                <ListItem><strong>Deep learning libraries implement cross-correlation</strong>, but call it "convolution"</ListItem>
                <ListItem>Distinction doesn't matter in practice — learned filters absorb the flip</ListItem>
            </List>

            <Header3>Kernels, Filters, Feature Maps, Channels</Header3>
            <List>
                <ListItem><strong>Kernel/Filter</strong> — small weight matrix (e.g., 3×3, 5×5) that slides over input</ListItem>
                <ListItem><strong>Feature map</strong> — output of applying one filter across the spatial dimensions</ListItem>
                <ListItem><strong>Channels</strong>:
                    <List nested>
                        <ListItem><strong>Input channels</strong> <Equation>{`C_{in}`}</Equation> — depth of input (e.g., 3 for RGB)</ListItem>
                        <ListItem><strong>Output channels</strong> <Equation>{`C_{out}`}</Equation> — number of filters = number of output feature maps</ListItem>
                    </List>
                </ListItem>
                <ListItem>
                    <strong>Full filter shape</strong>: <Equation>{`C_{out} \\times C_{in} \\times K_H \\times K_W`}</Equation>
                </ListItem>
                <ListItem>Each output channel is a sum over all input channels: <Equation>{`y_j = \\sum_{i=1}^{C_{in}} W_{j,i} * x_i + b_j`}</Equation></ListItem>
            </List>

            <Header3>Stride, Padding, Dilation</Header3>

            <Header4>Stride</Header4>
            <List>
                <ListItem><strong>Stride <Equation>{`s`}</Equation></strong> — step size when sliding the kernel</ListItem>
                <ListItem>Stride 1 → output same size (minus kernel effects)</ListItem>
                <ListItem>Stride 2 → output ~half the size (common for downsampling)</ListItem>
                <ListItem>Strided convolutions often replace pooling in modern architectures</ListItem>
            </List>

            <Header4>Padding</Header4>
            <List>
                <ListItem><strong>"valid" padding</strong> — no padding, output shrinks:
                    <Equation block>{`H_{out} = \\lfloor \\frac{H_{in} - K}{s} \\rfloor + 1`}</Equation>
                </ListItem>
                <ListItem><strong>"same" padding</strong> — pad so output = input (when stride=1):
                    <List nested>
                        <ListItem>Padding amount: <Equation>{`p = \\lfloor K / 2 \\rfloor`}</Equation> (for odd K)</ListItem>
                        <ListItem>Asymmetric padding needed for even kernel sizes</ListItem>
                    </List>
                </ListItem>
                <ListItem><strong>Zero padding</strong> most common; reflection/replication padding for image borders</ListItem>
            </List>

            <Header4>Dilation (Atrous Convolution)</Header4>
            <List>
                <ListItem><strong>Dilation rate <Equation>{`d`}</Equation></strong> — spacing between kernel elements</ListItem>
                <ListItem>Effective kernel size: <Equation>{`K_{eff} = K + (K-1)(d-1)`}</Equation></ListItem>
                <ListItem>Increases receptive field without adding parameters or reducing resolution</ListItem>
                <ListItem>Used in: DeepLab (semantic segmentation), WaveNet (audio)</ListItem>
                <ListItem>
                    Output size with dilation:
                    <Equation block>{`H_{out} = \\lfloor \\frac{H_{in} + 2p - d(K-1) - 1}{s} \\rfloor + 1`}</Equation>
                </ListItem>
            </List>

            <Callout type="warning" title="Gridding Artifacts">
                Using same dilation rate throughout can cause "gridding" — some pixels never contribute. Solution: use varying dilation rates (e.g., 1, 2, 5, 1, 2, 5...) or Hybrid Dilated Convolution (HDC).
            </Callout>

            <Header3>Receptive Field</Header3>
            <List>
                <ListItem><strong>Receptive field</strong> — region of input that influences a single output unit</ListItem>
                <ListItem><strong>Theoretical receptive field</strong> — geometric calculation based on architecture:
                    <Equation block>{`RF_l = RF_{l-1} + (K_l - 1) \\times \\prod_{i=1}^{l-1} s_i`}</Equation>
                </ListItem>
                <ListItem><strong>Effective receptive field (ERF)</strong> — actual region that significantly influences output
                    <List nested>
                        <ListItem>Usually much smaller than theoretical RF</ListItem>
                        <ListItem>Gaussian-shaped, concentrated in center</ListItem>
                        <ListItem>Grows as <Equation>{`O(\\sqrt{L})`}</Equation> with depth L, not linearly</ListItem>
                    </List>
                </ListItem>
            </List>

            <Header4>Stacking Effects</Header4>
            <List>
                <ListItem>Two 3×3 convs have same RF as one 5×5, but:
                    <List nested>
                        <ListItem>Fewer parameters: <Equation>{`2 \\times (3^2) = 18`}</Equation> vs <Equation>{`5^2 = 25`}</Equation></ListItem>
                        <ListItem>More non-linearities → more expressive</ListItem>
                        <ListItem>This is why VGG uses stacks of 3×3 convs</ListItem>
                    </List>
                </ListItem>
                <ListItem>Three 3×3 convs → RF of 7×7 with only <Equation>{`3 \\times 9 = 27`}</Equation> params vs 49</ListItem>
            </List>

            <Header3>Parameter Sharing & Translation Equivariance</Header3>

            <Header4>Parameter Sharing</Header4>
            <List>
                <ListItem>Same filter weights used at every spatial location</ListItem>
                <ListItem>Dramatic parameter reduction vs fully connected:
                    <List nested>
                        <ListItem>FC on 224×224×3 → 1000: ~150M parameters</ListItem>
                        <ListItem>Conv 3×3, 64 filters: <Equation>{`3 \\times 3 \\times 3 \\times 64 = 1,728`}</Equation> parameters</ListItem>
                    </List>
                </ListItem>
                <ListItem>Assumption: features useful in one location are useful elsewhere</ListItem>
            </List>

            <Header4>Translation Equivariance vs Invariance</Header4>
            <List>
                <ListItem><strong>Equivariance</strong>: <Equation>{`T(f(x)) = f(T(x))`}</Equation>
                    <List nested>
                        <ListItem>Shifting input shifts output by same amount</ListItem>
                        <ListItem>Convolution is translation equivariant</ListItem>
                    </List>
                </ListItem>
                <ListItem><strong>Invariance</strong>: <Equation>{`f(T(x)) = f(x)`}</Equation>
                    <List nested>
                        <ListItem>Output unchanged regardless of input shift</ListItem>
                        <ListItem>Achieved through pooling, global average pooling</ListItem>
                        <ListItem>Desirable for classification ("cat" regardless of position)</ListItem>
                    </List>
                </ListItem>
                <ListItem>CNNs are equivariant in early layers, become invariant through downsampling</ListItem>
            </List>

            <Callout type="info" title="Breaking Equivariance">
                Strided convolutions, pooling, and padding can break perfect equivariance. Fully equivariant networks (e.g., for rotation) require specialized architectures.
            </Callout>

            <Header3>Output Size Formula (Complete)</Header3>
            <CodeBlock language="python" code={`# General formula for conv/pool output size
def output_size(H_in, K, padding, stride, dilation=1):
    """
    H_in: input height (or width)
    K: kernel size
    padding: padding on each side
    stride: stride
    dilation: dilation rate
    """
    return (H_in + 2*padding - dilation*(K - 1) - 1) // stride + 1

# Examples:
# Conv2d(3, 64, kernel_size=7, stride=2, padding=3) on 224x224
# → output_size(224, 7, 3, 2) = 112

# Conv2d(64, 64, kernel_size=3, stride=1, padding=1) on 112x112
# → output_size(112, 3, 1, 1) = 112 (same padding)`} />
        </Section>
    );
};

export default ConvolutionFundamentals;
