import React, { useState } from 'react';
import Equation from '../components/Equation';

export const metadata = {
    name: "Jensen's Inequality",
    description: 'Relates the value of a convex function of an integral to the integral of the convex function.'
};

const JensensInequality = () => {
    const [lambda, setLambda] = useState(0.5);

    // SVG parameters
    const width = 400;
    const height = 240;
    const padding = 40;

    // x range in "data space"
    const xMin = -2;
    const xMax = 2;

    // f(x) = x^2 (convex function)
    const f = (x: number) => x * x;
    const fMax = f(xMax);

    // Mapping functions
    const mapX = (x: number) => padding + ((x - xMin) / (xMax - xMin)) * (width - 2 * padding);
    const mapY = (y: number) => (height - padding) - (y / fMax) * (height - 2 * padding);

    // Points x1 and x2
    const x1 = -1.5;
    const x2 = 1.2;
    const y1 = f(x1);
    const y2 = f(x2);

    // E[X] = lambda * x1 + (1 - lambda) * x2
    const EX = lambda * x1 + (1 - lambda) * x2;
    const fEX = f(EX); // f(E[X]) - point on curve

    // E[f(X)] = lambda * f(x1) + (1 - lambda) * f(x2)
    const EfX = lambda * y1 + (1 - lambda) * y2; // E[f(X)] - point on chord

    // Generate curve points
    const curvePoints = [];
    for (let x = xMin; x <= xMax; x += 0.1) {
        curvePoints.push(`${mapX(x)},${mapY(f(x))}`);
    }

    return (
        <div className="flex flex-col gap-6 p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-sm">
            <section>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Jensen's Inequality</h3>
                <p className="text-slate-600 mb-4">
                    Jensen's inequality relates the value of a convex function of an integral (or expectation) to the integral of the convex function. For a convex function <Equation>f</Equation>, it states:
                </p>
                <Equation block>{`f(E[X]) \\leq E[f(X)]`}</Equation>
                <p className="text-slate-600 mt-4 leading-relaxed">
                    Intuitively, for a convex function, its value at the "average" point is always less than or equal to the "average" of its values. For concave functions, the inequality is reversed.
                </p>
            </section>

            <div className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm">
                <div className="mb-6">
                    <label className="text-sm font-medium text-slate-700 mb-2 flex justify-between">
                        <span>Relative Weight (<Equation>\lambda</Equation>)</span>
                        <span className="font-mono text-blue-600">{(1 - lambda).toFixed(2)}</span>
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={lambda}
                        onChange={(e) => setLambda(parseFloat(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 mt-1 uppercase font-semibold">
                        <span>Weights <Equation>x_2</Equation></span>
                        <span>Weights <Equation>x_1</Equation></span>
                    </div>
                </div>

                <div className="relative flex justify-center">
                    <svg width={width} height={height} className="overflow-visible">
                        {/* Axes */}
                        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#cbd5e1" strokeWidth="1" />
                        <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#cbd5e1" strokeWidth="1" />

                        {/* Curve f(x) = x^2 */}
                        <polyline points={curvePoints.join(' ')} fill="none" stroke="#64748b" strokeWidth="2" strokeDasharray="4 2" />

                        {/* Chord between (x1, y1) and (x2, y2) */}
                        <line
                            x1={mapX(x1)} y1={mapY(y1)}
                            x2={mapX(x2)} y2={mapY(y2)}
                            stroke="#3b82f6" strokeWidth="2"
                        />

                        {/* Projection lines for E[X] */}
                        <line
                            x1={mapX(EX)} y1={height - padding}
                            x2={mapX(EX)} y2={mapY(EfX)}
                            stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4"
                        />

                        {/* Points on x-axis */}
                        <circle cx={mapX(x1)} cy={height - padding} r={3} fill="#64748b" />
                        <text x={mapX(x1)} y={height - padding + 20} textAnchor="middle" fontSize="12" fill="#64748b">x₁</text>

                        <circle cx={mapX(x2)} cy={height - padding} r={3} fill="#64748b" />
                        <text x={mapX(x2)} y={height - padding + 20} textAnchor="middle" fontSize="12" fill="#64748b">x₂</text>

                        <circle cx={mapX(EX)} cy={height - padding} r={4} fill="#3b82f6" />
                        <text x={mapX(EX)} y={height - padding + 20} textAnchor="middle" fontSize="12" className="font-bold" fill="#3b82f6">E[X]</text>

                        {/* Point on chord: E[f(X)] */}
                        <circle cx={mapX(EX)} cy={mapY(EfX)} r={5} fill="#3b82f6" />
                        <text x={mapX(EX) + 10} y={mapY(EfX)} fontSize="12" className="font-bold" fill="#3b82f6">E[f(X)]</text>

                        {/* Point on curve: f(E[X]) */}
                        <circle cx={mapX(EX)} cy={mapY(fEX)} r={5} fill="#ef4444" />
                        <text x={mapX(EX) + 10} y={mapY(fEX) + 15} fontSize="12" className="font-bold" fill="#ef4444">f(E[X])</text>

                        {/* Inequality gap */}
                        <line
                            x1={mapX(EX)} y1={mapY(fEX)}
                            x2={mapX(EX)} y2={mapY(EfX)}
                            stroke="#ef4444" strokeWidth="2"
                        />
                    </svg>
                </div>

                <div className="mt-6 p-3 bg-blue-50 rounded border border-blue-100 text-sm">
                    <p className="text-blue-800 font-medium">
                        Since the chord sits <span className="underline italic">above</span> the convex curve,
                        the expected value of the function <Equation>E[f(X)]</Equation> (on the blue line) is always greater than
                        the function of the expected value <Equation>f(E[X])</Equation> (on the red curve).
                    </p>
                </div>
            </div>

            <section className="space-y-3">
                <h4 className="text-md font-semibold text-slate-800">Why it matters in ML</h4>
                <p className="text-sm text-slate-600">
                    Jensen's inequality is the bedrock of <strong>Variational Inference</strong>. It allows us to derive the
                    <strong> Evidence Lower Bound (ELBO)</strong> by taking the expectation of the log-likelihood:
                </p>
                <Equation block>{`\\log p(x) = \\log \\int p(x,z) dz = \\log E_{q(z|x)}\\left[\\frac{p(x,z)}{q(z|x)}\\right] \\geq E_{q(z|x)}\\left[\\log \\frac{p(x,z)}{q(z|x)}\\right]`}</Equation>
                <p className="text-sm text-slate-600 italic border-l-4 border-slate-200 pl-4">
                    Here, the log function is <strong>concave</strong>, so the inequality is reversed: <Equation>{`\\log E[X] \\geq E[\\log X]`}</Equation>.
                </p>
            </section>
        </div>
    );
};

export default JensensInequality;
