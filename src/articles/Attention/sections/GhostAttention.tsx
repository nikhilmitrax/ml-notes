import React from 'react';
import { MessageSquare } from 'lucide-react';
import Section from '../../../components/Section';
import Header4 from '../../../components/Header4';
import Paragraph from '../../../components/Paragraph';

const GhostAttention = () => {
    return (
        <Section title="Instruction Following: Ghost Attention" icon={MessageSquare}>
            <Paragraph className="mb-4 text-slate-700 leading-relaxed">
                The authors of <strong>Llama 2</strong> proposed Ghost Attention (GAtt), an innovative technique designed to aid LLMs in remembering and adhering to initial instructions throughout a conversation.
            </Paragraph>
            <Paragraph className="mb-4 text-slate-700 leading-relaxed">
                This methodology extends the notion of <strong>Context Distillation</strong>, where specific details are distilled and highlighted from the broader context to enhance understanding.
            </Paragraph>

            <div className="bg-purple-50 p-6 rounded-lg border border-purple-100 mb-6">
                <Header4 className="font-semibold text-purple-900 mb-3">Mechanism</Header4>
                <Paragraph className="text-purple-800 mb-2">
                    In this technique, an instruction (e.g., "Always act as a pirate") is added to <strong>all</strong> user messages in a synthetic dialogue dataset. However, during training:
                </Paragraph>
                <ul className="list-disc list-inside text-sm text-purple-800 space-y-2 ml-4">
                    <li>The instruction is retained only in the <strong>first turn</strong>.</li>
                    <li>The loss is set to <strong>zero</strong> for all tokens from earlier turns.</li>
                </ul>
                <Paragraph className="text-purple-800 mt-2">
                    This trains the model to implicitly "attend" to the initial instruction throughout the dialogue without needing it explicitly repeated in the context window.
                </Paragraph>
            </div>

            <Header4 className="font-bold text-slate-800 mb-3">Example: Dental Clinic Bot</Header4>
            <div className="space-y-4 text-sm text-slate-700 border-l-4 border-slate-200 pl-4">
                <Paragraph><strong>Instruction:</strong> "Always ask about dental insurance."</Paragraph>

                <div className="space-y-2">
                    <Paragraph><span className="font-semibold text-blue-600">User:</span> "I need an appointment."</Paragraph>
                    <Paragraph><span className="font-semibold text-green-600">AI:</span> "Sure. Do you have a preferred date?"</Paragraph>
                </div>

                <div className="space-y-2">
                    <Paragraph><span className="font-semibold text-blue-600">User:</span> "Next Tuesday at 10 am."</Paragraph>
                    <Paragraph><span className="font-semibold text-green-600">AI:</span> "That works. <span className="bg-yellow-100 px-1 rounded">May I also ask if you have dental insurance?</span>"</Paragraph>
                </div>
            </div>
            <Paragraph className="mt-4 text-slate-600 text-sm">
                Even though the instruction wasn't repeated in the second turn, the model (trained with GAtt) remembers to ask about insurance.
            </Paragraph>
        </Section>
    );
};

export default GhostAttention;
