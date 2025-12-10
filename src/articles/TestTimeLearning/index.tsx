import React from 'react';
import Article from '../../components/Article';
import TraditionalSequenceModelling from './sections/TraditionalSequenceModelling';
import NewFamilyOfApproaches from './sections/NewFamilyOfApproaches';
import MIRAS from './sections/MIRAS';
import TITANS from './sections/TITANS';
import ATLAS from './sections/ATLAS';

export const section = 'papers';
export const name = 'TTL: TITANS, MIRAS, ATLAS, and TNT';

export default function TestTimeLearning() {
    return (
        <Article
            title="Test Time Learning: TITANS, MIRAS, ATLAS, and TNT"
            description="Test Time Learning (TTL) or Test-Time Memorization (TTM) represents a new paradigm in sequence modeling where inference becomes a continuous learning process. Models actively update their parameters in real-time to minimize a 'surprise' metric, treating memory as a dynamic optimization problem rather than a static vector or growing cache."
        >
            <TraditionalSequenceModelling />
            <NewFamilyOfApproaches />
            <MIRAS />
            <TITANS />
            <ATLAS />
        </Article>
    );
}
