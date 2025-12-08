import React, { useState } from 'react';
import { Target, ChevronRight, RotateCcw } from 'lucide-react';
import Section from '../../../components/Section';
import List from '../../../components/List';
import ListItem from '../../../components/ListItem';
import InteractiveCard from '../../../components/InteractiveCard';

const GreedyDecodingVisualizer = () => {
    const steps = [
        {
            context: "The",
            candidates: [
                { token: "cat", prob: 0.6 },
                { token: "dog", prob: 0.3 },
                { token: "bird", prob: 0.1 }
            ]
        },
        {
            context: "The cat",
            candidates: [
                { token: "sat", prob: 0.7 },
                { token: "ran", prob: 0.2 },
                { token: "slept", prob: 0.1 }
            ]
        },
        {
            context: "The cat sat",
            candidates: [
                { token: "on", prob: 0.8 },
                { token: "in", prob: 0.15 },
                { token: "under", prob: 0.05 }
            ]
        },
        {
            context: "The cat sat on",
            candidates: [
                { token: "the", prob: 0.9 },
                { token: "a", prob: 0.08 },
                { token: "my", prob: 0.02 }
            ]
        },
        {
            context: "The cat sat on the",
            candidates: [
                { token: "mat", prob: 0.85 },
                { token: "floor", prob: 0.1 },
                { token: "bed", prob: 0.05 }
            ]
        },
        {
            context: "The cat sat on the mat",
            candidates: [] // End
        }
    ];

    const [currentStep, setCurrentStep] = useState(0);

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleReset = () => {
        setCurrentStep(0);
    };

    const currentData = steps[currentStep];
    const isFinished = currentStep === steps.length - 1;

    return (
        <div className="flex flex-col gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-semibold text-slate-700">Greedy Decoding Step-by-Step</div>
                <div className="flex gap-2">
                    <button
                        onClick={handleReset}
                        className="p-1.5 rounded bg-slate-200 text-slate-600 hover:bg-slate-300"
                        title="Reset"
                    >
                        <RotateCcw size={16} />
                    </button>
                </div>
            </div>

            <div className="bg-white p-4 rounded border border-slate-200 min-h-[60px] font-mono text-lg mb-4">
                {currentData.context}
                {!isFinished && <span className="animate-pulse">_</span>}
            </div>

            {!isFinished ? (
                <div className="space-y-3">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Top Candidates</div>
                    {currentData.candidates.map((candidate, index) => (
                        <div
                            key={index}
                            className={`flex items-center gap-3 p-2 rounded border ${index === 0 ? 'bg-green-50 border-green-200' : 'bg-white border-slate-100 opacity-60'}`}
                        >
                            <div className="w-16 font-medium text-right">{candidate.token}</div>
                            <div className="flex-1 h-4 bg-slate-100 rounded-sm overflow-hidden">
                                <div
                                    className={`h-full ${index === 0 ? 'bg-green-500' : 'bg-slate-400'}`}
                                    style={{ width: `${candidate.prob * 100}%` }}
                                />
                            </div>
                            <div className="w-12 text-xs font-mono text-right">{(candidate.prob * 100).toFixed(0)}%</div>
                            {index === 0 && <div className="text-xs text-green-600 font-bold px-2">SELECTED</div>}
                        </div>
                    ))}
                    <button
                        onClick={handleNext}
                        className="w-full mt-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center justify-center gap-2"
                    >
                        Next Step <ChevronRight size={16} />
                    </button>
                </div>
            ) : (
                <div className="text-center py-8 text-slate-500">
                    <div className="text-green-600 font-bold mb-2">Sequence Complete!</div>
                    <button onClick={handleReset} className="text-blue-600 hover:underline text-sm">Start Over</button>
                </div>
            )}
        </div>
    );
};

const GreedyDecoding = () => {
    return (
        <Section title="Greedy Decoding" icon={Target}>
            <List>
                <ListItem>Greedy decoding uses <code className="bg-slate-100 px-1 rounded">argmax</code> to select the output with the highest probability at each step during the decoding process.</ListItem>
                <ListItem>The problem with this method is, it has no way to revert back in time and rectify previously generated tokens to fix its output. For example, if the machine translation prompt is "il a m'entarté" (he hit me with a pie) and greedy decoding translation generates "he hit a", it has no way of going back to replace "a" with "me". Greedy decoding chooses the most probable output at each time step, without considering the future impact of that choice on subsequent decisions.</ListItem>
                <ListItem>During the decoding process, the model generates a sequence of words or tokens one at a time, based on the previously generated words and the input sequence. In greedy decoding, usually we decode until the model produces a <code className="bg-slate-100 px-1 rounded">&lt;END&gt;</code> token, For example: <code className="bg-slate-100 px-1 rounded">&lt;START&gt;</code> he hit me with a pie <code className="bg-slate-100 px-1 rounded">&lt;END&gt;</code>.</ListItem>
                <ListItem>While greedy decoding is computationally efficient and easy to implement, it may not always produce the best possible output sequence.</ListItem>
                <ListItem>A way to mitigate the issues we see from greedy decoding is to use exhaustive search decoding or beam search.</ListItem>
                <ListItem>The visualizer below shows greedy decoding in action, picking the top token at each interval.</ListItem>
            </List>

            <InteractiveCard title="Interactive Greedy Decoding">
                <GreedyDecodingVisualizer />
            </InteractiveCard>

        </Section>
    );
};

export default GreedyDecoding;
