import React, { useState } from 'react';
import { Filter, GitBranch, X, Check, RotateCcw, ChevronRight } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';
import Header3 from '../../../components/Header3';
import Paragraph from '../../../components/Paragraph';
import List from '../../../components/List';
import ListItem from '../../../components/ListItem';
import InteractiveCard from '../../../components/InteractiveCard';

import { getAssetPath } from '../../../utils/assetUtils';

const BeamSearchVisualizer = () => {
    const beamWidth = 2;

    // Simplified simulation data
    const steps = [
        {
            name: "Initial State",
            beams: [{ text: "The", score: 0.0, active: true }]
        },
        {
            name: "Step 1: Expansion",
            beams: [
                { text: "The dog", score: -0.5, parent: 0, new: true },
                { text: "The cat", score: -0.7, parent: 0, new: true },
                { text: "The bird", score: -1.2, parent: 0, new: true },
                { text: "The car", score: -1.5, parent: 0, new: true }
            ]
        },
        {
            name: "Step 1: Pruning (Top-2)",
            beams: [
                { text: "The dog", score: -0.5, active: true },
                { text: "The cat", score: -0.7, active: true },
                { text: "The bird", score: -1.2, pruned: true },
                { text: "The car", score: -1.5, pruned: true }
            ]
        },
        {
            name: "Step 2: Expansion",
            beams: [
                { text: "The dog is", score: -0.6, parent: 0, new: true }, // from dog
                { text: "The dog runs", score: -0.9, parent: 0, new: true },
                { text: "The cat is", score: -0.8, parent: 1, new: true }, // from cat
                { text: "The cat sleeps", score: -1.1, parent: 1, new: true }
            ]
        },
        {
            name: "Step 2: Pruning (Top-2)",
            beams: [
                { text: "The dog is", score: -0.6, active: true },
                { text: "The cat is", score: -0.8, active: true },
                { text: "The dog runs", score: -0.9, pruned: true },
                { text: "The cat sleeps", score: -1.1, pruned: true }
            ]
        },
        {
            name: "Step 3: Final Selection",
            beams: [
                { text: "The dog is fast", score: -0.7, active: true, final: true },
                { text: "The cat is cute", score: -0.9, active: false }
            ]
        }
    ];

    const [stepIndex, setStepIndex] = useState(0);

    const handleNext = () => {
        if (stepIndex < steps.length - 1) setStepIndex(stepIndex + 1);
    };

    const handleReset = () => {
        setStepIndex(0);
    };

    const currentStep = steps[stepIndex];

    return (
        <div className="flex flex-col gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-semibold text-slate-700">Beam Search (Width k={beamWidth})</div>
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

            <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono bg-slate-200 px-2 py-1 rounded text-slate-600">
                    {currentStep.name}
                </span>
                <div className="text-xs text-slate-500">
                    Step {stepIndex + 1} of {steps.length}
                </div>
            </div>

            <div className="space-y-2 min-h-[200px]">
                {currentStep.beams.map((beam, idx) => (
                    <div
                        key={idx}
                        className={`
                            flex items-center justify-between p-3 rounded border transition-all duration-300
                            ${beam.active || beam.final ? 'bg-white border-blue-200 shadow-sm' : ''}
                            ${beam.pruned ? 'bg-slate-100 border-slate-200 opacity-60' : ''}
                            ${beam.new ? 'bg-blue-50 border-blue-200' : ''}
                        `}
                    >
                        <div className="flex items-center gap-3">
                            <GitBranch size={16} className={beam.pruned ? "text-slate-400" : "text-blue-500"} />
                            <span className={`font-mono ${beam.pruned ? "text-slate-500 line-through" : "text-slate-800"}`}>
                                {beam.text}
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-xs font-mono text-slate-500">
                                Score: {beam.score.toFixed(1)}
                            </span>
                            {beam.pruned && <X size={16} className="text-red-400" />}
                            {(beam.active || beam.final) && <Check size={16} className="text-green-500" />}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-4">
                {stepIndex < steps.length - 1 ? (
                    <button
                        onClick={handleNext}
                        className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center justify-center gap-2"
                    >
                        Next Step <ChevronRight size={16} />
                    </button>
                ) : (
                    <div className="text-center text-green-600 font-bold py-2">
                        Search Complete
                    </div>
                )}
            </div>

            <Paragraph variant="caption" className="mt-2 mb-0">
                Beam search explores multiple paths simultaneously. At each step, it expands all current paths and keeps only the top k (k={beamWidth}) most probable ones.
            </Paragraph>
        </div>
    );
};

const ConstrainedBeamSearch = () => {
    return (
        <Section title="Constrained Beam Search" icon={Filter}>
            <List>
                <ListItem>Constrained beam search allows more control over the output that is generated, which is especially useful, for example, if your task is Neural Machine Translation and you have certain words that will need to be in the output.</ListItem>
                <ListItem>In constrained beam search, additional constraints are imposed on the generated sequences to ensure that they adhere to certain criteria or rules.</ListItem>
                <ListItem>The basic idea of constrained beam search is to modify the traditional beam search algorithm to incorporate constraints while generating sequences. This can be done by maintaining a set of active beams that satisfy the constraints during the search process. At each step, the algorithm generates and scores multiple candidate sequences, and then prunes the candidates that violate the constraints. The remaining candidates are then used to generate the next set of candidates, and the process continues until a complete sequence that satisfies the constraints is generated, or until a predefined stopping criterion is met.</ListItem>
                <ListItem>Constrained beam search requires careful management of the constraints to ensure that they are satisfied while still maintaining a diverse set of candidate sequences. One common approach is to use penalty functions or heuristics to discourage or penalize candidates that violate the constraints, while still allowing them to be considered during the search process. Another approach is to use a separate constraint satisfaction module that guides the search process by providing additional information or feedback on the constraints.</ListItem>
                <ListItem>For example, in text generation, constraints could include limitations on the length of the generated text, adherence to a particular format or structure, or inclusion of certain keywords or phrases. Constrained beam search modifies the scoring function or introduces additional checks during the search process to ensure that only valid sequences that meet the constraints are considered and expanded.</ListItem>
                <ListItem>Constrained beam search is commonly used in tasks such as text summarization, machine translation, and dialogue generation, where it is important to generate sequences that adhere to certain rules, guidelines, or restrictions while maintaining fluency and coherence in the generated output. It is a useful technique for controlling the output of a sequence generation model and ensuring that the generated sequences meet specific criteria or constraints.</ListItem>
                <ListItem>In the traditional beam search setting, we find the top <Equation>{`k`}</Equation> most probable next tokens at each branch and append them for consideration. In the constrained setting, we do the same but also append the tokens that will take us closer to fulfilling our constraints.</ListItem>
                <ListItem>The visualizer below illustrates the beam search process with a beam width of 2.</ListItem>
            </List>

            <InteractiveCard title="Interactive Beam Search Visualization">
                <BeamSearchVisualizer />
            </InteractiveCard>

            <Header3>Banking</Header3>
            <List>
                <ListItem>Now a practical next question would be, wouldn't forcing a token create nonsensical outputs? Using banks solves this problem by creating a balance between fulfilling the constraints and creating sensible output, and we can see this illustrated in the figure below:</ListItem>
            </List>
            <img src={getAssetPath("/assets/TokenSampling/6.png")} alt="Banking" className="w-full rounded-lg my-4 border border-slate-200" />
            <List>
                <ListItem>"After sorting all the possible beams into their respective banks, we do a round-robin selection. With the above example, we'd select the most probable output from Bank 2, then most probable from Bank 1, one from Bank 0, the second most probable from Bank 2, the second most probable from Bank 1, and so forth. Assuming we're using three beams, we just do the above process three times to end up with <code className="bg-slate-100 px-1 rounded">["The is fast", "The dog is", "The dog and"]</code>."</ListItem>
                <ListItem>Thus, even though we are forcing tokens on the model, we are still keeping track of other high probable sequences that are likely not nonsensical.</ListItem>
                <ListItem>The image below shows the result and all the steps combined.</ListItem>
            </List>
            <img src={getAssetPath("/assets/TokenSampling/7.png")} alt="Constrained Beam Search Result" className="w-full rounded-lg my-4 border border-slate-200" />
        </Section>
    );
};

export default ConstrainedBeamSearch;
