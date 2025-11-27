import React from 'react';
import { Activity } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';

const ComplexityAnalysis = () => {
    return (
        <Section title="Complexity Analysis" icon={Activity}>
            <p className="mb-4 text-slate-700 leading-relaxed">
                Both MQA and GQA reduce the quadratic scaling bottlenecks of standard multi-head attention and are considered sub-quadratic in inference-time memory and compute, under typical decoder-only (autoregressive) settings, especially advantageous in long-context autoregressive inference scenarios.
            </p>

            <h4 className="font-bold text-slate-800 mb-3 mt-6">MQA Complexity</h4>
            <p className="mb-2 text-slate-700"><strong>Key design</strong>: Only one set of keys and values is computed and cached, regardless of the number of attention heads.</p>

            <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <p className="font-semibold text-blue-900 mb-2">Memory and Compute Savings:</p>
                <ul className="list-disc list-inside text-blue-800 space-y-2 ml-4">
                    <li><strong>Memory</strong>: KV cache is reduced from <Equation>{`O(H \\times L \\times d)`}</Equation> to <Equation>{`O(L \\times d)`}</Equation> (where <Equation>{`H`}</Equation> = number of heads, <Equation>{`L`}</Equation> = sequence length, <Equation>{`d`}</Equation> = head dimension)</li>
                    <li><strong>Compute</strong>: During decoding, the attention lookup is linear in sequence length <Equation>{`O(L)`}</Equation> per token</li>
                </ul>
                <p className="text-blue-800 mt-2"><strong>Result</strong>: MQA makes inference sub-quadratic — in fact, linear with respect to sequence length for each token step.</p>
            </div>

            <h4 className="font-bold text-slate-800 mb-3">GQA Complexity</h4>
            <p className="mb-2 text-slate-700"><strong>Key design</strong>: KV projections are shared within groups of attention heads. With <Equation>{`G`}</Equation> groups, you store only <Equation>{`G`}</Equation> sets of keys/values, where <Equation>{`G < H`}</Equation>.</p>

            <div className="bg-green-50 p-4 rounded-lg mb-6">
                <p className="font-semibold text-green-900 mb-2">Memory and Compute:</p>
                <ul className="list-disc list-inside text-green-800 space-y-2 ml-4">
                    <li><strong>Memory</strong>: KV cache size is <Equation>{`O(G \\times L \\times d)`}</Equation> — better than MHA, but larger than MQA</li>
                    <li><strong>Compute</strong>: Per-token attention cost during decoding is <Equation>{`O(L)`}</Equation> per head, with reduced KV lookup</li>
                </ul>
                <p className="text-green-800 mt-2"><strong>Result</strong>: GQA is also sub-quadratic, with a tunable balance between memory efficiency (via <Equation>{`G`}</Equation>) and expressiveness.</p>
            </div>

            <h4 className="font-bold text-slate-800 mb-3">Tabular Summary</h4>
            <p className="mb-4 text-slate-700">
                The following table summarizes the complexity of various attention mechanisms. <Equation>{`L`}</Equation> is sequence length, <Equation>{`d`}</Equation> is dimension, <Equation>{`H`}</Equation> is heads, <Equation>{`G`}</Equation> is groups.
            </p>
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left text-slate-600 border border-slate-200">
                    <thead className="text-xs text-slate-700 uppercase bg-slate-100">
                        <tr>
                            <th className="px-6 py-3 border-b">Mechanism</th>
                            <th className="px-6 py-3 border-b">KV Cache Size</th>
                            <th className="px-6 py-3 border-b">Inference Complexity (per token)</th>
                            <th className="px-6 py-3 border-b">Sub-Quadratic?</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b">
                            <td className="px-6 py-4 font-medium text-slate-900">MHA</td>
                            <td className="px-6 py-4"><Equation>{`O(H \\cdot n \\cdot d)`}</Equation></td>
                            <td className="px-6 py-4"><Equation>{`O(H \\cdot n)`}</Equation></td>
                            <td className="px-6 py-4 text-red-600 font-bold">No</td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-6 py-4 font-medium text-slate-900">MQA</td>
                            <td className="px-6 py-4"><Equation>{`O(n \\cdot d)`}</Equation></td>
                            <td className="px-6 py-4"><Equation>{`O(n)`}</Equation></td>
                            <td className="px-6 py-4 text-green-600 font-bold">Yes</td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-6 py-4 font-medium text-slate-900">GQA</td>
                            <td className="px-6 py-4"><Equation>{`O(G \\cdot n \\cdot d)`}</Equation></td>
                            <td className="px-6 py-4"><Equation>{`O(G \\cdot n)`}</Equation></td>
                            <td className="px-6 py-4 text-green-600 font-bold">Yes</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Section>
    );
};

export default ComplexityAnalysis;
