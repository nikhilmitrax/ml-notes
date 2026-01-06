import React from 'react';
import Equation from '../components/Equation';

export const metadata = {
    name: "Singular Value Decomposition (SVD)",
    description: "Generalized matrix factorization that decomposes any matrix into rotation and scaling components."
};

const SVD = () => {
    return (
        <div className="flex flex-col gap-6 p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-sm">
            <section>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Singular Value Decomposition (SVD)</h3>
                <p className="text-slate-600 mb-4">
                    SVD factorizes any matrix <Equation>A</Equation> (not just square ones) into three specific matrices. It is like the "Eigen-decomposition" for everyone.
                </p>
                <Equation block>{`A = U \\Sigma V^T`}</Equation>
            </section>

            <div className="bg-white p-8 rounded-lg border border-slate-100 shadow-sm">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center">
                    <div className="flex-1 p-4 bg-blue-50 rounded-lg border border-blue-100">
                        <div className="text-2xl font-bold text-blue-600 mb-1">U</div>
                        <div className="text-sm font-semibold text-slate-700">Left Singular Vectors</div>
                        <div className="text-xs text-slate-500 mt-2 italic">Rotates the data in output space</div>
                    </div>

                    <div className="text-2xl text-slate-300 font-light">×</div>

                    <div className="flex-1 p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                        <div className="text-2xl font-bold text-emerald-600 mb-1">Σ</div>
                        <div className="text-sm font-semibold text-slate-700">Singular Values</div>
                        <div className="text-xs text-slate-500 mt-2 italic">Scales along specific axes (importance)</div>
                    </div>

                    <div className="text-2xl text-slate-300 font-light">×</div>

                    <div className="flex-1 p-4 bg-purple-50 rounded-lg border border-purple-100">
                        <div className="text-2xl font-bold text-purple-600 mb-1">Vᵀ</div>
                        <div className="text-sm font-semibold text-slate-700">Right Singular Vectors</div>
                        <div className="text-xs text-slate-500 mt-2 italic">Rotates the data in input space</div>
                    </div>
                </div>

                <div className="mt-8 relative h-1 bg-slate-100 rounded-full">
                    <div className="absolute inset-0 flex items-center justify-around -top-3">
                        <div className="w-6 h-6 rounded-full bg-white border-2 border-blue-500"></div>
                        <div className="w-6 h-10 rounded-full bg-white border-2 border-emerald-500 rotate-90"></div>
                        <div className="w-6 h-6 rounded-full bg-white border-2 border-purple-500"></div>
                    </div>
                </div>
            </div>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-lg border border-slate-100">
                    <h4 className="text-sm font-bold text-slate-800 mb-2">Computational Power</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                        SVD provides the "best" low-rank approximation of a matrix. By keeping only the largest singular values in <Equation>\Sigma</Equation>, we can compress data (like images) while retaining most information.
                    </p>
                </div>
                <div className="p-4 bg-white rounded-lg border border-slate-100">
                    <h4 className="text-sm font-bold text-slate-800 mb-2">Relationship to PCA</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                        If you take the SVD of centered data <Equation>X</Equation>, the columns of <Equation>V</Equation> are the Principal Components, and the singular values are related to the standard deviations.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default SVD;
