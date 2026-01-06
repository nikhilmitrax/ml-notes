import React, { useState, useEffect } from 'react';
import { Lightbulb } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';
import InteractiveCard from '../../../components/InteractiveCard';
import Header3 from '../../../components/Header3';
import Header4 from '../../../components/Header4';
import Paragraph from '../../../components/Paragraph';

const CoTVisualizer = () => {
    const [mode, setMode] = useState('standard');
    const [displayedText, setDisplayedText] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const standardText = "Q: Roger has 5 tennis balls. He buys 2 more cans of tennis balls. Each can has 3 tennis balls. How many tennis balls does he have now?\\nA: The answer is 11.";
    const cotText = "Q: Roger has 5 tennis balls. He buys 2 more cans of tennis balls. Each can has 3 tennis balls. How many tennis balls does he have now?\\nReasoning:\\n1. Roger started with 5 balls.\\n2. 2 cans of 3 balls each is 2 * 3 = 6 balls.\\n3. 5 + 6 = 11.\\nA: The answer is 11.";

    useEffect(() => {
        setDisplayedText('');
        setIsTyping(true);
        let index = 0;
        const targetText = mode === 'standard' ? standardText : cotText;

        const interval = setInterval(() => {
            if (index < targetText.length) {
                setDisplayedText((prev) => prev + targetText.charAt(index));
                index++;
            } else {
                clearInterval(interval);
                setIsTyping(false);
            }
        }, 30);

        return () => clearInterval(interval);
    }, [mode]);

    return (
        <InteractiveCard title="Chain-of-Thought vs. Standard Prompting">
            <div className="flex flex-col space-y-4">
                <div className="flex space-x-4 justify-center">
                    <button
                        onClick={() => setMode('standard')}
                        className={`px-4 py-2 rounded-md font-medium transition-colors ${mode === 'standard' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}
                    >
                        Standard Prompting
                    </button>
                    <button
                        onClick={() => setMode('cot')}
                        className={`px-4 py-2 rounded-md font-medium transition-colors ${mode === 'cot' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}
                    >
                        Chain-of-Thought
                    </button>
                </div>
                <div className="bg-slate-900 text-slate-50 p-4 rounded-md font-mono text-sm min-h-[200px] whitespace-pre-wrap">
                    {displayedText}
                    {isTyping && <span className="animate-pulse">|</span>}
                </div>
                <Paragraph variant="small" className="text-center italic mb-0">
                    {mode === 'standard' ? "Standard prompting jumps directly to the answer." : "CoT explicitizes the intermediate steps."}
                </Paragraph>
            </div>
        </InteractiveCard>
    );
};

const PromptingBased = () => {
    return (
        <Section title="Prompting-Based Reasoning" icon={Lightbulb}>
            <div className="space-y-6">
                <Paragraph>
                    Prompting-based approaches induce reasoning by structuring the input context to make intermediate thinking explicit or implicitly compositional. These methods rely purely on <strong>contextual cues</strong> rather than architectural or training modifications. Examples below:
                </Paragraph>
                <ul className="list-disc pl-6 space-y-2">
                    <li>
                        <strong>Chain-of-Thought (CoT) Prompting</strong>: Introduced by <a href="https://arxiv.org/abs/2201.11903" className="text-blue-600 hover:underline">Wei et al. (2022)</a>, CoT explicitly elicits step-by-step reasoning traces, guiding the model to externalize intermediate computations before giving the final answer. Formally, the model predicts
                        <Equation block>
                            {`\\hat{y} = \\arg\\max_y \\sum_z p_\\theta(y, z \\mid x)`}
                        </Equation>
                        where <Equation>z</Equation> denotes latent reasoning traces approximated through explicit textual reasoning.
                    </li>
                    <li>
                        <strong>Zero-Shot and Few-Shot CoT</strong>: As shown by <a href="https://arxiv.org/abs/2205.11916" className="text-blue-600 hover:underline">Kojima et al. (2022)</a>, adding simple triggers like "Let's think step by step" can induce reasoning behavior even without demonstrations, revealing latent reasoning priors in large models.
                    </li>
                    <li>
                        <strong>Implicit Reasoning via In-Context Composition</strong>: From <a href="https://arxiv.org/abs/2005.14165" className="text-blue-600 hover:underline">Brown et al. (2020)</a>, LLMs can <em>implicitly</em> perform reasoning by inferring structured input–output mappings from few-shot examples. This process is latent, with reasoning occurring in attention dynamics rather than explicit text.
                        <Equation block>
                            {`p_\\theta(y_n \\mid x_n, \\mathcal{C}) = f_\\theta(x_n; \\mathcal{C}), \\quad \\mathcal{C} = \\{(x_i, y_i)\\}_{i=1}^{n-1}`}
                        </Equation>
                        Implicit composition thus shows that LLMs can internalize algorithmic reasoning even without producing verbalized steps.
                    </li>
                </ul>

                <Header3 className="text-2xl font-semibold text-slate-800 mt-8">Chain-of-Thought (CoT) prompting</Header3>
                <Paragraph>
                    The CoT methodology explicitly elicits step-by-step reasoning before producing an answer. Instead of directly predicting the output <Equation>y</Equation> from input <Equation>x</Equation>, the model is guided to generate intermediate steps <Equation>{`z_1, z_2, \\ldots, z_k`}</Equation> that form a coherent reasoning chain:
                </Paragraph>
                <Equation block>
                    {`x \\rightarrow z_1 \\rightarrow z_2 \\rightarrow \\cdots \\rightarrow z_k \\rightarrow y`}
                </Equation>
                <Paragraph>
                    This approach was introduced in <a href="https://arxiv.org/abs/2201.11903" className="text-blue-600 hover:underline">Chain-of-Thought Prompting Elicits Reasoning in Large Language Models</a> by Wei et al. (2022). The key contribution of Wei et al. was to show that <strong>few-shot exemplars containing reasoning traces</strong> (〈input, reasoning, answer〉) dramatically improve reasoning performance. By providing examples of multi-step reasoning in the prompt, large models could successfully decompose problems into intermediate steps.
                </Paragraph>
                <Paragraph>
                    In contrast, <a href="https://arxiv.org/abs/2205.11916" className="text-blue-600 hover:underline">Large Language Models are Zero-Shot Reasoners</a> by Kojima et al. (2022) later demonstrated that the same multi-step reasoning could be triggered <strong>even without exemplars</strong>—by simply appending the phrase "Let's think step by step," enabling zero-shot reasoning. While Wei et al. highlighted reasoning as an emergent property of scale through structured exemplars, <a href="https://arxiv.org/abs/2205.11916" className="text-blue-600 hover:underline">Kojima et al. (2022)</a> revealed that linguistic cues alone can unlock latent reasoning abilities already present in pretrained LLMs.
                </Paragraph>

                <div className="my-8">
                    <CoTVisualizer />
                </div>

                <Header4 className="text-xl font-semibold text-slate-800 mt-6">Mechanism</Header4>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Prompt-level induction:</strong> The prompt includes exemplars where the reasoning is explicit (<a href="https://arxiv.org/abs/2201.11903" className="text-blue-600 hover:underline">Wei et al. (2022)</a>).</li>
                    <li><strong>Latent structure exposure:</strong> The model learns to externalize intermediate computation as natural language.</li>
                    <li><strong>Generalization:</strong> Even without supervision, the model generalizes to unseen reasoning tasks (as shown by <a href="https://arxiv.org/abs/2205.11916" className="text-blue-600 hover:underline">Kojima et al. (2022)</a>).</li>
                </ul>
                <Paragraph>
                    Formally, CoT modifies inference to condition on a reasoning trace <Equation>z</Equation>:
                </Paragraph>
                <Equation block>
                    {`\\hat{y} = \\arg\\max_y \\sum_z p_\\theta(y, z \\mid x)`}
                </Equation>
                <ul className="list-disc pl-6 space-y-2">
                    <li><Equation>x</Equation>: the input question or problem statement presented to the model.</li>
                    <li><Equation>y</Equation>: the final output or predicted answer generated by the model.</li>
                    <li><Equation>z</Equation>: the intermediate reasoning trace, consisting of one or more steps <Equation>{`z_1, z_2, \\ldots, z_k`}</Equation>.</li>
                    <li><Equation>{`p_\\theta(y, z \\mid x)`}</Equation>: the joint probability of producing a reasoning sequence <Equation>{`z`}</Equation> and final answer <Equation>{`y`}</Equation> given input <Equation>{`x`}</Equation>, parameterized by model weights <Equation>{`\\theta`}</Equation>.</li>
                    <li><Equation>{`\\sum_z`}</Equation>: marginalization over all possible reasoning paths, representing the model's implicit consideration of multiple reasoning trajectories.</li>
                    <li><Equation>{`\\arg\\max_y`}</Equation>: selects the answer <Equation>y</Equation> with the highest overall likelihood after integrating over possible reasoning traces.</li>
                    <li><Equation>{`\\hat{y}`}</Equation>: the final selected output predicted by the model.</li>
                </ul>
                <Paragraph>
                    When CoT prompting is used, the summation is approximated by sampling one or several <Equation>z</Equation> sequences explicitly.
                </Paragraph>

                <Header4 className="text-xl font-semibold text-slate-800 mt-6">Variants</Header4>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Zero-shot CoT:</strong> Introduced by <a href="https://arxiv.org/abs/2205.11916" className="text-blue-600 hover:underline">Kojima et al. (2022)</a>, who found that simply prompting with "Let's think step by step" elicits reasoning in the absence of any few-shot exemplars, proving that LLMs are zero-shot reasoners capable of multi-step inference without examples.</li>
                    <li><strong>Few-shot CoT:</strong> Proposed by <a href="https://arxiv.org/abs/2201.11903" className="text-blue-600 hover:underline">Wei et al. (2022)</a>, which relies on a few explicit reasoning demonstrations in the prompt to teach structured decomposition of problems.</li>
                    <li><strong>Multi-CoT aggregation:</strong> Proposed in <a href="https://arxiv.org/abs/2203.11171" className="text-blue-600 hover:underline">Self-Consistency Improves Chain of Thought Reasoning in Language Models</a> by Wang et al. (2022), combines multiple reasoning traces to improve robustness and consistency. By sampling diverse reasoning paths and aggregating their outcomes—through majority voting, confidence weighting, or entailment-based filtering—this approach mitigates random errors in individual chains and enhances overall answer reliability, particularly on complex or ambiguous reasoning tasks.</li>
                </ul>

                <Header4 className="text-xl font-semibold text-slate-800 mt-6">Advantages</Header4>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Readable, auditable reasoning process.</li>
                    <li>Enables interpretability and debugging.</li>
                    <li>Boosts performance on tasks requiring intermediate computation.</li>
                </ul>

                <Header4 className="text-xl font-semibold text-slate-800 mt-6">Limitations</Header4>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Prone to verbosity and "overthinking."</li>
                    <li>Can expose internal biases and hallucinations in intermediate steps.</li>
                    <li>Sensitive to prompt wording and length.</li>
                </ul>

                <Header3 className="text-2xl font-semibold text-slate-800 mt-8">Implicit Reasoning via In-Context Composition</Header3>
                <Paragraph>
                    <strong>Implicit reasoning via in-context composition</strong> refers to the ability of LLMs to <em>perform structured reasoning without being explicitly instructed to reason step-by-step</em>. Instead of producing overt "thoughts" or intermediate rationales, the model <strong>implicitly composes reasoning patterns</strong> from the examples, instructions, and latent structure provided in the prompt.
                </Paragraph>
                <Paragraph>
                    This phenomenon underlies <em>few-shot learning</em> and <em>in-context learning</em> (ICL), first formalized in <em>Language Models are Few-Shot Learners</em> by <a href="https://arxiv.org/abs/2005.14165" className="text-blue-600 hover:underline">Brown et al. (2020)</a>.
                </Paragraph>
                <Paragraph>
                    In short, implicit reasoning through in-context composition reveals that LLMs can simulate reasoning procedures <em>internally</em>—demonstrating that reasoning is not only something models can "say," but also something they can <em>do silently</em>.
                </Paragraph>

                <Header4 className="text-xl font-semibold text-slate-800 mt-6">Core Idea</Header4>
                <Paragraph>
                    During in-context learning, an LLM observes examples of input–output pairs in the prompt:
                </Paragraph>
                <pre className="bg-slate-100 p-4 rounded-md overflow-x-auto text-sm">
                    <code>
                        {`Example 1: x₁ → y₁
Example 2: x₂ → y₂
...
Query: xₙ → ?`}
                    </code>
                </pre>
                <Paragraph>
                    Although no parameter updates occur, the model <strong>constructs an internal algorithm</strong> that maps inputs to outputs based on patterns in the examples. This implicit mechanism acts as a <em>temporary reasoning program</em> embedded within the attention dynamics of the transformer.
                </Paragraph>
                <Paragraph>
                    Mathematically, the model approximates:
                </Paragraph>
                <Equation block>
                    {`p_\\theta(y_n \\mid x_n, \\mathcal{C}) = f_\\theta(x_n; \\mathcal{C})`}
                </Equation>
                <ul className="list-disc pl-6 space-y-2">
                    <li>where the context <Equation>{`\\mathcal{C} = \\{(x_i, y_i)\\}_{i=1}^{n-1}`}</Equation> acts as a soft prompt encoding the reasoning structure.</li>
                </ul>

                <Header4 className="text-xl font-semibold text-slate-800 mt-6">Mechanism</Header4>
                <ol className="list-decimal pl-6 space-y-2">
                    <li><strong>Pattern induction:</strong> The attention mechanism identifies regularities across examples in the prompt (e.g., logical rules, transformations, or operations).</li>
                    <li><strong>Implicit composition:</strong> The model learns to simulate an algorithm consistent with those examples without explicit symbolic representation.</li>
                    <li><strong>Generalization:</strong> When applied to the query, the model executes the induced procedure on-the-fly, effectively performing reasoning within the hidden activations rather than the output text.</li>
                </ol>

                <Header4 className="text-xl font-semibold text-slate-800 mt-6">Evidence of Implicit Reasoning</Header4>
                <ul className="list-disc pl-6 space-y-2">
                    <li>
                        Several studies show that LLMs can encode algorithmic reasoning purely through in-context composition:
                        <ul className="list-circle pl-6 mt-2 space-y-1">
                            <li><em>Transformers as Meta-Learners</em> by <a href="https://arxiv.org/abs/2301.05217" className="text-blue-600 hover:underline">von Oswald et al. (2023)</a>: demonstrates that transformers approximate gradient descent in activation space, effectively learning "how to learn" from examples.</li>
                            <li><em>Rethinking In-Context Learning as Implicit Bayesian Inference</em> by <a href="https://arxiv.org/abs/2205.13109" className="text-blue-600 hover:underline">Xie et al. (2022)</a>: formalizes ICL as a Bayesian posterior update over latent hypotheses <Equation>h</Equation>, as follows:
                                <Equation block>
                                    {`p(h\\mid x_{1:n}, y_{1:n}) \\propto p(h)\\prod_i p(y_i\\mid x_i, h)`}
                                </Equation>
                            </li>
                            <li><em>What Learning Algorithms Can Transformers Implement?</em> by <a href="https://arxiv.org/abs/2302.06675" className="text-blue-600 hover:underline">Akyürek et al. (2023)</a>: shows that transformers can instantiate implicit gradient-based learners and execute reasoning-like adaptations.</li>
                        </ul>
                    </li>
                    <li>
                        These findings imply that reasoning does not necessarily require explicit verbalization—it can occur within the model's hidden computation.
                    </li>
                </ul>

                <Header4 className="text-xl font-semibold text-slate-800 mt-6">Examples</Header4>
                <ul className="list-disc pl-6 space-y-2">
                    <li>In-context arithmetic reasoning (e.g., "2 + 3 = 5, 4 + 5 = 9, 6 + 7 = ?") where the model infers the pattern without showing intermediate steps.</li>
                    <li>Logical pattern induction (e.g., mapping "A<Equation>{`\\rightarrow`}</Equation>B, B<Equation>{`\\rightarrow`}</Equation>C, therefore A<Equation>{`\\rightarrow`}</Equation>C") purely from example structure.</li>
                    <li>Code pattern imitation: reproducing unseen programming functions after seeing analogous examples in the context.</li>
                </ul>

                <Header4 className="text-xl font-semibold text-slate-800 mt-6">Advantages</Header4>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Efficiency:</strong> No need for verbose intermediate reasoning.</li>
                    <li><strong>Speed:</strong> Faster inference due to single-pass computation.</li>
                    <li><strong>Adaptivity:</strong> Learns task-specific reasoning patterns dynamically from the prompt.</li>
                </ul>

                <Header4 className="text-xl font-semibold text-slate-800 mt-6">Limitations</Header4>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Opacity:</strong> Reasoning is latent and not interpretable.</li>
                    <li><strong>Fragility:</strong> Sensitive to prompt order, formatting, and example selection.</li>
                    <li><strong>Limited generalization:</strong> Implicit algorithms often fail outside the statistical range of given examples.</li>
                </ul>

                <Header4 className="text-xl font-semibold text-slate-800 mt-6">Relationship to Explicit Reasoning</Header4>
                <ul className="list-disc pl-6 space-y-2">
                    <li>
                        Implicit reasoning complements explicit reasoning (like CoT) along a spectrum:
                        <div className="overflow-x-auto mt-4">
                            <table className="min-w-full divide-y divide-slate-200">
                                <thead>
                                    <tr>
                                        <th className="px-3 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Type</th>
                                        <th className="px-3 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Reasoning Representation</th>
                                        <th className="px-3 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Interpretability</th>
                                        <th className="px-3 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Example</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-slate-200">
                                    <tr>
                                        <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-slate-900">Explicit</td>
                                        <td className="px-3 py-2 whitespace-nowrap text-sm text-slate-500">Textual steps visible in output</td>
                                        <td className="px-3 py-2 whitespace-nowrap text-sm text-slate-500">High</td>
                                        <td className="px-3 py-2 whitespace-nowrap text-sm text-slate-500">"Let's think step by step"</td>
                                    </tr>
                                    <tr>
                                        <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-slate-900">Implicit</td>
                                        <td className="px-3 py-2 whitespace-nowrap text-sm text-slate-500">Reasoning internal to activations</td>
                                        <td className="px-3 py-2 whitespace-nowrap text-sm text-slate-500">Low</td>
                                        <td className="px-3 py-2 whitespace-nowrap text-sm text-slate-500">Few-shot induction, analogy</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </li>
                    <li>
                        Recent work (<em>Learning to Reason with Language Models</em> by <a href="https://arxiv.org/abs/2206.15443" className="text-blue-600 hover:underline">Zelikman et al. (2022)</a>) suggests that both can coexist: explicit reasoning can <em>teach</em> the model to develop implicit reasoning circuits that persist even when steps are hidden.
                    </li>
                </ul>
            </div>
        </Section>
    );
};

export default PromptingBased;
