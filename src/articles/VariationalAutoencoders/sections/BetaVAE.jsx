import React, { useState } from 'react';
import { Zap } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';
import EquationBlock from '../../../components/EquationBlock';
import InteractiveCard from '../../../components/InteractiveCard';

const BetaVAEViz = () => {
    const [beta, setBeta] = useState(1);
    const [z1, setZ1] = useState(0.5);
    const [z2, setZ2] = useState(0.5);

    // Simulation of Entanglement vs Disentanglement
    // At beta=1 (Standard VAE), factors are entangled.
    // At beta>1 (Beta-VAE), factors become disentangled.

    // We simulate this by mixing the sources.
    // Entanglement factor 'e' decreases as beta increases.
    // Let's say at beta=1, e=0.5 (high mixing). At beta=5, e=0 (no mixing).
    const entanglement = Math.max(0, 0.5 - (beta - 1) * 0.125);

    // Derived visual properties
    // Property 1 (Size) should be primarily z1
    // Property 2 (Color) should be primarily z2

    // Mixed signals
    const sizeSignal = z1 + (z2 - 0.5) * entanglement;
    const colorSignal = z2 + (z1 - 0.5) * entanglement;

    // Map to visual values
    const size = 40 + Math.max(0, Math.min(1, sizeSignal)) * 80;

    // Color from Blue (0) to Pink (1)
    const r = Math.floor(Math.max(0, Math.min(1, colorSignal)) * 255);
    const b = Math.floor((1 - Math.max(0, Math.min(1, colorSignal))) * 255);
    const g = 100; // Constant green for better visibility
    const color = `rgb(${r}, ${g}, ${b})`;

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
                {/* Controls */}
                <div className="w-full md:w-1/2 space-y-6">
                    <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-100 dark:border-orange-800">
                        <label className="text-sm font-bold text-orange-800 dark:text-orange-300 mb-1 block flex justify-between">
                            <span>Beta (<Equation>\beta</Equation>) Parameter</span>
                            <span>{beta}</span>
                        </label>
                        <input
                            type="range" min="1" max="5" step="0.5" value={beta}
                            onChange={(e) => setBeta(parseFloat(e.target.value))}
                            className="w-full accent-orange-600"
                        />
                        <p className="text-xs text-orange-700 dark:text-orange-400 mt-1">
                            {beta === 1 ? "Standard VAE (Entangled)" : beta >= 4 ? "High Beta (Disentangled)" : "Increasing Regularization..."}
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                                Latent Factor 1 (<Equation>z_1</Equation>)
                            </label>
                            <input
                                type="range" min="0" max="1" step="0.05" value={z1}
                                onChange={(e) => setZ1(parseFloat(e.target.value))}
                                className="w-full accent-blue-600"
                            />
                            <p className="text-xs text-gray-500">Intended: Control Size</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                                Latent Factor 2 (<Equation>z_2</Equation>)
                            </label>
                            <input
                                type="range" min="0" max="1" step="0.05" value={z2}
                                onChange={(e) => setZ2(parseFloat(e.target.value))}
                                className="w-full accent-pink-600"
                            />
                            <p className="text-xs text-gray-500">Intended: Control Color</p>
                        </div>
                    </div>
                </div>

                {/* Output */}
                <div className="flex-1 flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8 h-64 w-full">
                    <div className="text-sm text-gray-400 mb-8 uppercase tracking-wider font-semibold">Reconstruction</div>
                    <div
                        className="shadow-lg transition-all duration-200 rounded-full flex items-center justify-center text-white font-bold"
                        style={{
                            width: `${size}px`,
                            height: `${size}px`,
                            backgroundColor: color,
                        }}
                    >
                    </div>
                    <div className="mt-8 text-center space-y-1">
                        <p className="text-xs text-gray-500">
                            Actual Size: {Math.round(size)}px <br />
                            Actual Color: <span style={{ color: color }}>●</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <strong>Experiment:</strong>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>Set <strong>Beta = 1</strong>. Move <Equation>z_1</Equation>. Notice how it changes <em>both</em> Size and Color? That is entanglement.</li>
                    <li>Set <strong>Beta = 5</strong>. Move <Equation>z_1</Equation>. Now it should mostly change Size, leaving Color alone. That is disentanglement.</li>
                </ul>
            </div>
        </div>
    );
};

const BetaVAE = () => {
    return (
        <Section title="Beta-VAE: Disentanglement" icon={Zap}>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
                Standard VAEs often learn <strong>entangled</strong> representations, where a single latent variable <Equation>z_i</Equation> might affect multiple features of the data (e.g., both color and shape).
            </p>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
                <strong><Equation>\beta</Equation>-VAE</strong> introduces a hyperparameter <Equation>\beta</Equation> to the KL divergence term in the objective function:
            </p>

            <EquationBlock><Equation>
                {`\\mathcal{L}_{\\beta} = \\mathbb{E}_{q(z|x)}[\\log p(x|z)] - \\beta \\cdot D_{KL}(q(z|x) || p(z))`}
            </Equation></EquationBlock>

            <p className="mb-4 text-gray-700 dark:text-gray-300">
                By setting <Equation>{'\\beta > 1'}</Equation>, we force the model to prioritize the independence of latent factors (matching the isotropic unit Gaussian prior).
                This encourages <strong>disentanglement</strong>, where each latent dimension controls a single, interpretable factor of variation.
            </p>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800 mb-6">
                <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-2">Why does this work?</h4>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                    The standard normal prior <Equation>p(z) = \mathcal(N)(0, I)</Equation> has a diagonal covariance matrix, meaning its dimensions are statistically independent.
                    By heavily penalizing the KL divergence (with high <Equation>\beta</Equation>), we force the posterior <Equation>q(z|x)</Equation> to align closely with this independent prior.
                    The model is thus pressured to encode data features into these independent axes rather than mixing them.
                </p>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800 mb-6">
                <h4 className="font-bold text-yellow-800 dark:text-yellow-300 mb-2">The Trade-off</h4>
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    Increasing <Equation>\beta</Equation> improves disentanglement but can degrade reconstruction quality (the "rate-distortion" trade-off).
                    The model might ignore fine details to satisfy the strict distribution constraints.
                </p>
            </div>

            <InteractiveCard title="Effect of Beta on Disentanglement">
                <BetaVAEViz />
            </InteractiveCard>
        </Section>
    );
};

export default BetaVAE;
