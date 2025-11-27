import React from 'react';
import { Layers } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';
import EquationBlock from '../../../components/EquationBlock';

const MathematicalFormulation = () => {
    return (
        <Section title="Mathematical Formulation: MDP" icon={Layers}>
            <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                RL problems are formally described as <strong>Markov Decision Processes (MDPs)</strong>. An MDP is defined by a tuple <Equation>{`\\langle S, A, P, R, \\gamma \\rangle`}</Equation>:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-slate-700 dark:text-slate-300 ml-4">
                <li><Equation>S</Equation>: Set of all possible states.</li>
                <li><Equation>A</Equation>: Set of all possible actions.</li>
                <li><Equation>P(s' | s, a)</Equation>: Transition probability (dynamics).</li>
                <li><Equation>R(s, a)</Equation>: Reward function.</li>
                <li><Equation>\gamma \in [0, 1]</Equation>: Discount factor for future rewards.</li>
            </ul>

            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mt-8 mb-4">The Goal: Maximize Return</h3>
            <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                The agent wants to maximize the expected <strong>Return</strong> <Equation>G_t</Equation>, which is the sum of discounted future rewards:
            </p>
            <EquationBlock><Equation>
                {`G_t = \\sum_{k=0}^{\\infty} \\gamma^k R_{t+k+1} = R_{t+1} + \\gamma R_{t+2} + \\gamma^2 R_{t+3} + \\dots`}
            </Equation></EquationBlock>
        </Section>
    );
};

export default MathematicalFormulation;
