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

const NormalizationFree = () => {
    return (
        <Section title="Normalization-Free Stability" icon={Zap}>
            <Paragraph>
                While normalization layers (BatchNorm, LayerNorm) are ubiquitous in modern deep learning, they come with costs: computational overhead, batch size dependence (for BN), and complex interactions with other architectural choices. This section covers techniques that achieve stable training at depth <strong>without normalization</strong>, using careful initialization and residual scaling instead.
            </Paragraph>

            <Header3>Fixup Initialization</Header3>
            <Paragraph>
                <strong>Fixup</strong> (Zhang et al., 2019) demonstrated that deep residual networks can be trained without BatchNorm if weights are initialized carefully. The key insight is that BatchNorm implicitly performs a form of residual scaling—Fixup makes this explicit.
            </Paragraph>

            <Header4>Understanding BatchNorm's Hidden Effect</Header4>
            <Paragraph>
                Consider a residual block with BatchNorm:
            </Paragraph>
            <Equation block>
                {`x_{l+1} = x_l + \\text{BN}(F(x_l))`}
            </Equation>
            <Paragraph>
                BatchNorm normalizes the residual branch output to have zero mean and unit variance. This effectively <em>rescales</em> the residual contribution regardless of the actual output magnitude. If <Equation>{`F(x_l)`}</Equation> has large variance, BN shrinks it; if small, BN amplifies it. This implicit regularization is a key reason why BN enables deep training.
            </Paragraph>

            <Header4>The Fixup Recipe</Header4>
            <Paragraph>
                Fixup replaces BatchNorm with explicit initialization scaling. For a residual network with <Equation>{`L`}</Equation> residual branches and <Equation>{`m`}</Equation> layers per branch:
            </Paragraph>
            <List>
                <ListItem>
                    <strong>Zero-initialize the final layer:</strong> The last layer in each residual branch (e.g., the final conv or linear) is initialized to zero. This makes each block start as identity: <Equation>{`x_{l+1} = x_l + 0`}</Equation>.
                </ListItem>
                <ListItem>
                    <strong>Scale other layers:</strong> Other layers in the residual branch are initialized with standard initialization (e.g., He init) but scaled by:
                    <Equation block>
                        {`\\text{scale} = L^{-1/(2m-2)}`}
                    </Equation>
                    This ensures the total variance contributed by each residual block is proportional to <Equation>{`1/L`}</Equation>.
                </ListItem>
                <ListItem>
                    <strong>Add learnable scalars:</strong> A scalar multiplier <Equation>{`\\alpha`}</Equation> (initialized to 1) is added after each residual branch. A bias <Equation>{`b`}</Equation> (initialized to 0) is added before nonlinearities. These restore representational capacity lost by removing BN's affine parameters.
                </ListItem>
            </List>

            <Header4>Results</Header4>
            <List>
                <ListItem>
                    Stable training up to <strong>10,000 layers</strong> in ResNets without any normalization.
                </ListItem>
                <ListItem>
                    Achieves comparable performance to BatchNorm baselines on ImageNet.
                </ListItem>
                <ListItem>
                    Works for both image classification (CNNs) and machine translation (Transformers).
                </ListItem>
            </List>

            <Callout type="tip" title="When to Use Fixup">
                Fixup is particularly valuable when: (1) batch sizes are small (where BN's statistics are noisy), (2) the task requires consistent behavior between training and inference (BN behaves differently), or (3) you need to remove normalization for theoretical analysis.
            </Callout>

            <Header3>SkipInit</Header3>
            <Paragraph>
                <strong>SkipInit</strong> (De and Smith, 2020) takes the identity bias idea further. Rather than complex initialization schemes, it simply adds a learnable scalar to each residual branch, initialized to a small value.
            </Paragraph>

            <Header4>The SkipInit Formulation</Header4>
            <Equation block>
                {`x_{l+1} = x_l + \\alpha_l \\cdot F(x_l)`}
            </Equation>
            <Paragraph>
                where <Equation>{`\\alpha_l`}</Equation> is a learned scalar per layer, initialized to a small value (e.g., 0.1 or <Equation>{`1/\\sqrt{L}`}</Equation>).
            </Paragraph>

            <Header4>Connection to BatchNorm</Header4>
            <Paragraph>
                The paper shows that BatchNorm creates an "identity bias"—it implicitly downscales the residual branch with depth. SkipInit makes this explicit with a single parameter per layer. The key observation:
            </Paragraph>
            <List>
                <ListItem>
                    At initialization, the variance of BN's output is ~1, regardless of the input.
                </ListItem>
                <ListItem>
                    This means BN effectively multiplies the residual by a factor that depends on the input variance.
                </ListItem>
                <ListItem>
                    SkipInit mimics this with an explicit, learnable multiplier.
                </ListItem>
            </List>

            <Callout type="info" title="SkipInit vs. Fixup">
                SkipInit is simpler than Fixup (just one scalar per layer vs. multiple initialization adjustments) but shares the same underlying principle: control the residual contribution at initialization to enable depth.
            </Callout>

            <Header3>The Ensemble Interpretation</Header3>
            <Paragraph>
                A powerful theoretical lens for understanding normalization-free methods comes from the <strong>ensemble view of ResNets</strong>. A depth-<Equation>{`L`}</Equation> ResNet can be "unrolled" into <Equation>{`2^L`}</Equation> paths of varying effective depth:
            </Paragraph>
            <Equation block>
                {`x_L = \\sum_{S \\subseteq \\{1, \\ldots, L\\}} \\left( \\prod_{l \\in S} F_l \\right) x_0`}
            </Equation>
            <Paragraph>
                Each subset <Equation>{`S`}</Equation> corresponds to a path that uses only the residual branches in <Equation>{`S`}</Equation> and identity for the rest. This reveals that:
            </Paragraph>
            <List>
                <ListItem>
                    <strong>Most paths are shallow:</strong> The binomial distribution peaks at <Equation>{`L/2`}</Equation>—most paths use about half the layers.
                </ListItem>
                <ListItem>
                    <strong>Deep paths are rare:</strong> Only one path uses all <Equation>{`L`}</Equation> layers.
                </ListItem>
                <ListItem>
                    <strong>Signal explosion is combinatorial:</strong> Without scaling, the <Equation>{`2^L`}</Equation> paths cause the output to explode exponentially.
                </ListItem>
            </List>
            <Paragraph>
                Residual scaling controls how these paths are weighted. With <Equation>{`\\alpha < 1`}</Equation>, paths using more residual branches are down-weighted, preventing the combinatorial explosion. This is why initialization that shrinks residual contributions enables depth—it tames the exponential growth of the path ensemble.
            </Paragraph>

            <Header3>Practical Considerations</Header3>
            <div className="overflow-x-auto my-6">
                <table className="min-w-full text-sm text-left text-slate-700 border border-slate-200">
                    <thead className="text-xs text-slate-800 uppercase bg-slate-100 font-bold">
                        <tr>
                            <th className="px-4 py-2 border-b">Method</th>
                            <th className="px-4 py-2 border-b">Extra Parameters</th>
                            <th className="px-4 py-2 border-b">Compute Overhead</th>
                            <th className="px-4 py-2 border-b">Best For</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">Fixup</td>
                            <td className="px-4 py-2">~2 per layer</td>
                            <td className="px-4 py-2">Negligible</td>
                            <td className="px-4 py-2">Small-batch training</td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-4 py-2 font-medium">SkipInit</td>
                            <td className="px-4 py-2">1 per layer</td>
                            <td className="px-4 py-2">Negligible</td>
                            <td className="px-4 py-2">Drop-in BN replacement</td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">BatchNorm</td>
                            <td className="px-4 py-2">2 per channel</td>
                            <td className="px-4 py-2">~10-20% overhead</td>
                            <td className="px-4 py-2">Standard baseline</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <Callout type="warning" title="Regularization Tradeoff">
                BatchNorm provides regularization through its noise injection (batch statistics vary). Normalization-free methods lose this implicit regularization. You may need to compensate with other techniques: dropout, weight decay, or data augmentation.
            </Callout>
        </Section>
    );
};

export default NormalizationFree;
