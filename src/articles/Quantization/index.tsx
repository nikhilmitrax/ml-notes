import React from 'react';
import Article from '../../components/Article';
import Overview from './sections/Overview';
import Fundamentals from './sections/Fundamentals';
import CalibrationAndData from './sections/CalibrationAndData';
import RoundingAndScaling from './sections/RoundingAndScaling';
import TrainingAware from './sections/TrainingAware';
import LLMQuantization from './sections/LLMQuantization';
import HardwareKernels from './sections/HardwareKernels';
import EvaluationDebugging from './sections/EvaluationDebugging';
import References from './sections/References';

export const section = 'coalesced';

export default function Quantization() {
    return (
        <Article
            title="Neural Network Quantization"
            description="Quantization reduces the numerical precision of neural network weights and activations, enabling dramatic improvements in memory footprint, inference latency, and energy consumption. This article covers the full spectrum from foundational concepts to LLM-specific methods like GPTQ, AWQ, and SmoothQuant, along with hardware realities and debugging strategies."
        >
            <Overview />
            <Fundamentals />
            <CalibrationAndData />
            <RoundingAndScaling />
            <TrainingAware />
            <LLMQuantization />
            <HardwareKernels />
            <EvaluationDebugging />
            <References />
        </Article>
    );
}
