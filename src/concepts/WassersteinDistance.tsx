import React, { useState } from 'react';
import Equation from '../components/Equation';

export const metadata = {
    name: "Wasserstein Distance",
    description: "Also known as Earth Mover's Distance, it measures the minimum cost of turning one distribution into another."
};

const WassersteinDistance = () => {
    const [muQ, setMuQ] = useState(1);
    
    // Constants for P (Fixed)
    const muP = -1;
    const sigma = 0.5;

    // SVG parameters
    const width = 400;
    const height = 200;
    const padding = 40;
    const xMin = -4;
    const xMax = 4;

    const mapX = (x: number) => padding + ((x - xMin) / (xMax - xMin)) * (width - 2 * padding);
    const mapY = (y: number) => (height - padding) - y * 100;

    const gaussian = (x: number, mu: number, s: number) => 
        (1 / (s * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - mu) / s, 2));

    const generatePoints = (mu: number) => {
        const points = [];
        for (let x = xMin; x <= xMax; x += 0.1) {
            points.push(`${mapX(x)},${mapY(gaussian(x, mu, sigma))}`);
        }
        return points.join(' ');
    };

    // For 1D Gaussians, W1(P, Q) is simply |muP - muQ|
    const distance = Math.abs(muP - muQ);

    return (
        <div className="flex flex-col gap-6 p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-sm">
            <section>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Wasserstein Distance (EMD)</h3>
                <p className="text-slate-600 mb-4">
                    The 1-Wasserstein distance provides a meaningful measure of distance between probability distributions even when they have non-overlapping supports. It can be viewed as the minimum "work" required to transform one distribution into another.
                </p>
                <Equation block>{`W(P, Q) = \\inf_{\\gamma \\in \\Pi(P, Q)} E_{(x,y) \\sim \\gamma} [\\|x - y\\|]`}</Equation>
            </section>

            <div className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm">
                <div className="mb-6">
                    <label className="text-sm font-medium text-slate-700 mb-2 flex justify-between">
                        <span>Position of Distribution <Equation>Q</Equation></span>
                        <span className="font-mono text-blue-600 font-bold">W₁ = {distance.toFixed(2)}</span>
                    </label>
                    <input 
                        type="range" min="-3" max="3" step="0.1" value={muQ} 
                        onChange={(e) => setMuQ(parseFloat(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                </div>

                <div className="relative flex justify-center py-4">
                    <svg width={width} height={height} className="overflow-visible">
                        {/* Area between curves (conceptual "dirt" to move) */}
                        <path 
                            d={`M ${mapX(muP)},${height-padding} L ${mapX(muQ)},${height-padding}`}
                            stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" opacity="0.3"
                        />
                        
                        {/* Distribution P */}
                        <polyline points={generatePoints(muP)} fill="none" stroke="#64748b" strokeWidth="2" strokeDasharray="4 2" />
                        <text x={mapX(muP)} y={mapY(0.85)} textAnchor="middle" fontSize="12" fill="#64748b" className="font-bold">P</text>

                        {/* Distribution Q */}
                        <polyline points={generatePoints(muQ)} fill="none" stroke="#3b82f6" strokeWidth="3" />
                        <text x={mapX(muQ)} y={mapY(0.85)} textAnchor="middle" fontSize="12" fill="#3b82f6" className="font-bold">Q</text>

                        {/* Ground line */}
                        <line x1={0} y1={height - padding} x2={width} y2={height - padding} stroke="#cbd5e1" strokeWidth="1" />
                        
                        {/* Gap Arrow */}
                        <defs>
                            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                                <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
                            </marker>
                        </defs>
                        {distance > 0.2 && (
                            <line 
                                x1={mapX(muP)} y1={height - padding + 15} 
                                x2={mapX(muQ)} y2={height - padding + 15} 
                                stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead)"
                            />
                        )}
                    </svg>
                </div>
                
                <p className="text-xs text-slate-500 text-center italic mt-2">
                    Unlike KL Divergence, Wasserstein remains informative even when distributions are far apart.
                </p>
            </div>

            <section className="space-y-4">
                <h4 className="text-md font-semibold text-slate-800">The WGAN Perspective</h4>
                <p className="text-sm text-slate-600">
                    In Generative Adversarial Networks, the Wasserstein distance is often computed using its dual form (the Kantorovich-Rubinstein duality):
                </p>
                <Equation block>{`W(P, Q) = \\sup_{\\|f\\|_L \\leq 1} E_{x \\sim P}[f(x)] - E_{x \\sim Q}[f(x)]`}</Equation>
                <p className="text-sm text-slate-600 leading-relaxed">
                    This formulation leads to the <strong>Critic</strong> in WGANs, which tries to find a 1-Lipschitz function that maximizes the difference between the expectations of real and generated data.
                </p>
            </section>
        </div>
    );
};

export default WassersteinDistance;
