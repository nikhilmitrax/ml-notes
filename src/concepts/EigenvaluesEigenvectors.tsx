import React, { useState } from 'react';
import Equation from '../components/Equation';

export const metadata = {
    name: "Eigenvalues & Eigenvectors",
    description: "Points in space that only scale (and don't rotate) when a linear transformation is applied."
};

const EigenvaluesEigenvectors = () => {
    const [angle, setAngle] = useState(0); // Angle of the input vector

    // Linear Transformation Matrix A = [[2, 1], [1, 2]]
    // Eigenvalues are 3 (v=[1, 1]) and 1 (v=[1, -1])
    const A = [[2, 0.5], [0.5, 1.5]];

    // Vector v calculation
    const r = 40; // length of v
    const vx = r * Math.cos(angle);
    const vy = r * Math.sin(angle);

    // Transformation Av
    const Avx = A[0][0] * vx + A[0][1] * vy;
    const Avy = A[1][0] * vx + A[1][1] * vy;

    // SVG parameters
    const size = 300;
    const center = size / 2;

    return (
        <div className="flex flex-col gap-6 p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-sm">
            <section>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Eigenvalues & Eigenvectors</h3>
                <p className="text-slate-600 mb-4">
                    For a square matrix <Equation>A</Equation>, an <strong>eigenvector</strong> <Equation>v</Equation> is a non-zero vector that, when multiplied by <Equation>A</Equation>, yields a scalar multiple of itself. That scalar is the <strong>eigenvalue</strong> <Equation>\lambda</Equation>.
                </p>
                <Equation block>{`Av = \\lambda v`}</Equation>
                <p className="text-slate-600 mt-4 leading-relaxed text-sm">
                    Geometrically, this means the vector's direction remains unchanged (or is reversed) by the transformation; it is only stretched, shrunk, or flipped.
                </p>
            </section>

            <div className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm">
                <div className="mb-8">
                    <label className="text-sm font-medium text-slate-700 mb-2 flex justify-between">
                        <span>Rotate Input Vector <Equation>v</Equation></span>
                        <span className="font-mono text-blue-600">{(angle * 180 / Math.PI).toFixed(0)}°</span>
                    </label>
                    <input
                        type="range" min="0" max={2 * Math.PI} step="0.01" value={angle}
                        onChange={(e) => setAngle(parseFloat(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <p className="text-[10px] text-slate-400 mt-2 uppercase font-semibold text-center italic">
                        Find the angles where <span className="text-blue-500">v</span> and <span className="text-purple-500">Av</span> align! (Try ~22° or ~112°)
                    </p>
                </div>

                <div className="flex justify-center">
                    <svg width={size} height={size} className="overflow-visible bg-slate-50 rounded-full">
                        {/* Grid Lines */}
                        <line x1={0} y1={center} x2={size} y2={center} stroke="#e2e8f0" strokeWidth="1" />
                        <line x1={center} y1={0} x2={center} y2={size} stroke="#e2e8f0" strokeWidth="1" />

                        {/* Vector v (Original) */}
                        <line
                            x1={center} y1={center}
                            x2={center + vx} y2={center - vy}
                            stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrow-v)"
                        />
                        <text x={center + vx + 5} y={center - vy - 5} fontSize="12" className="font-bold fill-blue-600">v</text>

                        {/* Vector Av (Transformed) */}
                        <line
                            x1={center} y1={center}
                            x2={center + Avx} y2={center - Avy}
                            stroke="#a855f7" strokeWidth="3" markerEnd="url(#arrow-av)"
                        />
                        <text x={center + Avx + 5} y={center - Avy - 5} fontSize="12" className="font-bold fill-purple-600">Av</text>

                        {/* Markers */}
                        <defs>
                            <marker id="arrow-v" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
                                <path d="M0,0 L10,5 L0,10 Z" fill="#3b82f6" />
                            </marker>
                            <marker id="arrow-av" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
                                <path d="M0,0 L10,5 L0,10 Z" fill="#a855f7" />
                            </marker>
                        </defs>
                    </svg>
                </div>
            </div>

            <section className="space-y-3">
                <h4 className="text-md font-semibold text-slate-800">Key Properties</h4>
                <ul className="text-sm text-slate-600 space-y-2 list-disc pl-5">
                    <li><strong>Characteristic Equation</strong>: Found by solving <Equation>{`\\det(A - \\lambda I) = 0`}</Equation>.</li>
                    <li><strong>Trace</strong>: The sum of eigenvalues equals the sum of diagonal elements of <Equation>A</Equation>.</li>
                    <li><strong>Determinant</strong>: The product of eigenvalues equals the determinant of <Equation>A</Equation>.</li>
                </ul>
            </section>
        </div>
    );
};

export default EigenvaluesEigenvectors;
