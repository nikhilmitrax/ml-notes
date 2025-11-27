import React from 'react';
import { Info } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';
import EquationBlock from '../../../components/EquationBlock';

const TheBellmanEquation = () => {
    return (
        <Section title="The Bellman Equation" icon={Info}>
            <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                The <strong>Value Function</strong> <Equation>V^\pi(s)</Equation> tells us how good it is to be in state <Equation>s</Equation> under policy <Equation>\pi</Equation>.
                It can be decomposed recursively using the <strong>Bellman Equation</strong>:
            </p>
            <EquationBlock><Equation>
                {`V^\\pi(s) = \\mathbb{E}_\\pi [ R_{t+1} + \\gamma V^\\pi(S_{t+1}) \\mid S_t = s ]`}
            </Equation></EquationBlock>
            <p className="mt-4 leading-relaxed text-slate-700 dark:text-slate-300">
                This equation states that the value of a state is the immediate reward plus the discounted value of the next state. This recursive relationship is the foundation for many RL algorithms like Q-Learning.
            </p>
        </Section>
    );
};

export default TheBellmanEquation;
