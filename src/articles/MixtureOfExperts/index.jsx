import React from 'react';
import Article from '../../components/Article';
import Overview from './sections/Overview';
import Taxonomy from './sections/Taxonomy';
import SparselyGatedMoE from './sections/SparselyGatedMoE';
import ExpertCapacity from './sections/ExpertCapacity';
import LoadBalancing from './sections/LoadBalancing';
import TokenDropping from './sections/TokenDropping';
import RoutingMechanisms from './sections/RoutingMechanisms';
import MoEBeyondMLP from './sections/MoEBeyondMLP';
import ExpertParallelism from './sections/ExpertParallelism';
import PopularModels from './sections/PopularModels';

export const unfinished = false;

export default function MixtureOfExperts() {
    return (
        <Article
            title="Mixture of Experts (MoE)"
            description={
                <>
                    Mixture of Experts (MoE) is a paradigm shift in deep learning that enables <strong>conditional computation</strong>.
                    Instead of activating all parameters for every input, MoE activates only a sparse subset of "experts," allowing models to scale to trillions of parameters while maintaining constant inference costs.
                </>
            }
        >
            <Overview />
            <Taxonomy />
            <SparselyGatedMoE />
            <ExpertCapacity />
            <LoadBalancing />
            <TokenDropping />
            <RoutingMechanisms />
            <MoEBeyondMLP />
            <ExpertParallelism />
            <PopularModels />
        </Article>
    );
}
