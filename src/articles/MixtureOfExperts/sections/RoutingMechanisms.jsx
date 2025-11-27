import React, { useState, useEffect, useMemo } from 'react';
import { Network, Brain } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';
import EquationBlock from '../../../components/EquationBlock';
import InteractiveCard from '../../../components/InteractiveCard';

const MoERoutingViz = () => {
    const [topK, setTopK] = useState(1);
    const [numExperts, setNumExperts] = useState(4);
    const [isAnimating, setIsAnimating] = useState(true);
    const [activeToken, setActiveToken] = useState(0);

    // Simulation state
    const tokens = useMemo(() => ['The', 'cat', 'sat', 'on', 'the', 'mat'], []);
    const [routes, setRoutes] = useState([]);

    // Generate random routes for tokens
    useEffect(() => {
        const newRoutes = tokens.map(() => {
            // Randomly select topK experts
            const experts = [];
            while (experts.length < topK) {
                const e = Math.floor(Math.random() * numExperts);
                if (!experts.includes(e)) experts.push(e);
            }
            return experts.sort();
        });
        setRoutes(newRoutes);
    }, [topK, numExperts, tokens]);

    // Animation loop
    useEffect(() => {
        if (!isAnimating) return;
        const interval = setInterval(() => {
            setActiveToken((prev) => (prev + 1) % tokens.length);
        }, 1500);
        return () => clearInterval(interval);
    }, [isAnimating, tokens.length]);

    return (
        <div className="flex flex-col gap-6">
            {/* Controls */}
            <div className="flex flex-wrap gap-4 justify-center bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Routing Strategy:</span>
                    <div className="flex bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 p-1">
                        <button
                            onClick={() => setTopK(1)}
                            className={`px-3 py-1 text-xs font-medium rounded transition-colors ${topK === 1
                                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                                }`}
                        >
                            Top-1 (Switch)
                        </button>
                        <button
                            onClick={() => setTopK(2)}
                            className={`px-3 py-1 text-xs font-medium rounded transition-colors ${topK === 2
                                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                                }`}
                        >
                            Top-2 (GLaM/Mixtral)
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Experts:</span>
                    <select
                        value={numExperts}
                        onChange={(e) => setNumExperts(Number(e.target.value))}
                        className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm"
                    >
                        <option value={4}>4 Experts</option>
                        <option value={8}>8 Experts</option>
                    </select>
                </div>

                <button
                    onClick={() => setIsAnimating(!isAnimating)}
                    className="px-3 py-1 text-xs font-medium rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                    {isAnimating ? 'Pause' : 'Play'}
                </button>
            </div>

            {/* Visual Flow */}
            <div className="relative flex flex-col items-center gap-8 py-4">

                {/* Input Tokens */}
                <div className="flex gap-2">
                    {tokens.map((token, idx) => (
                        <div
                            key={idx}
                            className={`px-3 py-1.5 rounded-md text-sm font-mono transition-all duration-300 ${idx === activeToken
                                ? 'bg-blue-600 text-white scale-110 shadow-md ring-2 ring-blue-200 dark:ring-blue-900'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                                }`}
                        >
                            {token}
                        </div>
                    ))}
                </div>

                {/* Router / Gating Network */}
                <div className="relative z-10">
                    <div className={`w-32 h-12 flex items-center justify-center rounded-lg border-2 bg-white dark:bg-gray-900 shadow-sm transition-colors ${isAnimating ? 'border-blue-500 text-blue-600 dark:text-blue-400' : 'border-gray-300 dark:border-gray-700 text-gray-500'
                        }`}>
                        <span className="font-semibold text-sm flex items-center gap-2">
                            <Network size={16} /> Router
                        </span>
                    </div>

                    {/* Active Route Lines (Simplified visual) */}
                    {routes[activeToken] && routes[activeToken].map((expertIdx) => (
                        <div
                            key={expertIdx}
                            className="absolute top-full left-1/2 w-0.5 bg-blue-400/50 dark:bg-blue-500/50 origin-top transition-all duration-300"
                            style={{
                                height: '60px',
                                transform: `rotate(${(expertIdx - (numExperts - 1) / 2) * (120 / numExperts)}deg)`
                            }}
                        />
                    ))}
                </div>

                {/* Experts Layer */}
                <div className="flex gap-2 justify-center flex-wrap max-w-2xl">
                    {Array.from({ length: numExperts }).map((_, i) => {
                        const isActive = routes[activeToken]?.includes(i);
                        return (
                            <div
                                key={i}
                                className={`w-20 h-24 flex flex-col items-center justify-center rounded-lg border transition-all duration-300 ${isActive
                                    ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-400 dark:border-blue-500 shadow-md scale-105'
                                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 opacity-70'
                                    }`}
                            >
                                <Brain size={20} className={`mb-2 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`} />
                                <span className="text-xs font-medium text-gray-600 dark:text-gray-300">Expert {i + 1}</span>
                                {isActive && (
                                    <span className="text-[10px] mt-1 px-1.5 py-0.5 bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 rounded-full animate-pulse">
                                        Processing
                                    </span>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                The router selects the best <strong>{topK}</strong> expert{topK > 1 ? 's' : ''} for the current token "{tokens[activeToken]}".
                <br />
                Inactive experts perform no computation, saving resources.
            </p>
        </div>
    );
};

const RoutingMechanisms = () => {
    return (
        <Section title="Routing Mechanisms" icon={Network}>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
                Routing is the brain of an MoE model. It determines which experts process which tokens.
            </p>

            <InteractiveCard title="Routing Visualization">
                <MoERoutingViz />
            </InteractiveCard>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-3">1. Token Choice Routing (Standard)</h3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
                Tokens choose the top-k experts based on a gating score.
            </p>
            <EquationBlock><Equation>
                {`p_i(x) = \\text{Softmax}(x \\cdot W_g)_i`}
            </Equation></EquationBlock>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
                <strong>Pros:</strong> Simple. <strong>Cons:</strong> Can lead to load imbalance and dropped tokens.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-3">2. Expert Choice Routing (EC)</h3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
                Proposed by Zhou et al. (2022), this inverts the relationship: <strong>experts choose the top-k tokens</strong>.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
                <li>Ensures perfect load balancing (each expert takes exactly <Equation>k</Equation> tokens).</li>
                <li>Eliminates token dropping.</li>
                <li>Allows variable compute per token (some tokens may be picked by many experts, others by few).</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-3">3. Soft MoE</h3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
                Puigcerver et al. (2023) proposed a fully differentiable approach. Instead of discrete routing, tokens are mixed into "slots" via soft weights.
            </p>
            <EquationBlock><Equation>
                {`\\text{Slot}_k = \\sum_t w_{t,k} x_t`}
            </Equation></EquationBlock>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
                Experts process these slots, and the results are distributed back to tokens. This avoids the non-differentiability of top-k selection.
            </p>
        </Section>
    );
};

export default RoutingMechanisms;
