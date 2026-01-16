import React from 'react';
import { Settings } from 'lucide-react';
import Section from '../../../components/Section';
import Header3 from '../../../components/Header3';
import Header4 from '../../../components/Header4';
import Paragraph from '../../../components/Paragraph';
import List from '../../../components/List';
import ListItem from '../../../components/ListItem';
import Equation from '../../../components/Equation';
import Callout from '../../../components/Callout';

const FixedScaling = () => {
    return (
        <Section title="Fixed Residual Scaling" icon={Settings}>
            <Paragraph>
                Fixed residual scaling methods use <strong>theoretically-derived constants</strong> to scale residual branches, enabling training at extreme depth (1,000+ layers) without learnable scaling parameters. The key insight is that the optimal scaling factor can be computed analytically based on network depth and architecture.
            </Paragraph>

            <Header3>DeepNorm / DeepNet</Header3>
            <Paragraph>
                <strong>DeepNorm</strong> (Wang et al., 2022) is a landmark technique that enabled scaling Transformers to 1,000 layers (2,500 sublayers). It modifies both the residual connection and the initialization to keep updates bounded.
            </Paragraph>

            <Header4>The DeepNorm Formulation</Header4>
            <Paragraph>
                DeepNorm uses a Post-LN structure with scaled residuals:
            </Paragraph>
            <Equation block>
                {`x_{l+1} = \\text{LN}(\\alpha \\cdot x_l + F(x_l))`}
            </Equation>
            <Paragraph>
                Note that unlike standard residual scaling (which scales <Equation>{`F`}</Equation>), DeepNorm scales the <em>identity path</em> by <Equation>{`\\alpha`}</Equation>. This is equivalent to scaling the residual by <Equation>{`1/\\alpha`}</Equation> in effect, but provides better numerical properties.
            </Paragraph>

            <Header4>Deriving the Constants</Header4>
            <Paragraph>
                The key innovation is deriving <Equation>{`\\alpha`}</Equation> and the initialization scale <Equation>{`\\beta`}</Equation> to ensure bounded updates throughout training. For a Transformer with <Equation>{`N`}</Equation> encoder layers and <Equation>{`M`}</Equation> decoder layers:
            </Paragraph>
            <div className="overflow-x-auto my-6">
                <table className="min-w-full text-sm text-left text-slate-700 border border-slate-200">
                    <thead className="text-xs text-slate-800 uppercase bg-slate-100 font-bold">
                        <tr>
                            <th className="px-4 py-2 border-b">Component</th>
                            <th className="px-4 py-2 border-b"><Equation>{`\\alpha`}</Equation></th>
                            <th className="px-4 py-2 border-b"><Equation>{`\\beta`}</Equation> (initialization scale)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">Encoder</td>
                            <td className="px-4 py-2"><Equation>{`(2N)^{1/4}`}</Equation></td>
                            <td className="px-4 py-2"><Equation>{`(8N)^{-1/4}`}</Equation></td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-4 py-2 font-medium">Decoder</td>
                            <td className="px-4 py-2"><Equation>{`(3M)^{1/4}`}</Equation></td>
                            <td className="px-4 py-2"><Equation>{`(12M)^{-1/4}`}</Equation></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Paragraph>
                The initialization scale <Equation>{`\\beta`}</Equation> is applied to the output projection matrices in attention (<Equation>{`W^O`}</Equation>) and FFN (<Equation>{`W_2`}</Equation>).
            </Paragraph>

            <Header4>Why It Works</Header4>
            <Paragraph>
                The theoretical analysis shows that with these constants:
            </Paragraph>
            <List>
                <ListItem>
                    <strong>Model updates are bounded:</strong> The magnitude of parameter updates stays within a constant factor regardless of depth.
                </ListItem>
                <ListItem>
                    <strong>Gradient norms are approximately constant:</strong> Early layers receive gradients comparable to late layers.
                </ListItem>
                <ListItem>
                    <strong>Post-LN expressivity is preserved:</strong> Unlike Pre-LN, representations remain diverse across layers.
                </ListItem>
            </List>

            <Callout type="tip" title="DeepNet Results">
                DeepNet scaled a 200-layer, 3.2B parameter model that outperformed a 48-layer, 12B parameter baseline by 5 BLEU points on multilingual translation. The key insight: depth can be more efficient than width when trained with proper scaling.
            </Callout>

            <Header3>BranchNorm: Time-Varying Scaling</Header3>
            <Paragraph>
                <strong>BranchNorm</strong> (Wang et al., 2023) addresses a limitation of DeepNorm: while DeepNorm enables training, the strong scaling can lead to <em>undertrained</em> models where layers don't contribute fully. BranchNorm uses <strong>dynamic, time-varying scaling</strong> that changes throughout training.
            </Paragraph>

            <Header4>The Core Idea</Header4>
            <Paragraph>
                BranchNorm dynamically rescales the non-residual branch based on training progress:
            </Paragraph>
            <Equation block>
                {`x_{l+1} = x_l + \\gamma(t) \\cdot F(\\text{LN}(x_l))`}
            </Equation>
            <Paragraph>
                where <Equation>{`\\gamma(t)`}</Equation> starts small and increases during training. The schedule is designed so that:
            </Paragraph>
            <List>
                <ListItem>
                    <strong>Early training:</strong> <Equation>{`\\gamma(t)`}</Equation> is small, keeping the network near identity for stable optimization.
                </ListItem>
                <ListItem>
                    <strong>Late training:</strong> <Equation>{`\\gamma(t) \\to 1`}</Equation>, transitioning to standard Post-LN for full expressivity.
                </ListItem>
            </List>

            <Header4>Advantages Over Static Scaling</Header4>
            <List>
                <ListItem>
                    <strong>Better Final Convergence:</strong> By transitioning to full residual contribution, BranchNorm avoids the undertrained layer problem of DeepNorm.
                </ListItem>
                <ListItem>
                    <strong>Smooth Gradient Norms:</strong> The gradual transition prevents sudden stability changes during training.
                </ListItem>
                <ListItem>
                    <strong>Reduced Parameter Redundancy:</strong> All layers learn to contribute meaningfully, reducing effective parameter waste.
                </ListItem>
            </List>

            <Callout type="info" title="Schedule Design">
                The exact schedule for <Equation>{`\\gamma(t)`}</Equation> can vary. Common choices include linear warm-up over a fraction of training, cosine schedules, or learned schedules. The key is smooth transition without sudden jumps that could destabilize training.
            </Callout>

            <Header3>GPT-Style Initialization Scaling</Header3>
            <Paragraph>
                Before DeepNorm, practitioners used simpler heuristics. The GPT-2/GPT-3 approach scales output projection weights at initialization:
            </Paragraph>
            <Equation block>
                {`W^{\\text{out}} \\sim \\mathcal{N}\\left(0, \\frac{1}{\\sqrt{2L}}\\right)`}
            </Equation>
            <Paragraph>
                where <Equation>{`L`}</Equation> is total depth. This <Equation>{`1/\\sqrt{2L}`}</Equation> scaling (the factor of 2 accounts for both attention and FFN contributing per layer) reduces the variance contribution of each residual block, preventing explosion.
            </Paragraph>
            <Paragraph>
                While less principled than DeepNorm, this approach is widely used and works well for models up to ~100 layers. It's often combined with Pre-LN for additional stability.
            </Paragraph>

            <Header3>Comparison of Fixed Scaling Methods</Header3>
            <div className="overflow-x-auto my-6">
                <table className="min-w-full text-sm text-left text-slate-700 border border-slate-200">
                    <thead className="text-xs text-slate-800 uppercase bg-slate-100 font-bold">
                        <tr>
                            <th className="px-4 py-2 border-b">Method</th>
                            <th className="px-4 py-2 border-b">Scaling Type</th>
                            <th className="px-4 py-2 border-b">Max Depth</th>
                            <th className="px-4 py-2 border-b">Limitation</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">GPT-style <Equation>{`1/\\sqrt{2L}`}</Equation></td>
                            <td className="px-4 py-2">Static init only</td>
                            <td className="px-4 py-2">~100 layers</td>
                            <td className="px-4 py-2">Pre-LN dependent</td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-4 py-2 font-medium">DeepNorm</td>
                            <td className="px-4 py-2">Static + init</td>
                            <td className="px-4 py-2">1,000+ layers</td>
                            <td className="px-4 py-2">Undertrained layers</td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">BranchNorm</td>
                            <td className="px-4 py-2">Dynamic schedule</td>
                            <td className="px-4 py-2">500+ layers</td>
                            <td className="px-4 py-2">Schedule sensitivity</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Section>
    );
};

export default FixedScaling;
