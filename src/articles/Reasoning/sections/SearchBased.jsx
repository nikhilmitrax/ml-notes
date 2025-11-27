import React, { useState } from 'react';
import { Search } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';
import EquationBlock from '../../../components/EquationBlock';
import InteractiveCard from '../../../components/InteractiveCard';

const ToTVisualizer = () => {
    const [expanded, setExpanded] = useState({ 'root': true });

    const toggle = (id) => {
        setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const nodes = {
        'root': { label: 'Start: 24 Game (4, 9, 10, 13)', status: 'active', children: ['n1', 'n2', 'n3'] },
        'n1': { label: '4 + 9 = 13 (Left: 10, 13, 13)', status: 'promising', children: ['n1-1', 'n1-2'] },
        'n2': { label: '13 - 9 = 4 (Left: 4, 4, 10)', status: 'pruned', children: [] },
        'n3': { label: '10 - 4 = 6 (Left: 6, 9, 13)', status: 'promising', children: ['n3-1'] },
        'n1-1': { label: '13 + 13 = 26 (Left: 10, 26)', status: 'pruned', children: [] },
        'n1-2': { label: '13 - 10 = 3 (Left: 3, 13)', status: 'promising', children: ['n1-2-1'] },
        'n3-1': { label: '13 - 9 = 4 (Left: 4, 6)', status: 'promising', children: ['n3-1-1'] },
        'n1-2-1': { label: '13 - 3 = 10 ...', status: 'pruned', children: [] },
        'n3-1-1': { label: '6 * 4 = 24 (Solved!)', status: 'solved', children: [] }
    };

    const renderNode = (id, depth = 0) => {
        const node = nodes[id];
        if (!node) return null;

        const isExpanded = expanded[id];
        const hasChildren = node.children.length > 0;

        return (
            <div key={id} className="flex flex-col select-none" style={{ marginLeft: `${depth * 20}px` }}>
                <div
                    onClick={() => hasChildren && toggle(id)}
                    className={`
                        flex items-center space-x-2 p-2 rounded-md cursor-pointer transition-colors border mb-2
                        ${node.status === 'pruned' ? 'bg-red-50 border-red-100 text-red-400' :
                            node.status === 'solved' ? 'bg-green-100 border-green-300 text-green-800 font-bold' :
                                'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'}
                    `}
                >
                    {hasChildren && (
                        <span className="text-slate-400 text-xs w-4">
                            {isExpanded ? '▼' : '▶'}
                        </span>
                    )}
                    {!hasChildren && <span className="w-4" />}

                    <span className="text-sm font-mono">{node.label}</span>

                    {node.status === 'pruned' && <span className="text-xs bg-red-100 text-red-600 px-1 rounded">Pruned</span>}
                    {node.status === 'solved' && <span className="text-xs bg-green-200 text-green-700 px-1 rounded">Goal</span>}
                </div>

                {isExpanded && hasChildren && (
                    <div className="border-l-2 border-slate-100 ml-3 pl-1">
                        {node.children.map(childId => renderNode(childId, 0))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <InteractiveCard title="Tree of Thoughts (ToT) Search">
            <div className="p-4 bg-slate-50 rounded-lg min-h-[300px]">
                <p className="text-sm text-slate-500 mb-4">
                    Explore the search tree for the "Game of 24" (make 24 using 4, 9, 10, 13).
                </p>
                {renderNode('root')}
            </div>
        </InteractiveCard>
    );
};

export default function SearchBased() {
    return (
        <Section title="Search-Based Reasoning" icon={Search}>
            <div className="space-y-6">
                <p>
                    <strong>Search-based reasoning</strong> extends CoT and Tree-of-Thought paradigms by formalizing reasoning as an <strong>explicit search or planning process</strong> through a structured state space of partial thoughts. Rather than producing a single reasoning trajectory, the model dynamically explores multiple hypotheses, evaluates their promise, and selectively expands the most promising reasoning branches. This approach transforms reasoning from <strong>sequence generation</strong> into <strong>strategic exploration</strong>—closer to the deliberative search processes in classical AI.
                </p>
                <p>
                    The key insight behind search-based reasoning is that complex reasoning tasks (e.g., mathematical proofs, algorithmic puzzles, or or multi-hop reasoning) often require <strong>exploring alternative reasoning directions</strong>, pruning dead-ends, and backtracking—capabilities absent from purely linear text generation.
                </p>
                <p>
                    This family includes <strong>Tree-of-Thoughts (ToT)</strong> by <a href="https://arxiv.org/abs/2305.10601" className="text-blue-600 hover:underline">Yao et al. (2023)</a>, <strong>Monte Carlo Tree Search (MCTS)</strong>-augmented reasoning, <strong>value-guided search</strong> frameworks, and hybrid <strong>plan–execute–evaluate</strong> reasoning systems that embed search within or atop language model inference.
                </p>

                <h3 className="text-2xl font-semibold text-slate-800 mt-8">Tree-of-Thoughts (ToT) Prompting</h3>
                <p>
                    <strong>Tree-of-Thoughts (ToT)</strong> generalizes CoT prompting into a <strong>structured search process</strong> over multiple reasoning paths. Instead of committing to a single linear reasoning chain, ToT explores a branching search tree where each node corresponds to a partial "thought," and branches represent possible continuations of reasoning.
                </p>
                <p>
                    This approach was introduced in <em>Tree of Thoughts: Deliberate Problem Solving with Large Language Models</em> by <a href="https://arxiv.org/abs/2305.10601" className="text-blue-600 hover:underline">Yao et al. (2023)</a>.
                </p>

                <h4 className="text-xl font-semibold text-slate-800 mt-6">Core Idea</h4>
                <ul className="list-disc pl-6 space-y-2">
                    <li>
                        CoT prompting treats reasoning as a single sampled trajectory:
                        <EquationBlock><Equation>
                            {`x \\rightarrow z_1 \\rightarrow z_2 \\rightarrow \\cdots \\rightarrow z_T \\rightarrow y`}
                        </Equation></EquationBlock>
                    </li>
                    <li>
                        while ToT treats reasoning as an <strong>exploration problem</strong> over multiple possible continuations at each step:
                        <EquationBlock><Equation>
                            {`\\mathcal{T} = \\{z_{1:t} \\mid z_{1:t-1} \\in \\mathcal{T},\\ z_t \\in \\text{Expand}(z_{1:t-1})\\}`}
                        </Equation></EquationBlock>
                    </li>
                </ul>
                <p>
                    The model explicitly evaluates partial thoughts <Equation>{`z_{1:t}`}</Equation> using a <strong>heuristic function</strong> or <strong>value model</strong>, guiding the expansion toward promising reasoning directions.
                </p>

                <div className="my-8">
                    <ToTVisualizer />
                </div>

                <h4 className="text-xl font-semibold text-slate-800 mt-6">Mechanism</h4>
                <ol className="list-decimal pl-6 space-y-2">
                    <li><strong>Thought generation:</strong> The model generates candidate continuations for the current thought, e.g., <Equation>{`z_t^{(1)}, z_t^{(2)}, \\ldots, z_t^{(b)}`}</Equation></li>
                    <li><strong>Evaluation:</strong> Each partial reasoning sequence <Equation>{`z_{1:t}`}</Equation> is scored by the model itself or a learned value function <Equation>{`V_\\phi(z_{1:t})`}</Equation>, estimating expected success.</li>
                    <li><strong>Search algorithm:</strong> Employs strategies such as <strong>breadth-first search (BFS)</strong>, <strong>depth-first search (DFS)</strong>, or <strong>Monte Carlo Tree Search (MCTS)</strong> to explore reasoning paths selectively.</li>
                    <li><strong>Selection:</strong> The final answer is derived from the highest-valued complete reasoning path or an ensemble of top candidates.</li>
                </ol>
                <p>
                    Mathematically, this resembles a policy/value formulation:
                </p>
                <EquationBlock><Equation>
                    {`z_{t+1} \\sim \\pi_\\theta(z_t \\mid z_{1:t}) \\quad \\text{and} \\quad V_\\phi(z_{1:t}) \\approx \\mathbb{E}[R \\mid z_{1:t}]`}
                </Equation></EquationBlock>
                <ul className="list-disc pl-6 space-y-2">
                    <li>where <Equation>R</Equation> is a reward for a correct or high-quality final output.</li>
                </ul>

                <h4 className="text-xl font-semibold text-slate-800 mt-6">Example</h4>
                <ul className="list-disc pl-6 space-y-2">
                    <li>
                        For a math problem such as <em>"Find the smallest integer satisfying ..."</em>, the ToT procedure may branch into:
                        <ul className="list-circle pl-6 mt-2 space-y-1">
                            <li><strong>Thought A:</strong> Try algebraic manipulation.</li>
                            <li><strong>Thought B:</strong> Try substitution.</li>
                            <li><strong>Thought C:</strong> Try bounding argument.</li>
                        </ul>
                    </li>
                    <li>The model evaluates which partial derivation yields progress and prunes unpromising branches, effectively performing <strong>deliberate reasoning</strong>.</li>
                </ul>

                <h4 className="text-xl font-semibold text-slate-800 mt-6">Advantages</h4>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Encourages <strong>exploration over multiple reasoning directions</strong>, avoiding early commitment to incorrect logic.</li>
                    <li>Enables <strong>planning and backtracking</strong>, crucial for complex reasoning.</li>
                    <li>Integrates well with external evaluators or reward functions.</li>
                </ul>

                <h4 className="text-xl font-semibold text-slate-800 mt-6">Limitations</h4>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Computationally expensive</strong>: exponential search space mitigated only by pruning heuristics.</li>
                    <li>Requires a reliable evaluation function to score partial reasoning.</li>
                    <li>Harder to parallelize and tune compared to CoT or Self-Consistency.</li>
                </ul>

                <h4 className="text-xl font-semibold text-slate-800 mt-6">Relation to Other Methods</h4>
                <ul className="list-disc pl-6 space-y-2">
                    <li>
                        Tree-of-Thoughts bridges the gap between:
                        <ul className="list-circle pl-6 mt-2 space-y-1">
                            <li><strong>CoT</strong> (single deterministic reasoning chain), and</li>
                            <li><strong>Search-based reasoning</strong> in classical AI (state-space exploration, planning).</li>
                        </ul>
                    </li>
                    <li>In this sense, it operationalizes the idea that reasoning should be <strong>deliberative</strong>, not merely <strong>associative</strong>.</li>
                </ul>

                <h3 className="text-2xl font-semibold text-slate-800 mt-8">Monte Carlo Tree Search (MCTS)-based Reasoning</h3>
                <h4 className="text-xl font-semibold text-slate-800 mt-6">Core Idea</h4>
                <p>
                    <strong>Monte Carlo Tree Search (MCTS)-based reasoning</strong> refines search-based reasoning by using <strong>stochastic simulations</strong> to balance exploration and exploitation over the reasoning space. Each node in the search tree represents a <em>partial reasoning trace</em> <Equation>{`z_{1:t} = (z_1, z_2, \\ldots, z_t)`}</Equation>, and edges represent possible next reasoning steps <Equation>{`z_{t+1}`}</Equation>. Unlike simple breadth-first or depth-first traversal, MCTS uses probabilistic sampling to explore promising reasoning branches while still allocating some computation to less-visited ones, ensuring a balance between <strong>discovering new reasoning paths</strong> and <strong>refining strong candidates</strong>.
                </p>
                <p>
                    Formally, reasoning unfolds as a growing search tree <Equation>{`\\mathcal{T}`}</Equation>:
                </p>
                <EquationBlock><Equation>
                    {`\\mathcal{T} = \\{ z_{1:t} \\mid z_{1:t-1} \\in \\mathcal{T},\\ z_t \\in \\text{Expand}(z_{1:t-1}) \\}`}
                </Equation></EquationBlock>
                <ul className="list-disc pl-6 space-y-2">
                    <li>where the <strong>Expand</strong> step is guided by the LLM's conditional distribution <Equation>{`p_\\theta(z_t \\mid z_{1:t-1}, x)`}</Equation>, and the <strong>evaluation function</strong> <Equation>{`V_\\phi(z_{1:t})`}</Equation> estimates how promising each partial reasoning sequence is.</li>
                </ul>
                <p>
                    MCTS then uses <strong>simulated rollouts</strong>—partial reasoning trajectories extended to completion—to estimate downstream rewards, which are <strong>backpropagated</strong> through the tree to update value and visit counts. The algorithm repeatedly selects nodes using an upper-confidence bound (UCB) criterion that trades off exploration and exploitation:
                </p>
                <EquationBlock><Equation>
                    {`a^* = \\arg\\max_a \\left( Q(s, a) + c \\sqrt{\\frac{\\log N(s)}{N(s, a) + 1}} \\right)`}
                </Equation></EquationBlock>
                <ul className="list-disc pl-6 space-y-2">
                    <li>where <Equation>{`Q(s, a)`}</Equation> is the average reward for taking reasoning step <Equation>a</Equation> in state <Equation>s</Equation>, <Equation>{`N(s, a)`}</Equation> the number of visits, and <Equation>c</Equation> a temperature constant controlling exploration.</li>
                </ul>
                <p>
                    This process continues until reasoning trajectories reach terminal states—complete solutions <Equation>y</Equation>—and the highest-valued trace or ensemble of top traces is selected as the model's output.
                </p>

                <h4 className="text-xl font-semibold text-slate-800 mt-6">Mechanism</h4>
                <ol className="list-decimal pl-6 space-y-2">
                    <li><strong>Selection</strong>: From the root node, traverse the tree by selecting the child that maximizes the <strong>UCB</strong> criterion, balancing high-value and underexplored reasoning branches.</li>
                    <li><strong>Expansion</strong>: When an underexplored node is reached, the model generates several possible next reasoning steps <Equation>{`z_t^{(1)}, z_t^{(2)}, \\ldots, z_t^{(b)} \\sim p_\\theta(z_t \\mid z_{1:t-1}, x)`}</Equation>, forming new branches for exploration.</li>
                    <li><strong>Simulation (Rollout)</strong>: The model continues reasoning (deterministically or stochastically) until reaching a terminal output <Equation>y</Equation>, producing a full reasoning chain <Equation>{`z_{1:T}`}</Equation>.</li>
                    <li><strong>Evaluation</strong>: The resulting trace is scored via a <strong>value estimator</strong> <Equation>{`V_\\phi(z_{1:T})`}</Equation> or a domain-specific verifier (e.g., math correctness, code execution success).</li>
                    <li><strong>Backpropagation</strong>: The value score is propagated upward, updating <Equation>{`Q(s, a)`}</Equation> and visit counts <Equation>{`N(s, a)`}</Equation> along the path, gradually refining the search policy.</li>
                    <li><strong>Selection of Final Output</strong>: After sufficient iterations, the reasoning path with the highest cumulative value (or visit count) is chosen as the final answer.</li>
                </ol>

                <h4 className="text-xl font-semibold text-slate-800 mt-6">Theoretical Framing</h4>
                <ul className="list-disc pl-6 space-y-2">
                    <li>
                        MCTS-based reasoning can be interpreted as an <strong>approximate Bayesian inference</strong> mechanism, marginalizing over reasoning paths by repeated stochastic sampling and value-based weighting. It formalizes reasoning as a <strong>policy–value system</strong>:
                        <EquationBlock><Equation>
                            {`z_{t+1} \\sim \\pi_\\theta(z_t \\mid z_{1:t}, x), \\quad V_\\phi(z_{1:t}) \\approx \\mathbb{E}[R \\mid z_{1:t}]`}
                        </Equation></EquationBlock>
                        where <Equation>{`\\pi_\\theta`}</Equation> is the reasoning policy and <Equation>{`V_\\phi`}</Equation> the expected reward estimator.
                    </li>
                    <li>This structure directly parallels <strong>AlphaZero</strong>-style planning in RL: reasoning steps are "moves," the value function measures progress toward correctness, and search iterations improve reasoning through <strong>self-guided exploration</strong>.</li>
                </ul>

                <h4 className="text-xl font-semibold text-slate-800 mt-6">Example: Mathematical Problem Solving</h4>
                <ul className="list-disc pl-6 space-y-2">
                    <li>
                        Consider a geometry proof question. A linear CoT might pursue a single argument, but an MCTS-based reasoner could simulate multiple reasoning directions:
                        <ul className="list-circle pl-6 mt-2 space-y-1">
                            <li><strong>Branch A:</strong> Attempt to derive relations via similar triangles.</li>
                            <li><strong>Branch B:</strong> Substitute coordinates and apply algebraic constraints.</li>
                            <li><strong>Branch C:</strong> Explore symmetry arguments for simplification.</li>
                        </ul>
                    </li>
                    <li>Each branch is evaluated through rollouts—checking consistency or partial correctness—and promising directions are expanded further, while unproductive branches are pruned. Over multiple iterations, the search converges on the most coherent reasoning trace, yielding deliberate and explainable reasoning rather than heuristic guessing.</li>
                </ul>

                <h4 className="text-xl font-semibold text-slate-800 mt-6">Variants and Extensions</h4>
                <ol className="list-decimal pl-6 space-y-2">
                    <li><strong>LLM-MCTS (Yao et al. (2024))</strong>: Combines MCTS with Tree-of-Thought reasoning, using the LLM both for expansion and value estimation.</li>
                    <li><strong>Verifier-Guided MCTS</strong>: Integrates external verifiers to provide precise reward signals at rollout, improving pruning accuracy.</li>
                    <li><strong>Value-Guided MCTS</strong>: Employs a trained value model <Equation>{`V_\\phi`}</Equation> (similar to process reward models) to estimate reasoning quality before rollout.</li>
                    <li><strong>Hybrid Planning Frameworks</strong>: Combine symbolic planners (A*, BFS) with MCTS exploration to scale reasoning in code, logic, or multi-agent environments.</li>
                </ol>

                <h4 className="text-xl font-semibold text-slate-800 mt-6">Advantages</h4>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Balances <strong>exploration and exploitation</strong>, avoiding premature convergence.</li>
                    <li>Can discover <strong>nonlinear, multi-path reasoning solutions</strong>.</li>
                    <li>Scales naturally to complex reasoning where evaluating partial progress is feasible.</li>
                    <li>Compatible with <strong>verifier-guided</strong> or <strong>reward-shaped</strong> supervision, enabling hybrid reasoning pipelines.</li>
                </ul>

                <h4 className="text-xl font-semibold text-slate-800 mt-6">Limitations</h4>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>High computational cost</strong>: repeated rollouts and evaluations are expensive.</li>
                    <li><strong>Value-model sensitivity</strong>: incorrect scoring can misdirect exploration.</li>
                    <li><strong>Context window saturation</strong>: maintaining multiple partial traces taxes memory.</li>
                    <li><strong>Diminishing returns</strong>: excessive exploration may not improve accuracy proportionally.</li>
                </ul>

                <h4 className="text-xl font-semibold text-slate-800 mt-6">Relationship to Other Reasoning Methods</h4>
                <ul className="list-disc pl-6 space-y-2">
                    <li>MCTS generalizes <strong>Tree-of-Thoughts (ToT)</strong> by adding quantitative evaluation and stochastic rollouts, bridging symbolic search and probabilistic reasoning.</li>
                    <li>It operationalizes <strong>planning in reasoning space</strong>, complementing <strong>RL-based reasoning</strong> (which learns heuristics) and <strong>Self-Consistency decoding</strong> (which averages independent samples rather than guided rollouts).</li>
                    <li>Conceptually, MCTS moves LLM reasoning closer to <strong>explicit deliberation and decision-making</strong>, marking a key step from <strong>narrative reasoning</strong> toward <strong>search-based intelligence</strong>.</li>
                </ul>
            </div>
        </Section>
    );
}
