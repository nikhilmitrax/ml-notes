import React from 'react';
import { Info } from 'lucide-react';
import Section from '../../../components/Section';

const RealWorldAdoption = () => {
    return (
        <Section title="Real-World Adoption" icon={Info}>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-slate-600">
                    <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                        <tr>
                            <th className="px-6 py-3 rounded-tl-lg">Encoding Type</th>
                            <th className="px-6 py-3">Key Mechanism</th>
                            <th className="px-6 py-3 rounded-tr-lg">Notable Models</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b">
                            <td className="px-6 py-4 font-medium text-slate-900">Learned Absolute</td>
                            <td className="px-6 py-4">Lookup Table</td>
                            <td className="px-6 py-4">BERT, GPT-2</td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-6 py-4 font-medium text-slate-900">Sinusoidal Absolute</td>
                            <td className="px-6 py-4">Fixed Frequencies</td>
                            <td className="px-6 py-4">Original Transformer, Whisper</td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-6 py-4 font-medium text-slate-900">T5 Relative</td>
                            <td className="px-6 py-4">Log-bucket Bias</td>
                            <td className="px-6 py-4">T5, Flan-T5</td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-6 py-4 font-medium text-slate-900">RoPE</td>
                            <td className="px-6 py-4">Complex Rotation</td>
                            <td className="px-6 py-4">Llama 2/3, Mistral, PaLM</td>
                        </tr>
                        <tr className="bg-white">
                            <td className="px-6 py-4 font-medium text-slate-900">AliBi</td>
                            <td className="px-6 py-4">Linear Bias</td>
                            <td className="px-6 py-4">MPT (Mosaic), BLOOM</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Section>
    );
};

export default RealWorldAdoption;
