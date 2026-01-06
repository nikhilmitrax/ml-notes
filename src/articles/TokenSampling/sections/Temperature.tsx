import React, { useState, useMemo } from 'react';
import { Thermometer } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';
import InteractiveCard from '../../../components/InteractiveCard';
import Header3 from '../../../components/Header3';
import Header4 from '../../../components/Header4';
import List from '../../../components/List';
import ListItem from '../../../components/ListItem';
import Quote from '../../../components/Quote';

const TemperatureVisualizer = () => {
    const [temp, setTemp] = useState(1.0);

    const logits = useMemo(() => [
        { token: "robot", value: 2.0 },
        { token: "human", value: 1.5 },
        { token: "alien", value: 0.5 },
        { token: "dog", value: -0.5 },
        { token: "cat", value: -1.0 }
    ], []);

    const probabilities = useMemo(() => {
        const expValues = logits.map(item => Math.exp(item.value / temp));
        const sumExp = expValues.reduce((a, b) => a + b, 0);
        return logits.map((item, i) => ({
            ...item,
            prob: expValues[i] / sumExp
        }));
    }, [logits, temp]);

    return (
        <div className="flex flex-col gap-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div className="flex items-center gap-4">
                <label className="text-sm font-semibold text-slate-700 w-32">Temperature (T):</label>
                <input
                    type="range"
                    min="0.1"
                    max="3.0"
                    step="0.1"
                    value={temp}
                    onChange={(e) => setTemp(parseFloat(e.target.value))}
                    className="flex-1"
                />
                <span className="font-mono text-slate-600 w-12 text-right">{temp.toFixed(1)}</span>
            </div>

            <div className="space-y-3">
                {probabilities.map((item) => (
                    <div key={item.token} className="flex items-center gap-3">
                        <div className="w-16 text-sm font-medium text-slate-700 text-right">{item.token}</div>
                        <div className="flex-1 h-6 bg-slate-200 rounded-sm overflow-hidden relative">
                            <div
                                className="h-full bg-blue-500 transition-all duration-300"
                                style={{ width: `${item.prob * 100}%` }}
                            />
                            <span className="absolute inset-0 flex items-center justify-start pl-2 text-xs font-mono text-slate-600 mix-blend-multiply">
                                {(item.prob * 100).toFixed(1)}%
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <p className="text-xs text-slate-500">
                Lower T makes the distribution sharper (more confident). Higher T flattens it (more random).
            </p>
        </div>
    );
};

const Temperature = () => {
    return (
        <Section title="Related: Temperature" icon={Thermometer}>
            <List>
                <ListItem>Although temperature is not inherently a token sampling method, it significantly influences the token sampling process and is therefore included in this primer.</ListItem>
                <ListItem>The temperature parameter allows for adjustments to the probability distribution over tokens. It serves as a hyperparameter in the softmax transformation, which governs the randomness of predictions by scaling the logits prior to the application of softmax.</ListItem>
            </List>


            <List>
                <ListItem>For instance, in TensorFlow's Magenta implementation of LSTMs, the temperature parameter determines the extent to which the logits are scaled or divided before the computation of softmax.</ListItem>
                <ListItem>Lower temperature values yield more deterministic outputs, while higher values lead to more creative but less predictable outputs, facilitating a trade-off between determinism and precision on one hand, and creativity and diversity on the other.</ListItem>
            </List>

            <Header3>The Role of Temperature in Softmax</Header3>
            <List>
                <ListItem>The "vanilla" softmax function incorporates the temperature hyperparameter <Equation>{`T`}</Equation> as follows:</ListItem>
            </List>
            <Equation block>
                {`q_{i}=\\frac{\\exp(z_{i}/T)}{\\sum_{j} \\exp(z_{j}/T)}`}
            </Equation>
            <List>
                <ListItem>where <Equation>{`T`}</Equation> is the temperature parameter (set to 1 by default).</ListItem>
                <ListItem>When the temperature is 1, we compute the softmax directly on the logits (the unscaled output of earlier layers). Using a temperature of 0.6, the model computes the softmax on <Equation>{`\\frac{\\text{logits}}{0.6}`}</Equation>, resulting in a larger value. Performing softmax on larger values makes the model more <strong>confident</strong> (less input is needed to activate the output layer) but also more <strong>conservative</strong> in its samples (it is less likely to sample from unlikely candidates).</ListItem>
            </List>
            <InteractiveCard title="Interactive Temperature Visualization">
                <TemperatureVisualizer />
            </InteractiveCard>

            <Header3>Temperature Ranges and Their Effects</Header3>

            <div className="overflow-x-auto my-6 rounded-lg border border-slate-200">
                <table className="min-w-full text-sm text-left border-collapse">
                    <thead className="bg-slate-100 text-slate-700 font-semibold">
                        <tr>
                            <th className="p-3 border-b border-slate-200 w-1/6">Range</th>
                            <th className="p-3 border-b border-slate-200 w-1/3">Characteristics</th>
                            <th className="p-3 border-b border-slate-200 w-1/4">Applications</th>
                            <th className="p-3 border-b border-slate-200 w-1/4">Limitations</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-blue-50/50 border-b border-blue-100">
                            <td className="p-3 font-medium text-blue-900 align-top">
                                Low<br />
                                <span className="text-xs opacity-75">(T ≈ 0.0 - 0.5)</span>
                            </td>
                            <td className="p-3 text-blue-800 align-top">
                                <ul className="list-disc list-outside ml-4 space-y-1">
                                    <li>Strong preference for high-probability tokens.</li>
                                    <li>Results in deterministic outputs and lower randomness.</li>
                                    <li>Outputs are often repetitive and lack diversity.</li>
                                </ul>
                            </td>
                            <td className="p-3 text-blue-800 align-top">
                                Ideal for scenarios where precision and confidence are critical (e.g., when generating factual text or answers).
                            </td>
                            <td className="p-3 text-blue-800 align-top">
                                May lead to overly conservative predictions and repetitive loops.
                            </td>
                        </tr>
                        <tr className="bg-green-50/50 border-b border-green-100">
                            <td className="p-3 font-medium text-green-900 align-top">
                                Moderate<br />
                                <span className="text-xs opacity-75">(T ≈ 0.6 - 1.0)</span>
                            </td>
                            <td className="p-3 text-green-800 align-top">
                                <ul className="list-disc list-outside ml-4 space-y-1">
                                    <li>Balances diversity and coherence in token sampling.</li>
                                    <li>Allows the model to explore less likely candidates without compromising too much on coherence.</li>
                                </ul>
                            </td>
                            <td className="p-3 text-green-800 align-top">
                                <ul className="list-disc list-outside ml-4 space-y-1">
                                    <li>Commonly used for generating creative but realistic outputs.</li>
                                    <li>Suitable for generating human-like text, code suggestions, or musical compositions.</li>
                                </ul>
                            </td>
                            <td className="p-3 text-green-800 align-top">
                                May still favor higher-probability tokens, limiting exploration of very unlikely candidates.
                            </td>
                        </tr>
                        <tr className="bg-red-50/50 border-b border-red-100">
                            <td className="p-3 font-medium text-red-900 align-top">
                                High<br />
                                <span className="text-xs opacity-75">(T &gt; 1.0)</span>
                            </td>
                            <td className="p-3 text-red-800 align-top">
                                <ul className="list-disc list-outside ml-4 space-y-1">
                                    <li>Produces a softer probability distribution over classes.</li>
                                    <li>Results in more diverse and random outputs by increasing sensitivity to low-probability candidates.</li>
                                    <li>Allows the RNN to escape repetitive loops and explore a wider range of token possibilities.</li>
                                </ul>
                            </td>
                            <td className="p-3 text-red-800 align-top">
                                <ul className="list-disc list-outside ml-4 space-y-1">
                                    <li>Useful for brainstorming ideas or generating highly creative content.</li>
                                    <li>Enables exploration of unconventional outputs in art, music, or storytelling tasks.</li>
                                </ul>
                            </td>
                            <td className="p-3 text-red-800 align-top">
                                <ul className="list-disc list-outside ml-4 space-y-1">
                                    <li>Leads to more mistakes and incoherent outputs.</li>
                                    <li>Increases the likelihood of selecting improbable candidates, which might not always align with the desired result.</li>
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <Header3>Insights from the Softmax Function</Header3>
            <Quote>
                For high temperatures <Equation>{`(\\tau \\rightarrow \\infty)`}</Equation>, all samples have nearly the same probability, and the lower the temperature, the more expected rewards affect the probability. For a low temperature <Equation>{`\\left(\\tau \\rightarrow 0^{+}\\right)`}</Equation>, the probability of the sample with the highest expected reward tends to 1.
            </Quote>

            <Header3>Summary of Temperature's Impact</Header3>
            <List>
                <ListItem>A lower temperature makes the model more confident and conservative, ideal for deterministic outputs.</ListItem>
                <ListItem>A moderate temperature strikes a balance between randomness and coherence.</ListItem>
                <ListItem>A higher temperature increases randomness and diversity but may lead to mistakes.</ListItem>
                <ListItem>Adjusting the temperature allows fine-tuning the model's behavior depending on the task, enhancing the versatility of language models in diverse applications.</ListItem>
            </List>
        </Section>
    );
};

export default Temperature;
