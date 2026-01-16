import React from 'react';
import { Wrench } from 'lucide-react';
import Section from '../../../components/Section';
import Header3 from '../../../components/Header3';
import Header4 from '../../../components/Header4';
import Paragraph from '../../../components/Paragraph';
import List from '../../../components/List';
import ListItem from '../../../components/ListItem';
import Equation from '../../../components/Equation';
import Callout from '../../../components/Callout';

const PracticalEngineering = () => {
    return (
        <Section title="Practical Engineering" icon={Wrench}>
            <Paragraph>
                Implementing residual scaling methods requires more than just adding a multiplier. This section covers <strong>stability diagnostics</strong> to detect problems early and <strong>compute/memory tradeoffs</strong> of different approaches.
            </Paragraph>

            <Header3>Stability Diagnostics</Header3>
            <Paragraph>
                Training instability often announces itself before catastrophic failure. Monitoring the right metrics can help you intervene early.
            </Paragraph>

            <Header4>Gradient Norms by Depth</Header4>
            <Paragraph>
                The most direct diagnostic is <strong>gradient norm per layer</strong>. Healthy training shows approximately equal gradient norms across layers:
            </Paragraph>
            <Equation block>
                {`\\left\\|\\frac{\\partial \\mathcal{L}}{\\partial W_l}\\right\\| \\approx C \\quad \\text{for all } l`}
            </Equation>
            <Paragraph>
                <strong>Warning signs:</strong>
            </Paragraph>
            <List>
                <ListItem>
                    <strong>Exponential decay toward input:</strong> Early layers aren't learning (Post-LN gradient vanishing).
                </ListItem>
                <ListItem>
                    <strong>Exponential growth toward output:</strong> Late layers dominating (gradient explosion risk).
                </ListItem>
                <ListItem>
                    <strong>Sudden spikes:</strong> Individual layers receiving unstable updates (possible NaN incoming).
                </ListItem>
            </List>

            <Header4>Activation Variance Propagation</Header4>
            <Paragraph>
                Track the variance (or L2 norm) of activations at each layer:
            </Paragraph>
            <Equation block>
                {`\\text{Var}(h_l) \\text{ for } l = 1, \\ldots, L`}
            </Equation>
            <Paragraph>
                <strong>Healthy range:</strong> Variance should stay within 1-2 orders of magnitude across depth. With proper initialization and scaling, it should be roughly constant.
            </Paragraph>
            <Paragraph>
                <strong>Warning signs:</strong>
            </Paragraph>
            <List>
                <ListItem>
                    <strong>Variance explosion:</strong> Increases by 10× or more through the network → risk of overflow.
                </ListItem>
                <ListItem>
                    <strong>Variance collapse:</strong> Decreases to near-zero → signal dying, layers becoming useless.
                </ListItem>
            </List>

            <Header4>Representation Collapse Metrics</Header4>
            <Paragraph>
                For Pre-LN networks, check for <strong>representation collapse</strong> by measuring similarity across layers:
            </Paragraph>
            <Equation block>
                {`\\text{sim}_{l,m} = \\frac{1}{N} \\sum_{i=1}^{N} \\frac{h_l^{(i)} \\cdot h_m^{(i)}}{\\|h_l^{(i)}\\| \\|h_m^{(i)}\\|}`}
            </Equation>
            <Paragraph>
                Average cosine similarity between hidden states at layers <Equation>{`l`}</Equation> and <Equation>{`m`}</Equation> across <Equation>{`N`}</Equation> samples.
            </Paragraph>
            <Paragraph>
                <strong>Warning sign:</strong> If <Equation>{`\\text{sim}_{l,m} > 0.99`}</Equation> for distant layers (e.g., layer 10 vs layer 50), the network has collapsed—those layers are doing nearly the same thing.
            </Paragraph>

            <Header4>Training Loss Patterns</Header4>
            <div className="overflow-x-auto my-6">
                <table className="min-w-full text-sm text-left text-slate-700 border border-slate-200">
                    <thead className="text-xs text-slate-800 uppercase bg-slate-100 font-bold">
                        <tr>
                            <th className="px-4 py-2 border-b">Pattern</th>
                            <th className="px-4 py-2 border-b">Likely Cause</th>
                            <th className="px-4 py-2 border-b">Intervention</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">Immediate NaN</td>
                            <td className="px-4 py-2">Overflow at init</td>
                            <td className="px-4 py-2">Reduce init scale, add scaling</td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-4 py-2 font-medium">Sudden spike → NaN</td>
                            <td className="px-4 py-2">Gradient explosion</td>
                            <td className="px-4 py-2">Gradient clipping, reduce LR</td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">Plateau (no learning)</td>
                            <td className="px-4 py-2">Vanishing gradients</td>
                            <td className="px-4 py-2">Increase residual scale, check LN</td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-4 py-2 font-medium">Early fast, then stalls</td>
                            <td className="px-4 py-2">Rep. collapse / undertrained layers</td>
                            <td className="px-4 py-2">BranchNorm, increase expressivity</td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">Oscillating loss</td>
                            <td className="px-4 py-2">Unstable dynamics</td>
                            <td className="px-4 py-2">Lower LR, add warm-up</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <Callout type="tip" title="Logging Frequency">
                Log gradient/activation statistics every 100-1000 steps, not every step (overhead). For production training, use distributed logging libraries that aggregate across workers efficiently.
            </Callout>

            <Header3>Compute and Memory Tradeoffs</Header3>
            <Paragraph>
                Different residual scaling methods have different engineering costs. Understanding these helps choose the right approach.
            </Paragraph>

            <Header4>Method Overhead Comparison</Header4>
            <div className="overflow-x-auto my-6">
                <table className="min-w-full text-sm text-left text-slate-700 border border-slate-200">
                    <thead className="text-xs text-slate-800 uppercase bg-slate-100 font-bold">
                        <tr>
                            <th className="px-4 py-2 border-b">Method</th>
                            <th className="px-4 py-2 border-b">Extra Params</th>
                            <th className="px-4 py-2 border-b">Extra FLOPs</th>
                            <th className="px-4 py-2 border-b">Memory Impact</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">DeepNorm</td>
                            <td className="px-4 py-2">0</td>
                            <td className="px-4 py-2">Negligible (scalar mult)</td>
                            <td className="px-4 py-2">None</td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-4 py-2 font-medium">ReZero</td>
                            <td className="px-4 py-2">1 per layer</td>
                            <td className="px-4 py-2">Negligible</td>
                            <td className="px-4 py-2">None</td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">LayerScale</td>
                            <td className="px-4 py-2"><Equation>{`d`}</Equation> per layer</td>
                            <td className="px-4 py-2">Negligible (element-wise)</td>
                            <td className="px-4 py-2">None</td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-4 py-2 font-medium">LAuReL-LR</td>
                            <td className="px-4 py-2"><Equation>{`2rd`}</Equation> per layer</td>
                            <td className="px-4 py-2"><Equation>{`O(rd)`}</Equation> per layer</td>
                            <td className="px-4 py-2">Minimal</td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">HC/mHC</td>
                            <td className="px-4 py-2"><Equation>{`n^2`}</Equation> per layer</td>
                            <td className="px-4 py-2"><Equation>{`O(n^2 d)`}</Equation> per layer</td>
                            <td className="px-4 py-2"><Equation>{`n\\times`}</Equation> residual stream</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <Header4>Memory Bandwidth Considerations</Header4>
            <Paragraph>
                For methods like HC/mHC that widen the residual stream, <strong>memory bandwidth becomes the bottleneck</strong>, not compute:
            </Paragraph>
            <List>
                <ListItem>
                    <strong>The Problem:</strong> Modern GPUs are compute-bound for attention/FFN (high arithmetic intensity). But residual operations are memory-bound (just additions and element-wise ops).
                </ListItem>
                <ListItem>
                    <strong>HC Impact:</strong> With <Equation>{`n`}</Equation> streams, you move <Equation>{`n\\times`}</Equation> more data through the residual path. If <Equation>{`n=4`}</Equation>, the memory traffic of residual ops quadruples.
                </ListItem>
                <ListItem>
                    <strong>Mitigation:</strong> Fuse residual operations with preceding attention/FFN kernels so data stays in registers/L1 cache rather than making extra memory round trips.
                </ListItem>
            </List>

            <Callout type="info" title="The 6-7% mHC Overhead">
                The mHC paper reports 6-7% training overhead. This comes primarily from: (1) Sinkhorn iterations on the mixing matrices (~1%), (2) additional memory movement for multi-stream residuals (~3-4%), and (3) mixing operation compute (~2%). For large models, this is acceptable for the quality gains.
            </Callout>

            <Header4>Implementation Tips</Header4>
            <List>
                <ListItem>
                    <strong>Use fused kernels:</strong> For LayerScale, fuse the scaling into the preceding linear layer's bias add. For mHC, fuse Sinkhorn + mixing.
                </ListItem>
                <ListItem>
                    <strong>Keep scalars in registers:</strong> ReZero/LayerScale scalars are tiny—ensure they don't cause extra memory ops.
                </ListItem>
                <ListItem>
                    <strong>Profile before optimizing:</strong> Use PyTorch Profiler or Nsight to identify actual bottlenecks. Theory doesn't always match practice.
                </ListItem>
            </List>

            <Header3>Integration with Other Techniques</Header3>
            <Paragraph>
                Residual scaling interacts with other training techniques. Some combinations are beneficial; others counterproductive.
            </Paragraph>

            <Header4>Gradient Clipping</Header4>
            <Paragraph>
                Gradient clipping is often used alongside residual scaling. However:
            </Paragraph>
            <List>
                <ListItem>
                    <strong>With proper scaling (DeepNorm, ReZero):</strong> Gradient norms should be bounded by design. Clipping becomes a safety net, not a regular intervention.
                </ListItem>
                <ListItem>
                    <strong>If clipping fires frequently:</strong> Your scaling may be insufficient or misconfigured.
                </ListItem>
            </List>

            <Header4>Mixed Precision Training</Header4>
            <Paragraph>
                Residual scaling is especially important for mixed precision (FP16/BF16):
            </Paragraph>
            <List>
                <ListItem>
                    <strong>FP16 dynamic range:</strong> <Equation>{`\\approx 6 \\times 10^4`}</Equation> max. Variance explosion can hit this limit in deep networks.
                </ListItem>
                <ListItem>
                    <strong>BF16 is safer:</strong> Same exponent range as FP32, but reduced precision can still cause issues with tiny gradients.
                </ListItem>
                <ListItem>
                    <strong>Master weights in FP32:</strong> Keep an FP32 copy of weights for optimizer state. Residual scaling doesn't change this need.
                </ListItem>
            </List>

            <Header4>Distributed Training</Header4>
            <Paragraph>
                At scale, residual scaling interacts with parallelism strategies:
            </Paragraph>
            <List>
                <ListItem>
                    <strong>Tensor Parallelism:</strong> LayerScale/ReZero scalars could be replicated or partitioned. Replicate for simplicity (they're tiny).
                </ListItem>
                <ListItem>
                    <strong>Pipeline Parallelism:</strong> mHC's multi-stream residuals add communication between pipeline stages. The mixing must be synchronized.
                </ListItem>
                <ListItem>
                    <strong>Zero-bubble scheduling:</strong> Residual scaling doesn't fundamentally change pipeline scheduling, but mHC's stream mixing may add bubbles.
                </ListItem>
            </List>

            <Callout type="warning" title="Hyperparameter Sensitivity">
                Residual scaling can change optimal hyperparameters. When adopting a new method:
                <List>
                    <ListItem>Re-tune learning rate (may need to increase with ReZero/LayerScale)</ListItem>
                    <ListItem>Adjust warm-up (may need less with good scaling)</ListItem>
                    <ListItem>Check weight decay interactions (low-rank components in LAuReL may need different regularization)</ListItem>
                </List>
            </Callout>
        </Section>
    );
};

export default PracticalEngineering;
