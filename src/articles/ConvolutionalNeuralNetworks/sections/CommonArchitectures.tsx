import React from 'react';
import { Building2 } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';
import Header3 from '../../../components/Header3';
import Header4 from '../../../components/Header4';
import List from '../../../components/List';
import ListItem from '../../../components/ListItem';
import Callout from '../../../components/Callout';

const CommonArchitectures = () => {
    return (
        <Section title="Common Architectures" icon={Building2}>
            <Header3>LeNet (1998)</Header3>
            <List>
                <ListItem><strong>Pioneer</strong> of modern CNNs (Yann LeCun)</ListItem>
                <ListItem>Architecture: Conv → Pool → Conv → Pool → FC → FC → FC</ListItem>
                <ListItem>Used for: MNIST digit classification</ListItem>
                <ListItem>Key ideas:
                    <List nested>
                        <ListItem>Local receptive fields</ListItem>
                        <ListItem>Weight sharing</ListItem>
                        <ListItem>Subsampling (pooling)</ListItem>
                    </List>
                </ListItem>
                <ListItem>~60K parameters</ListItem>
            </List>

            <Header3>AlexNet (2012)</Header3>
            <List>
                <ListItem><strong>ImageNet breakthrough</strong> — won ILSVRC 2012 by large margin</ListItem>
                <ListItem>Key innovations:
                    <List nested>
                        <ListItem>ReLU activations (much faster than tanh/sigmoid)</ListItem>
                        <ListItem>Dropout regularization</ListItem>
                        <ListItem>Data augmentation (crops, flips, color jitter)</ListItem>
                        <ListItem>GPU training (split across 2 GPUs)</ListItem>
                        <ListItem>Local Response Normalization (now obsolete)</ListItem>
                    </List>
                </ListItem>
                <ListItem>5 conv layers + 3 FC layers</ListItem>
                <ListItem>~60M parameters</ListItem>
                <ListItem>11×11, 5×5, 3×3 kernels with strides</ListItem>
            </List>

            <Header3>VGGNet (2014)</Header3>
            <List>
                <ListItem><strong>Key insight</strong>: depth matters, use only 3×3 convolutions</ListItem>
                <ListItem>VGG-16: 16 weight layers, VGG-19: 19 layers</ListItem>
                <ListItem>Architecture: repeated blocks of (3×3 conv) × n → max pool</ListItem>
                <ListItem>Benefits of 3×3 stacking:
                    <List nested>
                        <ListItem>Two 3×3 = one 5×5 receptive field, fewer params</ListItem>
                        <ListItem>More non-linearities (ReLU after each conv)</ListItem>
                    </List>
                </ListItem>
                <ListItem><strong>Problem</strong>: 138M parameters, mostly in FC layers</ListItem>
                <ListItem>Still used as feature extractor backbone</ListItem>
            </List>

            <Header3>Inception / GoogLeNet (2014)</Header3>
            <List>
                <ListItem><strong>Key insight</strong>: optimal kernel size varies — use multiple in parallel</ListItem>
                <ListItem>Inception module: parallel 1×1, 3×3, 5×5 convs + max pool, concatenate outputs</ListItem>
                <ListItem>1×1 convolutions for:
                    <List nested>
                        <ListItem>Dimensionality reduction before expensive 3×3/5×5</ListItem>
                        <ListItem>Cross-channel feature mixing</ListItem>
                    </List>
                </ListItem>
                <ListItem><strong>Factorized convolutions</strong>:
                    <List nested>
                        <ListItem>5×5 → two 3×3 convs</ListItem>
                        <ListItem>n×n → 1×n + n×1 convs (asymmetric/separable)</ListItem>
                    </List>
                </ListItem>
                <ListItem>~6.8M parameters (much smaller than VGG)</ListItem>
                <ListItem>Auxiliary classifiers during training (for gradient flow)</ListItem>
            </List>

            <Callout type="info" title="Inception Versions">
                Inception v2: BatchNorm. Inception v3: factorized convs. Inception v4: combined with residual connections.
            </Callout>

            <Header3>ResNet (2015)</Header3>
            <List>
                <ListItem><strong>Key insight</strong>: residual learning solves degradation problem</ListItem>
                <ListItem>Skip connections: <Equation>{`y = F(x) + x`}</Equation></ListItem>
                <ListItem>Enabled training of 100+ layer networks</ListItem>
                <ListItem>Variants:
                    <List nested>
                        <ListItem>ResNet-18/34: basic blocks (two 3×3 convs)</ListItem>
                        <ListItem>ResNet-50/101/152: bottleneck blocks (1×1 → 3×3 → 1×1)</ListItem>
                    </List>
                </ListItem>
                <ListItem>ResNet-50: ~25M parameters, excellent accuracy/compute tradeoff</ListItem>
                <ListItem>Still widely used as backbone for detection/segmentation</ListItem>
            </List>

            <Header3>ResNeXt (2017)</Header3>
            <List>
                <ListItem><strong>Key insight</strong>: cardinality (# of paths) matters like width and depth</ListItem>
                <ListItem>Grouped convolutions within residual blocks</ListItem>
                <ListItem>ResNeXt-50 (32×4d): 32 groups, 4 channels each in bottleneck</ListItem>
                <ListItem>Same FLOPs as ResNet but higher accuracy</ListItem>
                <ListItem>Template: <Equation>{`C \\times d`}</Equation> = (cardinality × bottleneck width)</ListItem>
            </List>

            <Header3>DenseNet (2017)</Header3>
            <List>
                <ListItem><strong>Key insight</strong>: connect each layer to all subsequent layers</ListItem>
                <ListItem>Dense connectivity: <Equation>{`x_l = H_l([x_0, x_1, ..., x_{l-1}])`}</Equation></ListItem>
                <ListItem>Features are concatenated, not added</ListItem>
                <ListItem>Benefits:
                    <List nested>
                        <ListItem>Feature reuse — all previous features available</ListItem>
                        <ListItem>Implicit deep supervision</ListItem>
                        <ListItem>Fewer parameters (narrow layers, growth rate k)</ListItem>
                    </List>
                </ListItem>
                <ListItem>Growth rate <Equation>{`k`}</Equation>: each layer adds k feature maps</ListItem>
                <ListItem>Transition layers: 1×1 conv + 2×2 avg pool between dense blocks</ListItem>
                <ListItem>Memory intensive (stores all feature maps)</ListItem>
            </List>

            <Header3>MobileNet (2017)</Header3>
            <List>
                <ListItem><strong>Key insight</strong>: depthwise separable convolutions for efficiency</ListItem>
                <ListItem>Separable conv = depthwise (spatial) + pointwise (1×1 channel mixing)</ListItem>
                <ListItem>Computation reduction: <Equation>{`\\frac{1}{C_{out}} + \\frac{1}{K^2}`}</Equation> of regular conv</ListItem>
                <ListItem>Width multiplier <Equation>{`\\alpha`}</Equation>: scale all channel counts</ListItem>
                <ListItem>Resolution multiplier <Equation>{`\\rho`}</Equation>: scale input resolution</ListItem>
                <ListItem>MobileNetV2: inverted residuals (expand → depthwise → project), linear bottlenecks</ListItem>
                <ListItem>MobileNetV3: NAS-optimized, squeeze-excitation, h-swish activation</ListItem>
            </List>

            <Header3>EfficientNet (2019)</Header3>
            <List>
                <ListItem><strong>Key insight</strong>: compound scaling of width, depth, resolution</ListItem>
                <ListItem>Scaling rule: <Equation>{`d = \\alpha^\\phi, w = \\beta^\\phi, r = \\gamma^\\phi`}</Equation></ListItem>
                <ListItem>Constraint: <Equation>{`\\alpha \\cdot \\beta^2 \\cdot \\gamma^2 \\approx 2`}</Equation> (FLOPs double with <Equation>{`\\phi`}</Equation>)</ListItem>
                <ListItem>Base architecture (B0) found via NAS</ListItem>
                <ListItem>Uses: MBConv blocks (mobile inverted bottleneck), squeeze-excitation, SiLU</ListItem>
                <ListItem>EfficientNet-B7: state-of-art accuracy at publication</ListItem>
                <ListItem>EfficientNetV2: faster training, progressive resizing, Fused-MBConv</ListItem>
            </List>

            <Callout type="tip" title="Compound Scaling Intuition">
                Higher resolution needs more layers (bigger receptive field) and more channels (more patterns at higher resolution). Scaling all three together is more efficient than scaling any single dimension.
            </Callout>

            <Header3>U-Net (2015)</Header3>
            <List>
                <ListItem><strong>Designed for</strong>: biomedical image segmentation</ListItem>
                <ListItem>Encoder-decoder with skip connections</ListItem>
                <ListItem>Encoder: contracting path (conv → pool, double channels)</ListItem>
                <ListItem>Decoder: expanding path (upsample → conv, halve channels)</ListItem>
                <ListItem>Skip connections: concatenate encoder features to decoder</ListItem>
                <ListItem>Preserves fine spatial details for precise segmentation</ListItem>
                <ListItem>Works well with limited training data</ListItem>
                <ListItem>Widely adapted: 3D U-Net, Attention U-Net, U-Net++</ListItem>
            </List>

            <Header3>Feature Pyramid Networks (FPN, 2017)</Header3>
            <List>
                <ListItem><strong>Designed for</strong>: multi-scale object detection</ListItem>
                <ListItem>Bottom-up pathway: standard CNN backbone (e.g., ResNet)</ListItem>
                <ListItem>Top-down pathway: upsample + lateral connections from backbone</ListItem>
                <ListItem>Lateral connections: 1×1 conv to match channels, add to upsampled features</ListItem>
                <ListItem>Output: pyramid of feature maps at multiple scales</ListItem>
                <ListItem>Benefits:
                    <List nested>
                        <ListItem>Strong features at all scales</ListItem>
                        <ListItem>Small objects get features from large resolution maps</ListItem>
                        <ListItem>Large objects use deeper, more semantic features</ListItem>
                    </List>
                </ListItem>
                <ListItem>Standard component in modern detectors (Faster R-CNN, RetinaNet)</ListItem>
            </List>

            <Header3>Architecture Comparison Summary</Header3>
            <div className="overflow-x-auto mt-4">
                <table className="min-w-full text-sm text-left text-slate-700 border border-slate-200">
                    <thead className="text-xs text-slate-800 uppercase bg-slate-100 font-bold">
                        <tr>
                            <th className="px-3 py-2 border-b">Architecture</th>
                            <th className="px-3 py-2 border-b">Year</th>
                            <th className="px-3 py-2 border-b">Key Innovation</th>
                            <th className="px-3 py-2 border-b">Params</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b">
                            <td className="px-3 py-2">AlexNet</td>
                            <td className="px-3 py-2">2012</td>
                            <td className="px-3 py-2">ReLU, Dropout, GPU training</td>
                            <td className="px-3 py-2">60M</td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-3 py-2">VGG-16</td>
                            <td className="px-3 py-2">2014</td>
                            <td className="px-3 py-2">Depth with 3×3 convs only</td>
                            <td className="px-3 py-2">138M</td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-3 py-2">GoogLeNet</td>
                            <td className="px-3 py-2">2014</td>
                            <td className="px-3 py-2">Inception modules, 1×1 convs</td>
                            <td className="px-3 py-2">6.8M</td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-3 py-2">ResNet-50</td>
                            <td className="px-3 py-2">2015</td>
                            <td className="px-3 py-2">Residual connections</td>
                            <td className="px-3 py-2">25M</td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-3 py-2">DenseNet-121</td>
                            <td className="px-3 py-2">2017</td>
                            <td className="px-3 py-2">Dense connectivity</td>
                            <td className="px-3 py-2">8M</td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-3 py-2">MobileNetV2</td>
                            <td className="px-3 py-2">2018</td>
                            <td className="px-3 py-2">Inverted residuals, linear bottleneck</td>
                            <td className="px-3 py-2">3.4M</td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-3 py-2">EfficientNet-B0</td>
                            <td className="px-3 py-2">2019</td>
                            <td className="px-3 py-2">Compound scaling</td>
                            <td className="px-3 py-2">5.3M</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Section>
    );
};

export default CommonArchitectures;
