import React, { useState, useMemo } from 'react';
import { Database, Cpu, Layers, Zap, Info } from 'lucide-react';
import Section from '../../../components/Section';
import Header3 from '../../../components/Header3';
import Paragraph from '../../../components/Paragraph';
import Equation from '../../../components/Equation';
import InteractiveCard from '../../../components/InteractiveCard';

const MemoryUsage = () => {
    return (
        <Section title="Memory Usage Breakdown" icon={Database}>
            <Header3>Where does all the memory go?</Header3>
            <Paragraph>
                Training Large Language Models (LLMs) requires massive amounts of GPU memory. It's not just the model weights; in fact, the weights are often the smallest part of the equation during training. Let's break down the memory consumption into four main categories: Parameters, Gradients, Optimizer States, and Activations.
            </Paragraph>

            <Header3>1. Model Parameters (Weights)</Header3>
            <Paragraph>
                These are the matrices that define the model. For a standard Transformer model, the number of parameters is roughly proportional to <Equation>12h^2L</Equation>, where <Equation>h</Equation> is the hidden dimension and <Equation>L</Equation> is the number of layers.
            </Paragraph>
            <Paragraph>
                In mixed-precision training (standard for LLMs), weights are often stored in FP16 or BF16 (2 bytes per parameter).
                <br />
                <strong>Memory ≈ 2 * Number of Parameters (Bytes)</strong>
            </Paragraph>

            <Header3>2. Gradients</Header3>
            <Paragraph>
                During the backward pass, we compute the gradient of the loss with respect to each parameter. These gradients are the same shape as the parameters.
            </Paragraph>
            <Paragraph>
                Like parameters, gradients are typically stored in FP16/BF16.
                <br />
                <strong>Memory ≈ 2 * Number of Parameters (Bytes)</strong>
            </Paragraph>

            <Header3>3. Optimizer States</Header3>
            <Paragraph>
                This is often the silent memory killer. The Adam optimizer, for instance, maintains two moments (mean and variance) for every single parameter. To maintain numerical stability, these are usually stored in FP32 (4 bytes).
            </Paragraph>
            <Paragraph>
                Additionally, Adam often keeps a master copy of the weights in FP32 to avoid precision loss during updates.
                <br />
                - Momentum: 4 bytes/param
                <br />
                - Variance: 4 bytes/param
                <br />
                - Master Weights: 4 bytes/param
                <br />
                <strong>Total Optimizer Memory ≈ 12 * Number of Parameters (Bytes)</strong>
            </Paragraph>

            <Header3>4. Activations</Header3>
            <Paragraph>
                Activations are the intermediate outputs of every layer (outputs of Multi-Head Attention, Feed-Forward Networks, LayerNorms, etc.) that must be stored during the forward pass to compute gradients during the backward pass.
            </Paragraph>
            <Paragraph>
                Unlike the previous three, activation memory scales with <strong>Batch Size</strong> and <strong>Sequence Length</strong>. The attention mechanism itself scales quadratically with sequence length <Equation>O(S^2)</Equation>, which can become a massive bottleneck for long contexts.
            </Paragraph>

            <MemoryVisualizer />

        </Section>
    );
};

const MemoryVisualizer = () => {
    // Model Config
    const [layers, setLayers] = useState(12);
    const [hiddenSize, setHiddenSize] = useState(768);
    const [heads, setHeads] = useState(12);
    const [vocabSize, setVocabSize] = useState(50257);

    // Training Config
    const [batchSize, setBatchSize] = useState(8);
    const [seqLen, setSeqLen] = useState(1024);
    const [precision, setPrecision] = useState('mixed'); // 'mixed' or 'fp32'

    const memoryStats = useMemo(() => {
        // Approximate Parameter Count Calculation
        // 12 * L * h^2 is a rough approximation for the transformer body
        // + V * h for embedding
        // + V * h for output head (often tied, but let's assume separate or tied count effectively)
        // Let's use a more detailed standard approximation:
        // Params = 12 * L * h^2 + 2 * L * h (layer norms) + V * h (embeddings) + V * h (output)
        // Simplified: 12 * L * h^2 + 13 * h * L (biases etc) -> dominated by 12Lh^2
        // Let's stick to the standard 12Lh^2 + Vh approximation for simplicity and robustness
        const numParams = 12 * layers * Math.pow(hiddenSize, 2) + 2 * vocabSize * hiddenSize;

        const bytesPerParam = precision === 'mixed' ? 2 : 4;

        // 1. Parameters
        const paramMem = numParams * bytesPerParam;

        // 2. Gradients
        const gradMem = numParams * bytesPerParam;

        // 3. Optimizer States
        // Mixed: 4 bytes (momentum) + 4 bytes (variance) + 4 bytes (master weights) = 12 bytes/param
        // FP32: 4 bytes (momentum) + 4 bytes (variance) = 8 bytes/param (usually no master weights needed)
        const optMemPerParam = precision === 'mixed' ? 12 : 8;
        const optMem = numParams * optMemPerParam;

        // 4. Activations
        // Rough approximation per layer:
        // SBH (input) + SBH (Q,K,V) + S*S*B*A (Attn Matrix) + SBH (Attn Out) + SBH (FFN expansion 4H) + SBH (FFN Out)
        // A common rule of thumb for standard transformers:
        // Activations ≈ B * S * L * H * (34 + (5 * S * A) / (H)) bytes ?? No that's too complex.
        // Let's use the standard NVIDIA approximation:
        // Activations per layer ≈ s * b * h * (34 + 5 * (a * s / h)) bytes is for training?
        // Let's use a simpler breakdown often cited:
        // Per layer:
        // - Self Attention: 4 * B * S * H (Q,K,V,Out)
        // - MLP: 2 * B * S * 4H (Input, Output) -> 8 * B * S * H
        // - Layer Norms: 2 * B * S * H
        // Total per layer ≈ 14 * B * S * H bytes (assuming float16/bfloat16 activations)
        // + Attention Matrix: 2 * B * Heads * S^2 (if we store them, usually recomputed or stored)
        // Let's assume standard storage without checkpointing.
        // Bytes per element = 2 (activations usually fp16)

        const bytesPerAct = 2;
        const activationPerLayer =
            (14 * batchSize * seqLen * hiddenSize) + // Linear parts
            (2 * batchSize * heads * Math.pow(seqLen, 2)); // Attention matrix (S^2)

        const activationMem = activationPerLayer * layers * bytesPerAct;

        return {
            params: paramMem / 1e9, // GB
            grads: gradMem / 1e9,
            opt: optMem / 1e9,
            act: activationMem / 1e9,
            total: (paramMem + gradMem + optMem + activationMem) / 1e9,
            numParams: numParams / 1e6 // Million
        };
    }, [layers, hiddenSize, heads, vocabSize, batchSize, seqLen, precision]);

    const formatGB = (num) => num.toFixed(2) + " GB";

    return (
        <InteractiveCard title="Estimating Memory Footprint">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <h4 className="font-semibold text-gray-700 mb-2">Model Configuration</h4>
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-gray-500 uppercase">Layers (L)</label>
                        <input type="range" min="1" max="48" value={layers} onChange={(e) => setLayers(Number(e.target.value))} className="w-full" />
                        <div className="text-right text-sm text-gray-600">{layers}</div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-gray-500 uppercase">Hidden Size (h)</label>
                        <select value={hiddenSize} onChange={(e) => setHiddenSize(Number(e.target.value))} className="w-full p-2 border rounded text-sm">
                            <option value={768}>768 (GPT-2 Small)</option>
                            <option value={1024}>1024 (GPT-2 Medium)</option>
                            <option value={1600}>1600 (GPT-2 XL)</option>
                            <option value={4096}>4096 (Llama-7B ish)</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-gray-500 uppercase">Attention Heads (a)</label>
                        <input type="range" min="1" max="32" value={heads} onChange={(e) => setHeads(Number(e.target.value))} className="w-full" />
                        <div className="text-right text-sm text-gray-600">{heads}</div>
                    </div>

                    <h4 className="font-semibold text-gray-700 mb-2 mt-6">Training Configuration</h4>
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-gray-500 uppercase">Batch Size (B)</label>
                        <input type="range" min="1" max="128" value={batchSize} onChange={(e) => setBatchSize(Number(e.target.value))} className="w-full" />
                        <div className="text-right text-sm text-gray-600">{batchSize}</div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-gray-500 uppercase">Sequence Length (S)</label>
                        <select value={seqLen} onChange={(e) => setSeqLen(Number(e.target.value))} className="w-full p-2 border rounded text-sm">
                            <option value={512}>512</option>
                            <option value={1024}>1024</option>
                            <option value={2048}>2048</option>
                            <option value={4096}>4096</option>
                            <option value={8192}>8192</option>
                        </select>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                        <input type="checkbox" checked={precision === 'mixed'} onChange={(e) => setPrecision(e.target.checked ? 'mixed' : 'fp32')} id="mixed-prec" />
                        <label htmlFor="mixed-prec" className="text-sm text-gray-700">Mixed Precision (FP16/BF16)</label>
                    </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex flex-col justify-center">
                    <div className="text-center mb-6">
                        <div className="text-3xl font-bold text-blue-600">{formatGB(memoryStats.total)}</div>
                        <div className="text-sm text-gray-500">Total Estimated Memory</div>
                        <div className="text-xs text-gray-400 mt-1">~{memoryStats.numParams.toFixed(0)}M Parameters</div>
                    </div>

                    <div className="space-y-3">
                        <MemoryBar label="Parameters" value={memoryStats.params} total={memoryStats.total} color="bg-blue-500" />
                        <MemoryBar label="Gradients" value={memoryStats.grads} total={memoryStats.total} color="bg-green-500" />
                        <MemoryBar label="Optimizer States" value={memoryStats.opt} total={memoryStats.total} color="bg-orange-500" />
                        <MemoryBar label="Activations" value={memoryStats.act} total={memoryStats.total} color="bg-purple-500" />
                    </div>

                    <div className="mt-6 p-3 bg-blue-50 text-blue-800 text-xs rounded border border-blue-100 flex gap-2">
                        <Info size={16} className="shrink-0 mt-0.5" />
                        <div>
                            <strong>Note:</strong> This is a theoretical lower bound. Actual usage will be higher due to fragmentation, temporary buffers, and framework overhead.
                        </div>
                    </div>
                </div>
            </div>
        </InteractiveCard>
    );
};

const MemoryBar = ({ label, value, total, color }) => {
    const percent = (value / total) * 100;
    return (
        <div>
            <div className="flex justify-between text-xs mb-1">
                <span className="font-medium text-gray-700">{label}</span>
                <span className="text-gray-500">{value.toFixed(2)} GB ({percent.toFixed(1)}%)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                <div className={`h-2.5 rounded-full ${color}`} style={{ width: `${percent}%` }}></div>
            </div>
        </div>
    );
};

export default MemoryUsage;
