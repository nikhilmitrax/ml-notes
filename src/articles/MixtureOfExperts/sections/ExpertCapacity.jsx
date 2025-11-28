import React, { useState, useEffect } from 'react';
import { Scale, XCircle } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';
import EquationBlock from '../../../components/EquationBlock';
import InteractiveCard from '../../../components/InteractiveCard';
import Header3 from '../../../components/Header3';
import Header4 from '../../../components/Header4';
import Paragraph from '../../../components/Paragraph';

const CapacityViz = () => {
    const [capacityFactor, setCapacityFactor] = useState(1.0);
    const numExperts = 4;
    const numTokens = 24;
    const [assignments, setAssignments] = useState([]);
    const [droppedCount, setDroppedCount] = useState(0);

    // Calculate capacity per expert
    // C = (T / E) * alpha
    const capacity = Math.floor((numTokens / numExperts) * capacityFactor);

    useEffect(() => {
        // Randomly assign tokens to experts
        const newAssignments = Array.from({ length: numExperts }, () => []);
        let dropped = 0;

        for (let i = 0; i < numTokens; i++) {
            // Simulate router choice (biased random to show imbalance)
            // Expert 0 and 1 are more popular
            const r = Math.random();
            let chosenExpert;
            if (r < 0.4) chosenExpert = 0;
            else if (r < 0.7) chosenExpert = 1;
            else if (r < 0.9) chosenExpert = 2;
            else chosenExpert = 3;

            if (newAssignments[chosenExpert].length < capacity) {
                newAssignments[chosenExpert].push(i);
            } else {
                dropped++;
            }
        }
        setAssignments(newAssignments);
        setDroppedCount(dropped);
    }, [capacityFactor, numExperts, numTokens, capacity]);

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2 bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
                <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Capacity Factor (<Equation>\alpha</Equation>): {capacityFactor.toFixed(1)}
                    </label>
                    <span className="text-xs text-gray-500">
                        Capacity per Expert: <strong>{capacity}</strong> tokens
                    </span>
                </div>
                <input
                    type="range"
                    min="0.5"
                    max="2.0"
                    step="0.1"
                    value={capacityFactor}
                    onChange={(e) => setCapacityFactor(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <div className="flex justify-between text-xs text-gray-500">
                    <span>0.5 (Strict)</span>
                    <span>1.0 (Balanced)</span>
                    <span>2.0 (Generous)</span>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
                {assignments.map((tokens, i) => (
                    <div key={i} className="flex flex-col gap-2">
                        <div className="flex justify-between items-end">
                            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Expert {i + 1}</span>
                            <span className={`text-xs ${tokens.length === capacity ? 'text-red-500 font-bold' : 'text-gray-400'}`}>
                                {tokens.length}/{capacity}
                            </span>
                        </div>
                        <div className="relative h-48 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col-reverse p-1 gap-1">
                            {/* Fill line */}
                            <div
                                className="absolute top-0 left-0 w-full border-b-2 border-dashed border-red-300 dark:border-red-700 z-10 pointer-events-none"
                                style={{ bottom: `${(capacity / numTokens) * 100 * 2}%` }} // Approximate visual limit
                            />

                            {tokens.map((t, idx) => (
                                <div key={idx} className="h-4 bg-blue-500/80 rounded-sm w-full flex-shrink-0" />
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex items-center justify-center gap-4 p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">Processed: <strong>{numTokens - droppedCount}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                    <XCircle size={16} className="text-red-500" />
                    <span className="text-sm text-red-600 dark:text-red-400">Dropped: <strong>{droppedCount}</strong></span>
                </div>
            </div>
            <Paragraph variant="caption" className="text-center">
                *Simulation uses a biased router to demonstrate load imbalance. Experts 1 & 2 are popular.
            </Paragraph>
        </div>
    );
};

const ExpertCapacity = () => {
    return (
        <Section title="Expert Capacity and Capacity Factor" icon={Scale}>
            <Paragraph className="mb-4 text-gray-700 dark:text-gray-300">
                Expert capacity defines the upper bound on how many tokens may be routed to each expert during a step. This concept, formalized in the <strong>Switch Transformer</strong> (2021), is essential for efficient distributed training.
            </Paragraph>

            <InteractiveCard title="Capacity Simulation">
                <CapacityViz />
            </InteractiveCard>

            <Header3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-3">Formal Definition</Header3>
            <Paragraph className="mb-4 text-gray-700 dark:text-gray-300">
                The expert capacity <Equation>C</Equation> is defined as:
            </Paragraph>
            <EquationBlock><Equation>
                {`C = \\frac{T}{N} \\times \\alpha`}
            </Equation></EquationBlock>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
                <li><Equation>T</Equation>: Total number of tokens in the batch.</li>
                <li><Equation>N</Equation>: Total number of experts.</li>
                <li><Equation>\alpha</Equation>: <strong>Capacity Factor</strong> (hyper-parameter).</li>
            </ul>

            <Header3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-3">Role of the Capacity Factor (<Equation>\alpha</Equation>)</Header3>
            <Paragraph className="mb-4 text-gray-700 dark:text-gray-300">
                The capacity factor controls the buffer for routing imbalance.
            </Paragraph>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                <li><strong><Equation>{`\\alpha > 1.0`}</Equation>:</strong> Creates a safety buffer. <Equation>\alpha = 1.25</Equation> is a common default, allowing experts to handle 25% more tokens than a perfectly balanced load.</li>
                <li><strong><Equation>\alpha \approx 1.0</Equation>:</strong> Maximizes memory efficiency but risks high token drop rates if routing is unbalanced.</li>
            </ul>

            <div className="mt-6 border-l-4 border-yellow-500 pl-4 py-2 bg-yellow-50 dark:bg-yellow-900/10">
                <Header4 className="font-bold text-yellow-900 dark:text-yellow-100">Token Overflow</Header4>
                <Paragraph variant="small" className="text-yellow-800 dark:text-yellow-200">
                    When an expert receives more than <Equation>C</Equation> tokens, the excess tokens are <strong>dropped</strong> (skipped) or rerouted. Dropped tokens pass through the residual connection without expert processing, which can degrade performance if the drop rate is high (&gt;1%).
                </Paragraph>
            </div>
        </Section>
    );
};

export default ExpertCapacity;
