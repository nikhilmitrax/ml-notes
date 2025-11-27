import React from 'react';
import { Layers } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';
import EquationBlock from '../../../components/EquationBlock';

const TypesOfRL = () => {
    return (
        <Section title="Types of Reinforcement Learning" icon={Layers}>
            <div className="space-y-8">
                <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">1. Value-Based Methods</h3>
                    <p className="text-slate-700 dark:text-slate-300 mb-2">
                        These methods learn value functions to estimate the expected return. The policy is derived implicitly (e.g., by choosing the action with the highest value).
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300 ml-4">
                        <li><strong>State-Value Function <Equation>V(s)</Equation></strong>: How good is it to be in state <Equation>s</Equation>?</li>
                        <li><strong>Action-Value Function <Equation>Q(s, a)</Equation></strong>: How good is it to take action <Equation>a</Equation> in state <Equation>s</Equation>?</li>
                    </ul>
                    <div className="mt-2 p-3 bg-slate-100 dark:bg-slate-800 rounded text-sm font-mono">
                        Example: Q-Learning, DQN
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">2. Policy-Based Methods</h3>
                    <p className="text-slate-700 dark:text-slate-300 mb-2">
                        These methods directly learn a parameterized policy <Equation>{`\\pi_\\theta(a|s)`}</Equation> without consulting a value function. They optimize the policy parameters <Equation>\theta</Equation> using gradient ascent on the expected return.
                    </p>
                    <EquationBlock><Equation>
                        {`\\nabla_\\theta J(\\theta) \\approx \\mathbb{E} [\\nabla_\\theta \\log \\pi_\\theta(a|s) G_t]`}
                    </Equation></EquationBlock>
                    <p className="text-slate-700 dark:text-slate-300 mt-2">
                        <strong>REINFORCE</strong> is a classic algorithm that uses the Policy Gradient Theorem.
                    </p>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">3. Actor-Critic Methods</h3>
                    <p className="text-slate-700 dark:text-slate-300">
                        Combine both approaches: An <strong>Actor</strong> (policy-based) proposes actions, and a <strong>Critic</strong> (value-based) evaluates them. This reduces the high variance of pure policy gradients.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Model-Based</h4>
                        <p className="text-sm text-slate-700 dark:text-slate-300">
                            Learns a model of the environment (transition <Equation>P</Equation> and reward <Equation>R</Equation>) and plans using it (e.g., AlphaZero). High sample efficiency but complex.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Model-Free</h4>
                        <p className="text-sm text-slate-700 dark:text-slate-300">
                            Learns directly from experience without modeling the physics. Simpler but requires more data (e.g., Q-Learning, PPO).
                        </p>
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default TypesOfRL;
