import React from 'react';
import { Layers } from 'lucide-react';
import Section from '../../../components/Section';
import Header3 from '../../../components/Header3';
import Header4 from '../../../components/Header4';
import Paragraph from '../../../components/Paragraph';
import List from '../../../components/List';
import ListItem from '../../../components/ListItem';
import Equation from '../../../components/Equation';
import Callout from '../../../components/Callout';

const ArchitectureCapacity = () => {
    return (
        <Section title="Architecture & Capacity Issues" icon={Layers}>
            <Header3>Cross-Architecture Distillation</Header3>
            <Paragraph>
                Distillation enables knowledge transfer between fundamentally different architectures—a capability that simple weight copying cannot achieve. Common scenarios include:
            </Paragraph>
            <List>
                <ListItem>
                    <strong>Transformer → CNN:</strong> Distill a ViT-Large into a ResNet for edge deployment. The CNN gains transformer-like global reasoning from soft labels.
                </ListItem>
                <ListItem>
                    <strong>Large Transformer → Small Transformer:</strong> GPT-4 → GPT-3.5-scale model. Same architecture family, different depth/width.
                </ListItem>
                <ListItem>
                    <strong>Diffusion → GAN:</strong> Distill multi-step diffusion into single-step GAN generator.
                </ListItem>
                <ListItem>
                    <strong>Ensemble → Single Model:</strong> Distill multiple diverse teachers into one student that captures ensemble-like behavior.
                </ListItem>
            </List>

            <Header4>Challenges in Cross-Architecture Distillation</Header4>
            <Paragraph>
                Different architectures have fundamentally different inductive biases, making intermediate-layer matching difficult:
            </Paragraph>
            <List>
                <ListItem>
                    <strong>Spatial vs. Sequence:</strong> CNNs produce spatial feature maps; Transformers produce sequence representations. Matching requires careful projection.
                </ListItem>
                <ListItem>
                    <strong>Layer Alignment:</strong> Which CNN layer corresponds to which Transformer layer? There's no natural mapping.
                </ListItem>
                <ListItem>
                    <strong>Resolution Mismatch:</strong> Teachers and students may operate at different resolutions or sequence lengths.
                </ListItem>
            </List>
            <Callout type="info" title="Logit Distillation as Universal Interface">
                When architectures differ dramatically, pure logit distillation often works best—it requires only matching output dimensions, avoiding the complexity of intermediate alignment.
            </Callout>

            <Header3>Capacity Mismatch and Bottlenecks</Header3>
            <Paragraph>
                A core tension in distillation: the student must be smaller than the teacher (for efficiency), but too small a student cannot capture the teacher's knowledge.
            </Paragraph>

            <Header4>The Capacity Gap Problem</Header4>
            <Paragraph>
                When the teacher-student capacity gap is large:
            </Paragraph>
            <List>
                <ListItem>
                    <strong>Optimization Difficulty:</strong> The student receives high-loss gradients it cannot act on effectively.
                </ListItem>
                <ListItem>
                    <strong>Mode Collapse:</strong> The student approximates the teacher's average behavior rather than learning its full capabilities.
                </ListItem>
                <ListItem>
                    <strong>Gradient Variance:</strong> Soft labels from a much larger teacher can have high variance, destabilizing training.
                </ListItem>
            </List>

            <Header4>Mitigation Strategies</Header4>
            <div className="space-y-4 my-4">
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <Header4>Progressive Distillation</Header4>
                    <Paragraph variant="small">
                        Create intermediate-sized "assistant" teachers. Distill: Large → Medium → Small. Each step has a smaller capacity gap, improving transfer fidelity.
                    </Paragraph>
                </div>
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <Header4>Projection Heads / Adapters</Header4>
                    <Paragraph variant="small">
                        Add learnable projection layers between teacher and student feature spaces. The projector learns to translate teacher representations into a form the student can match:
                    </Paragraph>
                    <Equation block>
                        {`f_S^{proj} = W \\cdot f_S + b, \\quad \\mathcal{L} = \\|f_T - f_S^{proj}\\|^2`}
                    </Equation>
                </div>
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <Header4>Layer Selection</Header4>
                    <Paragraph variant="small">
                        Not all teacher layers are equally important. Identify and match only the most informative layers. Common heuristics: match final blocks, match layers with similar representational complexity.
                    </Paragraph>
                </div>
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <Header4>Patience and Curriculum</Header4>
                    <Paragraph variant="small">
                        Start with easier examples or lower temperature; gradually increase difficulty. Allow longer training time for larger capacity gaps.
                    </Paragraph>
                </div>
            </div>

            <Header3>Tokenizer and Vocabulary Mismatch (LLMs)</Header3>
            <Paragraph>
                Language model distillation faces a unique challenge: teacher and student may use <strong>different tokenizers</strong>, meaning the same text produces different token sequences with different lengths.
            </Paragraph>

            <Header4>The Problem</Header4>
            <List>
                <ListItem>
                    <strong>Token Alignment:</strong> Teacher's token "hello" might correspond to student's tokens "hel" + "lo". Logit-level KD requires aligned sequences.
                </ListItem>
                <ListItem>
                    <strong>Vocabulary Size:</strong> Teacher has 100K tokens; student has 32K. Some teacher tokens have no direct student equivalent.
                </ListItem>
                <ListItem>
                    <strong>Subword Boundaries:</strong> Different BPE/SentencePiece vocabularies split words at different points.
                </ListItem>
            </List>

            <Header4>Mapping Strategies</Header4>
            <div className="overflow-x-auto my-4">
                <table className="min-w-full text-sm text-left text-slate-700 border border-slate-200">
                    <thead className="text-xs text-slate-800 uppercase bg-slate-100 font-bold">
                        <tr>
                            <th className="px-4 py-2 border-b">Strategy</th>
                            <th className="px-4 py-2 border-b">Description</th>
                            <th className="px-4 py-2 border-b">Pros/Cons</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">Shared Tokenizer</td>
                            <td className="px-4 py-2">Use same tokenizer for both models</td>
                            <td className="px-4 py-2">Simplest; may not be possible with pretrained models</td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-4 py-2 font-medium">Sequence-Level KD</td>
                            <td className="px-4 py-2">Teacher generates text; student trains on (prompt, completion) pairs</td>
                            <td className="px-4 py-2">Bypasses token alignment; loses fine-grained signal</td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">Token Mapping Matrix</td>
                            <td className="px-4 py-2">Learn or compute mapping between teacher and student tokens</td>
                            <td className="px-4 py-2">Complex; may lose information in many-to-one mappings</td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-4 py-2 font-medium">Hidden State Distillation</td>
                            <td className="px-4 py-2">Match hidden states at aligned character/word positions</td>
                            <td className="px-4 py-2">Avoids token vocabulary issue; requires position alignment</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <Callout type="warning" title="Practical Recommendation">
                When distilling between LLMs with different tokenizers, <strong>sequence-level distillation</strong> (SeqKD) is often most practical: generate teacher outputs, then fine-tune the student on these outputs. This avoids token alignment entirely at the cost of some fine-grained knowledge transfer.
            </Callout>

            <Header3>Width vs. Depth Trade-offs</Header3>
            <Paragraph>
                When designing a student architecture, you must allocate a parameter budget between width (hidden dimensions) and depth (number of layers).
            </Paragraph>
            <List>
                <ListItem>
                    <strong>Wider, Shallower:</strong> Better for simple pattern matching. Easier to distill from deep teachers (fewer layers to match). Better hardware utilization (larger GEMMs).
                </ListItem>
                <ListItem>
                    <strong>Narrower, Deeper:</strong> Better for complex reasoning requiring many sequential steps. Harder to distill (more layers with potential capacity bottlenecks). May require progressive distillation.
                </ListItem>
            </List>
            <Paragraph>
                Empirically, for the same parameter count, <strong>deeper students often match teachers better</strong> when the teacher's task requires multi-step reasoning. For simpler tasks, wider students are more efficient.
            </Paragraph>
        </Section>
    );
};

export default ArchitectureCapacity;
