import React from 'react';
import Article from '../../components/Article';
import Overview from './sections/Overview';
import RooflineAnalysis from './sections/RooflineAnalysis';
import CollectiveCommunication from './sections/CollectiveCommunication';
import TypicalTraining from './sections/TypicalTraining';
import MemoryUsage from './sections/MemoryUsage';
import GradientCheckpointing from './sections/GradientCheckpointing';
import GradientAccumulation from './sections/GradientAccumulation';

import Callout from '../../components/Callout';

export const section = 'coalesced';
export const name = 'Accelerating ML Training';

const AcceleratingMLTraining = () => {
    return (
        <Article
            title="Accelerating ML Training"
            description="Collective Communication primitives are the building blocks of distributed training. Understanding them is key to debugging and optimizing performance."
        >
            <Callout type="caution" title="Under Construction">
                This article is currently being written. Some sections may be incomplete or subject to change.
            </Callout>

            <Overview />
            <RooflineAnalysis />
            <TypicalTraining />
            <MemoryUsage />
            <GradientCheckpointing />
            <GradientAccumulation />
            <CollectiveCommunication />
        </Article>
    );
};

export default AcceleratingMLTraining;
