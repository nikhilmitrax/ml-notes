import React, { useState } from 'react';
import { Zap, ArrowRight } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';
import InteractiveCard from '../../../components/InteractiveCard';

const LatentSpaceExplorer = () => {
    const [latentX, setLatentX] = useState(0.5);
    const [latentY, setLatentY] = useState(0.5);

    // Simple "decoder" function that maps 2D latent space to visual traits
    // X axis -> Color (Blue to Red)
    // Y axis -> Shape size / Rotation

    const size = 40 + latentY * 60;
    const rotation = latentX * 180;
    const r = Math.floor(latentX * 255);
    const b = Math.floor((1 - latentX) * 255);
    const color = `rgb(${r}, 0, ${b})`;

    return (
        <div className="flex flex-col md:flex-row gap-8">
            {/* Latent Space Map */}
            <div className="flex-1 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700 relative h-64 cursor-crosshair group"
                onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = (e.clientX - rect.left) / rect.width;
                    const y = 1 - (e.clientY - rect.top) / rect.height; // Invert Y so up is 1
                    setLatentX(Math.max(0, Math.min(1, x)));
                    setLatentY(Math.max(0, Math.min(1, y)));
                }}
            >
                <div className="absolute inset-0 opacity-10 dark:opacity-20"
                    style={{ backgroundImage: 'radial-gradient(circle, #6366f1 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

                <div className="absolute text-xs text-gray-400 bottom-2 right-2">Latent Space (z)</div>

                {/* Cursor Point */}
                <div
                    className="absolute w-4 h-4 bg-white border-2 border-indigo-600 rounded-full shadow-lg transform -translate-x-1/2 -translate-y-1/2 transition-all duration-75 pointer-events-none"
                    style={{ left: `${latentX * 100}%`, top: `${(1 - latentY) * 100}%` }}
                />

                {/* Hover hints */}
                <div className="absolute top-2 left-2 text-xs font-mono text-gray-500 dark:text-gray-400 bg-white/80 dark:bg-gray-800/80 p-1 rounded backdrop-blur-sm">
                    z1: {latentX.toFixed(2)}, z2: {latentY.toFixed(2)}
                </div>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex items-center justify-center text-gray-400">
                <ArrowRight size={32} />
            </div>

            {/* Decoder Output */}
            <div className="flex-1 flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8 h-64">
                <div className="text-sm text-gray-400 mb-4 uppercase tracking-wider font-semibold">Reconstructed Data</div>
                <div
                    className="shadow-lg transition-all duration-200"
                    style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        backgroundColor: color,
                        transform: `rotate(${rotation}deg)`,
                        borderRadius: '12px'
                    }}
                />
                <div className="mt-6 text-xs text-gray-500 text-center">
                    Decoder(z) <br />
                    Color <Equation>\propto</Equation> z1, Size/Rot <Equation>\propto</Equation> z2
                </div>
            </div>
        </div>
    )
}

const LatentSpaceInterpolation = () => {
    return (
        <Section title="Latent Space Interpolation" icon={Zap}>
            <p className="mb-4">
                Because of the KL regularization, the latent space becomes dense and continuous. This allows us to walk smoothly
                between different data points. In this simplified simulation, explore a 2D latent space and see how the "decoder"
                smoothly transforms parameters based on coordinates.
            </p>

            <InteractiveCard title="Decoder Simulation">
                <LatentSpaceExplorer />
            </InteractiveCard>
        </Section>
    );
};

export default LatentSpaceInterpolation;
