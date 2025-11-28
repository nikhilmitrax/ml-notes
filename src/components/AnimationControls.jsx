import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

const AnimationControls = ({ isPlaying, onTogglePlay, onReset }) => {
    return (
        <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm p-1.5 rounded-lg border border-slate-200 shadow-sm z-10">
            <button
                onClick={onTogglePlay}
                className="p-1.5 rounded-md hover:bg-slate-100 text-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-200"
                title={isPlaying ? "Pause" : "Play"}
            >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>
            <div className="w-px h-4 bg-slate-200 mx-0.5"></div>
            <button
                onClick={onReset}
                className="p-1.5 rounded-md hover:bg-slate-100 text-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-200"
                title="Reset"
            >
                <RotateCcw size={16} />
            </button>
        </div>
    );
};

export default AnimationControls;
