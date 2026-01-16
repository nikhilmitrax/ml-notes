import React from 'react';
import { Cpu } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';
import Header3 from '../../../components/Header3';
import Header4 from '../../../components/Header4';
import List from '../../../components/List';
import ListItem from '../../../components/ListItem';
import Callout from '../../../components/Callout';
import CodeBlock from '../../../components/CodeBlock';

const ImplementationMechanics = () => {
    return (
        <Section title="Implementation & Shape Mechanics" icon={Cpu}>
            <Header3>Tensor Shapes</Header3>

            <Header4>NCHW vs NHWC</Header4>
            <List>
                <ListItem><strong>NCHW</strong> (Batch, Channel, Height, Width)
                    <List nested>
                        <ListItem>PyTorch default</ListItem>
                        <ListItem>Channel-first layout</ListItem>
                        <ListItem>Better for GPU (cuDNN optimized for this)</ListItem>
                    </List>
                </ListItem>
                <ListItem><strong>NHWC</strong> (Batch, Height, Width, Channel)
                    <List nested>
                        <ListItem>TensorFlow default</ListItem>
                        <ListItem>Channel-last layout</ListItem>
                        <ListItem>Better for CPU, some TPU operations</ListItem>
                    </List>
                </ListItem>
                <ListItem>Conversion: <code>x.permute(0, 2, 3, 1)</code> (NCHW → NHWC)</ListItem>
                <ListItem>PyTorch channels_last memory format: keeps NCHW API but NHWC memory</ListItem>
            </List>

            <Header4>Broadcasting</Header4>
            <List>
                <ListItem>Automatic expansion of tensors to compatible shapes</ListItem>
                <ListItem>Rules: align dimensions from right, 1 can broadcast to any size</ListItem>
                <ListItem>Common patterns:
                    <List nested>
                        <ListItem>Adding bias: <Equation>{`(N, C, H, W) + (C, 1, 1) \\rightarrow (N, C, H, W)`}</Equation></ListItem>
                        <ListItem>Channel-wise scaling: same pattern</ListItem>
                    </List>
                </ListItem>
                <ListItem>Gotcha: accidental broadcasting can cause silent bugs</ListItem>
            </List>

            <Header4>Contiguous Memory</Header4>
            <List>
                <ListItem><strong>Contiguous</strong>: elements in memory match logical layout</ListItem>
                <ListItem>Operations like transpose/permute make tensors non-contiguous (just change strides)</ListItem>
                <ListItem>Some ops require contiguous input: <code>x = x.contiguous()</code></ListItem>
                <ListItem>View vs reshape: view requires contiguous, reshape may copy</ListItem>
                <ListItem>Check: <code>x.is_contiguous()</code></ListItem>
            </List>

            <Header3>Output Size Formulas</Header3>

            <Header4>Convolution / Pooling</Header4>
            <List>
                <ListItem>
                    <strong>General formula</strong>:
                    <Equation block>{`H_{out} = \\left\\lfloor \\frac{H_{in} + 2p - d(K - 1) - 1}{s} \\right\\rfloor + 1`}</Equation>
                </ListItem>
                <ListItem>Variables: <Equation>{`p`}</Equation> = padding, <Equation>{`d`}</Equation> = dilation, <Equation>{`K`}</Equation> = kernel, <Equation>{`s`}</Equation> = stride</ListItem>
                <ListItem>For <Equation>{`d = 1`}</Equation> (no dilation): <Equation>{`H_{out} = \\lfloor (H_{in} + 2p - K) / s \\rfloor + 1`}</Equation></ListItem>
            </List>

            <Header4>Common Cases</Header4>
            <List>
                <ListItem><strong>Same padding (stride 1)</strong>: <Equation>{`p = \\lfloor K / 2 \\rfloor`}</Equation> → output = input</ListItem>
                <ListItem><strong>Stride 2, 3×3 kernel, padding 1</strong>: <Equation>{`H_{out} = \\lfloor H_{in} / 2 \\rfloor`}</Equation></ListItem>
                <ListItem><strong>MaxPool 2×2, stride 2</strong>: halves spatial dimensions</ListItem>
            </List>

            <Header4>Transposed Convolution</Header4>
            <List>
                <ListItem>
                    <strong>Output size</strong>:
                    <Equation block>{`H_{out} = (H_{in} - 1) \\times s - 2p + d(K - 1) + p_{out} + 1`}</Equation>
                </ListItem>
                <ListItem><Equation>{`p_{out}`}</Equation> (output_padding): adds to one side to resolve ambiguity</ListItem>
                <ListItem>For simple 2× upsampling: kernel=4, stride=2, padding=1</ListItem>
            </List>

            <CodeBlock language="python" code={`def conv_output_size(H_in, kernel, stride=1, padding=0, dilation=1):
    """Standard conv/pool output size"""
    return (H_in + 2*padding - dilation*(kernel - 1) - 1) // stride + 1

def transposed_conv_output_size(H_in, kernel, stride=1, padding=0, 
                                 output_padding=0, dilation=1):
    """Transposed conv output size"""
    return (H_in - 1) * stride - 2*padding + dilation*(kernel - 1) + output_padding + 1

# Examples
print(conv_output_size(224, kernel=7, stride=2, padding=3))  # 112
print(conv_output_size(112, kernel=3, stride=1, padding=1))  # 112
print(transposed_conv_output_size(28, kernel=4, stride=2, padding=1))  # 56`} />

            <Header3>Compute & Memory</Header3>

            <Header4>FLOPs (Floating Point Operations)</Header4>
            <List>
                <ListItem>
                    <strong>Conv2d FLOPs</strong>:
                    <Equation block>{`\\text{FLOPs} = 2 \\times H_{out} \\times W_{out} \\times C_{in} \\times C_{out} \\times K^2`}</Equation>
                </ListItem>
                <ListItem>Factor of 2: multiply + add per weight</ListItem>
                <ListItem>MACs (multiply-accumulate) = FLOPs / 2</ListItem>
                <ListItem>Batch dimension multiplies total FLOPs</ListItem>
            </List>

            <Header4>Activation Memory</Header4>
            <List>
                <ListItem>Need to store activations for backward pass</ListItem>
                <ListItem>Memory per layer: <Equation>{`N \\times C \\times H \\times W \\times \\text{bytes\\_per\\_element}`}</Equation></ListItem>
                <ListItem>FP32: 4 bytes, FP16/BF16: 2 bytes</ListItem>
                <ListItem>Total activation memory often exceeds weight memory</ListItem>
                <ListItem><strong>Gradient checkpointing</strong>: trade compute for memory (recompute activations)</ListItem>
            </List>

            <Header4>Mixed Precision</Header4>
            <List>
                <ListItem>Train with FP16/BF16 forward pass, FP32 master weights</ListItem>
                <ListItem>Benefits:
                    <List nested>
                        <ListItem>~2× memory reduction for activations</ListItem>
                        <ListItem>~2× faster on tensor cores (V100, A100)</ListItem>
                    </List>
                </ListItem>
                <ListItem>Requirements:
                    <List nested>
                        <ListItem><strong>Loss scaling</strong>: prevent gradient underflow in FP16</ListItem>
                        <ListItem>Keep BatchNorm in FP32 (variance calculations)</ListItem>
                    </List>
                </ListItem>
                <ListItem>PyTorch: <code>torch.cuda.amp.autocast()</code></ListItem>
            </List>

            <CodeBlock language="python" code={`# Mixed precision training with PyTorch
from torch.cuda.amp import autocast, GradScaler

scaler = GradScaler()

for inputs, targets in dataloader:
    optimizer.zero_grad()
    
    with autocast():  # FP16 forward pass
        outputs = model(inputs)
        loss = criterion(outputs, targets)
    
    scaler.scale(loss).backward()  # scaled FP16 gradients
    scaler.step(optimizer)  # unscale and step
    scaler.update()  # adjust scale factor`} />

            <Header3>Profiling & Debugging</Header3>

            <Header4>Overfit a Tiny Batch</Header4>
            <List>
                <ListItem><strong>First sanity check</strong>: can model memorize 1-10 samples?</ListItem>
                <ListItem>Turn off all regularization (dropout, augmentation, weight decay)</ListItem>
                <ListItem>Train until loss → 0, accuracy → 100%</ListItem>
                <ListItem>If fails: bug in model, data pipeline, or loss function</ListItem>
            </List>

            <Header4>Gradient Checks</Header4>
            <List>
                <ListItem>Check gradients are not NaN/Inf</ListItem>
                <ListItem>Check gradient magnitudes (should be ~1e-3 to 1e-1 typically)</ListItem>
                <ListItem>Monitor gradient norms over training</ListItem>
                <ListItem>Exploding: increase gradient clipping, reduce LR</ListItem>
                <ListItem>Vanishing: check initialization, add residual connections</ListItem>
            </List>

            <Header4>Common Debugging Patterns</Header4>
            <List>
                <ListItem><strong>Loss not decreasing</strong>:
                    <List nested>
                        <ListItem>Check data loading (visualize batches)</ListItem>
                        <ListItem>Check learning rate (try 10× higher and lower)</ListItem>
                        <ListItem>Check model output range vs loss expectation</ListItem>
                    </List>
                </ListItem>
                <ListItem><strong>Loss goes to NaN</strong>:
                    <List nested>
                        <ListItem>Learning rate too high</ListItem>
                        <ListItem>Missing normalization</ListItem>
                        <ListItem>Division by zero (add epsilon to norms/variances)</ListItem>
                    </List>
                </ListItem>
                <ListItem><strong>Val loss good, test loss bad</strong>:
                    <List nested>
                        <ListItem>Data leakage between train/val</ListItem>
                        <ListItem>Val not representative of test distribution</ListItem>
                    </List>
                </ListItem>
            </List>

            <Callout type="tip" title="Debugging Workflow">
                1. Verify data pipeline (visualize inputs + labels)
                2. Overfit tiny batch (no regularization)
                3. Overfit single batch with full model
                4. Check gradient flow (magnitudes, not NaN)
                5. Verify loss decreases on training set
                6. Add regularization, tune hyperparameters
            </Callout>

            <Header4>Profiling Tools</Header4>
            <List>
                <ListItem><strong>PyTorch Profiler</strong>: CPU/GPU time per operation</ListItem>
                <ListItem><strong>NVIDIA Nsight</strong>: detailed GPU kernel analysis</ListItem>
                <ListItem><strong>torch.autograd.profiler</strong>: per-layer timing</ListItem>
                <ListItem><strong>Memory profiler</strong>: <code>torch.cuda.memory_summary()</code></ListItem>
                <ListItem>Key metrics: throughput (samples/sec), memory peak, GPU utilization</ListItem>
            </List>

            <CodeBlock language="python" code={`# Basic profiling with PyTorch
from torch.profiler import profile, ProfilerActivity

with profile(activities=[ProfilerActivity.CPU, ProfilerActivity.CUDA]) as prof:
    output = model(input)

print(prof.key_averages().table(sort_by="cuda_time_total", row_limit=10))

# Memory debugging  
print(torch.cuda.memory_summary())
torch.cuda.reset_peak_memory_stats()`} />
        </Section>
    );
};

export default ImplementationMechanics;
