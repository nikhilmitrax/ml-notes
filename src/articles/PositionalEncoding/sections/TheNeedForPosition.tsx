import React from 'react';
import { Grid } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';

const TheNeedForPosition = () => {
    return (
        <Section title="The Need for Position" icon={Grid}>
            <p className="mb-4 text-slate-700 leading-7">
                Unlike RNNs which process text sequentially (step <Equation>t</Equation> follows step <Equation>t-1</Equation>), Self-Attention is <strong>permutation invariant</strong>.
                Without positional info, "The dog bit the man" and "The man bit the dog" look identical to the attention mechanism (as a bag of words).
            </p>
            <div className="bg-blue-50 text-blue-800 p-4 rounded-lg text-sm">
                <strong>Goal:</strong> Inject a signal <Equation>P</Equation> such that input <Equation>X + P</Equation> carries both semantic and positional information.
            </div>
        </Section>
    );
};

export default TheNeedForPosition;
