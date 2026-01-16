import React from 'react';
import { GitBranch } from 'lucide-react';
import Section from '../../../components/Section';
import Header3 from '../../../components/Header3';
import Header4 from '../../../components/Header4';
import Paragraph from '../../../components/Paragraph';
import List from '../../../components/List';
import ListItem from '../../../components/ListItem';
import Equation from '../../../components/Equation';
import Callout from '../../../components/Callout';

const TransformerResidualStructure = () => {
    return (
        <Section title="Transformer Residual Structure" icon={GitBranch}>
            <Header3>The Residual Stream Paradigm</Header3>
            <Paragraph>
                In Transformers, the <strong>residual stream</strong> is the central information highway that flows through all layers. Unlike CNNs where residual connections skip over individual blocks, Transformers have a more structured pattern: each layer adds the output of an attention sub-block and an FFN sub-block to the stream:
            </Paragraph>
            <Equation block>
                {`h_l = h_{l-1} + \\text{Attn}(h_{l-1}) + \\text{FFN}(h_{l-1} + \\text{Attn}(h_{l-1}))`}
            </Equation>
            <Paragraph>
                The critical design decision is <strong>where to place Layer Normalization</strong> relative to these residual connections. This choice profoundly affects training dynamics and interacts strongly with residual scaling strategies.
            </Paragraph>

            {/* Post-LN vs Pre-LN Architecture Diagram */}
            <div className="w-full overflow-x-auto my-8 p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
                <svg viewBox="0 0 800 380" className="w-full min-w-[700px] font-sans">
                    <defs>
                        <marker id="arrow-diagram" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
                        </marker>
                    </defs>

                    {/* Post-LN Side */}
                    <g transform="translate(150, 20)">
                        {/* Title */}
                        <text x="0" y="0" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#0f172a">Post-LN</text>
                        <text x="0" y="18" textAnchor="middle" fontSize="11" fill="#64748b">(Original Transformer)</text>

                        {/* Input */}
                        <rect x="-40" y="40" width="80" height="28" rx="4" fill="#e2e8f0" stroke="#64748b" strokeWidth="1.5" />
                        <text x="0" y="58" textAnchor="middle" fontSize="12" fill="#334155">x_l</text>

                        {/* Split point */}
                        <path d="M 0 68 L 0 85" fill="none" stroke="#64748b" strokeWidth="1.5" />
                        <circle cx="0" cy="90" r="3" fill="#64748b" />

                        {/* Residual path (skip connection) - left side */}
                        <path d="M -3 90 L -60 90 L -60 180 L -15 180" fill="none" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4,2" />

                        {/* F(x) path - right side */}
                        <path d="M 3 90 L 60 90 L 60 110" fill="none" stroke="#64748b" strokeWidth="1.5" />
                        <rect x="30" y="115" width="60" height="35" rx="4" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
                        <text x="60" y="137" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e40af">F(x_l)</text>
                        <path d="M 60 150 L 60 180 L 15 180" fill="none" stroke="#64748b" strokeWidth="1.5" />

                        {/* Add node */}
                        <circle cx="0" cy="180" r="14" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
                        <text x="0" y="185" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#92400e">+</text>

                        {/* Arrow down to LN */}
                        <path d="M 0 194 L 0 215" fill="none" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrow-diagram)" />

                        {/* LayerNorm block - AFTER addition */}
                        <rect x="-45" y="225" width="90" height="32" rx="4" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
                        <text x="0" y="246" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#166534">LayerNorm</text>

                        {/* Output */}
                        <path d="M 0 257 L 0 275" fill="none" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrow-diagram)" />
                        <rect x="-40" y="285" width="80" height="28" rx="4" fill="#e2e8f0" stroke="#64748b" strokeWidth="1.5" />
                        <text x="0" y="303" textAnchor="middle" fontSize="12" fill="#334155">x_{'{l+1}'}</text>

                        {/* Equation */}
                        <text x="0" y="335" textAnchor="middle" fontSize="10" fill="#475569" fontFamily="monospace">x_{'{l+1}'} = LN(x_l + F(x_l))</text>
                    </g>

                    {/* Divider */}
                    <line x1="400" y1="30" x2="400" y2="340" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="8,4" />

                    {/* Pre-LN Side */}
                    <g transform="translate(600, 20)">
                        {/* Title */}
                        <text x="0" y="0" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#0f172a">Pre-LN</text>
                        <text x="0" y="18" textAnchor="middle" fontSize="11" fill="#64748b">(Modern Default)</text>

                        {/* Input */}
                        <rect x="-50" y="40" width="100" height="30" rx="4" fill="#e2e8f0" stroke="#64748b" strokeWidth="1.5" />
                        <text x="0" y="60" textAnchor="middle" fontSize="12" fill="#334155">x_l</text>

                        {/* Split - one goes to LN, one skips */}
                        <path d="M 0 70 L 0 90" fill="none" stroke="#64748b" strokeWidth="1.5" />

                        {/* Skip connection - curves around left */}
                        <path d="M -50 55 L -80 55 L -80 200 L -15 200" fill="none" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4,2" />

                        {/* LayerNorm block - BEFORE F */}
                        <rect x="-50" y="95" width="100" height="35" rx="4" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
                        <text x="0" y="117" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#166534">LayerNorm</text>

                        {/* Arrow to F */}
                        <path d="M 0 130 L 0 150" fill="none" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrow-diagram)" />

                        {/* F(LN(x)) block */}
                        <rect x="-40" y="155" width="80" height="35" rx="4" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
                        <text x="0" y="177" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e40af">F(LN(x_l))</text>

                        {/* Arrow to Add */}
                        <path d="M 0 190 L 0 195" fill="none" stroke="#64748b" strokeWidth="1.5" />

                        {/* Add node */}
                        <circle cx="0" cy="210" r="15" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
                        <text x="0" y="215" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#92400e">+</text>

                        {/* Output */}
                        <path d="M 0 225 L 0 250" fill="none" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrow-diagram)" />
                        <rect x="-50" y="260" width="100" height="30" rx="4" fill="#e2e8f0" stroke="#64748b" strokeWidth="1.5" />
                        <text x="0" y="280" textAnchor="middle" fontSize="12" fill="#334155">x_{'{l+1}'}</text>

                        {/* Equation */}
                        <text x="0" y="320" textAnchor="middle" fontSize="11" fill="#475569" fontFamily="monospace">x_{'{l+1}'} = x_l + F(LN(x_l))</text>
                    </g>

                    {/* Legend */}
                    <g transform="translate(400, 355)">
                        <rect x="-120" y="0" width="16" height="12" rx="2" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
                        <text x="-100" y="10" fontSize="10" fill="#475569">LayerNorm</text>
                        <rect x="-40" y="0" width="16" height="12" rx="2" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1" />
                        <text x="-20" y="10" fontSize="10" fill="#475569">Sublayer (Attn/FFN)</text>
                        <line x1="65" y1="6" x2="85" y2="6" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4,2" />
                        <text x="90" y="10" fontSize="10" fill="#475569">Skip connection</text>
                    </g>
                </svg>
            </div>

            <Header3>Post-LN: The Original Transformer</Header3>
            <Paragraph>
                The original Transformer (Vaswani et al., 2017) used <strong>Post-Layer Normalization</strong>:
            </Paragraph>
            <Equation block>
                {`x_{l+1} = \\text{LN}(x_l + F(x_l))`}
            </Equation>
            <Paragraph>
                where <Equation>{`F`}</Equation> is either the attention or FFN sub-layer. Layer normalization is applied <em>after</em> the residual addition.
            </Paragraph>

            <Header4>Advantages</Header4>
            <List>
                <ListItem>
                    <strong>Better Final Performance:</strong> When training succeeds, Post-LN often achieves better final accuracy than Pre-LN, especially in shallower models (≤12 layers).
                </ListItem>
                <ListItem>
                    <strong>Diverse Representations:</strong> Each layer's output is normalized independently, allowing layers to learn distinct representations without homogenization.
                </ListItem>
            </List>

            <Header4>Failure Mode: Gradient Instability</Header4>
            <Paragraph>
                Post-LN suffers from severe gradient issues at depth:
            </Paragraph>
            <List>
                <ListItem>
                    <strong>Exploding Gradients Near Output:</strong> At the start of training, gradients w.r.t. layers near the output can be extremely large, causing unstable updates.
                </ListItem>
                <ListItem>
                    <strong>Vanishing Gradients in Early Layers:</strong> The gradient norm decays exponentially with depth toward the input. In deep networks, early layers receive negligible gradients.
                </ListItem>
                <ListItem>
                    <strong>Requires Warm-up:</strong> To mitigate these issues, Post-LN models require careful learning rate warm-up—starting very small and gradually increasing. Without warm-up, training often diverges.
                </ListItem>
            </List>

            <Callout type="warning" title="The Post-LN Gradient Problem">
                In a deep Post-LN Transformer, the expected gradient norm for layer <Equation>{`l`}</Equation> scales as <Equation>{`O(1/L)`}</Equation> where <Equation>{`L`}</Equation> is total depth. For 100+ layer models, early layers effectively stop learning without intervention.
            </Callout>

            <Header3>Pre-LN: The Modern Default</Header3>
            <Paragraph>
                Most modern Transformers (GPT-2, GPT-3, LLaMA, ViT) use <strong>Pre-Layer Normalization</strong>:
            </Paragraph>
            <Equation block>
                {`x_{l+1} = x_l + F(\\text{LN}(x_l))`}
            </Equation>
            <Paragraph>
                Layer normalization is applied <em>inside</em> the residual branch, before the transformation.
            </Paragraph>

            <Header4>Advantages</Header4>
            <List>
                <ListItem>
                    <strong>Stable Gradient Flow:</strong> The residual connection provides a clean gradient highway. Since <Equation>{`\\frac{\\partial x_L}{\\partial x_l} = I + \\ldots`}</Equation>, gradients can flow directly through the identity path.
                </ListItem>
                <ListItem>
                    <strong>No Warm-up Required:</strong> Training is stable from the start, simplifying hyperparameter tuning.
                </ListItem>
                <ListItem>
                    <strong>Scales to Extreme Depth:</strong> Pre-LN can train models with hundreds of layers without special intervention.
                </ListItem>
            </List>

            <Header4>Failure Mode: Representation Collapse</Header4>
            <Paragraph>
                Pre-LN solves the gradient problem but introduces a different issue:
            </Paragraph>
            <List>
                <ListItem>
                    <strong>Homogenized Representations:</strong> Because normalization happens before each layer, representations become increasingly similar across depth. Deep layers may produce nearly identical outputs.
                </ListItem>
                <ListItem>
                    <strong>Wasted Capacity:</strong> If layers converge to similar functions, adding more layers provides diminishing returns—the effective depth is much less than the nominal depth.
                </ListItem>
                <ListItem>
                    <strong>Curse of Depth:</strong> Beyond a certain depth, Pre-LN models stop improving or even degrade, despite adding parameters.
                </ListItem>
            </List>

            <Callout type="info" title="Measuring Representation Collapse">
                Representation collapse can be diagnosed by computing the cosine similarity between hidden states at different layers: <Equation>{`\\text{sim}(h_l, h_m) = \\frac{h_l \\cdot h_m}{\\|h_l\\| \\|h_m\\|}`}</Equation>. In collapsed models, this similarity approaches 1.0 for all layer pairs.
            </Callout>

            <Header3>The Pre-LN vs Post-LN Tradeoff</Header3>
            <div className="overflow-x-auto my-6">
                <table className="min-w-full text-sm text-left text-slate-700 border border-slate-200">
                    <thead className="text-xs text-slate-800 uppercase bg-slate-100 font-bold">
                        <tr>
                            <th className="px-4 py-2 border-b">Aspect</th>
                            <th className="px-4 py-2 border-b">Post-LN</th>
                            <th className="px-4 py-2 border-b">Pre-LN</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">Gradient flow</td>
                            <td className="px-4 py-2">Unstable at depth</td>
                            <td className="px-4 py-2">Stable via identity path</td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-4 py-2 font-medium">Warm-up required</td>
                            <td className="px-4 py-2">Yes, critical</td>
                            <td className="px-4 py-2">No</td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">Representation diversity</td>
                            <td className="px-4 py-2">High</td>
                            <td className="px-4 py-2">Prone to collapse</td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-4 py-2 font-medium">Final performance</td>
                            <td className="px-4 py-2">Often higher (when trainable)</td>
                            <td className="px-4 py-2">May plateau at depth</td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">Scalability</td>
                            <td className="px-4 py-2">Limited to ~50 layers</td>
                            <td className="px-4 py-2">Scales to 100+ layers</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <Header3>Why Residual Scaling Matters for LN Placement</Header3>
            <Paragraph>
                Residual scaling techniques can bridge the gap between Pre-LN and Post-LN by addressing their respective weaknesses:
            </Paragraph>
            <List>
                <ListItem>
                    <strong>For Post-LN:</strong> Scaling down the residual branch (e.g., DeepNorm) reduces the gradient explosion problem, making Post-LN trainable at depth while preserving its expressivity benefits.
                </ListItem>
                <ListItem>
                    <strong>For Pre-LN:</strong> Techniques like BranchNorm dynamically adjust scaling during training—starting with strong regularization (near identity) and transitioning toward standard Pre-LN, aiming to get the stability of Pre-LN early and the expressivity of Post-LN later.
                </ListItem>
            </List>
            <Paragraph>
                The key insight is that <strong>the interaction between residual scaling and normalization placement is not additive</strong>—they fundamentally change each other's behavior. A scaling factor that works for Pre-LN may destabilize Post-LN, and vice versa. This is why methods like DeepNorm derive separate scaling constants based on the normalization scheme.
            </Paragraph>

            <Callout type="tip" title="Modern Hybrid Approaches">
                Some architectures use hybrid schemes like ResiDual (dual residual connections), Sandwich-LN (Pre-LN + extra Post-LN), or QK-Norm (additional normalization on attention scores). These can be viewed as attempts to get the best of both worlds—stable gradients and diverse representations.
            </Callout>
        </Section>
    );
};

export default TransformerResidualStructure;
