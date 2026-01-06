import React, { useState } from 'react';
import Equation from '../components/Equation';

export const metadata = {
    name: "Maximum Likelihood Estimation (MLE)",
    description: "Method of estimating the parameters of a probability distribution by maximizing a likelihood function."
};

const MLE = () => {
    const [theta, setTheta] = useState(0.3); // Parameter to estimate (mu)
    const trueMu = 0; // True peak we want to find

    // Likelihood curve L(theta) = exp(-0.5 * (theta - trueMu)^2)
    const likelihood = (x: number) => Math.exp(-0.5 * Math.pow(x - trueMu, 2));

    // SVG parameters
    const width = 400;
    const height = 180;
    const padding = 40;
    const xMin = -3;
    const xMax = 3;

    const mapX = (x: number) => padding + ((x - xMin) / (xMax - xMin)) * (width - 2 * padding);
    const mapY = (y: number) => (height - padding) - y * (height - 2 * padding);

    // Generate curve points
    const points = [];
    for (let x = xMin; x <= xMax; x += 0.1) {
        points.push(`${mapX(x)},${mapY(likelihood(x))}`);
    }

    return (
        <div className="flex flex-col gap-6 p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-sm">
            <section>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Maximum Likelihood Estimation (MLE)</h3>
                <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                    MLE is a central principle in statistics. It asks: "For our observed data, what parameter <Equation>\theta</Equation> makes this specific outcome the <strong>most likely</strong>?"
                </p>
                <Equation block>{`\\hat{\\theta}_{MLE} = \\arg\\max_{\\theta} \\mathcal{L}(\\theta | X)`}</Equation>
            </section>

            <div className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm">
                <div className="mb-6">
                    <label className="text-sm font-medium text-slate-700 mb-2 flex justify-between">
                        <span>Estimate <Equation>\theta</Equation></span>
                        <span className="font-mono text-blue-600 font-bold">L(θ) = {likelihood(theta).toFixed(3)}</span>
                    </label>
                    <input
                        type="range" min={xMin} max={xMax} step="0.05" value={theta}
                        onChange={(e) => setTheta(parseFloat(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <p className="text-[10px] text-slate-400 mt-2 text-center uppercase font-bold">
                        Slide to find the maximum!
                    </p>
                </div>

                <div className="flex justify-center h-24">
                    <svg width={width} height={height} className="overflow-visible">
                        {/* Curve L(theta) */}
                        <path
                            d={`M ${points.join(' ')}`}
                            fill="none" stroke="#e2e8f0" strokeWidth="4"
                        />
                        <path
                            d={`M ${points.join(' ')}`}
                            fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4"
                        />

                        {/* Optimal Peak Marker (Always at 0) */}
                        <circle cx={mapX(0)} cy={mapY(1)} r={4} fill="#cbd5e1" />

                        {/* Current User Choice */}
                        <circle cx={mapX(theta)} cy={mapY(likelihood(theta))} r={6} fill="#3b82f6" />
                        <line
                            x1={mapX(theta)} y1={height - padding}
                            x2={mapX(theta)} y2={mapY(likelihood(theta))}
                            stroke="#3b82f6" strokeWidth="2" strokeDasharray="4"
                        />

                        <text x={mapX(theta)} y={mapY(likelihood(theta)) - 15} textAnchor="middle" fontSize="12" className="font-bold fill-blue-600 italic">θ</text>

                        {/* Ground line */}
                        <line x1={0} y1={height - padding} x2={width} y2={height - padding} stroke="#cbd5e1" strokeWidth="1" />
                    </svg>
                </div>
            </div>

            <section className="space-y-3">
                <h4 className="text-md font-semibold text-slate-800">Log-Likelihood</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                    Maximizing the likelihood <Equation>{`\\mathcal{L}(\\theta)`}</Equation> is equivalent to maximizing the <strong>Log-Likelihood</strong> <Equation>{`\\ell(\\theta) = \\log \\mathcal{L}(\\theta)`}</Equation>. This is preferred because products turn into sums, making the math (and gradients) much easier to manage.
                </p>
            </section>
        </div>
    );
};

export default MLE;
