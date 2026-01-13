import React from 'react';
import { BookOpen } from 'lucide-react';
import Section from '../../../components/Section';
import Header3 from '../../../components/Header3';
import Header4 from '../../../components/Header4';
import Paragraph from '../../../components/Paragraph';

const References = () => {
    return (
        <Section title="References & Further Reading" icon={BookOpen}>
            <Paragraph className="mb-6">
                This section compiles key papers, frameworks, and resources for deepening your understanding of neural network quantization.
            </Paragraph>

            <Header3>Foundational Papers</Header3>
            <div className="space-y-4 mb-8">
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <Header4 className="text-slate-800 mb-1">Quantization and Training of Neural Networks for Efficient Integer-Arithmetic-Only Inference</Header4>
                    <Paragraph variant="small" className="text-slate-500 mb-2">Jacob et al., 2018 (Google)</Paragraph>
                    <Paragraph variant="small" className="text-slate-600">
                        The foundational paper on quantization-aware training with fake quantization. Introduced the per-channel quantization scheme and bias correction.
                    </Paragraph>
                </div>

                <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <Header4 className="text-slate-800 mb-1">A Survey on Quantization for Deep Learning</Header4>
                    <Paragraph variant="small" className="text-slate-500 mb-2">Gholami et al., 2021</Paragraph>
                    <Paragraph variant="small" className="text-slate-600">
                        Comprehensive survey covering uniform/non-uniform quantization, PTQ, QAT, and mixed-precision approaches. Excellent reference for taxonomy and terminology.
                    </Paragraph>
                </div>

                <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <Header4 className="text-slate-800 mb-1">Up or Down? Adaptive Rounding for Post-Training Quantization</Header4>
                    <Paragraph variant="small" className="text-slate-500 mb-2">Nagel et al., 2020 (Qualcomm)</Paragraph>
                    <Paragraph variant="small" className="text-slate-600">
                        Introduced AdaRound—learning optimal rounding decisions per weight to minimize layer-wise reconstruction error. Key technique for PTQ accuracy recovery.
                    </Paragraph>
                </div>
            </div>

            <Header3>LLM Quantization</Header3>
            <div className="space-y-4 mb-8">
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <Header4 className="text-slate-800 mb-1">GPTQ: Accurate Post-Training Quantization for Generative Pre-trained Transformers</Header4>
                    <Paragraph variant="small" className="text-slate-500 mb-2">Frantar et al., 2022</Paragraph>
                    <Paragraph variant="small" className="text-slate-600">
                        Second-order (Hessian-based) weight quantization achieving 3-4 bit precision with minimal accuracy loss. Column-by-column quantization with error compensation.
                    </Paragraph>
                </div>

                <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <Header4 className="text-slate-800 mb-1">AWQ: Activation-aware Weight Quantization for LLM Compression and Acceleration</Header4>
                    <Paragraph variant="small" className="text-slate-500 mb-2">Lin et al., 2023 (MIT)</Paragraph>
                    <Paragraph variant="small" className="text-slate-600">
                        Protects salient weights based on activation magnitude. Achieves 4-bit quantization with hardware-friendly group structure and efficient kernels.
                    </Paragraph>
                </div>

                <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <Header4 className="text-slate-800 mb-1">SmoothQuant: Accurate and Efficient Post-Training Quantization for Large Language Models</Header4>
                    <Paragraph variant="small" className="text-slate-500 mb-2">Xiao et al., 2022 (MIT/NVIDIA)</Paragraph>
                    <Paragraph variant="small" className="text-slate-600">
                        Migrates quantization difficulty from activations to weights via per-channel smoothing. Enables W8A8 quantization for LLMs with minimal degradation.
                    </Paragraph>
                </div>

                <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <Header4 className="text-slate-800 mb-1">LLM.int8(): 8-bit Matrix Multiplication for Transformers at Scale</Header4>
                    <Paragraph variant="small" className="text-slate-500 mb-2">Dettmers et al., 2022</Paragraph>
                    <Paragraph variant="small" className="text-slate-600">
                        Identified the outlier feature problem in LLMs. Proposed mixed-precision decomposition: INT8 for normal features, FP16 for outlier channels.
                    </Paragraph>
                </div>

                <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <Header4 className="text-slate-800 mb-1">QLoRA: Efficient Finetuning of Quantized LLMs</Header4>
                    <Paragraph variant="small" className="text-slate-500 mb-2">Dettmers et al., 2023</Paragraph>
                    <Paragraph variant="small" className="text-slate-600">
                        Introduced NF4 (4-bit NormalFloat) quantization optimized for normally-distributed weights. Enables fine-tuning 65B models on a single 48GB GPU.
                    </Paragraph>
                </div>
            </div>

            <Header3>Hardware & Implementation</Header3>
            <div className="space-y-4 mb-8">
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <Header4 className="text-slate-800 mb-1">FP8 Formats for Deep Learning</Header4>
                    <Paragraph variant="small" className="text-slate-500 mb-2">Micikevicius et al., 2022 (NVIDIA/Arm/Intel)</Paragraph>
                    <Paragraph variant="small" className="text-slate-600">
                        Industry-standard FP8 specification (E4M3 and E5M2). Describes scaling strategies and hardware considerations for FP8 training and inference.
                    </Paragraph>
                </div>

                <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <Header4 className="text-slate-800 mb-1">Marlin: INT4 Quantization Kernels</Header4>
                    <Paragraph variant="small" className="text-slate-500 mb-2">IST Austria, 2024</Paragraph>
                    <Paragraph variant="small" className="text-slate-600">
                        State-of-the-art CUDA kernels for INT4 weight-only quantization. Achieves near-ideal speedups through careful memory layout and Tensor Core utilization.
                    </Paragraph>
                </div>
            </div>

            <Header3>Frameworks & Tools</Header3>
            <div className="space-y-4 mb-8">
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <Header4 className="text-slate-800 mb-1">PyTorch Quantization</Header4>
                    <Paragraph variant="small" className="text-slate-600">
                        <code>torch.quantization</code> — Built-in support for PTQ and QAT with eager and FX graph modes. Includes observers, fake quantization, and backend-specific quantization.
                    </Paragraph>
                    <a href="https://pytorch.org/docs/stable/quantization.html" className="text-blue-600 text-sm hover:underline">
                        pytorch.org/docs/stable/quantization.html
                    </a>
                </div>

                <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <Header4 className="text-slate-800 mb-1">NVIDIA TensorRT</Header4>
                    <Paragraph variant="small" className="text-slate-600">
                        Production-grade inference optimizer with INT8/FP8 quantization. Automatic calibration, kernel fusion, and layer analysis tools.
                    </Paragraph>
                    <a href="https://developer.nvidia.com/tensorrt" className="text-blue-600 text-sm hover:underline">
                        developer.nvidia.com/tensorrt
                    </a>
                </div>

                <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <Header4 className="text-slate-800 mb-1">Hugging Face Optimum</Header4>
                    <Paragraph variant="small" className="text-slate-600">
                        Integration layer for quantization tools (GPTQ, AWQ, bitsandbytes) with Hugging Face models. Easy quantization with <code>AutoModelForCausalLM.from_pretrained(..., load_in_4bit=True)</code>.
                    </Paragraph>
                    <a href="https://huggingface.co/docs/optimum" className="text-blue-600 text-sm hover:underline">
                        huggingface.co/docs/optimum
                    </a>
                </div>

                <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <Header4 className="text-slate-800 mb-1">AutoGPTQ / AutoAWQ</Header4>
                    <Paragraph variant="small" className="text-slate-600">
                        User-friendly wrappers for GPTQ and AWQ quantization with pre-quantized model hubs. Includes efficient inference kernels.
                    </Paragraph>
                    <a href="https://github.com/AutoGPTQ/AutoGPTQ" className="text-blue-600 text-sm hover:underline">
                        github.com/AutoGPTQ/AutoGPTQ
                    </a>
                </div>

                <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <Header4 className="text-slate-800 mb-1">llama.cpp / GGML</Header4>
                    <Paragraph variant="small" className="text-slate-600">
                        CPU-optimized inference with extensive quantization support (Q2_K through Q8_K). Pioneered practical LLM quantization for consumer hardware.
                    </Paragraph>
                    <a href="https://github.com/ggerganov/llama.cpp" className="text-blue-600 text-sm hover:underline">
                        github.com/ggerganov/llama.cpp
                    </a>
                </div>

                <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <Header4 className="text-slate-800 mb-1">vLLM</Header4>
                    <Paragraph variant="small" className="text-slate-600">
                        High-throughput LLM serving with PagedAttention. Supports AWQ, GPTQ, and FP8 quantization with optimized kernels.
                    </Paragraph>
                    <a href="https://github.com/vllm-project/vllm" className="text-blue-600 text-sm hover:underline">
                        github.com/vllm-project/vllm
                    </a>
                </div>
            </div>

            <Header3>Advanced Topics</Header3>
            <div className="space-y-4 mb-4">
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <Header4 className="text-slate-800 mb-1">QuaRot: Outlier-Free 4-Bit Inference in Rotated LLMs</Header4>
                    <Paragraph variant="small" className="text-slate-500 mb-2">Ashkboos et al., 2024</Paragraph>
                    <Paragraph variant="small" className="text-slate-600">
                        Applies Hadamard rotations to eliminate outliers entirely. Enables 4-bit weight and activation quantization without special handling.
                    </Paragraph>
                </div>

                <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <Header4 className="text-slate-800 mb-1">SpinQuant: LLM Quantization with Learned Rotations</Header4>
                    <Paragraph variant="small" className="text-slate-500 mb-2">Liu et al., 2024</Paragraph>
                    <Paragraph variant="small" className="text-slate-600">
                        Learns optimal rotation matrices for outlier removal. Achieves state-of-the-art 4-bit quantization on Llama models.
                    </Paragraph>
                </div>

                <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <Header4 className="text-slate-800 mb-1">OmniQuant: Omnidirectionally Calibrated Quantization for Large Language Models</Header4>
                    <Paragraph variant="small" className="text-slate-500 mb-2">Shao et al., 2023</Paragraph>
                    <Paragraph variant="small" className="text-slate-600">
                        Learns both weight clipping thresholds and channel-wise scaling. Achieves strong W4A4 results with learnable quantization parameters.
                    </Paragraph>
                </div>
            </div>
        </Section>
    );
};

export default References;
