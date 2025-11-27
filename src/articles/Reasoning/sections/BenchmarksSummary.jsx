import React from 'react';
import { List } from 'lucide-react';
import Section from '../../../components/Section';

export default function BenchmarksSummary() {
    return (
        <Section title="Summary of Reasoning Benchmarks" icon={List}>
            <div className="space-y-6">
                <p>
                    No single dataset captures "reasoning." We can taxonomize them by domain and evaluation type:
                </p>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left text-slate-600">
                        <thead className="text-xs text-slate-700 uppercase bg-slate-100">
                            <tr>
                                <th className="px-4 py-2">Tier</th>
                                <th className="px-4 py-2">Dataset</th>
                                <th className="px-4 py-2">Domain</th>
                                <th className="px-4 py-2">Process Eval?</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white border-b">
                                <td className="px-4 py-2">1</td>
                                <td className="px-4 py-2 font-medium text-slate-900">GSM8K</td>
                                <td className="px-4 py-2">Arithmetic</td>
                                <td className="px-4 py-2 text-green-600">Yes (Verifier)</td>
                            </tr>
                            <tr className="bg-slate-50 border-b">
                                <td className="px-4 py-2">2</td>
                                <td className="px-4 py-2 font-medium text-slate-900">MATH</td>
                                <td className="px-4 py-2">Algebra/Symbolic</td>
                                <td className="px-4 py-2 text-green-600">Yes</td>
                            </tr>
                            <tr className="bg-white border-b">
                                <td className="px-4 py-2">3</td>
                                <td className="px-4 py-2 font-medium text-slate-900">AIME / IMO</td>
                                <td className="px-4 py-2">Olympiad Math</td>
                                <td className="px-4 py-2 text-green-600">Full (Proof)</td>
                            </tr>
                            <tr className="bg-slate-50 border-b">
                                <td className="px-4 py-2">4</td>
                                <td className="px-4 py-2 font-medium text-slate-900">ARC-AGI</td>
                                <td className="px-4 py-2">Abstract Pattern</td>
                                <td className="px-4 py-2 text-amber-600">Implicit</td>
                            </tr>
                            <tr className="bg-white border-b">
                                <td className="px-4 py-2">5</td>
                                <td className="px-4 py-2 font-medium text-slate-900">BBH</td>
                                <td className="px-4 py-2">Emergent Logic</td>
                                <td className="px-4 py-2 text-amber-600">Some</td>
                            </tr>
                            <tr className="bg-slate-50 border-b">
                                <td className="px-4 py-2">6</td>
                                <td className="px-4 py-2 font-medium text-slate-900">MMLU</td>
                                <td className="px-4 py-2">Knowledge</td>
                                <td className="px-4 py-2 text-red-600">No</td>
                            </tr>
                            <tr className="bg-white border-b">
                                <td className="px-4 py-2">7</td>
                                <td className="px-4 py-2 font-medium text-slate-900">HELM</td>
                                <td className="px-4 py-2">Holistic</td>
                                <td className="px-4 py-2 text-green-600">Yes (Multi-metric)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p>
                    <strong>Trend:</strong> Newer benchmarks (2023+) increasingly favor <strong>process-level evaluation</strong> (verifying the steps) over simple outcome accuracy, as this distinguishes genuine reasoning from memorization.
                </p>
            </div>
        </Section>
    );
}
