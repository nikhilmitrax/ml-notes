import React from 'react';
import { Sparkles } from 'lucide-react';
import Section from '../../../components/Section';
import Header3 from '../../../components/Header3';
import Header4 from '../../../components/Header4';
import Paragraph from '../../../components/Paragraph';
import List from '../../../components/List';
import ListItem from '../../../components/ListItem';
import Equation from '../../../components/Equation';
import Callout from '../../../components/Callout';

const GeneralizedResiduals = () => {
    return (
        <Section title="Generalized Residual Connections" icon={Sparkles}>
            <Paragraph>
                Standard residual connections use simple addition: <Equation>{`x_{l+1} = x_l + F(x_l)`}</Equation>. <strong>Generalized residual connections</strong> augment the skip path itself with lightweight learned transformations, improving expressivity with minimal parameter overhead.
            </Paragraph>

            <Header3>LAuReL: Learned Augmented Residual Layer</Header3>
            <Paragraph>
                <strong>LAuReL</strong> (Learned Augmented Residual Layer) is designed as a drop-in replacement for standard residual connections that improves model quality with negligible overhead. It operates on the insight that the residual connection itself can be a site of useful computation.
            </Paragraph>

            <Header4>The LAuReL Framework</Header4>
            <Paragraph>
                Instead of <Equation>{`x_{l+1} = x_l + F(x_l)`}</Equation>, LAuReL uses:
            </Paragraph>
            <Equation block>
                {`x_{l+1} = G(x_l) + F(x_l)`}
            </Equation>
            <Paragraph>
                where <Equation>{`G`}</Equation> is a lightweight learned transformation of the skip path. The key constraint is that <Equation>{`G`}</Equation> must have <strong>minimal parameters and compute</strong>—otherwise we'd just be adding another layer.
            </Paragraph>

            {/* LAuReL Architecture Diagram */}
            <div className="w-full overflow-x-auto my-8 p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
                <svg viewBox="0 0 800 320" className="w-full min-w-[700px] font-sans">
                    <defs>
                        <marker id="arrow-laurel" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
                        </marker>
                        <marker id="arrow-purple" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#7c3aed" />
                        </marker>
                    </defs>

                    {/* Standard Residual Side */}
                    <g transform="translate(150, 30)">
                        {/* Title */}
                        <text x="0" y="0" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0f172a">Standard Residual</text>

                        {/* Input */}
                        <rect x="-40" y="30" width="80" height="28" rx="4" fill="#e2e8f0" stroke="#64748b" strokeWidth="1.5" />
                        <text x="0" y="49" textAnchor="middle" fontSize="11" fill="#334155">x_l</text>

                        {/* Split point */}
                        <circle cx="0" cy="75" r="4" fill="#64748b" />
                        <path d="M 0 58 L 0 71" fill="none" stroke="#64748b" strokeWidth="1.5" />

                        {/* Identity skip path (left) */}
                        <path d="M -4 75 L -60 75 L -60 175 L -15 175" fill="none" stroke="#64748b" strokeWidth="2" strokeDasharray="5,3" />
                        <text x="-75" y="130" textAnchor="middle" fontSize="10" fill="#64748b" transform="rotate(-90 -75 130)">Identity (I)</text>

                        {/* F(x) path (right) */}
                        <path d="M 4 75 L 60 75 L 60 100" fill="none" stroke="#64748b" strokeWidth="1.5" />
                        <rect x="30" y="105" width="60" height="35" rx="4" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
                        <text x="60" y="127" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e40af">F(x_l)</text>
                        <path d="M 60 140 L 60 175 L 15 175" fill="none" stroke="#64748b" strokeWidth="1.5" />

                        {/* Add node */}
                        <circle cx="0" cy="175" r="14" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
                        <text x="0" y="180" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#92400e">+</text>

                        {/* Output */}
                        <path d="M 0 189 L 0 215" fill="none" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrow-laurel)" />
                        <rect x="-40" y="225" width="80" height="28" rx="4" fill="#e2e8f0" stroke="#64748b" strokeWidth="1.5" />
                        <text x="0" y="244" textAnchor="middle" fontSize="11" fill="#334155">x_{'{l+1}'}</text>

                        {/* Equation */}
                        <text x="0" y="275" textAnchor="middle" fontSize="10" fill="#475569" fontFamily="monospace">x_l + F(x_l)</text>
                    </g>

                    {/* Divider */}
                    <line x1="350" y1="20" x2="350" y2="290" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="8,4" />

                    {/* LAuReL Side */}
                    <g transform="translate(580, 30)">
                        {/* Title */}
                        <text x="0" y="0" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0f172a">LAuReL</text>

                        {/* Input */}
                        <rect x="-40" y="30" width="80" height="28" rx="4" fill="#e2e8f0" stroke="#64748b" strokeWidth="1.5" />
                        <text x="0" y="49" textAnchor="middle" fontSize="11" fill="#334155">x_l</text>

                        {/* Split point */}
                        <circle cx="0" cy="75" r="4" fill="#64748b" />
                        <path d="M 0 58 L 0 71" fill="none" stroke="#64748b" strokeWidth="1.5" />

                        {/* G(x) augmented skip path (left) - Highlighted */}
                        <path d="M -4 75 L -70 75 L -70 105" fill="none" stroke="#7c3aed" strokeWidth="2" />
                        <rect x="-100" y="110" width="60" height="35" rx="4" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
                        <text x="-70" y="132" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#5b21b6">G(x_l)</text>
                        <path d="M -70 145 L -70 175 L -15 175" fill="none" stroke="#7c3aed" strokeWidth="2" markerEnd="url(#arrow-purple)" />

                        {/* Label for G path */}
                        <text x="-115" y="90" textAnchor="middle" fontSize="9" fill="#7c3aed" fontWeight="bold">Learned</text>
                        <text x="-115" y="100" textAnchor="middle" fontSize="9" fill="#7c3aed" fontWeight="bold">Skip</text>

                        {/* F(x) path (right) */}
                        <path d="M 4 75 L 70 75 L 70 105" fill="none" stroke="#64748b" strokeWidth="1.5" />
                        <rect x="40" y="110" width="60" height="35" rx="4" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
                        <text x="70" y="132" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e40af">F(x_l)</text>
                        <path d="M 70 145 L 70 175 L 15 175" fill="none" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrow-laurel)" />

                        {/* Add node */}
                        <circle cx="0" cy="175" r="14" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
                        <text x="0" y="180" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#92400e">+</text>

                        {/* Output */}
                        <path d="M 0 189 L 0 215" fill="none" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrow-laurel)" />
                        <rect x="-40" y="225" width="80" height="28" rx="4" fill="#e2e8f0" stroke="#64748b" strokeWidth="1.5" />
                        <text x="0" y="244" textAnchor="middle" fontSize="11" fill="#334155">x_{'{l+1}'}</text>

                        {/* Equation */}
                        <text x="0" y="275" textAnchor="middle" fontSize="10" fill="#475569" fontFamily="monospace">G(x_l) + F(x_l)</text>
                    </g>

                    {/* Legend */}
                    <g transform="translate(400, 305)">
                        <rect x="-180" y="0" width="14" height="10" rx="2" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1" />
                        <text x="-162" y="9" fontSize="9" fill="#475569">Learned skip transform</text>
                        <rect x="-60" y="0" width="14" height="10" rx="2" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1" />
                        <text x="-42" y="9" fontSize="9" fill="#475569">Sublayer (Attn/FFN)</text>
                        <line x1="55" y1="5" x2="75" y2="5" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4,2" />
                        <text x="80" y="9" fontSize="9" fill="#475569">Identity path</text>
                    </g>
                </svg>
            </div>

            <Header4>LAuReL Variants</Header4>
            <Paragraph>
                The paper introduces three variants, which can be combined:
            </Paragraph>

            <List>
                <ListItem>
                    <strong>LAuReL-RW (Residual Weighting):</strong> Learns per-channel weights for both paths:
                    <Equation block>
                        {`x_{l+1} = \\alpha \\odot x_l + \\beta \\odot F(x_l)`}
                    </Equation>
                    where <Equation>{`\\alpha, \\beta \\in \\mathbb{R}^d`}</Equation> are learnable vectors. This generalizes both ReZero (<Equation>{`\\alpha = 1, \\beta`}</Equation> learnable) and standard residuals (<Equation>{`\\alpha = \\beta = 1`}</Equation>).
                </ListItem>
                <ListItem>
                    <strong>LAuReL-LR (Low-Rank):</strong> Adds a low-rank transformation to the skip:
                    <Equation block>
                        {`x_{l+1} = x_l + W_2 W_1 x_l + F(x_l)`}
                    </Equation>
                    where <Equation>{`W_1 \\in \\mathbb{R}^{r \\times d}`}</Equation> and <Equation>{`W_2 \\in \\mathbb{R}^{d \\times r}`}</Equation> with rank <Equation>{`r \\ll d`}</Equation>. This adds <Equation>{`O(rd)`}</Equation> parameters per layer.
                </ListItem>
                <ListItem>
                    <strong>LAuReL-PA (Projection Augmentation):</strong> Uses partial projections that operate on subsets of dimensions, further reducing compute.
                </ListItem>
            </List>

            <Header4>Key Results</Header4>
            <div className="overflow-x-auto my-6">
                <table className="min-w-full text-sm text-left text-slate-700 border border-slate-200">
                    <thead className="text-xs text-slate-800 uppercase bg-slate-100 font-bold">
                        <tr>
                            <th className="px-4 py-2 border-b">Task</th>
                            <th className="px-4 py-2 border-b">Parameter Overhead</th>
                            <th className="px-4 py-2 border-b">Performance Gain</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">ResNet-50 (ImageNet)</td>
                            <td className="px-4 py-2">0.003%</td>
                            <td className="px-4 py-2">60% of extra-layer gains</td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-4 py-2 font-medium">1B LLM</td>
                            <td className="px-4 py-2">0.012%</td>
                            <td className="px-4 py-2">2.54-20.05% improvement</td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">4B LLM</td>
                            <td className="px-4 py-2">0.1%</td>
                            <td className="px-4 py-2">Improved downstream evals</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <Callout type="tip" title="LAuReL vs. LoRA">
                LAuReL and LoRA (Low-Rank Adaptation) both use low-rank matrices but serve different purposes. LoRA is for fine-tuning—it adapts pretrained weight matrices. LAuReL operates at the residual connection during pretraining, improving the base model's quality before any fine-tuning occurs.
            </Callout>

            <Header3>Theoretical Perspective</Header3>
            <Paragraph>
                Why does augmenting the skip path help? Several perspectives offer insight:
            </Paragraph>

            <Header4>Gradient Flow Enhancement</Header4>
            <Paragraph>
                With standard residuals, the gradient through the skip path is identity. LAuReL enriches this:
            </Paragraph>
            <Equation block>
                {`\\frac{\\partial x_{l+1}}{\\partial x_l} = \\frac{\\partial G}{\\partial x} + \\frac{\\partial F}{\\partial x}`}
            </Equation>
            <Paragraph>
                If <Equation>{`G`}</Equation> is learned to have well-conditioned gradients, it can stabilize training when <Equation>{`F`}</Equation>'s gradients are noisy or ill-conditioned.
            </Paragraph>

            <Header4>Increased Rank of Layer Mapping</Header4>
            <Paragraph>
                Standard residuals constraint the layer to compute <Equation>{`I + F`}</Equation>. LAuReL allows more general mappings:
            </Paragraph>
            <Equation block>
                {`G + F = (I + W_2 W_1) + F`}
            </Equation>
            <Paragraph>
                This increases the rank of representable transformations by the rank of the low-rank component, potentially allowing the layer to learn functions that would otherwise require additional depth.
            </Paragraph>

            <Header3>Design Considerations</Header3>
            <List>
                <ListItem>
                    <strong>Initialization:</strong> The skip augmentation should be initialized near identity. For LAuReL-LR, <Equation>{`W_2 W_1 \\approx 0`}</Equation> at init. For LAuReL-RW, <Equation>{`\\alpha = \\beta = 1`}</Equation>.
                </ListItem>
                <ListItem>
                    <strong>Rank Selection:</strong> For LAuReL-LR, the rank <Equation>{`r`}</Equation> controls the parameter/quality tradeoff. Typical values: <Equation>{`r \\in \\{4, 8, 16\\}`}</Equation> for LLMs.
                </ListItem>
                <ListItem>
                    <strong>Placement:</strong> LAuReL can be applied to all residual connections or selectively (e.g., only attention or only FFN). Uniform application is simplest.
                </ListItem>
            </List>

            <Callout type="info" title="Efficiency at Scale">
                LAuReL's negligible overhead makes it attractive for large-scale pretraining where efficiency matters. The <Equation>{`O(rd)`}</Equation> extra compute per layer is typically dominated by the <Equation>{`O(d^2)`}</Equation> attention and FFN operations, making the relative cost approach zero as models scale.
            </Callout>

            <Header3>Comparison with Other Residual Modifications</Header3>
            <div className="overflow-x-auto my-6">
                <table className="min-w-full text-sm text-left text-slate-700 border border-slate-200">
                    <thead className="text-xs text-slate-800 uppercase bg-slate-100 font-bold">
                        <tr>
                            <th className="px-4 py-2 border-b">Method</th>
                            <th className="px-4 py-2 border-b">Modifies</th>
                            <th className="px-4 py-2 border-b">Goal</th>
                            <th className="px-4 py-2 border-b">Overhead</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">ReZero/LayerScale</td>
                            <td className="px-4 py-2">Residual branch scale</td>
                            <td className="px-4 py-2">Training stability</td>
                            <td className="px-4 py-2">1 or <Equation>{`d`}</Equation> params/layer</td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-4 py-2 font-medium">DeepNorm</td>
                            <td className="px-4 py-2">Skip path scale + init</td>
                            <td className="px-4 py-2">Extreme depth</td>
                            <td className="px-4 py-2">None (changes constants)</td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">LAuReL</td>
                            <td className="px-4 py-2">Skip path transformation</td>
                            <td className="px-4 py-2">Quality improvement</td>
                            <td className="px-4 py-2">~0.01% params</td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-4 py-2 font-medium">Hyper-Connections</td>
                            <td className="px-4 py-2">Residual stream width</td>
                            <td className="px-4 py-2">Information bandwidth</td>
                            <td className="px-4 py-2">~5-10% params</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Section>
    );
};

export default GeneralizedResiduals;
