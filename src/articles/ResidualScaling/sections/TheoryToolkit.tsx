import React from 'react';
import { GraduationCap } from 'lucide-react';
import Section from '../../../components/Section';
import Header3 from '../../../components/Header3';
import Header4 from '../../../components/Header4';
import Paragraph from '../../../components/Paragraph';
import List from '../../../components/List';
import ListItem from '../../../components/ListItem';
import Equation from '../../../components/Equation';
import Callout from '../../../components/Callout';

const TheoryToolkit = () => {
    return (
        <Section title="Theory Toolkit" icon={GraduationCap}>
            <Paragraph>
                Several theoretical frameworks underpin residual scaling methods. Understanding these concepts helps explain <em>why</em> various techniques work and guides the design of new approaches.
            </Paragraph>

            <Header3>Jacobian Spectrum and Dynamical Isometry</Header3>
            <Paragraph>
                The <strong>Jacobian spectrum</strong> describes how signals and gradients are transformed as they propagate through a network. For a network mapping input <Equation>{`x_0`}</Equation> to output <Equation>{`x_L`}</Equation>, the Jacobian is:
            </Paragraph>
            <Equation block>
                {`J = \\frac{\\partial x_L}{\\partial x_0} = \\prod_{l=0}^{L-1} \\frac{\\partial x_{l+1}}{\\partial x_l}`}
            </Equation>
            <Paragraph>
                The <strong>singular values</strong> of <Equation>{`J`}</Equation> determine how different input directions are amplified or attenuated:
            </Paragraph>
            <List>
                <ListItem>
                    <strong>Singular value ≫ 1:</strong> Signal explodes in that direction (forward) / gradient explodes (backward).
                </ListItem>
                <ListItem>
                    <strong>Singular value ≪ 1:</strong> Signal vanishes in that direction / gradient vanishes.
                </ListItem>
                <ListItem>
                    <strong>Singular value ≈ 1:</strong> Signal is preserved / gradient flows unchanged.
                </ListItem>
            </List>

            <Header4>Dynamical Isometry</Header4>
            <Paragraph>
                <strong>Dynamical isometry</strong> is the ideal condition where <em>all</em> singular values of the Jacobian are close to 1:
            </Paragraph>
            <Equation block>
                {`\\sigma_i(J) \\approx 1 \\quad \\forall i`}
            </Equation>
            <Paragraph>
                When dynamical isometry holds:
            </Paragraph>
            <List>
                <ListItem>
                    Gradients flow without attenuation or explosion through arbitrary depth.
                </ListItem>
                <ListItem>
                    Training time becomes <strong>depth-independent</strong>—adding more layers doesn't slow convergence.
                </ListItem>
                <ListItem>
                    All layers receive comparable gradient signals and learn at similar rates.
                </ListItem>
            </List>

            <Callout type="tip" title="Achieving Isometry">
                Different techniques achieve dynamical isometry in different ways:
                <List>
                    <ListItem><strong>Orthogonal initialization:</strong> Initialize weight matrices as orthogonal (preserves norms).</ListItem>
                    <ListItem><strong>ReZero:</strong> Zero-init residual gates → Jacobian = Identity at init.</ListItem>
                    <ListItem><strong>Careful activation choice:</strong> Tanh with specific gains can achieve isometry; ReLU generally cannot.</ListItem>
                </List>
            </Callout>

            <Header4>The Jacobian Spectrum Structure</Header4>
            <Paragraph>
                In practice, the Jacobian spectrum of a trained network often shows distinct regions:
            </Paragraph>
            <List>
                <ListItem>
                    <strong>Chaotic Region:</strong> A few singular values much greater than 1, corresponding to directions of high sensitivity (can cause instability).
                </ListItem>
                <ListItem>
                    <strong>Bulk Region:</strong> Most singular values near 1, where stable propagation occurs.
                </ListItem>
                <ListItem>
                    <strong>Stable Region:</strong> Singular values less than 1, where signals are damped (can cause vanishing).
                </ListItem>
            </List>
            <Paragraph>
                Residual scaling shifts the spectrum toward 1 by reducing the magnitude of per-layer Jacobian contributions.
            </Paragraph>

            <Header3>Neural ODE View of ResNets</Header3>
            <Paragraph>
                A powerful perspective comes from viewing ResNets as <strong>discretizations of continuous dynamical systems</strong>.
            </Paragraph>

            <Header4>ResNet as Euler Discretization</Header4>
            <Paragraph>
                The residual update rule:
            </Paragraph>
            <Equation block>
                {`x_{l+1} = x_l + F(x_l)`}
            </Equation>
            <Paragraph>
                is exactly the <strong>Euler method</strong> for solving the ordinary differential equation (ODE):
            </Paragraph>
            <Equation block>
                {`\\frac{dx}{dt} = F(x, t)`}
            </Equation>
            <Paragraph>
                with step size <Equation>{`\\Delta t = 1`}</Equation>. In this view:
            </Paragraph>
            <List>
                <ListItem>
                    <strong>Depth ↔ Time:</strong> Layer index <Equation>{`l`}</Equation> corresponds to time <Equation>{`t`}</Equation>.
                </ListItem>
                <ListItem>
                    <strong>Residual function ↔ Vector field:</strong> <Equation>{`F(x)`}</Equation> defines the local direction of flow.
                </ListItem>
                <ListItem>
                    <strong>Residual scaling ↔ Step size:</strong> Scaling by <Equation>{`\\alpha`}</Equation> gives <Equation>{`x_{l+1} = x_l + \\alpha F(x_l)`}</Equation>, equivalent to step size <Equation>{`\\Delta t = \\alpha`}</Equation>.
                </ListItem>
            </List>

            <Header4>Step Size and Stability</Header4>
            <Paragraph>
                This analogy illuminates residual scaling. In numerical ODEs, the step size <Equation>{`\\Delta t`}</Equation> must satisfy stability conditions:
            </Paragraph>
            <List>
                <ListItem>
                    <strong>Too large:</strong> Numerical errors accumulate exponentially → exploding signals.
                </ListItem>
                <ListItem>
                    <strong>Too small:</strong> Many steps needed to traverse the same time → wasted parameters (layers).
                </ListItem>
            </List>
            <Paragraph>
                The optimal step size depends on the "stiffness" of the ODE—how rapidly <Equation>{`F`}</Equation> changes. Residual scaling methods implicitly estimate this to choose appropriate <Equation>{`\\alpha`}</Equation>.
            </Paragraph>

            <Callout type="info" title="Neural ODEs">
                This perspective led to <strong>Neural ODEs</strong> (Chen et al., 2018), which replace discrete layers with a continuous ODE solver. The depth becomes adaptive—the solver takes more steps in regions requiring fine detail. While beautiful theoretically, Neural ODEs are computationally expensive and haven't replaced discrete architectures in practice.
            </Callout>

            <Header3>Depth Scaling Laws</Header3>
            <Paragraph>
                Several theoretical results characterize how depth affects network behavior.
            </Paragraph>

            <Header4>Variance Explosion Rate</Header4>
            <Paragraph>
                For standard residuals without scaling, activation variance grows linearly:
            </Paragraph>
            <Equation block>
                {`\\text{Var}(x_L) = \\text{Var}(x_0) + L \\cdot \\sigma^2_F`}
            </Equation>
            <Paragraph>
                This is <Equation>{`O(L)`}</Equation> growth. To keep variance <Equation>{`O(1)`}</Equation>, we need:
            </Paragraph>
            <Equation block>
                {`\\alpha \\propto 1/\\sqrt{L}`}
            </Equation>

            <Header4>Gradient Flow Analysis</Header4>
            <Paragraph>
                For Post-LN Transformers, the expected gradient norm for layer <Equation>{`l`}</Equation> scales as:
            </Paragraph>
            <Equation block>
                {`\\mathbb{E}\\left[\\left\\|\\frac{\\partial \\mathcal{L}}{\\partial W_l}\\right\\|\\right] \\propto \\frac{1}{L - l + 1}`}
            </Equation>
            <Paragraph>
                Early layers receive gradients <Equation>{`O(1/L)`}</Equation> smaller than late layers—vanishing gradients. DeepNorm's scaling is derived to make this ratio <Equation>{`O(1)`}</Equation>.
            </Paragraph>

            <Header4>Mean Field Theory</Header4>
            <Paragraph>
                Mean field theory analyzes networks in the limit of large width. For residual networks, key results include:
            </Paragraph>
            <List>
                <ListItem>
                    <strong>Order-to-Chaos Transition:</strong> Networks exhibit a phase transition from ordered (stable) to chaotic behavior as initialization scale increases.
                </ListItem>
                <ListItem>
                    <strong>Edge of Chaos:</strong> Best trainability occurs at the boundary—enough expressivity without instability.
                </ListItem>
                <ListItem>
                    <strong>Critical Initialization:</strong> Specific initialization scales place the network at the edge of chaos. Many residual scaling methods can be understood as finding these critical points.
                </ListItem>
            </List>

            <Header3>Connecting Theory to Practice</Header3>
            <div className="overflow-x-auto my-6">
                <table className="min-w-full text-sm text-left text-slate-700 border border-slate-200">
                    <thead className="text-xs text-slate-800 uppercase bg-slate-100 font-bold">
                        <tr>
                            <th className="px-4 py-2 border-b">Theoretical Concept</th>
                            <th className="px-4 py-2 border-b">Practical Manifestation</th>
                            <th className="px-4 py-2 border-b">Methods Using It</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">Dynamical isometry</td>
                            <td className="px-4 py-2">Jacobian singular values ≈ 1</td>
                            <td className="px-4 py-2">ReZero, orthogonal init</td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-4 py-2 font-medium">ODE step size</td>
                            <td className="px-4 py-2">Residual scaling factor <Equation>{`\\alpha`}</Equation></td>
                            <td className="px-4 py-2">All scaling methods</td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">Variance boundedness</td>
                            <td className="px-4 py-2"><Equation>{`\\alpha \\propto 1/\\sqrt{L}`}</Equation></td>
                            <td className="px-4 py-2">GPT-style, DeepNorm</td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-4 py-2 font-medium">Edge of chaos</td>
                            <td className="px-4 py-2">Critical initialization</td>
                            <td className="px-4 py-2">Fixup, mean field init</td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2 font-medium">Doubly stochastic</td>
                            <td className="px-4 py-2">Norm preservation</td>
                            <td className="px-4 py-2">mHC</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <Callout type="tip" title="Practical Takeaway">
                While the theory can get mathematically involved, the practical message is simple: <strong>control how each layer affects the overall flow of information and gradients</strong>. Whether through scaling, gating, or constrained mixing, the goal is to prevent depth from becoming a liability.
            </Callout>
        </Section>
    );
};

export default TheoryToolkit;
