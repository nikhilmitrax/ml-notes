import React, { useState, useEffect, useMemo } from 'react';
import { List as ListIcon, Play, RotateCcw } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';
import EquationBlock from '../../../components/EquationBlock';

import Header3 from '../../../components/Header3';
import Header4 from '../../../components/Header4';
import Paragraph from '../../../components/Paragraph';
import List from '../../../components/List';
import ListItem from '../../../components/ListItem';
import InteractiveCard from '../../../components/InteractiveCard';
import SideBySide from '../../../components/SideBySide';

const AutoregressiveVisualizer = () => {
    const fullText = "The quick brown fox jumps over the lazy dog";
    const tokens = fullText.split(" ");
    const [step, setStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        let interval;
        if (isPlaying && step < tokens.length) {
            interval = setInterval(() => {
                setStep(s => s + 1);
            }, 1500); // Slower animation to show the flow
        } else if (step >= tokens.length) {
            setIsPlaying(false);
        }
        return () => clearInterval(interval);
    }, [isPlaying, step, tokens.length]);

    const currentSequence = tokens.slice(0, step).join(" ");
    const nextToken = step < tokens.length ? tokens[step] : "";

    return (
        <div className="flex flex-col gap-6 p-6 bg-slate-50 rounded-lg border border-slate-200">
            <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-semibold text-slate-700">Autoregressive Generation Flow</div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        disabled={step >= tokens.length}
                        className="p-1.5 rounded bg-blue-100 text-blue-600 hover:bg-blue-200 disabled:opacity-50"
                    >
                        <Play size={16} className={isPlaying ? "hidden" : "block"} />
                        <span className={isPlaying ? "block text-xs font-bold px-1" : "hidden"}>||</span>
                    </button>
                    <button
                        onClick={() => { setStep(0); setIsPlaying(false); }}
                        className="p-1.5 rounded bg-slate-200 text-slate-600 hover:bg-slate-300"
                    >
                        <RotateCcw size={16} />
                    </button>
                </div>
            </div>

            {/* Visualization Area */}
            <div className="relative flex flex-col items-center gap-8 min-h-[200px]">

                {/* Input Context */}
                <div className="w-full">
                    <div className="text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Input Context</div>
                    <div className="bg-white p-3 rounded border border-slate-200 min-h-[50px] font-mono text-sm text-slate-600 shadow-sm">
                        {currentSequence || <span className="text-slate-300 italic">Start...</span>}
                    </div>
                </div>

                {/* Arrow Down */}
                <div className={`transition-opacity duration-500 ${isPlaying ? 'opacity-100' : 'opacity-30'}`}>
                    <div className="w-0.5 h-8 bg-slate-300 mx-auto relative">
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 border-r-2 border-b-2 border-slate-300 rotate-45"></div>
                    </div>
                </div>

                {/* The Model */}
                <div className="relative z-10">
                    <div className="w-32 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-lg flex items-center justify-center text-white font-bold text-sm relative overflow-hidden">
                        <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
                        Language Model
                    </div>
                    {/* Processing Animation */}
                    {isPlaying && step < tokens.length && (
                        <div className="absolute -right-12 top-1/2 -translate-y-1/2 flex gap-1">
                            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                    )}
                </div>

                {/* Arrow Down */}
                <div className={`transition-opacity duration-500 ${isPlaying ? 'opacity-100' : 'opacity-30'}`}>
                    <div className="w-0.5 h-8 bg-slate-300 mx-auto relative">
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 border-r-2 border-b-2 border-slate-300 rotate-45"></div>
                    </div>
                </div>

                {/* Output Token */}
                <div className="w-full flex flex-col items-center">
                    <div className="text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Next Token</div>
                    <div className={`
                        h-10 px-4 flex items-center justify-center rounded border font-mono font-bold shadow-sm transition-all duration-500
                        ${isPlaying && nextToken ? 'bg-green-50 border-green-200 text-green-700 scale-110' : 'bg-slate-50 border-slate-200 text-slate-300'}
                    `}>
                        {nextToken || "?"}
                    </div>
                </div>

            </div>

            <div className="text-xs text-slate-500 mt-4 text-center">
                The model takes the current context, predicts the next token, and appends it to the sequence. This process repeats.
            </div>
        </div>
    );
};

const SoftmaxVisualizer = () => {
    const [logits, setLogits] = useState([2.0, 1.0, 0.1]);
    const labels = ["Option A", "Option B", "Option C"];

    const probabilities = useMemo(() => {
        const expValues = logits.map(l => Math.exp(l));
        const sumExp = expValues.reduce((a, b) => a + b, 0);
        return expValues.map(v => v / sumExp);
    }, [logits]);

    const handleLogitChange = (index, value) => {
        const newLogits = [...logits];
        newLogits[index] = parseFloat(value);
        setLogits(newLogits);
    };

    return (
        <div className="flex flex-col gap-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <SideBySide className="gap-8">
                <div className="space-y-4">
                    <Header4 className="text-sm font-semibold text-slate-700 mt-0 mb-0">Input Logits (z)</Header4>
                    {logits.map((logit, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <span className="text-xs font-mono w-16">{labels[i]}</span>
                            <input
                                type="range"
                                min="-5"
                                max="5"
                                step="0.1"
                                value={logit}
                                onChange={(e) => handleLogitChange(i, e.target.value)}
                                className="flex-1"
                            />
                            <span className="text-xs font-mono w-8 text-right">{logit.toFixed(1)}</span>
                        </div>
                    ))}
                </div>

                <div className="space-y-4">
                    <Header4 className="text-sm font-semibold text-slate-700 mt-0 mb-0">Output Probabilities (Softmax)</Header4>
                    {probabilities.map((prob, i) => (
                        <div key={i} className="space-y-1">
                            <div className="flex justify-between text-xs">
                                <span>{labels[i]}</span>
                                <span className="font-mono">{(prob * 100).toFixed(1)}%</span>
                            </div>
                            <div className="h-4 bg-slate-200 rounded-sm overflow-hidden">
                                <div
                                    className="h-full bg-blue-500 transition-all duration-300"
                                    style={{ width: `${prob * 100}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </SideBySide>
            <Paragraph variant="caption" className="mb-0">
                Adjust the logits to see how the Softmax function normalizes them into a probability distribution that sums to 1. Notice how increasing one logit decreases the probabilities of others.
            </Paragraph>
        </div>
    );
};

const Background = () => {
    return (
        <Section title="Background" icon={ListIcon}>
            <Header3 className="mt-0">Autoregressive decoding</Header3>
            <List>
                <ListItem>When we generate a textual sequence with a language model, we typically begin with a textual prefix/prompt. Then, we follow the steps shown below:
                    <List nested ordered className="space-y-1">
                        <ListItem>Use the language model to generate the next token.</ListItem>
                        <ListItem>Add this output token to our input sequence.</ListItem>
                        <ListItem>Repeat.</ListItem>
                    </List>
                </ListItem>
                <ListItem>By continually generating the next token in this manner (i.e., this is what we call the autoregressive decoding process), we can generate an entire textual sequence.</ListItem>
            </List>

            <InteractiveCard title="Autoregressive Decoding">
                <AutoregressiveVisualizer />
            </InteractiveCard>

            <Header3>Token probabilities</Header3>
            <List>
                <ListItem>But, how do we choose/predict the next token (i.e., step one shown above)?</ListItem>
                <ListItem>Instead of directly outputting the next token, language models output a probability distribution over the set of all possible tokens. Put simply, LLMs are essentially neural networks tackling a classification problem over the vocabulary (unique tokens).</ListItem>
                <ListItem>Given this probability distribution, we can follow several different strategies for selecting the next token. For example, greedy decoding, as we'll see below, simply selects the token with the highest probability as the next token.</ListItem>
            </List>

            <Header3>Logits and Softmax</Header3>
            <List>
                <ListItem>LLMs produce class probabilities with logit vector <Equation>{`\\mathbf{z}`}</Equation> where <Equation>{`\\mathbf{z}=\\left(z_{1}, \\ldots, z_{n}\\right)`}</Equation> by performing the softmax function to produce probability vector <Equation>{`\\mathbf{q}=\\left(q_{1}, \\ldots, q_{n}\\right)`}</Equation> by comparing <Equation>{`z_{i}`}</Equation> with the other logits.</ListItem>
            </List>
            <Equation block>
                {`q_{i}=\\frac{\\exp \\left(z_{i}\\right)}{\\sum_{j} \\exp \\left(z_{j}\\right)}`}
            </Equation>
            <List>
                <ListItem>The softmax function normalizes the candidates at each iteration of the network based on their exponential values by ensuring the network outputs are all between zero and one at every timestep, thereby easing their interpretation as probability values.</ListItem>
            </List>

            <InteractiveCard title="Softmax Calculator">
                <SoftmaxVisualizer />
            </InteractiveCard>

        </Section>
    );
};

export default Background;
