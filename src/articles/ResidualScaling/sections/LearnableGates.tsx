import React from 'react';
import { SlidersHorizontal } from 'lucide-react';
import Section from '../../../components/Section';
import Header3 from '../../../components/Header3';
import Header4 from '../../../components/Header4';
import Paragraph from '../../../components/Paragraph';
import List from '../../../components/List';
import ListItem from '../../../components/ListItem';
import Equation from '../../../components/Equation';
import Callout from '../../../components/Callout';

const LearnableGates = () => {
    return (
        <Section title="Learnable Gates and Scalars" icon={SlidersHorizontal}>
            <Paragraph>
                Rather than using fixed scaling factors, learnable gate methods introduce <strong>trainable parameters that start near zero and grow during training</strong>. This creates an optimization-friendly initialization (pure identity) while allowing the network to learn the appropriate residual contribution for each layer.
            </Paragraph>

            <Header3>ReZero: Radical Simplicity</Header3>
            <Paragraph>
                <strong>ReZero</strong> (Bachlechner et al., 2020) is remarkable for its simplicity: add a single zero-initialized scalar per residual block. That's it.
            </Paragraph>

            <Header4>The ReZero Formulation</Header4>
            <Equation block>
                {`x_{l+1} = x_l + \\alpha_l \\cdot F(x_l), \\quad \\alpha_l = 0 \\text{ (at init)}`}
            </Equation>
            <Paragraph>
                where <Equation>{`\\alpha_l`}</Equation> is a single learnable scalar per layer. At initialization, every <Equation>{`\\alpha_l = 0`}</Equation>, making the network a pure identity function: <Equation>{`x_L = x_0`}</Equation>.
            </Paragraph>

            <Header4>Why Zero Initialization Works</Header4>
            <List>
                <ListItem>
                    <strong>Perfect Dynamical Isometry:</strong> With all <Equation>{`\\alpha_l = 0`}</Equation>, the input-output Jacobian is exactly the identity matrix. All singular values equal 1—the ideal condition for signal propagation.
                </ListItem>
                <ListItem>
                    <strong>Gradients Flow Perfectly:</strong> Since <Equation>{`\\frac{\\partial x_L}{\\partial x_0} = I`}</Equation>, gradients propagate unchanged through arbitrary depth.
                </ListItem>
                <ListItem>
                    <strong>Natural Curriculum:</strong> As training progresses, <Equation>{`\\alpha_l`}</Equation> values grow, gradually "turning on" layers. The network naturally learns a curriculum from shallow to deep.
                </ListItem>
            </List>

            <Header4>Empirical Results</Header4>
            <div className="overflow-x-auto my-6">
                <table className="min-w-full text-sm text-left text-slate-700 border border-slate-200">
                    <thead className="text-xs text-slate-800 uppercase bg-slate-100 font-bold">
                        <tr>
                            <th className="px-4 py-2 border-b">Architecture</th>
                            <th className="px-4 py-2 border-b">Improvement</th>
                            <th className="px-4 py-2 border-b">Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">12-layer Transformer</td>
                            <td className="px-4 py-2">56% faster convergence</td>
                            <td className="px-4 py-2">enwiki8 dataset</td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-4 py-2 font-medium">120-layer Transformer</td>
                            <td className="px-4 py-2">Trainable (vs. failure without)</td>
                            <td className="px-4 py-2">Not trainable with standard init</td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">ResNet-56</td>
                            <td className="px-4 py-2">32% faster convergence</td>
                            <td className="px-4 py-2">CIFAR-10</td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-4 py-2 font-medium">10,000-layer FC</td>
                            <td className="px-4 py-2">1,500% faster convergence</td>
                            <td className="px-4 py-2">Fully connected network</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <Callout type="tip" title="ReZero and Normalization">
                The ReZero paper notes that while the identity initialization makes normalization technically unnecessary for convergence, the regularizing effect of BatchNorm can still be complementary. In practice, combining ReZero with normalization often gives the best results.
            </Callout>

            <Header3>LayerScale: Per-Channel Control</Header3>
            <Paragraph>
                <strong>LayerScale</strong> (Touvron et al., 2021) extends the ReZero idea with <strong>per-channel scaling</strong>, providing finer-grained control. It was introduced in the CaiT (Class-Attention in Image Transformers) paper and has become standard in deep ViT architectures.
            </Paragraph>

            <Header4>The LayerScale Formulation</Header4>
            <Equation block>
                {`x_{l+1} = x_l + \\text{diag}(\\lambda_1, \\ldots, \\lambda_d) \\cdot F(x_l)`}
            </Equation>
            <Paragraph>
                where <Equation>{`\\lambda_i`}</Equation> are <Equation>{`d`}</Equation> learnable scalars (one per channel/feature dimension), all initialized to a small value <Equation>{`\\epsilon`}</Equation>.
            </Paragraph>

            <Header4>Initialization Strategy</Header4>
            <Paragraph>
                The initialization value depends on network depth:
            </Paragraph>
            <List>
                <ListItem>
                    <strong>Shallow networks (≤18 layers):</strong> <Equation>{`\\epsilon = 0.1`}</Equation>
                </ListItem>
                <ListItem>
                    <strong>Deep networks (≥24 layers):</strong> <Equation>{`\\epsilon = 10^{-5}`}</Equation> or <Equation>{`10^{-6}`}</Equation>
                </ListItem>
            </List>
            <Paragraph>
                The intuition is that deeper networks need the residual branches to contribute less at initialization. The per-channel nature allows different features to scale differently, providing more expressivity than a single scalar.
            </Paragraph>

            <Header4>Why Per-Channel Matters</Header4>
            <List>
                <ListItem>
                    <strong>Diverse Optimization:</strong> Different channels may need different scaling trajectories during training. Some features may be more "ready" than others.
                </ListItem>
                <ListItem>
                    <strong>Richer Expressivity:</strong> Per-channel scaling can be viewed as a simplified attention mechanism—the network learns to weight different feature dimensions.
                </ListItem>
                <ListItem>
                    <strong>Minimal Overhead:</strong> Only <Equation>{`d`}</Equation> extra parameters per layer (where <Equation>{`d`}</Equation> is hidden dimension), negligible compared to attention/FFN weights.
                </ListItem>
            </List>

            <Callout type="info" title="LayerScale Adoption">
                LayerScale has been adopted in many vision architectures beyond CaiT: DeiT-III, ConvNeXt, Swin Transformer V2, and others. It's particularly valuable for models deeper than 24 layers where training becomes sensitive to initialization.
            </Callout>

            <Header3>Comparing ReZero and LayerScale</Header3>
            <div className="overflow-x-auto my-6">
                <table className="min-w-full text-sm text-left text-slate-700 border border-slate-200">
                    <thead className="text-xs text-slate-800 uppercase bg-slate-100 font-bold">
                        <tr>
                            <th className="px-4 py-2 border-b">Aspect</th>
                            <th className="px-4 py-2 border-b">ReZero</th>
                            <th className="px-4 py-2 border-b">LayerScale</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">Parameters per layer</td>
                            <td className="px-4 py-2">1 scalar</td>
                            <td className="px-4 py-2"><Equation>{`d`}</Equation> scalars</td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-4 py-2 font-medium">Initialization</td>
                            <td className="px-4 py-2">0</td>
                            <td className="px-4 py-2">Small <Equation>{`\\epsilon`}</Equation> (depth-dependent)</td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">Expressivity</td>
                            <td className="px-4 py-2">Lower</td>
                            <td className="px-4 py-2">Higher (per-channel)</td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-4 py-2 font-medium">Primary domain</td>
                            <td className="px-4 py-2">Transformers (NLP)</td>
                            <td className="px-4 py-2">ViTs (Vision)</td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">Identity at init</td>
                            <td className="px-4 py-2">Exact</td>
                            <td className="px-4 py-2">Approximate</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <Header3>Implementation Notes</Header3>
            <Paragraph>
                Both ReZero and LayerScale are straightforward to implement:
            </Paragraph>
            <Callout type="note" title="PyTorch Implementation Sketch">
                <pre className="text-sm bg-slate-100 p-3 rounded overflow-x-auto">
                    {`# ReZero
class ReZeroBlock(nn.Module):
    def __init__(self, ...):
        self.alpha = nn.Parameter(torch.zeros(1))
        self.f = ...  # residual function
    
    def forward(self, x):
        return x + self.alpha * self.f(x)

# LayerScale
class LayerScaleBlock(nn.Module):
    def __init__(self, d_model, init_eps=1e-5, ...):
        self.gamma = nn.Parameter(init_eps * torch.ones(d_model))
        self.f = ...  # residual function
    
    def forward(self, x):
        return x + self.gamma * self.f(x)`}
                </pre>
            </Callout>

            <Header3>Gradient Dynamics</Header3>
            <Paragraph>
                An important practical consideration is how gradients flow through the learnable scalars. For ReZero with <Equation>{`\\alpha`}</Equation> starting at 0:
            </Paragraph>
            <Equation block>
                {`\\frac{\\partial \\mathcal{L}}{\\partial \\alpha} = \\frac{\\partial \\mathcal{L}}{\\partial x_{l+1}} \\cdot F(x_l)`}
            </Equation>
            <Paragraph>
                This gradient is non-zero even when <Equation>{`\\alpha = 0`}</Equation>, allowing the scalar to grow. However, the gradient magnitude depends on <Equation>{`F(x_l)`}</Equation>, which at initialization may be noisy. This is why:
            </Paragraph>
            <List>
                <ListItem>
                    Learning rate for <Equation>{`\\alpha`}</Equation> may need tuning separately from other parameters.
                </ListItem>
                <ListItem>
                    Some implementations use a slightly positive initialization (e.g., <Equation>{`10^{-6}`}</Equation>) for stability.
                </ListItem>
                <ListItem>
                    LayerScale's non-zero initialization provides a more stable gradient signal from the start.
                </ListItem>
            </List>
        </Section>
    );
};

export default LearnableGates;
