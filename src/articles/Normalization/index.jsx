import React from 'react';
import Article from '../../components/Article';
import VisualComparison from './sections/VisualComparison';
import QuickComparison from './sections/QuickComparison';
import BatchNormalization from './sections/BatchNormalization';
import LayerNormalization from './sections/LayerNormalization';
import GroupNormalization from './sections/GroupNormalization';
import DecisionGuide from './sections/DecisionGuide';

export const unfinished = true;

export default function Normalization() {
    return (
        <Article
            title="Normalization: Batch vs Layer vs Group"
            description="Normalization is a critical component in training deep neural networks. It stabilizes learning, enables higher learning rates, and acts as a regularizer. But with so many variants—BatchNorm, LayerNorm, GroupNorm—which one should you use?"
        >
            <VisualComparison />
            <QuickComparison />
            <BatchNormalization />
            <LayerNormalization />
            <GroupNormalization />
            <DecisionGuide />
        </Article>
    );
}
