import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, RefreshCw } from 'lucide-react';

const BeamSearchVisualizer = () => {
    const [step, setStep] = useState(0);

    // Data structure representing the beam search tree
    // Each level contains all possible expansions from the previous active beams
    const steps = [
        {
            title: "Start",
            description: "Begin with the <START> token.",
            nodes: [
                { id: 'root', label: '<START>', score: 0, type: 'root', x: 50, y: 0 }
            ],
            active: ['root']
        },
        {
            title: "Step 1: Generate first tokens",
            description: "Generate top k=2 tokens from <START>. Both 'he' and 'I' are kept.",
            nodes: [
                { id: 'root', label: '<START>', score: 0, type: 'root', x: 50, y: 0 },
                { id: 'he', label: 'he', score: -0.7, parent: 'root', type: 'kept', x: 30, y: 20 },
                { id: 'I', label: 'I', score: -0.9, parent: 'root', type: 'kept', x: 70, y: 20 }
            ],
            active: ['he', 'I']
        },
        {
            title: "Step 2: Expand and Prune",
            description: "Expand both 'he' and 'I'. Top 2 overall are 'was' (-1.6) and 'hit' (-1.7). 'got' and 'struck' are pruned.",
            nodes: [
                { id: 'root', label: '<START>', score: 0, type: 'root', x: 50, y: 0 },
                { id: 'he', label: 'he', score: -0.7, parent: 'root', type: 'kept', x: 30, y: 20 },
                { id: 'I', label: 'I', score: -0.9, parent: 'root', type: 'kept', x: 70, y: 20 },
                // Children of he
                { id: 'hit', label: 'hit', score: -1.7, parent: 'he', type: 'kept', x: 15, y: 40 },
                { id: 'struck', label: 'struck', score: -2.9, parent: 'he', type: 'pruned', x: 45, y: 40 },
                // Children of I
                { id: 'was', label: 'was', score: -1.6, parent: 'I', type: 'kept', x: 60, y: 40 },
                { id: 'got', label: 'got', score: -1.8, parent: 'I', type: 'pruned', x: 85, y: 40 }
            ],
            active: ['hit', 'was']
        },
        {
            title: "Step 3: Expand and Prune",
            description: "Expand 'hit' and 'was'. 'was' leads to low probability tokens (e.g., 'sick' -3.2). 'hit' leads to 'me' (-2.5) and 'a' (-2.8). Both children of 'hit' are kept.",
            nodes: [
                { id: 'root', label: '<START>', score: 0, type: 'root', x: 50, y: 0 },
                { id: 'he', label: 'he', score: -0.7, parent: 'root', type: 'kept', x: 30, y: 20 },
                { id: 'I', label: 'I', score: -0.9, parent: 'root', type: 'kept', x: 70, y: 20 },
                { id: 'hit', label: 'hit', score: -1.7, parent: 'he', type: 'kept', x: 15, y: 40 },
                { id: 'struck', label: 'struck', score: -2.9, parent: 'he', type: 'pruned', x: 45, y: 40 },
                { id: 'was', label: 'was', score: -1.6, parent: 'I', type: 'kept', x: 60, y: 40 },
                { id: 'got', label: 'got', score: -1.8, parent: 'I', type: 'pruned', x: 85, y: 40 },
                // Children of hit
                { id: 'me', label: 'me', score: -2.5, parent: 'hit', type: 'kept', x: 5, y: 60 },
                { id: 'a', label: 'a', score: -2.8, parent: 'hit', type: 'kept', x: 25, y: 60 },
                // Children of was
                { id: 'sick', label: 'sick', score: -3.2, parent: 'was', type: 'pruned', x: 55, y: 60 },
                { id: 'late', label: 'late', score: -3.5, parent: 'was', type: 'pruned', x: 75, y: 60 }
            ],
            active: ['me', 'a']
        },
        {
            title: "Step 4: Expand and Prune",
            description: "Expand 'me' and 'a'. 'me' -> 'with' (-3.3). 'a' -> 'pie' (-3.4). These are the new top 2.",
            nodes: [
                { id: 'root', label: '<START>', score: 0, type: 'root', x: 50, y: 0 },
                { id: 'he', label: 'he', score: -0.7, parent: 'root', type: 'kept', x: 30, y: 20 },
                { id: 'I', label: 'I', score: -0.9, parent: 'root', type: 'kept', x: 70, y: 20 },
                { id: 'hit', label: 'hit', score: -1.7, parent: 'he', type: 'kept', x: 15, y: 40 },
                { id: 'struck', label: 'struck', score: -2.9, parent: 'he', type: 'pruned', x: 45, y: 40 },
                { id: 'was', label: 'was', score: -1.6, parent: 'I', type: 'kept', x: 60, y: 40 },
                { id: 'got', label: 'got', score: -1.8, parent: 'I', type: 'pruned', x: 85, y: 40 },
                { id: 'me', label: 'me', score: -2.5, parent: 'hit', type: 'kept', x: 5, y: 60 },
                { id: 'a', label: 'a', score: -2.8, parent: 'hit', type: 'kept', x: 25, y: 60 },
                { id: 'sick', label: 'sick', score: -3.2, parent: 'was', type: 'pruned', x: 55, y: 60 },
                { id: 'late', label: 'late', score: -3.5, parent: 'was', type: 'pruned', x: 75, y: 60 },
                // Children of me
                { id: 'with', label: 'with', score: -3.3, parent: 'me', type: 'kept', x: 0, y: 80 },
                { id: 'on', label: 'on', score: -3.9, parent: 'me', type: 'pruned', x: 10, y: 80 },
                // Children of a
                { id: 'pie', label: 'pie', score: -3.4, parent: 'a', type: 'kept', x: 20, y: 80 },
                { id: 'tart', label: 'tart', score: -4.0, parent: 'a', type: 'pruned', x: 30, y: 80 }
            ],
            active: ['with', 'pie']
        }
    ];

    const currentData = steps[step];

    const getNodeColor = (type) => {
        switch (type) {
            case 'root': return 'bg-slate-200 border-slate-400 text-slate-800';
            case 'kept': return 'bg-green-100 border-green-500 text-green-800';
            case 'pruned': return 'bg-slate-50 border-slate-200 text-slate-400';
            default: return 'bg-white border-slate-200';
        }
    };

    return (
        <div className="w-full bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden my-6">
            <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                <div>
                    <h3 className="font-semibold text-slate-800">Beam Search Visualization (k=2)</h3>
                    <p className="text-sm text-slate-500">{currentData.title}</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setStep(Math.max(0, step - 1))}
                        disabled={step === 0}
                        className="p-2 rounded-lg hover:bg-white disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <span className="py-2 px-3 bg-white rounded-lg border border-slate-200 text-sm font-medium min-w-[3rem] text-center">
                        {step + 1} / {steps.length}
                    </span>
                    <button
                        onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
                        disabled={step === steps.length - 1}
                        className="p-2 rounded-lg hover:bg-white disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
                    >
                        <ChevronRight size={20} />
                    </button>
                    <button
                        onClick={() => setStep(0)}
                        className="p-2 rounded-lg hover:bg-white text-slate-500 hover:text-slate-800 transition-colors ml-2"
                        title="Reset"
                    >
                        <RefreshCw size={18} />
                    </button>
                </div>
            </div>

            <div className="p-6">
                <p className="text-slate-600 mb-6 text-sm">{currentData.description}</p>

                <div className="relative h-[400px] w-full bg-slate-50 rounded-lg border border-slate-100 overflow-hidden">
                    {/* SVG for connections */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        {currentData.nodes.map(node => {
                            if (!node.parent) return null;
                            const parent = currentData.nodes.find(n => n.id === node.parent);
                            if (!parent) return null;

                            const isPruned = node.type === 'pruned';

                            return (
                                <line
                                    key={`${parent.id}-${node.id}`}
                                    x1={`${parent.x}%`}
                                    y1={`${parent.y + 10}%`} // Offset for node height
                                    x2={`${node.x}%`}
                                    y2={`${node.y}%`}
                                    stroke={isPruned ? "#e2e8f0" : "#94a3b8"}
                                    strokeWidth={isPruned ? 1 : 2}
                                />
                            );
                        })}
                    </svg>

                    {/* Nodes */}
                    {currentData.nodes.map(node => (
                        <div
                            key={node.id}
                            className={`absolute transform -translate-x-1/2 px-3 py-2 rounded-lg border shadow-sm transition-all duration-300 ${getNodeColor(node.type)}`}
                            style={{
                                left: `${node.x}%`,
                                top: `${node.y}%`,
                                opacity: node.type === 'pruned' ? 0.6 : 1
                            }}
                        >
                            <div className="text-center">
                                <div className="font-bold text-sm">{node.label}</div>
                                {node.score !== 0 && (
                                    <div className="text-xs opacity-75">{node.score.toFixed(1)}</div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BeamSearchVisualizer;
