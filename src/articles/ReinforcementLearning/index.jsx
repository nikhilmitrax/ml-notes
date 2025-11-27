import React from 'react';
import Article from '../../components/Article';
import Overview from './sections/Overview';
import TheRLLoop from './sections/TheRLLoop';
import MathematicalFormulation from './sections/MathematicalFormulation';
import ExplorationVsExploitation from './sections/ExplorationVsExploitation';
import TheBellmanEquation from './sections/TheBellmanEquation';
import TypesOfRL from './sections/TypesOfRL';
import PolicyEvaluation from './sections/PolicyEvaluation';
import ChallengesInRL from './sections/ChallengesInRL';
import DeepRL from './sections/DeepRL';
import RLHF from './sections/RLHF';

import References from './sections/References';

export default function ReinforcementLearning() {
    return (
        <Article
            title="Reinforcement Learning"
            description="Learning to make decisions by interacting with an environment."
        >
            <Overview />
            <TheRLLoop />
            <MathematicalFormulation />
            <ExplorationVsExploitation />
            <TheBellmanEquation />
            <TypesOfRL />
            <PolicyEvaluation />
            <ChallengesInRL />
            <DeepRL />
            <RLHF />
            <References />
        </Article>
    );
}
