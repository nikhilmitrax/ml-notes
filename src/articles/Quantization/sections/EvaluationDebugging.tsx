import React from 'react';
import { Search } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';
import Header3 from '../../../components/Header3';
import Header4 from '../../../components/Header4';
import Paragraph from '../../../components/Paragraph';
import Callout from '../../../components/Callout';
import CodeBlock from '../../../components/CodeBlock';
import List from '../../../components/List';
import ListItem from '../../../components/ListItem';

const EvaluationDebugging = () => {
    return (
        <Section title="Evaluation & Debugging" icon={Search}>
            <Paragraph className="mb-4">
                Quantization introduces subtle degradation that may not appear in aggregate metrics. Rigorous evaluation and debugging are essential to ensure production quality.
            </Paragraph>

            <Header3>Evaluation Metrics</Header3>
            <Paragraph className="mb-4">
                Different metrics capture different aspects of quantization quality:
            </Paragraph>

            <Header4 className="font-bold text-slate-800 mb-2">Task Accuracy</Header4>
            <Paragraph className="mb-4">
                The ultimate measure—does the quantized model perform the task correctly?
            </Paragraph>
            <List className="mb-4">
                <ListItem><strong>Classification</strong>: Top-1/Top-5 accuracy</ListItem>
                <ListItem><strong>Generation</strong>: BLEU, ROUGE, human eval</ListItem>
                <ListItem><strong>QA/Reasoning</strong>: Exact match, F1</ListItem>
            </List>

            <Header4 className="font-bold text-slate-800 mb-2">Perplexity</Header4>
            <Paragraph className="mb-2">
                For language models, perplexity measures how well the model predicts text:
            </Paragraph>
            <Equation block>
                {`\\text{PPL} = \\exp\\left(-\\frac{1}{N}\\sum_{i=1}^N \\log p(x_i | x_{<i})\\right)`}
            </Equation>
            <Paragraph className="text-slate-600 mb-4">
                Lower is better. A 1-2% PPL increase is often acceptable; &gt;5% indicates problems
            </Paragraph>

            <Header4 className="font-bold text-slate-800 mb-2">Calibration Error</Header4>
            <Paragraph className="mb-4">
                Measures whether model confidence matches actual accuracy. Quantization can miscalibrate probabilities even if top-1 accuracy is maintained.
            </Paragraph>
            <Equation block>
                {`\\text{ECE} = \\sum_{b=1}^B \\frac{n_b}{N} |\\text{acc}(b) - \\text{conf}(b)|`}
            </Equation>

            <Header4 className="font-bold text-slate-800 mb-2">Worst-Case Sensitivity</Header4>
            <Paragraph className="mb-4">
                Track maximum degradation, not just average. A single layer with severe quantization error can cause catastrophic failures on specific inputs:
            </Paragraph>
            <CodeBlock language="python" code={`def worst_case_analysis(model_fp, model_q, test_data):
    """Find inputs where quantization hurts most"""
    max_diff = 0
    worst_example = None
    
    for batch in test_data:
        logits_fp = model_fp(batch)
        logits_q = model_q(batch)
        
        # Measure per-example degradation
        diff = (logits_fp - logits_q).abs().max(dim=-1).values
        batch_max = diff.max().item()
        
        if batch_max > max_diff:
            max_diff = batch_max
            worst_example = batch[diff.argmax()]
    
    return worst_example, max_diff`} />

            <Header3>Layerwise Sensitivity Analysis</Header3>
            <Paragraph className="mb-4">
                Not all layers tolerate quantization equally. Sensitivity analysis identifies fragile layers:
            </Paragraph>

            <Header4 className="font-bold text-slate-800 mb-2">Per-Layer Sweep</Header4>
            <CodeBlock language="python" code={`def layerwise_sensitivity(model, calib_data, eval_data, bits_range=[8, 4, 3, 2]):
    """Measure accuracy at each bit width for each layer"""
    baseline = evaluate(model, eval_data)
    sensitivity = {}
    
    for name, layer in model.named_modules():
        if not is_quantizable(layer):
            continue
            
        sensitivity[name] = {}
        for bits in bits_range:
            # Quantize only this layer
            original_weight = layer.weight.clone()
            layer.weight = quantize(layer.weight, bits)
            
            score = evaluate(model, eval_data)
            sensitivity[name][bits] = baseline - score  # degradation
            
            layer.weight = original_weight  # restore
    
    return sensitivity
    
# Typical findings:
# - First/last layers most sensitive
# - Attention projections more sensitive than FFN
# - Some middle layers can go to 2-3 bits`} />

            <Header4 className="font-bold text-slate-800 mb-2">Sensitivity Patterns in LLMs</Header4>
            <div className="overflow-x-auto mb-6">
                <table className="min-w-full text-sm text-left text-slate-700 border border-slate-200">
                    <thead className="text-xs text-slate-800 uppercase bg-slate-100 font-bold">
                        <tr>
                            <th className="px-4 py-2 border-b">Layer/Block</th>
                            <th className="px-4 py-2 border-b">Typical Sensitivity</th>
                            <th className="px-4 py-2 border-b">Recommendation</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">Embedding</td>
                            <td className="px-4 py-2 text-red-600">High</td>
                            <td className="px-4 py-2">Keep FP16 or INT8 (not INT4)</td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-4 py-2 font-medium">First 1-2 blocks</td>
                            <td className="px-4 py-2 text-red-600">High</td>
                            <td className="px-4 py-2">Higher precision or larger groups</td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">Middle blocks</td>
                            <td className="px-4 py-2 text-emerald-600">Low</td>
                            <td className="px-4 py-2">INT4 with group size 128</td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-4 py-2 font-medium">Last 1-2 blocks</td>
                            <td className="px-4 py-2 text-amber-600">Medium-High</td>
                            <td className="px-4 py-2">Higher precision recommended</td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">LM Head</td>
                            <td className="px-4 py-2 text-red-600">High</td>
                            <td className="px-4 py-2">Keep FP16</td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-4 py-2 font-medium">QKV projections</td>
                            <td className="px-4 py-2 text-amber-600">Medium</td>
                            <td className="px-4 py-2">INT4 with smaller groups (64)</td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">FFN up/down</td>
                            <td className="px-4 py-2 text-emerald-600">Low</td>
                            <td className="px-4 py-2">INT4 tolerates well</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <Header3>Ablation Studies</Header3>
            <Paragraph className="mb-4">
                Systematic sweeps help find optimal configurations:
            </Paragraph>

            <Header4 className="font-bold text-slate-800 mb-2">Bit-Width Sweeps</Header4>
            <CodeBlock language="python" code={`# Sweep weight bit-widths
for bits in [8, 6, 5, 4, 3, 2]:
    model_q = quantize_weights(model, bits=bits, group_size=128)
    ppl = evaluate_perplexity(model_q, test_data)
    print(f"W{bits}: PPL={ppl:.2f}")`} />

            <Header4 className="font-bold text-slate-800 mb-2">Group Size Sweeps</Header4>
            <CodeBlock language="python" code={`# Sweep group sizes at INT4
for gs in [32, 64, 128, 256, 512, 'per-channel']:
    model_q = quantize_weights(model, bits=4, group_size=gs)
    ppl = evaluate_perplexity(model_q, test_data)
    memory = model_q.memory_footprint()
    print(f"G{gs}: PPL={ppl:.2f}, Mem={memory/1e9:.1f}GB")`} />

            <Header4 className="font-bold text-slate-800 mb-2">KV-Cache Precision Sweeps</Header4>
            <CodeBlock language="python" code={`# Sweep KV cache precision
for kv_bits in [16, 8, 4]:
    model_q = configure_kv_cache(model, bits=kv_bits)
    
    # Test at different context lengths
    for ctx_len in [2048, 8192, 32768]:
        ppl = evaluate_perplexity(model_q, test_data, max_len=ctx_len)
        print(f"KV{kv_bits}@{ctx_len}: PPL={ppl:.2f}")`} />

            <Header3>Regression Testing</Header3>
            <Paragraph className="mb-4">
                Beyond aggregate metrics, verify model behavior matches the original:
            </Paragraph>

            <Header4 className="font-bold text-slate-800 mb-2">Logit Comparison</Header4>
            <Paragraph className="mb-4">
                Compare output distributions, not just top-1 predictions:
            </Paragraph>
            <CodeBlock language="python" code={`def logit_regression_test(model_fp, model_q, test_data, threshold=0.99):
    """Verify quantized logits closely match original"""
    cosine_sims = []
    
    for batch in test_data:
        logits_fp = model_fp(batch)
        logits_q = model_q(batch)
        
        # Cosine similarity between logit vectors
        cos_sim = F.cosine_similarity(
            logits_fp.flatten(1), 
            logits_q.flatten(1), 
            dim=1
        )
        cosine_sims.extend(cos_sim.tolist())
    
    mean_sim = np.mean(cosine_sims)
    min_sim = np.min(cosine_sims)
    
    print(f"Mean cosine similarity: {mean_sim:.4f}")
    print(f"Min cosine similarity: {min_sim:.4f}")
    
    assert mean_sim > threshold, "Logit regression failed!"
    return cosine_sims`} />

            <Header4 className="font-bold text-slate-800 mb-2">Distribution Analysis</Header4>
            <Paragraph className="mb-4">
                Visualize how quantization shifts the output distribution:
            </Paragraph>
            <CodeBlock language="python" code={`def analyze_distribution_shift(model_fp, model_q, test_data):
    """Compare output distributions"""
    probs_fp = []
    probs_q = []
    
    for batch in test_data:
        with torch.no_grad():
            probs_fp.append(F.softmax(model_fp(batch), dim=-1))
            probs_q.append(F.softmax(model_q(batch), dim=-1))
    
    probs_fp = torch.cat(probs_fp, dim=0)
    probs_q = torch.cat(probs_q, dim=0)
    
    # KL divergence between distributions
    kl_div = F.kl_div(probs_q.log(), probs_fp, reduction='batchmean')
    
    # Entropy shift (does quantization make model more/less confident?)
    entropy_fp = -(probs_fp * probs_fp.log()).sum(dim=-1).mean()
    entropy_q = -(probs_q * probs_q.log()).sum(dim=-1).mean()
    
    print(f"KL divergence: {kl_div:.4f}")
    print(f"Entropy shift: {entropy_fp:.4f} -> {entropy_q:.4f}")
    
    return kl_div, entropy_fp, entropy_q`} />

            <Callout type="caution" title="Why Top-1 Isn't Enough">
                A model can maintain top-1 accuracy while severely corrupting the output distribution. This causes problems for:
                <List className="mt-2">
                    <ListItem><strong>Sampling</strong>: Wrong probabilities = wrong generations</ListItem>
                    <ListItem><strong>Calibration</strong>: Confidence scores become meaningless</ListItem>
                    <ListItem><strong>Downstream tasks</strong>: Embeddings may be corrupted</ListItem>
                </List>
                Always check logit/probability distributions, not just accuracy.
            </Callout>

            <Header3>Deployment Validation</Header3>
            <Paragraph className="mb-4">
                Real deployment conditions may differ from lab testing. Validate under production scenarios:
            </Paragraph>

            <Header4 className="font-bold text-slate-800 mb-2">Latency Profiling</Header4>
            <CodeBlock language="python" code={`def profile_latency(model, batch_sizes, seq_lengths, n_runs=100):
    """Profile latency across different configurations"""
    results = {}
    
    for bs in batch_sizes:
        for seq_len in seq_lengths:
            x = torch.randn(bs, seq_len, model.config.hidden_size).cuda()
            
            # Warmup
            for _ in range(10):
                _ = model(x)
            
            # Profile
            torch.cuda.synchronize()
            start = time.time()
            for _ in range(n_runs):
                _ = model(x)
            torch.cuda.synchronize()
            elapsed = (time.time() - start) / n_runs * 1000  # ms
            
            results[(bs, seq_len)] = elapsed
            print(f"BS={bs}, Seq={seq_len}: {elapsed:.2f}ms")
    
    return results`} />

            <Header4 className="font-bold text-slate-800 mb-2">Memory Profiling</Header4>
            <CodeBlock language="python" code={`def profile_memory(model, batch_sizes, seq_lengths):
    """Profile peak memory under different loads"""
    results = {}
    
    for bs in batch_sizes:
        for seq_len in seq_lengths:
            torch.cuda.empty_cache()
            torch.cuda.reset_peak_memory_stats()
            
            x = torch.randn(bs, seq_len, model.config.hidden_size).cuda()
            
            # Run forward pass
            with torch.no_grad():
                _ = model(x)
            
            peak_mem = torch.cuda.max_memory_allocated() / 1e9  # GB
            results[(bs, seq_len)] = peak_mem
            print(f"BS={bs}, Seq={seq_len}: {peak_mem:.2f}GB peak")
    
    return results`} />

            <Header4 className="font-bold text-slate-800 mb-2">Numerical Stability Under Load</Header4>
            <Paragraph className="mb-4">
                Test for numerical issues that only appear with specific inputs or sequences:
            </Paragraph>
            <CodeBlock language="python" code={`def stability_test(model, stress_data, n_iterations=1000):
    """Check for NaNs, Infs, or divergence under stress"""
    issues = []
    
    for i, batch in enumerate(stress_data):
        if i >= n_iterations:
            break
            
        output = model(batch)
        
        # Check for numerical issues
        if torch.isnan(output).any():
            issues.append(('nan', i))
        if torch.isinf(output).any():
            issues.append(('inf', i))
        
        # Check for extreme values
        max_val = output.abs().max().item()
        if max_val > 1e4:
            issues.append(('extreme', i, max_val))
    
    if issues:
        print(f"Found {len(issues)} numerical issues!")
        for issue in issues[:10]:
            print(f"  {issue}")
    else:
        print("No numerical issues detected")
    
    return issues`} />

            <Header3>Debugging Checklist</Header3>
            <Paragraph className="mb-4">
                When quantization degrades quality, systematically check:
            </Paragraph>

            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-4">
                <List>
                    <ListItem><strong>Calibration data</strong>: Is it representative of deployment distribution?</ListItem>
                    <ListItem><strong>Observer type</strong>: MinMax vs histogram vs percentile?</ListItem>
                    <ListItem><strong>Outlier channels</strong>: Are there channels with extreme activations?</ListItem>
                    <ListItem><strong>Layer sensitivity</strong>: Which layers show highest degradation?</ListItem>
                    <ListItem><strong>Group size</strong>: Would smaller groups help sensitive layers?</ListItem>
                    <ListItem><strong>First/last layers</strong>: Are they kept at higher precision?</ListItem>
                    <ListItem><strong>Softmax/LayerNorm</strong>: Are they staying in FP16?</ListItem>
                    <ListItem><strong>Accumulator precision</strong>: INT32 sufficient for sequence length?</ListItem>
                    <ListItem><strong>Scale/zero-point</strong>: Are they computed correctly per the chosen granularity?</ListItem>
                    <ListItem><strong>Rounding mode</strong>: Would AdaRound help?</ListItem>
                </List>
            </div>

            <Callout type="tip" title="Start Simple, Add Complexity">
                When debugging, start with INT8 per-channel + FP16 activations. If that works, reduce to INT4. If INT8 fails, the issue is likely outliers or calibration—fix those before attempting lower precision.
            </Callout>
        </Section>
    );
};

export default EvaluationDebugging;
