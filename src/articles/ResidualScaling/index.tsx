import React from 'react';
import Article from '../../components/Article';
import Overview from './sections/Overview';
import Prerequisites from './sections/Prerequisites';
import TransformerResidualStructure from './sections/TransformerResidualStructure';
import FixedScaling from './sections/FixedScaling';
import NormalizationFree from './sections/NormalizationFree';
import LearnableGates from './sections/LearnableGates';
import GeneralizedResiduals from './sections/GeneralizedResiduals';
import ResidualStreamScaling from './sections/ResidualStreamScaling';
import TheoryToolkit from './sections/TheoryToolkit';
import PracticalEngineering from './sections/PracticalEngineering';
import References from './sections/References';

export const section = 'coalesced';

export default function ResidualScaling() {
    return (
        <Article
            title="Residual Scaling: Depth Without Collapse"
            description="Residual scaling techniques that enable training of extremely deep neural networks"
        >
            <Overview />
            <Prerequisites />
            <TransformerResidualStructure />
            <FixedScaling />
            <NormalizationFree />
            <LearnableGates />
            <GeneralizedResiduals />
            <ResidualStreamScaling />
            <TheoryToolkit />
            <PracticalEngineering />
            <References />
        </Article>
    );
}
