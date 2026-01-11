import React from 'react';
import { Network } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';
import Header3 from '../../../components/Header3';
import Header4 from '../../../components/Header4';
import Paragraph from '../../../components/Paragraph';
import CodeBlock from '../../../components/CodeBlock';
import List from '../../../components/List';
import ListItem from '../../../components/ListItem';
import Callout from '../../../components/Callout';

const FlexAttention = () => {
    return (
        <Section title="FlexAttention & Modern Patterns" icon={Network}>
            <Callout type="tip" title="Tip">
                An excellent introduction to FlexAttention can be found in the <a href="https://pytorch.org/blog/flexattention/">PyTorch blog post</a>.
            </Callout>

            <Paragraph className="mb-4">
                <strong>FlexAttention</strong> (introduced in PyTorch 2.5) represents a paradigm shift in how attention variants are implemented. instead of writing custom CUDA kernels for every new attention mechanism (FlashAttention, Sliding Window, Alibi, etc.), FlexAttention allows researchers to define the attention score modification in high-level PyTorch code, which is then compiled into a fused, efficient kernel.
            </Paragraph>

            <Paragraph className="mb-6">
                The core API usually involves a <code>score_mod</code> function that takes the standard dot-product score and indices, and returns a modified score (or masks it out). This enables "Attention Programming".
            </Paragraph>

            <Header3>1. Common Attention Patterns</Header3>
            <Paragraph className="mb-4">
                Below are implementations of common attention patterns using the FlexAttention `score_mod` API.
            </Paragraph>

            <div className="space-y-8">
                {/* Tanh Soft-Capping */}
                <div>
                    <Header4 className="font-bold text-slate-800">1. Tanh Soft-Capping</Header4>
                    <Paragraph className="mb-2">
                        Used in models like Gemma 2 and Grok-1, soft-capping prevents attention scores from growing too large, improving training stability without hard clipping.
                    </Paragraph>
                    <CodeBlock language="python" code={`def tanh_softcapping(score, b, h, q_idx, k_idx):
    # Standard scale: 30.0 or 50.0
    cap_value = 50.0 
    return torch.tanh(score / cap_value) * cap_value`} />
                </div>

                {/* Relative Positional Encodings (ALiBi) */}
                <div>
                    <Header4 className="font-bold text-slate-800">2. Relative Positional Encodings & ALiBi</Header4>
                    <Paragraph className="mb-2">
                        ALiBi (Attention with Linear Biases) adds a static, non-learned bias based on the distance between query and key. This allows for better length extrapolation.
                    </Paragraph>
                    <CodeBlock language="python" code={`def alibi_bias(score, b, h, q_idx, k_idx):
    # m is a head-specific slope (e.g., 2^-8/h)
    scale = alibi_slopes[h]
    # Bias is proportional to distance (0 for q=k, negative for q>k)
    bias = (k_idx - q_idx) * scale
    return score + bias`} />
                </div>

                {/* Block Local Causal */}
                <div>
                    <Header4 className="font-bold text-slate-800">3. Block-Local Causal Attention</Header4>
                    <Paragraph className="mb-2">
                        Restricts attention to the current local block (of size B), combined with a causal mask. This is useful for long sequences where global context isn't required or is handled by other mechanisms.
                    </Paragraph>
                    <CodeBlock language="python" code={`def block_local_causal(score, b, h, q_idx, k_idx):
    block_size = 128
    same_block = (q_idx // block_size) == (k_idx // block_size)
    causal = k_idx <= q_idx
    return torch.where(same_block & causal, score, -float("inf"))`} />
                </div>

                {/* Sliding Window */}
                <div>
                    <Header4 className="font-bold text-slate-800">4. Sliding Window Attention</Header4>
                    <Paragraph className="mb-2">
                        Used in Mistral and other long-context formulations to reduce compute. Tokens only attend to the recent window `w`.
                    </Paragraph>
                    <CodeBlock language="python" code={`def sliding_window(score, b, h, q_idx, k_idx):
    window_size = 4096
    # Mask if distance exceeds window
    mask_condition = (q_idx - k_idx) > window_size
    return torch.where(mask_condition, -float("inf"), score)`} />
                </div>

                {/* PrefixLM */}
                <div>
                    <Header4 className="font-bold text-slate-800">5. PrefixLM Attention</Header4>
                    <Paragraph className="mb-2">
                        Often used in T5 or during "thinking" phases. The prefix acts as a bidirectional encoder (fully visible), while the rest of the sequence is causal.
                    </Paragraph>
                    <CodeBlock language="python" code={`def prefix_lm(score, b, h, q_idx, k_idx):
    prefix_len = 1024
    # Allow attention if:
    # 1. We are in the prefix (k_idx < prefix_len)
    # 2. OR standard causal masking (k_idx <= q_idx)
    allowed = (k_idx < prefix_len) | (k_idx <= q_idx)
    return torch.where(allowed, score, -float("inf"))`} />
                </div>

                {/* Document Masking / Jagged Tensors */}
                <div>
                    <Header4 className="font-bold text-slate-800">6. Document Masking (Sample Packing)</Header4>
                    <Paragraph className="mb-2">
                        When packing multiple short documents into a single sequence (to avoid padding waste), we must ensure Document A doesn't attend to Document B. FlexAttention handles this via `BlockMask` derived from document IDs.
                    </Paragraph>
                    <CodeBlock language="python" code={`def document_masking(score, b, h, q_idx, k_idx):
    # doc_ids shape: [batch, seq_len]
    # Only allow attention if belonging to same document
    same_doc = doc_ids[b, q_idx] == doc_ids[b, k_idx]
    return torch.where(same_doc, score, -float("inf"))`} />
                </div>

                {/* Paged Attention */}
                <div>
                    <Header4 className="font-bold text-slate-800">7. PagedAttention / Block Tables</Header4>
                    <Paragraph className="mb-2">
                        While PagedAttention (vLLM) primarily refers to the non-contiguous <strong>memory layout</strong> of the KV cache, FlexAttention supports the corresponding <strong>logical masking</strong>. If `q_idx` and `k_idx` map to physical blocks, the `score_mod` can access a block table to validate connections, though typically this is handled by the `BlockMask` construction which pre-computes the valid sparsity pattern of the pages.
                    </Paragraph>
                </div>
            </div>

            <Header3 className="mt-8">FlexAttention Workflow</Header3>
            <List>
                <ListItem><strong>Define Score Mod:</strong> Write a logical function (like above) using PyTorch operations.</ListItem>
                <ListItem><strong>Create BlockMask:</strong> <code>create_block_mask(score_mod, ...)</code> generates a sparse implementation plan, skipping blocks that are fully masked (-inf).</ListItem>
                <ListItem><strong>Compute:</strong> <code>flex_attention(q, k, v, score_mod=mod, block_mask=mask)</code> runs the fused kernel.</ListItem>
            </List>

        </Section>
    );
};

export default FlexAttention;
