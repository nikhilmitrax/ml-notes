import React, { useState, useMemo } from 'react';
import { List as ListIcon } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';
import InteractiveCard from '../../../components/InteractiveCard';
import List from '../../../components/List';
import ListItem from '../../../components/ListItem';
import Quote from '../../../components/Quote';
import Paragraph from '../../../components/Paragraph';

const SamplingVisualizer = ({ defaultMethod = 'top-k' }) => {
    const [method, setMethod] = useState(defaultMethod);
    const [k, setK] = useState(3);
    const [p, setP] = useState(0.8);
    const [minP, setMinP] = useState(0.05);

    const tokens = useMemo(() => [
        { token: "The", prob: 0.35 },
        { token: "A", prob: 0.25 },
        { token: "It", prob: 0.15 },
        { token: "One", prob: 0.10 },
        { token: "Some", prob: 0.08 },
        { token: "My", prob: 0.04 },
        { token: "This", prob: 0.02 },
        { token: "That", prob: 0.01 }
    ], []);

    const selectedTokens = useMemo(() => {
        if (method === 'top-k') {
            return tokens.slice(0, k).map(t => t.token);
        } else if (method === 'top-p') {
            let cumProb = 0;
            const selected = [];
            for (const t of tokens) {
                selected.push(t.token);
                cumProb += t.prob;
                if (cumProb >= p) break;
            }
            return selected;
        } else if (method === 'min-p') {
            const threshold = minP * tokens[0].prob;
            return tokens.filter(t => t.prob >= threshold).map(t => t.token);
        }
        return [];
    }, [tokens, method, k, p, minP]);

    return (
        <div className="flex flex-col gap-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div className="flex flex-wrap gap-2 mb-4">
                {['top-k', 'top-p', 'min-p'].map(m => (
                    <button
                        key={m}
                        onClick={() => setMethod(m)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${method === m
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                            }`}
                    >
                        {m}
                    </button>
                ))}
            </div>

            <div className="flex items-center gap-4 h-12">
                {method === 'top-k' && (
                    <>
                        <label className="text-sm font-semibold text-slate-700 w-24">Top-k (k):</label>
                        <input
                            type="range"
                            min="1"
                            max={tokens.length}
                            step="1"
                            value={k}
                            onChange={(e) => setK(parseInt(e.target.value))}
                            className="flex-1"
                        />
                        <span className="font-mono text-slate-600 w-8 text-right">{k}</span>
                    </>
                )}
                {method === 'top-p' && (
                    <>
                        <label className="text-sm font-semibold text-slate-700 w-24">Top-p (p):</label>
                        <input
                            type="range"
                            min="0.1"
                            max="1.0"
                            step="0.05"
                            value={p}
                            onChange={(e) => setP(parseFloat(e.target.value))}
                            className="flex-1"
                        />
                        <span className="font-mono text-slate-600 w-8 text-right">{p.toFixed(2)}</span>
                    </>
                )}
                {method === 'min-p' && (
                    <>
                        <label className="text-sm font-semibold text-slate-700 w-24">Min-p factor:</label>
                        <input
                            type="range"
                            min="0.01"
                            max="1.0"
                            step="0.01"
                            value={minP}
                            onChange={(e) => setMinP(parseFloat(e.target.value))}
                            className="flex-1"
                        />
                        <span className="font-mono text-slate-600 w-8 text-right">{minP.toFixed(2)}</span>
                    </>
                )}
            </div>

            <div className="space-y-2">
                {tokens.map((t) => {
                    const isSelected = selectedTokens.includes(t.token);
                    return (
                        <div key={t.token} className={`flex items-center gap-3 p-2 rounded ${isSelected ? 'bg-green-50 border border-green-200' : 'opacity-50'}`}>
                            <div className="w-12 text-sm font-medium text-slate-700 text-right">{t.token}</div>
                            <div className="flex-1 h-4 bg-slate-200 rounded-sm overflow-hidden">
                                <div
                                    className={`h-full transition-all duration-300 ${isSelected ? 'bg-green-500' : 'bg-slate-400'}`}
                                    style={{ width: `${t.prob * 100}%` }}
                                />
                            </div>
                            <div className="w-12 text-xs font-mono text-slate-600 text-right">{(t.prob * 100).toFixed(0)}%</div>
                        </div>
                    );
                })}
            </div>
            <Paragraph variant="caption">
                {method === 'top-k' && `Selects the top ${k} most probable tokens.`}
                {method === 'top-p' && `Selects the smallest set of tokens whose cumulative probability exceeds ${p}.`}
                {method === 'min-p' && `Selects tokens with probability >= ${minP} * max_prob (${(minP * tokens[0].prob).toFixed(3)}).`}
            </Paragraph>
        </div>
    );
};

const TopK = () => {
    return (
        <Section title="Top-k" icon={ListIcon}>
            <List>
                <ListItem>Top <Equation>{`k`}</Equation> uses a strategy where it allows to sample from a shortlist of top <Equation>{`k`}</Equation> tokens. This allows all top k players to be given a chance of being chosen as the next token.</ListItem>
                <ListItem>In top-<Equation>{`k`}</Equation> sampling, once the top <Equation>{`k`}</Equation> most probable tokens are selected at each time step, the choice among them could be based on uniform sampling (each of the top-<Equation>{`k`}</Equation> tokens has an equal chance of being picked) or proportional to their calculated probabilities.</ListItem>
            </List>

            <InteractiveCard title="Sampling Visualization (Top-k)">
                <SamplingVisualizer defaultMethod="top-k" />
            </InteractiveCard>

            <Quote>
                The choice between uniform and proportional selection in top-<Equation>{`k`}</Equation> sampling depends on the desired balance between diversity and coherence in the generated text. Uniform sampling promotes diversity by giving equal chance to all top <Equation>{`k`}</Equation> tokens, while proportional sampling favors coherence and contextual relevance by weighting tokens according to their probabilities. The specific application and user preference ultimately dictate the most suitable approach.
            </Quote>
            <List>
                <ListItem>It is suitable for tasks that require a balance between diversity and control over the output, such as text generation and conversational AI.</ListItem>
                <ListItem>Note, if <Equation>{`k`}</Equation> is set to 1, it is essentially greedy decoding which we saw in one of the earlier sections.</ListItem>
                <ListItem>Additionally, it's important to note that the smaller the <Equation>{`k`}</Equation> you choose, the narrower the selection will become (thus, reduced diversity, more control) and conversely, the higher the <Equation>{`k`}</Equation> you choose, the wider the selection will become (thus, increased diversity, less control).</ListItem>
            </List>
        </Section>
    );
};

export default TopK;
export { SamplingVisualizer }; // Exporting for reuse in other components if needed, though typically we'd just import the component directly.
