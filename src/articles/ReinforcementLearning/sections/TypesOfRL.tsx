import React from 'react';
import { Layers } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';
import Header3 from '../../../components/Header3';
import Header4 from '../../../components/Header4';
import Paragraph from '../../../components/Paragraph';
import SideBySide from '../../../components/SideBySide';

const TypesOfRL = () => {
    return (
        <Section title="Types of Reinforcement Learning" icon={Layers}>
            <div className="space-y-8">
                <div>
                    <Header3>1. Value-Based Methods</Header3>
                    <Paragraph>
                        These methods learn value functions to estimate the expected return. The policy is derived implicitly (e.g., by choosing the action with the highest value).
                    </Paragraph>
                    <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300 ml-4">
                        <li><strong>State-Value Function <Equation>V(s)</Equation></strong>: How good is it to be in state <Equation>s</Equation>?</li>
                        <li><strong>Action-Value Function <Equation>Q(s, a)</Equation></strong>: How good is it to take action <Equation>a</Equation> in state <Equation>s</Equation>?</li>
                    </ul>
                    <div className="mt-2 p-3 bg-slate-100 dark:bg-slate-800 rounded text-sm font-mono">
                        Example: Q-Learning, DQN
                    </div>
                </div>

                <div>
                    <Header3>2. Policy-Based Methods</Header3>
                    <Paragraph>
                        These methods directly learn a parameterized policy <Equation>{`\\pi_\\theta(a|s)`}</Equation> without consulting a value function. They optimize the policy parameters <Equation>\theta</Equation> using gradient ascent on the expected return.
                    </Paragraph>
                    <Equation block>
                        {`\\nabla_\\theta J(\\theta) \\approx \\mathbb{E} [\\nabla_\\theta \\log \\pi_\\theta(a|s) G_t]`}
                    </Equation>
                    <Paragraph className="mt-2">
                        <strong>REINFORCE</strong> is a classic algorithm that uses the Policy Gradient Theorem.
                    </Paragraph>
                </div>

                <div>
                    <Header3>3. Actor-Critic Methods</Header3>
                    <Paragraph>
                        Combine both approaches: An <strong>Actor</strong> (policy-based) proposes actions, and a <strong>Critic</strong> (value-based) evaluates them. This reduces the high variance of pure policy gradients.
                    </Paragraph>
                </div>

                <SideBySide className="mt-4">
                    <div>
                        <Header4 className="mt-0">Model-Based</Header4>
                        <Paragraph variant="small">
                            Learns a model of the environment (transition <Equation>P</Equation> and reward <Equation>R</Equation>) and plans using it (e.g., AlphaZero). High sample efficiency but complex.
                        </Paragraph>
                    </div>
                    <div>
                        <Header4 className="mt-0">Model-Free</Header4>
                        <Paragraph variant="small">
                            Learns directly from experience without modeling the physics. Simpler but requires more data (e.g., Q-Learning, PPO).
                        </Paragraph>
                    </div>
                </SideBySide>
            </div>
        </Section>
    );
};

export default TypesOfRL;
