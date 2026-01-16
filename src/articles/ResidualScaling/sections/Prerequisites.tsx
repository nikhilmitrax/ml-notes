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

const Prerequisites = () => {
    return (
        <Section title="Prereqs" icon={Layers}>
            <Header3>Residual-as-Near-Identity Mapping</Header3>
            <Paragraph>
                The fundamental insight behind residual scaling is that <strong>keeping residual blocks close to identity at initialization dramatically improves optimization</strong>. This principle affects both forward and backward propagation:
            </Paragraph>

            <Header4>Forward Signal Propagation</Header4>
            <Paragraph>
                Consider a standard residual block:
            </Paragraph>
            <Equation block>
                {`x_{l+1} = x_l + F(x_l; \\theta_l)`}
            </Equation>
            <Paragraph>
                where <Equation>{`F`}</Equation> is the residual function (e.g., attention + FFN in a Transformer). If <Equation>{`F(x) \\approx 0`}</Equation> at initialization, then <Equation>{`x_{l+1} \\approx x_l`}</Equation>—the block acts as an identity mapping. This ensures that the input signal can flow through arbitrary depth without distortion:
            </Paragraph>
            <Equation block>
                {`x_L = x_0 + \\sum_{l=0}^{L-1} F(x_l; \\theta_l) \\approx x_0 \\quad \\text{(at init)}`}
            </Equation>

            <Header4>Backward Gradient Propagation</Header4>
            <Paragraph>
                The same identity property helps gradients. Taking the Jacobian through the residual connection:
            </Paragraph>
            <Equation block>
                {`\\frac{\\partial x_L}{\\partial x_l} = \\prod_{k=l}^{L-1} \\left( I + \\frac{\\partial F(x_k)}{\\partial x_k} \\right)`}
            </Equation>
            <Paragraph>
                If each <Equation>{`\\frac{\\partial F}{\\partial x} \\approx 0`}</Equation>, this product is approximately <Equation>{`I`}</Equation>, and gradients flow unchanged. This is the key to why ResNets can train at depths where plain networks fail—the identity shortcut provides a gradient highway that bypasses the learned transformations.
            </Paragraph>

            <Callout type="tip" title="The Identity Highway">
                Think of the residual stream as a highway that carries information across depth. The residual branch <Equation>{`F(x)`}</Equation> is an on-ramp that adds new information. If the on-ramps are too aggressive at initialization, traffic jams (gradient issues) occur. Residual scaling controls the "merge rate" of these on-ramps.
            </Callout>

            <Header3>The Variance Accumulation Problem</Header3>
            <Paragraph>
                While identity-like initialization helps with gradient flow, it introduces a different problem: <strong>variance explosion</strong> in the forward pass. Consider the variance of the residual stream after <Equation>{`L`}</Equation> layers:
            </Paragraph>
            <Equation block>
                {`\\text{Var}(x_{l+1}) = \\text{Var}(x_l) + \\text{Var}(F(x_l)) + 2\\text{Cov}(x_l, F(x_l))`}
            </Equation>
            <Paragraph>
                Assuming zero mean and independence (reasonable at initialization with standard Xavier/He init):
            </Paragraph>
            <Equation block>
                {`\\text{Var}(x_{l+1}) \\approx \\text{Var}(x_l) + \\text{Var}(F(x_l))`}
            </Equation>
            <Paragraph>
                If each residual branch contributes constant variance <Equation>{`\\sigma^2_F`}</Equation>:
            </Paragraph>
            <Equation block>
                {`\\text{Var}(x_L) \\approx \\text{Var}(x_0) + L \\cdot \\sigma^2_F`}
            </Equation>
            <Paragraph>
                <strong>Variance grows linearly with depth.</strong> For a 1,000-layer network, this means activations at the final layer have ~1,000× the variance of the input—leading to numerical overflow, saturated nonlinearities, and unstable optimization.
            </Paragraph>

            <Header3>Controlling Variance with Residual Scaling</Header3>
            <Paragraph>
                The solution is to scale the residual branch by a factor <Equation>{`\\alpha`}</Equation>:
            </Paragraph>
            <Equation block>
                {`x_{l+1} = x_l + \\alpha \\cdot F(x_l)`}
            </Equation>
            <Paragraph>
                Now the variance contribution per layer is <Equation>{`\\alpha^2 \\sigma^2_F`}</Equation>:
            </Paragraph>
            <Equation block>
                {`\\text{Var}(x_L) \\approx \\text{Var}(x_0) + L \\cdot \\alpha^2 \\sigma^2_F`}
            </Equation>
            <Paragraph>
                Different choices of <Equation>{`\\alpha`}</Equation> correspond to different methods:
            </Paragraph>
            <List>
                <ListItem>
                    <strong><Equation>{`\\alpha = 1/\\sqrt{L}`}</Equation>:</strong> Keeps total variance bounded independent of depth. Used in GPT-style initialization.
                </ListItem>
                <ListItem>
                    <strong><Equation>{`\\alpha = 0`}</Equation> (learnable):</strong> ReZero approach—start with pure identity, let the network learn how much to mix in.
                </ListItem>
                <ListItem>
                    <strong><Equation>{`\\alpha`}</Equation> derived from theory:</strong> DeepNorm's approach, computing optimal <Equation>{`\\alpha`}</Equation> based on depth and architecture.
                </ListItem>
            </List>

            <Header3>Impact on the Loss Landscape</Header3>
            <Paragraph>
                Residual scaling doesn't just affect signal propagation—it fundamentally changes the optimization landscape. Research has shown that:
            </Paragraph>
            <List>
                <ListItem>
                    <strong>Smoother Loss Surface:</strong> Scaling residual branches down at initialization creates a smoother loss landscape with fewer sharp minima and saddle points. This allows larger learning rates and faster convergence.
                </ListItem>
                <ListItem>
                    <strong>Better Conditioning:</strong> The Hessian eigenvalue spectrum becomes better conditioned when residual blocks start near identity. This reduces the disparity between the largest and smallest curvatures, making optimization less sensitive to learning rate choice.
                </ListItem>
                <ListItem>
                    <strong>Implicit Regularization:</strong> Starting near identity and gradually "turning on" layers creates an implicit curriculum—the network first learns shallow features, then progressively deeper representations. This mirrors successful training strategies like layer-wise pretraining.
                </ListItem>
            </List>

            <Callout type="info" title="The Ensemble View">
                Another perspective comes from viewing ResNets as ensembles of shallower networks. A depth-<Equation>{`L`}</Equation> ResNet can be unrolled into <Equation>{`2^L`}</Equation> paths of varying effective depth. Residual scaling controls how these paths are weighted, with smaller <Equation>{`\\alpha`}</Equation> favoring shorter (shallower) paths at initialization.
            </Callout>
        </Section>
    );
};

export default Prerequisites;
