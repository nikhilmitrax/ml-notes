import React, { useState } from 'react';
import { Box } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';
import InteractiveCard from '../../../components/InteractiveCard';

const NormalizationViz = () => {
    const [mode, setMode] = useState('batch'); // 'batch', 'layer', 'group'
    const [numGroups, setNumGroups] = useState(2);
    const [hoveredCell, setHoveredCell] = useState(null); // {b, c}

    // Simulation parameters
    const B = 4; // Batch size
    const C = 6; // Channels/Features

    // Helper to determine if a cell {b, c} is in the same normalization set as the target {tb, tc}
    const isInSet = (b, c, tb, tc) => {
        if (tb === null || tc === null) return false;

        if (mode === 'batch') {
            // Batch Norm: Same channel 'c', across all batch 'b'
            return c === tc;
        } else if (mode === 'layer') {
            // Layer Norm: Same sample 'b', across all channels 'c'
            return b === tb;
        } else if (mode === 'group') {
            // Group Norm: Same sample 'b', and same group
            // Group size = C / numGroups
            const groupSize = C / numGroups;
            const targetGroup = Math.floor(tc / groupSize);
            const currentGroup = Math.floor(c / groupSize);
            return b === tb && currentGroup === targetGroup;
        }
        return false;
    };

    // Helper to get color for the cell
    const getCellColor = (b, c) => {
        const isHovered = hoveredCell && hoveredCell.b === b && hoveredCell.c === c;
        const isRelated = hoveredCell && isInSet(b, c, hoveredCell.b, hoveredCell.c);

        if (isHovered) return 'bg-blue-600 dark:bg-blue-500 scale-105 shadow-lg ring-2 ring-white dark:ring-gray-900 z-10';
        if (isRelated) return 'bg-blue-400/80 dark:bg-blue-500/60';
        return 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600';
    };

    return (
        <div className="flex flex-col gap-6">
            {/* Controls */}
            <div className="flex flex-wrap gap-4 justify-center bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
                <div className="flex gap-2">
                    <button
                        onClick={() => setMode('batch')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${mode === 'batch'
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                            }`}
                    >
                        Batch Norm
                    </button>
                    <button
                        onClick={() => setMode('layer')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${mode === 'layer'
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                            }`}
                    >
                        Layer Norm
                    </button>
                    <button
                        onClick={() => setMode('group')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${mode === 'group'
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                            }`}
                    >
                        Group Norm
                    </button>
                </div>

                {mode === 'group' && (
                    <div className="flex items-center gap-2 border-l border-gray-300 dark:border-gray-700 pl-4">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Groups:</span>
                        <select
                            value={numGroups}
                            onChange={(e) => setNumGroups(Number(e.target.value))}
                            className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm"
                        >
                            <option value={1}>1 (LayerNorm)</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={6}>6 (InstanceNorm)</option>
                        </select>
                    </div>
                )}
            </div>

            {/* Visualization Grid */}
            <div className="flex flex-col items-center">
                <div className="relative">
                    {/* Labels */}
                    <div className="absolute -left-8 top-0 bottom-0 flex flex-col justify-around text-xs text-gray-400 font-mono">
                        {Array.from({ length: B }).map((_, i) => <span key={i}>B{i}</span>)}
                    </div>
                    <div className="absolute -top-6 left-0 right-0 flex justify-around text-xs text-gray-400 font-mono">
                        {Array.from({ length: C }).map((_, i) => <span key={i}>C{i}</span>)}
                    </div>

                    {/* Grid */}
                    <div
                        className="grid gap-2 p-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"
                        style={{ gridTemplateColumns: `repeat(${C}, minmax(40px, 1fr))` }}
                        onMouseLeave={() => setHoveredCell(null)}
                    >
                        {Array.from({ length: B }).map((_, b) => (
                            Array.from({ length: C }).map((_, c) => (
                                <div
                                    key={`${b}-${c}`}
                                    className={`h-10 rounded cursor-pointer transition-all duration-200 ${getCellColor(b, c)}`}
                                    onMouseEnter={() => setHoveredCell({ b, c })}
                                />
                            ))
                        ))}
                    </div>
                </div>

                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center max-w-md">
                    {mode === 'batch' && "Normalizes each channel (column) across the entire batch."}
                    {mode === 'layer' && "Normalizes each sample (row) across all channels."}
                    {mode === 'group' && `Normalizes groups of ${C / numGroups} channels within each sample.`}
                    <br />
                    <span className="text-xs opacity-75">Hover over a cell to see its normalization set.</span>
                </p>
            </div>
        </div>
    );
};

const VisualComparison = () => {
    return (
        <Section title="Visual Comparison" icon={Box}>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
                The core difference lies in <strong>which dimensions</strong> are used to compute the mean <Equation>\mu</Equation> and variance <Equation>\sigma^2</Equation>.
                Explore the interactive grid below to see how each method groups data for normalization.
            </p>

            <InteractiveCard title="Normalization Explorer">
                <NormalizationViz />
            </InteractiveCard>
        </Section>
    );
};

export default VisualComparison;
