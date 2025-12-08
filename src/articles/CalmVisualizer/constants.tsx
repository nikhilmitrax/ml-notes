import React from 'react';
import { Layers, Zap, Cpu, RefreshCcw } from 'lucide-react';

export const COLORS = {
    background: '#f8fafc', // Slate-50
    primary: '#3b82f6',    // Blue-500
    secondary: '#8b5cf6',  // Violet-500
    accent: '#f59e0b',     // Amber-500
    text: '#1e293b',       // Slate-800
    token: '#cbd5e1',      // Slate-300
    vector: '#8b5cf6',     // Violet-500
    success: '#22c55e',    // Green-500
};

export const STEPS = [
    {
        id: 'intro',
        title: 'The Status Quo: Discrete Tokens',
        icon: <Layers className="w-6 h-6" />,
        description: "Standard LLMs generate text one token at a time. This is sequential and computationally expensive. Each step predicts a probability distribution over a massive vocabulary.",
        cameraPos: [0, 2, 10],
    },
    {
        id: 'calm-concept',
        title: 'The Shift: CALM',
        icon: <Zap className="w-6 h-6" />,
        description: "Continuous Autoregressive Language Models (CALM) predict continuous vectors instead of discrete tokens. One vector represents a 'chunk' of K tokens.",
        cameraPos: [5, 2, 8],
    },
    {
        id: 'autoencoder',
        title: 'The Engine: Autoencoder',
        icon: <Cpu className="w-6 h-6" />,
        description: "A robust Autoencoder compresses K discrete tokens into a single dense vector. It uses variational regularization to ensure the latent space is smooth and learnable.",
        cameraPos: [0, 0, 12],
    },
    {
        id: 'comparison',
        title: 'Efficiency Comparison',
        icon: <RefreshCcw className="w-6 h-6" />,
        description: "By predicting vectors, CALM reduces the number of generative steps by a factor of K. Generating 1 vector is faster than generating K individual tokens.",
        cameraPos: [0, 4, 14],
    }
];
