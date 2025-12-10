import React from 'react';
import { Layers } from 'lucide-react';
import Section from '../../../components/Section';
import Header3 from '../../../components/Header3';
import Header4 from '../../../components/Header4';
import Paragraph from '../../../components/Paragraph';
import Equation from '../../../components/Equation';

const MIRAS: React.FC = () => {
    return (
        <Section title="MIRAS" icon={Layers}>
            <Paragraph className="mb-4 text-slate-700 leading-relaxed">
                MIRAS is a framework to contextualize and unify the various paradigms (Recurrence, Attention, TTM).
            </Paragraph>
            <Paragraph className="mb-6 text-slate-700 leading-relaxed">
                <strong>Four Pillars of Sequence Modelling:</strong> Memory, Attention, Retention and Optimization
            </Paragraph>

            <Header3 className="text-xl font-semibold text-slate-800 mb-4">Memory Architecture <Equation>{'\\mathcal{M}'}</Equation></Header3>
            <Paragraph className="mb-4 text-slate-700 leading-relaxed">
                The first pillar defines the structure used to store information.
            </Paragraph>
            <ul className="list-disc list-inside space-y-4 mb-6 text-slate-700 ml-4">
                <li>
                    <strong>Vector-Valued Memory</strong>: Traditional RNNs (LSTM, GRU) compress the entire history into a fixed-size hidden vector <Equation>{'h_t \\in \\mathbb{R}^d'}</Equation>. This creates a "bottleneck" where the capacity of the memory does not scale with the complexity of the data, leading to the forgetting of early information in long sequences.
                </li>
                <li>
                    <strong>Matrix-Valued Memory</strong>: Models like the Transformer (via the KV cache) or linear attention variants (RetNet) utilize a matrix structure. While the KV cache grows linearly with sequence length (providing perfect recall but high cost), linear attention models compress this into a fixed-size matrix state.
                </li>
                <li>
                    <strong>Neural Deep Memory</strong>: The innovation championed by MIRAS and implemented in TITANS is the use of a <strong>Deep Neural Network</strong> (e.g., a Multi-Layer Perceptron or MLP) as the memory itself. Here, the "state" of the sequence is encoded in the <em>weights</em> of this secondary network. Because a neural network is a universal function approximator, a Neural Memory has <strong>super-linear capacity</strong>, enabling it to store complex, non-linear abstractions of the history that vector or matrix memories would discard.
                </li>
            </ul>

            <Header3 className="text-xl font-semibold text-slate-800 mb-4">Attention Bias <Equation>{'\\mathcal{L}'}</Equation></Header3>
            <Paragraph className="mb-4 text-slate-700 leading-relaxed">
                This pillar defines the internal objective function—the "loss"—that the memory module attempts to minimize at test time.
            </Paragraph>
            <ul className="list-disc list-inside space-y-4 mb-6 text-slate-700 ml-4">
                <li>
                    <strong>Similarity-Based Bias</strong>: In Transformers, this is implicitly the dot-product similarity between queries and keys. The model "retrieves" information that aligns with the current query.
                </li>
                <li>
                    <strong>Surprise-Based Bias</strong>: MIRAS introduces the concept of <strong>Surprise</strong> as a learning signal. Drawing from predictive coding in neuroscience, this metric quantifies the discrepancy between the model's memory prediction and the actual incoming data. The gradient of this surprise metric (<Equation>{'\\nabla \\mathcal{L}'}</Equation>) serves as the update signal, ensuring that the memory preferentially stores information that is novel or contradictory to its current world model.
                </li>
            </ul>

            <Header3 className="text-xl font-semibold text-slate-800 mb-4">Retention Gate (Regularization)</Header3>
            <Paragraph className="mb-4 text-slate-700 leading-relaxed">
                In standard deep learning, we use regularization (like weight decay) to prevent overfitting. MIRAS reinterprets the "forgetting mechanisms" of RNNs as a form of <strong>dynamic regularization</strong>.
            </Paragraph>
            <ul className="list-disc list-inside space-y-4 mb-6 text-slate-700 ml-4">
                <li>
                    <strong>Forgetting as Regularization</strong>: A retention gate (like the <Equation>{'\\alpha_t'}</Equation> in TITANS) balances the plasticity of the memory (its ability to learn new data) against its stability (its ability to retain old data). By treating forgetting as an adaptive weight decay term, the framework provides a principled way to manage the finite capacity of the memory module over infinite streams.
                </li>
            </ul>

            <Header3 className="text-xl font-semibold text-slate-800 mb-4">Memory Algorithm (Optimization Rule)</Header3>
            <Paragraph className="mb-4 text-slate-700 leading-relaxed">
                The final pillar describes the rule used to update the memory state.
            </Paragraph>
            <ul className="list-disc list-inside space-y-4 mb-6 text-slate-700 ml-4">
                <li>
                    <strong>Heuristic Updates</strong>: Traditional RNNs use gated addition (e.g., <Equation>{'h_t = \\sigma(f_t) \\odot h_{t-1} + \\sigma(i_t) \\odot \\tilde{C}_t'}</Equation>).
                </li>
                <li>
                    <strong>Gradient-Based Updates</strong>: MIRAS proposes using actual <strong>Gradient Descent (GD)</strong> steps as the update mechanism. The memory parameters are updated by moving them in the direction of the negative gradient of the Attentional Bias: <Equation>{'\\mathcal{M}_t = \\mathcal{M}_{t-1} - \\eta \\nabla_{\\mathcal{M}} \\mathcal{L}'}</Equation>. This connects sequence modeling directly to optimization theory, allowing the use of advanced optimizers (like Momentum or Second-Order methods) within the recurrent loop.
                </li>
            </ul>

            <Header3 className="text-xl font-semibold text-slate-800 mb-4">Limitations of Linear Compression</Header3>
            <ul className="list-disc list-inside space-y-4 mb-6 text-slate-700 ml-4">
                <li>
                    Linear compression (Mamba, RetNet) struggle to match transformer's efficiency on complex tasks because they rely on the "kernel trick" to linearize attention, which effectively compresses the context into a matrix valued state.
                </li>
                <li>
                    This compression is lossy because it forces the model to treat the context as a linear summation of features. Complex, hierarchical dependencies in language or code cannot be fully captured by a linear recurrence relation.
                </li>
                <li>
                    By contrast, the Neural Memory approach (using non-linear MLPs updated via gradient descent) allows the model to compress the context into a non-linear manifold, preserving the structural integrity of the information even over millions of tokens.
                </li>
            </ul>
        </Section>
    );
};

export default MIRAS;
