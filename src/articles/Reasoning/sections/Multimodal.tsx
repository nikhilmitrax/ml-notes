import React from 'react';
import { Image } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';
import EquationBlock from '../../../components/EquationBlock';
import Header3 from '../../../components/Header3';
import Paragraph from '../../../components/Paragraph';

export default function Multimodal() {
    return (
        <Section title="Multimodal Reasoning" icon={Image}>
            <div className="space-y-6">
                <Paragraph>
                    Multimodal reasoning integrates visual evidence <Equation>v</Equation> into the reasoning chain <Equation>z</Equation>:
                </Paragraph>
                <Equation block>
                    {`p_\\theta(y \\mid x,v) = \\sum_{z} p_\\theta(y \\mid x,v,z) p_\\theta(z \\mid x,v)`}
                </Equation>
                <Paragraph>
                    This requires <strong>grounding</strong>—linking abstract concepts to specific pixels or regions.
                </Paragraph>

                <Header3 className="text-2xl font-semibold text-slate-800 mt-8">Key Datasets</Header3>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>ScienceQA:</strong> Multi-choice science questions with images. Supports process-aware scoring (rationale evaluation).</li>
                    <li><strong>MathVista:</strong> Visual math and logic puzzles (geometry, charts). A stress test for Multimodal CoT.</li>
                    <li><strong>ChartQA:</strong> Numerical reasoning over data graphics.</li>
                    <li><strong>TextVQA:</strong> OCR-centric QA requiring reading text in images.</li>
                </ul>
                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mt-4">
                    <Paragraph className="text-amber-700 mb-0">
                        <strong>Challenge:</strong> Hallucinated perception. Models may "see" objects that aren't there. Mitigation involves requiring <strong>evidence extraction</strong> (OCR/bounding boxes) before reasoning.
                    </Paragraph>
                </div>
            </div>
        </Section>
    );
}
