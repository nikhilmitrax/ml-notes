import React, { useState } from 'react';
import { Shuffle } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';
import InteractiveCard from '../../../components/InteractiveCard';

const ReparameterizationViz = () => {
    const [mu, setMu] = useState(0);
    const [logVar, setLogVar] = useState(0); // Using logVar for stability as is common in VAEs, but UI will show sigma
    const [epsilon, setEpsilon] = useState(0);

    // Convert logVar to sigma for display and calculation
    // log(sigma^2) = logVar => sigma = exp(0.5 * logVar)
    const sigma = Math.exp(0.5 * logVar);

    const z = mu + sigma * epsilon;

    const generateNoise = () => {
        // Box-Muller transform for simple normal distribution approximation
        const u = 1 - Math.random();
        const v = Math.random();
        const rand = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
        setEpsilon(parseFloat(rand.toFixed(3)));
    };

    // SVG dimensions
    const width = 300;
    const height = 150;
    const centerX = width / 2;
    const centerY = height - 20;
    const scaleX = 40; // pixels per unit
    const scaleY = 60;

    // Generate Gaussian curve points
    const points = [];
    for (let x = -3.5; x <= 3.5; x += 0.1) {
        // PDF of Normal Distribution: (1 / (sigma * sqrt(2pi))) * exp(-0.5 * ((x - mu)/sigma)^2)
        const y = (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - mu) / sigma, 2));

        const plotX = centerX + x * scaleX; // This x is relative to the plot, not the distribution center
        // Actually, we want to plot the distribution centered at 'mu' on the screen?
        // Or keep the screen fixed and move the curve? Moving the curve is more intuitive for "shifting mean".
        // Let's keep screen coordinates fixed: x=0 is center.

        // Re-calculating y based on screen coordinate x_val mapped back to data space
        const dataX = x;
        // The curve should shift.
        // If dataX is the coordinate relative to 0.
        // PDF value depends on (dataX - mu).

        const screenX = centerX + dataX * scaleX;
        const screenY = centerY - y * scaleY * 2; // Scale up height
        points.push(`${screenX},${screenY}`);
    }

    const zScreenX = centerX + z * scaleX;

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
                {/* Controls */}
                <div className="w-full md:w-1/3 space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                            Mean (<Equation>\mu</Equation>): {mu}
                        </label>
                        <input
                            type="range" min="-2" max="2" step="0.1" value={mu}
                            onChange={(e) => setMu(parseFloat(e.target.value))}
                            className="w-full accent-blue-600"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                            Std Dev (<Equation>\sigma</Equation>): {sigma.toFixed(2)}
                        </label>
                        <input
                            type="range" min="-2" max="2" step="0.1" value={logVar}
                            onChange={(e) => setLogVar(parseFloat(e.target.value))}
                            className="w-full accent-green-600"
                        />
                        <p className="text-xs text-gray-500">Adjusting log variance</p>
                    </div>
                    <button
                        onClick={generateNoise}
                        className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 rounded-md hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors text-sm font-medium"
                    >
                        <Shuffle size={16} /> Sample Noise (<Equation>\epsilon</Equation>)
                    </button>
                </div>

                {/* Visualization */}
                <div className="relative bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
                    <svg width={width} height={height} className="overflow-visible">
                        {/* Axis */}
                        <line x1={0} y1={centerY} x2={width} y2={centerY} className="stroke-gray-400 dark:stroke-gray-500" strokeWidth="1" />
                        <line x1={centerX} y1={0} x2={centerX} y2={height} className="stroke-gray-200 dark:stroke-gray-700" strokeDasharray="4" />

                        {/* Distribution Curve */}
                        <polyline points={points.join(' ')} fill="none" className="stroke-blue-500 dark:stroke-blue-400" strokeWidth="2" />

                        {/* Sample Point */}
                        <circle cx={zScreenX} cy={centerY} r={6} className="fill-pink-500 dark:fill-pink-400" />
                        <line x1={zScreenX} y1={centerY} x2={zScreenX} y2={centerY - 40} className="stroke-pink-500 dark:stroke-pink-400" strokeDasharray="2" />
                        <text x={zScreenX} y={centerY - 45} textAnchor="middle" fontSize="12" className="font-mono fill-pink-500 dark:fill-pink-400">z</text>
                    </svg>
                    <div className="mt-2 text-center font-mono text-sm text-gray-600 dark:text-gray-400">
                        z = {mu} + {sigma.toFixed(2)} · ({epsilon}) = <span className="font-bold text-pink-600 dark:text-pink-400">{z.toFixed(3)}</span>
                    </div>
                </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                Adjust <Equation>\mu</Equation> to shift the center, and <Equation>\sigma</Equation> to change the spread.
                Click "Sample Noise" to generate a new <Equation>\epsilon \sim \mathcal(N)(0,1)</Equation> and see where <Equation>z</Equation> lands.
            </p>
        </div>
    );
};

const ReparameterizationTrick = () => {
    return (
        <Section title="The Reparameterization Trick" icon={Shuffle}>
            <p className="mb-4">
                A core challenge in VAEs is backpropagation. We cannot backpropagate gradients through a random sampling operation
                (picking <Equation>z</Equation> from <Equation>\mathcal(N)(\mu, \sigma)</Equation>).
            </p>
            <p className="mb-4">
                The solution is the <strong>Reparameterization Trick</strong>. We express <Equation>z</Equation> as a deterministic function
                of the parameters and an independent noise source <Equation>\epsilon</Equation>:
            </p>

            <Equation block>
                {`z = \\mu + \\sigma \\odot \\epsilon, \\quad \\text{where } \\epsilon \\sim \\mathcal(N)(0, I)`}
            </Equation>

            <p className="mb-6">
                This moves the randomness to <Equation>\epsilon</Equation>, allowing gradients to flow through <Equation>\mu</Equation> and <Equation>\sigma</Equation>.
            </p>

            <InteractiveCard title="Interactive Reparameterization">
                <ReparameterizationViz />
            </InteractiveCard>
        </Section>
    );
};

export default ReparameterizationTrick;
