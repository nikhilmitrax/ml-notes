import React from 'react';
import Article from '../../components/Article';
import Equation from '../../components/Equation';
import { getAssetPath } from '../../utils/assetUtils';

export const name = 'Optimizers';
export const section = 'coalesced';

export default function Optimizers() {
    return (
        <Article
            title="Optimizers in Deep Learning"
            description="A comprehensive guide to modern neural network optimizers. From Adam to Muon, understand the intuition, math, and practical applications of the algorithms powering deep learning."
        >
            <div className="space-y-12 text-slate-800 dark:text-slate-200">
                
                {/* Introduction */}
                <section>
                    <h2 className="text-2xl font-bold mb-4">Introduction</h2>
                    <p className="mb-4">
                        Optimizers dictate how a neural network updates its weights based on the loss gradient. While Stochastic Gradient Descent (SGD) with momentum was the standard for years, modern architectures (like Transformers) rely on adaptive learning rate methods. This article covers the crucial optimizers that a Staff-level ML Engineer should know inside and out.
                    </p>
                </section>

                {/* Adam */}
                <section>
                    <h2 className="text-2xl font-bold mb-4">1. Adam (Adaptive Moment Estimation)</h2>
                    <p className="mb-4">
                        Adam combines the ideas of momentum (first moment) and RMSProp (second moment). It computes individual adaptive learning rates for different parameters from estimates of first and second moments of the gradients.
                    </p>
                    
                    <h3 className="text-xl font-semibold mb-2 mt-6">The Math</h3>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li><strong>First Moment (Momentum):</strong> <Equation inline={true}>{`m_t = \\beta_1 m_{t-1} + (1-\\beta_1)g_t`}</Equation></li>
                        <li><strong>Second Moment (Uncentered Variance):</strong> <Equation inline={true}>{`v_t = \\beta_2 v_{t-1} + (1-\\beta_2)g_t^2`}</Equation></li>
                        <li><strong>Bias Correction:</strong> <Equation inline={true}>{`\\hat{m}_t = \\frac{m_t}{1-\\beta_1^t}, \\quad \\hat{v}_t = \\frac{v_t}{1-\\beta_2^t}`}</Equation></li>
                        <li><strong>Weight Update:</strong> <Equation inline={true}>{`\\theta_t = \\theta_{t-1} - \\frac{\\alpha}{\\sqrt{\\hat{v}_t} + \\epsilon} \\hat{m}_t`}</Equation></li>
                    </ul>

                    <h3 className="text-xl font-semibold mb-2 mt-6">Intuition & Key Behaviors</h3>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li><strong>Dampening Oscillations:</strong> The second moment <Equation inline={true}>{`v_t`}</Equation> accumulates the square of gradients. If a gradient oscillates back and forth across a ravine, <Equation inline={true}>{`v_t`}</Equation> grows large. Dividing the update by <Equation inline={true}>{`\\sqrt{\\hat{v}_t}`}</Equation> dampens the update in that direction, reducing oscillation.</li>
                        <li><strong>Accelerating in Flat Directions:</strong> Conversely, if gradients consistently point in one direction but are small, <Equation inline={true}>{`m_t`}</Equation> builds up while <Equation inline={true}>{`v_t`}</Equation> remains relatively small, causing the optimizer to accelerate along the flat valley.</li>
                        <li><strong>Robustness to Initial LR:</strong> Because the update step magnitude is roughly bounded by the step size <Equation inline={true}>{`\\alpha`}</Equation> (since <Equation inline={true}>{`\\frac{|\\hat{m}_t|}{\\sqrt{\\hat{v}_t}} \\approx 1`}</Equation> over long periods), Adam is far less sensitive to the exact choice of initial learning rate compared to vanilla SGD.</li>
                        <li><strong>Bias Correction:</strong> Essential in early steps. Since <Equation inline={true}>{`m_0`}</Equation> and <Equation inline={true}>{`v_0`}</Equation> are initialized to 0, they are biased toward 0. Bias correction scales them up artificially in the first few steps before the moving averages warm up.</li>
                    </ul>
                </section>

                <hr className="border-slate-200 dark:border-slate-700" />

                {/* AdamW */}
                <section>
                    <h2 className="text-2xl font-bold mb-4">2. AdamW (Adam with Weight Decay)</h2>
                    <p className="mb-4">
                        Historically, practitioners implemented L2 regularization by adding <Equation inline={true}>{`\\frac{\\lambda}{2}||\\theta||^2`}</Equation> to the loss. In standard SGD, this is mathematically identical to weight decay. However, in adaptive optimizers like Adam, L2 regularization gets scaled down by the second moment <Equation inline={true}>{`v_t`}</Equation>, making it less effective for weights with large gradients.
                    </p>

                    <h3 className="text-xl font-semibold mb-2 mt-6">The Math</h3>
                    <p className="mb-4">AdamW decouples weight decay from the gradient update:</p>
                    <div className="mb-4">
                        <Equation block={true}>{`\\theta_t = \\theta_{t-1} - \\eta_t \\left( \\frac{\\alpha \\hat{m}_t}{\\sqrt{\\hat{v}_t} + \\epsilon} + \\lambda \\theta_{t-1} \\right)`}</Equation>
                    </div>

                    <h3 className="text-xl font-semibold mb-2 mt-6">Intuition & Key Behaviors</h3>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li><strong>Decoupling:</strong> By applying the weight decay <Equation inline={true}>{`\\lambda \\theta_{t-1}`}</Equation> directly to the weights (outside the adaptive scaling), weights are uniformly pushed toward zero at a constant rate, independent of their gradient history.</li>
                        <li><strong>Generalization:</strong> AdamW restores the true regularizing effect of weight decay, leading to significantly better generalization, especially in Transformers where it is universally preferred over standard Adam.</li>
                    </ul>
                </section>

                <hr className="border-slate-200 dark:border-slate-700" />

                {/* Rectified Adam (RAdam) */}
                <section>
                    <h2 className="text-2xl font-bold mb-4">3. Rectified Adam (RAdam)</h2>
                    <p className="mb-4">
                        Adaptive optimizers often suffer from a "bad local optima" problem in the first few steps because the variance of the adaptive learning rate is extremely high when there are few samples in the moving average. This is why we traditionally use Learning Rate Warmup.
                    </p>

                    <h3 className="text-xl font-semibold mb-2 mt-6">Intuition & Key Behaviors</h3>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li><strong>The Variance Problem:</strong> Early in training, the estimate of <Equation inline={true}>{`v_t`}</Equation> relies on very few gradients. If an anomalous gradient appears, it heavily skews the second moment, sending weights in a wild direction from which it's hard to recover.</li>
                        <li><strong>Automated Warmup:</strong> RAdam introduces a term <Equation inline={true}>{`r_t`}</Equation> that computes the variance of the adaptive learning rate based on degrees of freedom (essentially, how many steps have elapsed). </li>
                        <li><strong>Rectification:</strong> If the variance is intractable (early on), it disables the adaptive scaling and falls back to SGD with momentum. Once the variance drops below a safe threshold, the rectifier turns on the Adam-style adaptive updates. This mathematically guarantees the stability that LR Warmup heuristically provides.</li>
                    </ul>
                </section>

                <hr className="border-slate-200 dark:border-slate-700" />

                {/* Lookahead */}
                <section>
                    <h2 className="text-2xl font-bold mb-4">4. Lookahead Optimizer</h2>
                    <p className="mb-4">
                        Lookahead is not an optimizer itself, but a wrapper around an existing optimizer (like Adam or SGD) that improves optimization stability and escaping sharp minima. It operates on a "fast weights, slow weights" mechanism.
                    </p>

                    <h3 className="text-xl font-semibold mb-2 mt-6">The Math</h3>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li><strong>Fast Weights:</strong> Inner loop updates using standard optimizer (e.g., Adam): <Equation inline={true}>{`\\theta_{t,i} = \\theta_{t,i-1} - \\text{OptimizerUpdate}`}</Equation></li>
                        <li><strong>Slow Weights:</strong> After <Equation inline={true}>{`k`}</Equation> steps, interpolate: <Equation inline={true}>{`\\phi_t = \\phi_{t-1} + \\alpha_{\\text{slow}} (\\theta_{t,k} - \\phi_{t-1})`}</Equation></li>
                    </ul>

                    <h3 className="text-xl font-semibold mb-2 mt-6">Intuition & Key Behaviors</h3>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li><strong>Exploration vs. Commitment:</strong> The fast weights "scout ahead" into the loss landscape. If they fall into a sharp, narrow minimum or oscillate around a ravine, the slow weights act as an anchor, pulling the true weights to the center of the explored region.</li>
                        <li><strong>Variance Reduction:</strong> It inherently reduces the variance of the final trajectory, acting like an exponentially moving average (EMA) of weights, but applied dynamically during training rather than purely for inference.</li>
                        <li>Often combined with RAdam to form <strong>Ranger</strong>, a highly robust optimizer combination.</li>
                    </ul>
                </section>

                <hr className="border-slate-200 dark:border-slate-700" />

                {/* LAMB */}
                <section>
                    <h2 className="text-2xl font-bold mb-4">5. LAMB (Layer-wise Adaptive Moments)</h2>
                    <p className="mb-4">
                        Designed specifically to facilitate training with massive batch sizes (e.g., 64k+ in pre-training LLMs), LAMB prevents the diverging gradients that usually accompany the huge learning rates required for large batches.
                    </p>

                    <h3 className="text-xl font-semibold mb-2 mt-6">The Math</h3>
                    <p className="mb-4">For a given layer with weights <Equation inline={true}>{`w`}</Equation>, compute the Adam update ratio <Equation inline={true}>{`r_t`}</Equation>:</p>
                    <div className="mb-4">
                        <Equation block={true}>{`r_t = \\frac{\\hat{m}_t}{\\sqrt{\\hat{v}_t} + \\epsilon} + \\lambda w_{t-1}`}</Equation>
                    </div>
                    <p className="mb-4">Then apply layer-wise normalization for the final update step:</p>
                    <div className="mb-4">
                        <Equation block={true}>{`w_t = w_{t-1} - \\eta \\frac{||w_{t-1}||}{||r_t||} r_t`}</Equation>
                    </div>

                    <h3 className="text-xl font-semibold mb-2 mt-6">Intuition & Key Behaviors</h3>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li><strong>Trust Ratio:</strong> LAMB normalizes the update for each layer by the ratio of the norm of the weights to the norm of the Adam update step (<Equation inline={true}>{`\\frac{||w||}{||r||}`}</Equation>). This is called the trust ratio.</li>
                        <li><strong>Scale Invariance:</strong> If a layer's weights are small but its gradients are huge (common in early layers of deep networks), standard Adam might push the weights into chaotic regions. LAMB forcefully bounds the update size relative to the layer's current weight norm.</li>
                        <li><strong>Large Batch Survival:</strong> By ensuring no single layer gets an update disproportionately larger than its current magnitude, LAMB allows scaling batch sizes (and proportionally scaling up the learning rate) without catastrophic divergence.</li>
                    </ul>
                </section>

                <hr className="border-slate-200 dark:border-slate-700" />

                {/* SAM */}
                <section>
                    <h2 className="text-2xl font-bold mb-4">6. SAM (Sharpness-Aware Minimization)</h2>
                    <p className="mb-4">
                        Standard optimizers solely seek points in the weight space that minimize the loss value <Equation inline={true}>{`L(\\theta)`}</Equation>. SAM simultaneously minimizes loss value and loss sharpness, ensuring the model converges to flat minima, which empirically generalize much better.
                    </p>

                    <h3 className="text-xl font-semibold mb-2 mt-6">The Math</h3>
                    <p className="mb-4">Instead of minimizing <Equation inline={true}>{`L(\\theta)`}</Equation>, SAM minimizes the maximum loss in a local neighborhood:</p>
                    <div className="mb-4">
                        <Equation block={true}>{`\\min_\\theta \\max_{||\\epsilon|| \\le \\rho} L(\\theta + \\epsilon)`}</Equation>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-2 mt-6">Intuition & Key Behaviors</h3>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li><strong>Perturbation:</strong> In each step, SAM first calculates the gradient to find the direction of steepest ascent (the worst-case perturbation <Equation inline={true}>{`\\hat{\\epsilon}`}</Equation> within radius <Equation inline={true}>{`\\rho`}</Equation>).</li>
                        <li><strong>Update on the Edge:</strong> It temporarily adds this perturbation to the weights, calculates the gradient at that perturbed (high-loss) point, and then applies *that* gradient to the original weights.</li>
                        <li><strong>Flat Minima:</strong> If a minimum is sharp, the perturbation pushes the weights up the steep wall, resulting in a massive gradient that pushes the optimizer away from the sharp hole. If it's a flat valley, the perturbed gradient is similar to the original gradient, allowing convergence.</li>
                        <li><strong>Cost:</strong> It requires two forward-backward passes per step, effectively doubling training time, though the generalization benefits (especially on smaller datasets like ImageNet without pretraining) can be profound.</li>
                    </ul>
                </section>

                <hr className="border-slate-200 dark:border-slate-700" />

                {/* Muon */}
                <section>
                    <h2 className="text-2xl font-bold mb-4">7. Muon (MomentUm Orthogonalized by Newton-Schulz)</h2>
                    <p className="mb-4">
                        Muon is a recently introduced optimizer specifically designed for the 2D parameters of neural network hidden layers. It dramatically improves sample efficiency and wallclock time in training large transformers by orthogonalizing the momentum updates.
                    </p>

                    <div className="mb-8">
                        <img src={getAssetPath("assets/Optimizers/muon_algo.png")} alt="Muon Algorithm" className="max-w-full rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm" />
                    </div>

                    <h3 className="text-xl font-semibold mb-2 mt-6">The Math</h3>
                    <p className="mb-4">
                        Muon takes the update generated by SGD-momentum and applies a Newton-Schulz (NS) iteration as a post-processing step to orthogonalize it:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li><strong>Update Rule:</strong> <Equation inline={true}>{`W_{t+1} = W_t - \\eta \\cdot \\text{NewtonSchulz5}(\\text{Momentum}(G_t))`}</Equation></li>
                        <li><strong>Newton-Schulz Iteration:</strong> Used to approximately orthogonalize the update matrix <Equation inline={true}>{`G`}</Equation>. This is equivalent to replacing the update with <Equation inline={true}>{`UV^\\top`}</Equation> from its SVD, <Equation inline={true}>{`USV^\\top`}</Equation>.</li>
                        <li>
                            <strong>Iteration Formula:</strong> 
                            <Equation block={true}>{`X_{k+1} = (aI + b(X_k X_k^\\top) + c(X_k X_k^\\top)^2) X_k`}</Equation>
                            Where the coefficients are heavily tuned to: <Equation inline={true}>{`a = 3.4445`}</Equation>, <Equation inline={true}>{`b = -4.7750`}</Equation>, <Equation inline={true}>{`c = 2.0315`}</Equation>.
                        </li>
                        <li><strong>Initialization:</strong> The input matrix <Equation inline={true}>{`G`}</Equation> is normalized: <Equation inline={true}>{`X_0 = G / (||G||_F + \\epsilon)`}</Equation> to ensure singular values are in the range <Equation inline={true}>{`[0, 1]`}</Equation>.</li>
                    </ul>

                    <h3 className="text-xl font-semibold mb-2 mt-6">Intuition & Key Behaviors</h3>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li><strong>Spectral Whitening:</strong> Muon effectively "whitens" the update by replacing it with the nearest semi-orthogonal matrix.</li>
                        <li><strong>Amplifying Rare Directions:</strong> Updates in transformers often have high condition numbers (they are nearly low-rank), dominated by just a few directions. Orthogonalization increases the scale of "rare directions" that have small magnitudes in the gradient but are vital for learning.</li>
                        <li><strong>Accumulation-free Shampoo:</strong> It can be interpreted as a version of the Shampoo optimizer that removes preconditioner accumulation, making it much more computationally efficient (below 1% FLOP overhead) while maintaining sample efficiency.</li>
                    </ul>

                    <div className="mb-8">
                        <img src={getAssetPath("assets/Optimizers/shampoo.png")} alt="Shampoo vs Muon" className="max-w-full rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm" />
                    </div>

                    <h3 className="text-xl font-semibold mb-2 mt-6">Practical Usage Details</h3>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li><strong>Layer Selection:</strong> Use Muon <em>only</em> for 2D hidden layer parameters.</li>
                        <li><strong>AdamW Fallback:</strong> Use AdamW for scalar/vector parameters (like LayerNorm weights), as well as the input embeddings and output classifier head.</li>
                        <li><strong>Transformer Specifics:</strong> Apply Muon to Q, K, and V parameters separately rather than as a single concatenated matrix for better performance.</li>
                        <li><strong>Precision:</strong> The Newton-Schulz iteration is numerically stable enough to be run entirely in <code>bfloat16</code>.</li>
                        <li><strong>Convolutional Layers:</strong> For 4D filters, flatten the last three dimensions to treat them as 2D matrices.</li>
                    </ul>

                    <h3 className="text-xl font-semibold mb-2 mt-6">Performance Results</h3>
                    <p className="mb-4">
                        Muon has achieved significant improvements in both sample efficiency and wallclock time across various scales, from NanoGPT speedrunning to 1.5B parameter models.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <img src={getAssetPath("assets/Optimizers/nanogpt_speedrun81w.png")} alt="Sample Efficiency" className="w-full rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm" />
                        <img src={getAssetPath("assets/Optimizers/nanogpt_speedrun82w.png")} alt="Wallclock Time" className="w-full rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm" />
                    </div>
                    <div className="mb-4">
                        <img src={getAssetPath("assets/Optimizers/muon15b.jpeg")} alt="Muon at 1.5B Scale" className="max-w-full mx-auto rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm" />
                    </div>

                </section>

            </div>
        </Article>
    );
}
