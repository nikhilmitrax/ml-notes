import React from 'react';
import Article from '../../components/Article';
import Overview from './sections/Overview';
import ConvolutionFundamentals from './sections/ConvolutionFundamentals';
import CoreLayers from './sections/CoreLayers';
import CommonArchitectures from './sections/CommonArchitectures';
import AdvancedConvolutions from './sections/AdvancedConvolutions';
import TasksAndHeads from './sections/TasksAndHeads';
import TrainingOptimization from './sections/TrainingOptimization';
import ImplementationMechanics from './sections/ImplementationMechanics';
import EfficiencyDeployment from './sections/EfficiencyDeployment';
import InterpretabilityAnalysis from './sections/InterpretabilityAnalysis';

export const section = 'coalesced';

export default function ConvolutionalNeuralNetworks() {
    return (
        <Article
            title="Convolutional Neural Networks"
            description="A comprehensive technical reference on CNNs covering convolution fundamentals, core building blocks, classic and modern architectures, training strategies, efficiency techniques, and interpretability methods."
        >
            <Overview />
            <ConvolutionFundamentals />
            <CoreLayers />
            <CommonArchitectures />
            <AdvancedConvolutions />
            <TasksAndHeads />
            <TrainingOptimization />
            <ImplementationMechanics />
            <EfficiencyDeployment />
            <InterpretabilityAnalysis />
        </Article>
    );
}
