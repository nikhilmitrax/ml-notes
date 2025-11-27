import React from 'react';
import Overview from './sections/Overview';
import Applications from './sections/Applications';
import ArchitecturalChallenges from './sections/ArchitecturalChallenges';
import Architecture from './sections/Architecture';
import TrainingProcess from './sections/TrainingProcess';
import FineTuningProcess from './sections/FineTuningProcess';
import Leaderboards from './sections/Leaderboards';
import PopularVLMs from './sections/PopularVLMs';
import PopularVideoLLMs from './sections/PopularVideoLLMs';
import AnyToAnyVLMs from './sections/AnyToAnyVLMs';
import ComparativeAnalysis from './sections/ComparativeAnalysis';
import FurtherReading from './sections/FurtherReading';

export const unfinished = true;

export default function VLM() {
    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Vision Language Models (VLMs)</h1>
            <Overview />
            <Applications />
            <ArchitecturalChallenges />
            <Architecture />
            <TrainingProcess />
            <FineTuningProcess />
            <Leaderboards />
            <PopularVLMs />
            <PopularVideoLLMs />
            <AnyToAnyVLMs />
            <ComparativeAnalysis />
            <FurtherReading />
        </div>
    );
}
