import React from 'react';
import { Sigma } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';
import EquationBlock from '../../../components/EquationBlock';
import Header3 from '../../../components/Header3';
import Header4 from '../../../components/Header4';
import Paragraph from '../../../components/Paragraph';
import List from '../../../components/List';
import ListItem from '../../../components/ListItem';

export default function MATH() {
    return (
        <Section title="MATH (competition-level mathematical reasoning)" icon={Sigma}>
            <div className="space-y-6">
                <Paragraph>
                    The <strong>MATH dataset</strong> (<a href="https://arxiv.org/abs/2103.03874" className="text-blue-600 hover:underline">Hendrycks et al., 2021</a>) is significantly harder than GSM8K. It contains 12,500 problems from mathematics competitions (AMC 10, AMC 12, AIME), covering algebra, geometry, number theory, and calculus.
                </Paragraph>

                <Header3 className="text-2xl font-semibold text-slate-800 mt-8">Why it is hard</Header3>
                <List>
                    <ListItem><strong>Symbolic Manipulation:</strong> Requires handling LaTeX and abstract variables, not just arithmetic.</ListItem>
                    <ListItem><strong>Implicit Knowledge:</strong> Models must know theorems (e.g., "sum of angles in a triangle is 180°") without being told.</ListItem>
                    <ListItem><strong>Planning:</strong> Solutions often require 5-10 logical steps.</ListItem>
                </List>

                <Header3 className="text-2xl font-semibold text-slate-800 mt-8">Comparison: GSM8K vs. MATH</Header3>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left text-slate-600">
                        <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                            <tr>
                                <th className="px-6 py-3">Feature</th>
                                <th className="px-6 py-3">GSM8K</th>
                                <th className="px-6 py-3">MATH</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white border-b">
                                <td className="px-6 py-4 font-medium text-slate-900">Source</td>
                                <td className="px-6 py-4">Created by human writers</td>
                                <td className="px-6 py-4">Competition mathematics</td>
                            </tr>
                            <tr className="bg-white border-b">
                                <td className="px-6 py-4 font-medium text-slate-900">Solution style</td>
                                <td className="px-6 py-4">Natural language steps</td>
                                <td className="px-6 py-4">Formal math derivations</td>
                            </tr>
                            <tr className="bg-white border-b">
                                <td className="px-6 py-4 font-medium text-slate-900">Difficulty</td>
                                <td className="px-6 py-4">Grade-school</td>
                                <td className="px-6 py-4">High school to college</td>
                            </tr>
                            <tr className="bg-white border-b">
                                <td className="px-6 py-4 font-medium text-slate-900">Step annotation</td>
                                <td className="px-6 py-4">Implicit</td>
                                <td className="px-6 py-4">Explicit (LaTeX and text)</td>
                            </tr>
                            <tr className="bg-white border-b">
                                <td className="px-6 py-4 font-medium text-slate-900">Evaluation</td>
                                <td className="px-6 py-4">Numeric EM, verifier</td>
                                <td className="px-6 py-4">Symbolic EM, reasoning trace verification</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <Header4 className="text-xl font-semibold text-slate-800 mt-6">Recommended Reporting</Header4>
                <List>
                    <ListItem>Report both <strong>accuracy</strong> and <strong>step-consistency</strong> metrics.</ListItem>
                    <ListItem>Include <strong>per-topic breakdowns</strong> (algebra, geometry, etc.).</ListItem>
                    <ListItem>Use <strong>symbolic equivalence checks</strong> for fairness.</ListItem>
                    <ListItem>Where applicable, publish verifier logs and intermediate derivations for transparency.</ListItem>
                </List>
            </div>
        </Section>
    );
}
