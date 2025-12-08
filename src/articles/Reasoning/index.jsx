import React from 'react';
import Article from '../../components/Article';

// Import Section Components
import Overview from './sections/Overview';
import InvokingReasoning from './sections/InvokingReasoning';
import PromptingBased from './sections/PromptingBased';
import DecodingBased from './sections/DecodingBased';
import SearchBased from './sections/SearchBased';
import ToolAugmented from './sections/ToolAugmented';
import RLBased from './sections/RLBased';
import AhaMoment from './sections/AhaMoment';
import Evaluation from './sections/Evaluation';
import GSM8K from './sections/GSM8K';
import MATH from './sections/MATH';
import AIME_IMO from './sections/AIME_IMO';
import ARC_ScienceQA from './sections/ARC_ScienceQA';
import OpenThoughts3 from './sections/OpenThoughts3';
import DROP from './sections/DROP';
import BIGBench from './sections/BIGBench';
import MMLU_AGIEval from './sections/MMLU_AGIEval';
import HELM from './sections/HELM';
import Multimodal from './sections/Multimodal';
import BenchmarksSummary from './sections/BenchmarksSummary';
import Challenges from './sections/Challenges';
import Blueprints from './sections/Blueprints';
import FailureAnalysis from './sections/FailureAnalysis';
import FurtherReading from './sections/FurtherReading';
import References from './sections/References';
import Citation from './sections/Citation';

export const unfinished = true;
export const section = 'coalesced';

export default function Reasoning() {
    return (
        <Article
            title="Reasoning in Large Language Models"
            description="From pattern matching to multi-step logic: how LLMs solve complex problems."
        >
            <div className="space-y-12">
                <Overview />
                <InvokingReasoning />
                <PromptingBased />
                <DecodingBased />
                <SearchBased />
                <ToolAugmented />
                <RLBased />
                <AhaMoment />

                <hr className="border-slate-200" />

                <Evaluation />
                <GSM8K />
                <MATH />
                <AIME_IMO />
                <ARC_ScienceQA />
                <OpenThoughts3 />
                <DROP />
                <BIGBench />
                <MMLU_AGIEval />
                <HELM />
                <Multimodal />
                <BenchmarksSummary />

                <hr className="border-slate-200" />

                <Challenges />
                <Blueprints />
                <FailureAnalysis />
                <FurtherReading />
                <References />
                <Citation />
            </div>
        </Article>
    );
}
