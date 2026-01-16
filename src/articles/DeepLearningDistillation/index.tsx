import React from 'react';
import Article from '../../components/Article';
import Overview from './sections/Overview';
import Foundations from './sections/Foundations';
import CoreVariants from './sections/CoreVariants';
import ArchitectureCapacity from './sections/ArchitectureCapacity';
import DataAndObjectives from './sections/DataAndObjectives';
import OptimizationMechanics from './sections/OptimizationMechanics';
import LLMDistillation from './sections/LLMDistillation';
import GenerativeDistillation from './sections/GenerativeDistillation';
import EfficiencyDeployment from './sections/EfficiencyDeployment';
import EvaluationDiagnostics from './sections/EvaluationDiagnostics';
import References from './sections/References';

export const section = 'coalesced';

export default function DeepLearningDistillation() {
    return (
        <Article
            title="Deep Learning Distillation Techniques"
            description="A comprehensive survey of distillation techniques in deep learning, from foundational concepts (temperature scaling, loss formulations) through core variants (logit, feature, relation, self, online), architectural considerations, LLM-specific methods (SeqKD, GKD, CoT, preference distillation), generative model distillation (DMD, DMD2), and practical deployment considerations."
        >
            <Overview />
            <Foundations />
            <CoreVariants />
            <ArchitectureCapacity />
            <DataAndObjectives />
            <OptimizationMechanics />
            <LLMDistillation />
            <GenerativeDistillation />
            <EfficiencyDeployment />
            <EvaluationDiagnostics />
            <References />
        </Article>
    );
}
