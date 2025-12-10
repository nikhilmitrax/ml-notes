import React from 'react';
import { History } from 'lucide-react';
import Section from '../../../components/Section';
import Header3 from '../../../components/Header3';
import Paragraph from '../../../components/Paragraph';
import Equation from '../../../components/Equation';

const TraditionalSequenceModelling: React.FC = () => {
    return (
        <Section title="Traditional Sequence Modelling" icon={History}>
            <Header3 className="text-xl font-semibold text-slate-800 mb-4">Recurrence (Fixed Vector Memory)</Header3>
            <ul className="list-disc list-inside space-y-2 mb-6 text-slate-700 ml-4">
                <li><strong>RNN, LSTM, GRU</strong></li>
                <li>Sequential to train, hence slow</li>
                <li>Authors argue fixed vector memory is "Lossy"</li>
            </ul>

            <Header3 className="text-xl font-semibold text-slate-800 mb-4">Attention</Header3>
            <ul className="list-disc list-inside space-y-2 mb-6 text-slate-700 ml-4">
                <li>Parallel training</li>
                <li>'Perfect' recall within the context window</li>
                <li><Equation>{'O(n^2)'}</Equation> complexity to maintain the context window</li>
            </ul>
        </Section>
    );
};

export default TraditionalSequenceModelling;
