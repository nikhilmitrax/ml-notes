import React from 'react';
import Article from '../../components/Article';
import Overview from './sections/Overview';
import CollectiveCommunication from './sections/CollectiveCommunication';
import TypicalTraining from './sections/TypicalTraining';

import Callout from '../../components/Callout';

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
            <TypicalTraining />
            <CollectiveCommunication />
        </Article>
    );
};

export default AcceleratingMLTraining;
