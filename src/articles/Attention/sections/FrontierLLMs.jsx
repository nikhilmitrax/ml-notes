import React, { useState } from 'react';
import { Cpu } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';
import EquationBlock from '../../../components/EquationBlock';
import InteractiveCard from '../../../components/InteractiveCard';

const SlidingWindowVisualization = () => {
    const [windowSize, setWindowSize] = useState(3);
    const tokens = ["The", "quick", "brown", "fox", "jumps", "over", "the", "lazy", "dog"];
    const [hoveredToken, setHoveredToken] = useState(null);

    return (
        <div className="flex flex-col gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div className="flex items-center gap-4 mb-4">
                <label className="text-sm font-semibold text-slate-700">Window Size (W):</label>
                <input
                    type="range"
                    min="1"
                    max="5"
                    value={windowSize}
                    onChange={(e) => setWindowSize(parseInt(e.target.value))}
                    className="w-32"
                />
                <span className="font-mono text-slate-600">{windowSize}</span>
            </div>

            <div className="flex flex-wrap gap-2">
                {tokens.map((token, i) => {
                    const isHovered = hoveredToken === i;
                    const isInWindow = hoveredToken !== null && i < hoveredToken && i >= hoveredToken - windowSize;

                    let bgClass = "bg-white border-slate-200";
                    if (isHovered) bgClass = "bg-blue-100 border-blue-500 ring-2 ring-blue-200";
                    else if (isInWindow) bgClass = "bg-green-100 border-green-400";

                    return (
                        <div
                            key={i}
                            onMouseEnter={() => setHoveredToken(i)}
                            onMouseLeave={() => setHoveredToken(null)}
                            className={`px-3 py-2 rounded border transition-all cursor-pointer ${bgClass}`}
                        >
                            {token}
                            <div className="text-[10px] text-slate-400 text-center mt-1">{i}</div>
                        </div>
                    );
                })}
            </div>
            <p className="text-xs text-slate-500 mt-2">
                Hover over a token to see its attention window (Green). It can only attend to the previous {windowSize} tokens.
            </p>
        </div>
    );
};

const FrontierLLMs = () => {
    return (
        <Section title="Attention in Frontier LLMs" icon={Cpu}>
            <p className="mb-6 text-slate-700 leading-relaxed">
                While the Transformers of 2017 implemented attention computation that scaled quadratically (<Equation>{`O(n^2)`}</Equation>), this no longer holds true with recent models. Most large language models now employ sub-quadratic attention mechanisms (Linear Attention, Flash Attention, etc.) to handle long contexts efficiently.
            </p>
            <p className="mb-6 text-slate-700 leading-relaxed">
                Significant advancements have been made in the computation of attention since the introduction of GPT-3. Most large language models now employ sub-quadratic attention mechanisms, and many implementations have achieved constant space complexity. Innovations such as <strong>Paged-Attention</strong> and <strong>Flash Attention</strong> have allowed for more efficient read-write access on hardware. Consequently, many open-source projects have moved beyond standard PyTorch implementations to accommodate enhanced hardware utilization.
            </p>

            <h3 className="text-xl font-semibold text-slate-800 mb-4">Linear Attention (Linformer)</h3>
            <p className="mb-4 text-slate-700 leading-relaxed">
                Proposed by Wang et al. (Facebook AI) in <strong>Linformer: Self-Attention with Linear Complexity</strong>, Linformer reduces complexity to <Equation>{`O(n)`}</Equation> by using a <strong>low-rank approximation</strong> of the self-attention matrix.
            </p>
            <ul className="list-disc list-inside text-slate-700 space-y-2 mb-6 ml-4">
                <li><strong>Core Idea</strong>: The self-attention matrix is low-rank and can be decomposed.</li>
                <li><strong>Mechanism</strong>: Projects key and value matrices into lower-dimensional spaces (<Equation>{`n \\times k`}</Equation>) before computing attention by introducing linear projection matrices <Equation>{`E_i`}</Equation> and <Equation>{`F_i`}</Equation>.</li>
                <li><strong>Result</strong>: Linear time and space complexity, enabling processing of much longer sequences.</li>
                <li><strong>Performance</strong>: Experimental validation shows Linformer achieves similar or better performance compared to standard Transformers on tasks like sentiment analysis and question answering, with considerable improvements in training and inference speeds.</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-800 mb-4">Lightning Attention</h3>
            <p className="mb-4 text-slate-700 leading-relaxed">
                Proposed in <strong>MiniMax-01: Scaling Foundation Models with Lightning Attention</strong>, Lightning Attention is a highly optimized implementation of linear attention. It achieves linear complexity by maintaining a cumulative key-value state.
            </p>

            <h4 className="font-bold text-slate-800 mb-3">Core Algorithm Steps</h4>
            <ol className="list-decimal list-inside text-slate-700 space-y-3 mb-6 ml-4">
                <li>
                    <strong>Input Partitioning</strong>: The input matrices <Equation>{`Q, K, V`}</Equation> are divided into blocks of size <Equation>{`B \\times d`}</Equation>, where <Equation>{`B`}</Equation> is the block size and <Equation>{`d`}</Equation> is the feature dimension.
                </li>
                <li>
                    <strong>Initialization</strong>: Initialize a cumulative key-value matrix <Equation>{`KV = 0`}</Equation> of shape <Equation>{`d \\times d`}</Equation>. Create a mask <Equation>{`M`}</Equation> to handle causal attention.
                </li>
                <li>
                    <strong>Block-Wise Computation</strong>: For each block <Equation>{`t`}</Equation>:
                    <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                        <li><strong>Intra-Block Attention</strong>: Compute attention scores within the block using standard attention</li>
                        <li><strong>Inter-Block Attention</strong>: Update the cumulative <Equation>{`KV`}</Equation> matrix and compute contributions from past blocks</li>
                        <li>Combine intra- and inter-block results for the final output</li>
                    </ul>
                </li>
            </ol>
            <div className="bg-slate-900 text-slate-50 p-4 rounded-lg font-mono text-xs overflow-x-auto mb-6">
                <pre>{`def lightning_attention(Q, K, V, block_size):
    n, d = Q.shape
    KV = zeros((d, d))  # Cumulative state
    O = zeros_like(Q)
    
    for t in blocks:
        # Intra-block (standard attention within block)
        intra = (Q_t @ K_t.T * mask) @ V_t
        
        # Inter-block (linear attention with past)
        inter = Q_t @ KV
        
        # Update state
        KV += K_t.T @ V_t
        
        O[t] = intra + inter
    return O`}</pre>
            </div>

            <h3 className="text-xl font-semibold text-slate-800 mb-4">Multi-Query Attention (MQA)</h3>
            <p className="mb-4 text-slate-700 leading-relaxed">
                Introduced in <strong>Fast Transformer Decoding: One Write-Head is All You Need</strong> by Shazeer et al. (2019), Multi-Query Attention (MQA) is an architectural modification to the standard multi-head attention mechanism that improves efficiency — particularly for inference in large-scale language models.
            </p>
            <p className="mb-4 text-slate-700 leading-relaxed">
                In standard multi-head attention, each head maintains its own set of query, key, and value projections. While powerful, this design has a significant memory and compute cost, especially at inference time due to the need to cache separate keys and values for each head. MQA addresses this by <strong>sharing the keys and values across all heads</strong>, while keeping the queries distinct per head. This drastically reduces the memory footprint during decoding because only one set of key and value vectors needs to be stored per time step across all heads, rather than one per head.
            </p>

            <h4 className="font-bold text-slate-800 mb-3">Why Multi-Query Attention Works</h4>
            <ul className="list-disc list-inside text-slate-700 space-y-2 mb-6 ml-4">
                <li>Queries are still head-specific, allowing the model to attend to different aspects of the input.</li>
                <li>Since keys and values are typically derived from the same source sequence, they often exhibit redundancy across heads. MQA leverages this by reusing them, saving space without a major performance trade-off.</li>
                <li>Empirical results show that MQA retains model quality while reducing memory bandwidth and improving cache locality — both important for fast autoregressive generation.</li>
            </ul>

            <h4 className="font-bold text-slate-800 mb-3">Benefits of Multi-Query Attention</h4>
            <ul className="list-disc list-inside text-slate-700 space-y-2 mb-6 ml-4">
                <li><strong>Reduced KV Cache Size</strong>: Particularly important during inference in LLMs, where caching key-value pairs for long contexts can consume vast amounts of memory.</li>
                <li><strong>Faster Decoding</strong>: Fewer operations and better hardware utilization lead to faster inference times.</li>
                <li><strong>Scalability</strong>: Enables training and deploying larger models without linearly increasing inference costs.</li>
            </ul>

            <h4 className="font-bold text-slate-800 mb-3">Use in Modern Models</h4>
            <p className="mb-6 text-slate-700 leading-relaxed">
                MQA has been widely adopted in production models and open-source LLMs such as <strong>PaLM</strong>, <strong>Llama</strong>, and <strong>Mistral</strong>. Some models also employ Grouped-Query Attention (GQA) — a compromise between full multi-head attention and MQA, where queries are grouped and share keys/values within each group.
            </p>
            <p className="mb-6 text-slate-700 leading-relaxed">
                In summary, Multi-Query Attention offers a highly efficient alternative to traditional attention in decoder-only architectures, enabling faster inference with minimal accuracy trade-offs — a key innovation for scaling large language models in practical settings.
            </p>

            <h3 className="text-xl font-semibold text-slate-800 mb-4">Sliding Window Multi-Query Attention (SW-MQA)</h3>
            <p className="mb-4 text-slate-700 leading-relaxed">
                Introduced in <strong>Mistral 7B</strong>, this combines MQA with a sliding window constraint.
            </p>
            <InteractiveCard title="Interactive Sliding Window">
                <SlidingWindowVisualization />
            </InteractiveCard>
            <p className="mt-4 mb-4 text-slate-700 leading-relaxed">
                Each token can only attend to the previous <Equation>{`W`}</Equation> tokens. However, by stacking layers, the <strong>receptive field</strong> grows linearly (<Equation>{`L \\times W`}</Equation>), allowing the model to effectively "see" the whole sequence at higher layers.
            </p>

            <h3 className="text-xl font-semibold text-slate-800 mb-4">Grouped-Query Attention (GQA)</h3>
            <p className="mb-4 text-slate-700 leading-relaxed">
                Introduced in <strong>GQA: Training Generalized Multi-Query Transformer Models from Multi-Head Checkpoints</strong> by Ainslie et al. (2023), Grouped-Query Attention (GQA) is a middle ground between full multi-head attention and multi-query attention, designed to balance efficiency and model expressiveness.
            </p>
            <p className="mb-4 text-slate-700 leading-relaxed">
                In GQA, the queries are divided into groups, where each group shares the same key and value projections. Unlike Multi-Query Attention (MQA), which uses one shared key/value pair for all heads, GQA introduces <Equation>{`G`}</Equation> shared key-value sets, where <Equation>{`G < H`}</Equation>, and <Equation>{`H`}</Equation> is the number of heads.
            </p>
            <p className="mb-6 text-slate-700 leading-relaxed">
                This approach retains some diversity in key-value representation while significantly reducing the memory and compute overhead compared to full multi-head attention.
            </p>

            <h4 className="font-bold text-slate-800 mb-3">Motivation and Benefits</h4>
            <ul className="list-disc list-inside text-slate-700 space-y-2 mb-6 ml-4">
                <li><strong>Better Trade-off</strong>: GQA offers a spectrum between the full expressiveness of multi-head attention and the efficiency of MQA.</li>
                <li><strong>Memory Efficiency</strong>: Reduces the number of key-value projections to <Equation>{`G`}</Equation> instead of <Equation>{`H`}</Equation>, lowering the memory and caching requirements during autoregressive decoding.</li>
                <li><strong>Improved Parallelism</strong>: As shown in the FlashAttention-2 implementation, this structure allows better batching and tiling for GPU operations, leading to faster inference and training.</li>
            </ul>

            <h4 className="font-bold text-slate-800 mb-3">How it Works</h4>
            <p className="mb-2 text-slate-700">Suppose a Transformer model has:</p>
            <ul className="list-disc list-inside text-slate-700 space-y-2 mb-4 ml-4">
                <li><Equation>{`H = 16`}</Equation> attention heads</li>
                <li><Equation>{`G = 4`}</Equation> query groups</li>
            </ul>
            <p className="mb-2 text-slate-700 leading-relaxed">
                Each group of 4 heads shares the same key and value projections. So:
            </p>
            <ul className="list-disc list-inside text-slate-700 space-y-2 mb-6 ml-4">
                <li>16 different query projections (1 per head)</li>
                <li>4 key projections and 4 value projections (1 per group)</li>
            </ul>
            <p className="mb-6 text-slate-700 leading-relaxed">
                This means the memory and compute for keys and values is reduced by a factor of 4, while retaining more flexibility than MQA.
            </p>

            <h4 className="font-bold text-slate-800 mb-3">Adoption in Modern LLMs</h4>
            <p className="mb-6 text-slate-700 leading-relaxed">
                GQA is now widely adopted in large language models like <strong>Llama 2/3/4</strong>, <strong>Mistral</strong>, and <strong>Gemma</strong>, where models use a high number of attention heads but a smaller number of key-value groups to strike a balance between hardware efficiency and attention diversity.
            </p>
            <p className="mb-6 text-slate-700 leading-relaxed">
                In essence, Grouped-Query Attention provides a scalable, efficient design for large Transformer models, enabling high-throughput inference without a large sacrifice in performance — making it a compelling choice in modern LLM engineering.
            </p>

            <h3 className="text-xl font-semibold text-slate-800 mb-4 mt-8">Multi-Head vs. Multi-Query vs. Grouped-Query Attention</h3>
            <p className="mb-4 text-slate-700 leading-relaxed">
                With the growing scale of language models and demand for fast inference, attention mechanisms have evolved to balance expressiveness, efficiency, and memory usage. Three primary variants dominate this design space:
            </p>
            <ul className="list-disc list-inside text-slate-700 space-y-2 mb-6 ml-4">
                <li><strong>MHA</strong>: Each attention head has its own set of query, key, and value projections.</li>
                <li><strong>MQA</strong>: All heads share a single set of key and value projections, while queries remain distinct.</li>
                <li><strong>GQA</strong>: Heads are divided into groups; each group shares keys and values, but not queries.</li>
            </ul>
            <p className="mb-6 text-slate-700 leading-relaxed">
                These designs are widely used across modern Transformer models, depending on architectural goals and deployment constraints.
            </p>

            <h4 className="font-bold text-slate-800 mb-3">Key Differences</h4>
            <ul className="list-disc list-inside text-slate-700 space-y-2 mb-6 ml-4">
                <li><strong>MHA</strong> provides the highest flexibility and modeling capacity but with the most memory and compute cost.</li>
                <li><strong>MQA</strong> is the most efficient in terms of memory and decoding speed but sacrifices some diversity across attention heads.</li>
                <li><strong>GQA</strong> offers a balanced trade-off by reducing key-value redundancy while maintaining some head-level diversity.</li>
            </ul>

            <h4 className="font-bold text-slate-800 mb-3">Comparative Analysis</h4>
            <p className="mb-4 text-slate-700 leading-relaxed">
                The table below compares MHA, MQA, and GQA in terms of structure, performance, and resource efficiency. Let <Equation>{`H`}</Equation> denote the number of attention heads, and <Equation>{`G`}</Equation> the number of query groups, with <Equation>{`G < H`}</Equation>.
            </p>

            <div className="overflow-x-auto mb-6">
                <table className="min-w-full text-sm text-left text-slate-700 border border-slate-200">
                    <thead className="text-xs text-slate-800 uppercase bg-slate-100 font-bold">
                        <tr>
                            <th className="px-4 py-3 border-b">Feature</th>
                            <th className="px-4 py-3 border-b">Multi-Head (MHA)</th>
                            <th className="px-4 py-3 border-b">Multi-Query (MQA)</th>
                            <th className="px-4 py-3 border-b">Grouped-Query (GQA)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-3 font-medium">Query Projections</td>
                            <td className="px-4 py-3">One per head (<Equation>{`H`}</Equation> total)</td>
                            <td className="px-4 py-3">One per head (<Equation>{`H`}</Equation> total)</td>
                            <td className="px-4 py-3">One per head (<Equation>{`H`}</Equation> total)</td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-4 py-3 font-medium">Key/Value Projections</td>
                            <td className="px-4 py-3">One per head (<Equation>{`H`}</Equation> total)</td>
                            <td className="px-4 py-3">Shared across all heads (1 KV pair)</td>
                            <td className="px-4 py-3">Shared per group (<Equation>{`G`}</Equation> KV pairs)</td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-3 font-medium">Memory Usage (KV Cache)</td>
                            <td className="px-4 py-3">High (stores <Equation>{`H`}</Equation> KV sets)</td>
                            <td className="px-4 py-3">Low (stores 1 KV set)</td>
                            <td className="px-4 py-3">Medium (stores <Equation>{`G`}</Equation> KV sets)</td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-4 py-3 font-medium">Inference Speed</td>
                            <td className="px-4 py-3">Slowest</td>
                            <td className="px-4 py-3">Fastest</td>
                            <td className="px-4 py-3">Faster than MHA, slower than MQA</td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-3 font-medium">Model Expressiveness</td>
                            <td className="px-4 py-3">Highest</td>
                            <td className="px-4 py-3">Lowest</td>
                            <td className="px-4 py-3">Middle ground</td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-4 py-3 font-medium">Hardware Efficiency</td>
                            <td className="px-4 py-3">Least efficient</td>
                            <td className="px-4 py-3">Most efficient</td>
                            <td className="px-4 py-3">Efficient</td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-3 font-medium">Used In</td>
                            <td className="px-4 py-3">GPT-2, BERT, T5</td>
                            <td className="px-4 py-3">PaLM, Llama, Mistral</td>
                            <td className="px-4 py-3">Llama 2, Gemma, Mistral</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <p className="mb-8 text-slate-700 leading-relaxed">
                In summary, MHA remains the gold standard for rich contextual modeling, while MQA and GQA are engineering innovations driven by the needs of scaling, efficiency, and hardware constraints — crucial for the deployment of modern LLMs in real-world environments.
            </p>

            <h3 className="text-xl font-semibold text-slate-800 mb-4">Multi-Head Latent Attention (MLA)</h3>
            <p className="mb-4 text-slate-700 leading-relaxed">
                The Multi-Head Latent Attention (MLA) mechanism was proposed in <strong>DeepSeek-V3</strong> as a refined adaptation of traditional multi-head attention. MLA focuses on compressing the key-value (KV) cache and reducing activation memory, enabling efficient inference without significant performance degradation.
            </p>

            <h4 className="font-bold text-slate-800 mb-3">Key Equations and Design</h4>
            <p className="mb-4 text-slate-700 leading-relaxed">
                Let <Equation>{`d`}</Equation> denote the embedding dimension, <Equation>{`n_h`}</Equation> the number of attention heads, and <Equation>{`d_h`}</Equation> the dimension per head. Given the attention input for the <Equation>{`t`}</Equation>-th token at a specific attention layer, <Equation>{`h_t \\in \\mathbb{R}^d`}</Equation>, MLA introduces a low-rank joint compression mechanism for both keys and values.
            </p>

            <div className="space-y-4 mb-6">
                <div>
                    <p className="font-semibold text-slate-800 mb-2">1. Compressed Latent Vector for Keys and Values:</p>
                    <EquationBlock><Equation>
                        {`c_{KV_t} = W_{DKV} h_t`}
                    </Equation></EquationBlock>
                    <p className="text-sm text-slate-600 mt-2">
                        where <Equation>{`W_{DKV} \\in \\mathbb{R}^{d_c \\times d}`}</Equation> is a down-projection matrix and <Equation>{`d_c`}</Equation> is the compressed dimension.
                    </p>
                </div>

                <div>
                    <p className="font-semibold text-slate-800 mb-2">2. Up-projection to Keys and Values:</p>
                    <EquationBlock><Equation>
                        {`k_C^{(i)} = W_{UK}^{(i)} c_{KV_t}, \\quad v_C^{(i)} = W_{UV}^{(i)} c_{KV_t}`}
                    </Equation></EquationBlock>
                    <p className="text-sm text-slate-600 mt-2">
                        where <Equation>{`W_{UK}^{(i)}, W_{UV}^{(i)} \\in \\mathbb{R}^{d_h \\times d_c}`}</Equation> are the up-projection matrices for the <Equation>{`i`}</Equation>-th head.
                    </p>
                </div>
            </div>

            <p className="mb-6 text-slate-700 leading-relaxed">
                The compressed latent vector <Equation>{`c_{KV}`}</Equation> is cached instead of the full keys and values, dramatically reducing memory requirements. During inference, keys and values are reconstructed on-the-fly from this compressed representation. This allows storing a much smaller vector in the cache while maintaining performance comparable to standard MHA.
            </p>
        </Section>
    );
};

export default FrontierLLMs;
