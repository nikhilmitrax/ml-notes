import React from 'react';
import Equation from '../../../components/Equation';

const DeepSeekArchitectureDiagram = () => {
    return (
        <div className="w-full overflow-x-auto my-8 p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
            <svg viewBox="-50 0 900 500" className="w-full min-w-[800px] font-sans">
                <defs>
                    <marker id="arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
                    </marker>
                    <marker id="arrow-green" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e" />
                    </marker>
                </defs>

                {/* --- Input --- */}
                <g transform="translate(300, 450)">
                    <rect x="-100" y="0" width="200" height="30" rx="15" fill="white" stroke="#334155" strokeWidth="1.5" />
                    <circle cx="-80" cy="15" r="8" fill="white" stroke="#334155" />
                    <circle cx="-50" cy="15" r="8" fill="white" stroke="#334155" />
                    <text x="0" y="20" textAnchor="middle" fontSize="14" fill="#334155">...</text>
                    <circle cx="50" cy="15" r="8" fill="white" stroke="#334155" />
                    <circle cx="80" cy="15" r="8" fill="white" stroke="#334155" />
                    <foreignObject x="-350" y="5" width="240" height="30">
                        <div className="flex justify-end items-center h-full text-sm font-bold text-slate-900">
                            Input Hidden <Equation inline>h_t</Equation>
                        </div>
                    </foreignObject>
                </g>

                {/* --- Latent Vectors (Level 1) --- */}
                {/* c_t^Q */}
                <g transform="translate(100, 380)">
                    <rect x="-60" y="0" width="120" height="24" rx="12" fill="white" stroke="#334155" strokeWidth="1.5" />
                    <circle cx="-40" cy="12" r="6" fill="white" stroke="#334155" />
                    <circle cx="-15" cy="12" r="6" fill="white" stroke="#334155" />
                    <text x="15" y="16" textAnchor="middle" fontSize="10" fill="#334155">...</text>
                    <circle cx="40" cy="12" r="6" fill="white" stroke="#334155" />
                    <foreignObject x="-150" y="5" width="80" height="30">
                        <div className="flex justify-end items-center h-full text-sm font-bold text-slate-900">
                            <Equation inline>c_t^Q</Equation>
                        </div>
                    </foreignObject>
                </g>

                {/* c_t^KV */}
                <g transform="translate(500, 380)">
                    <rect x="-60" y="0" width="120" height="24" rx="12" fill="white" stroke="#334155" strokeWidth="1.5" />
                    <circle cx="-40" cy="12" r="6" fill="white" stroke="#334155" />
                    <circle cx="-15" cy="12" r="6" fill="white" stroke="#334155" />
                    <text x="15" y="16" textAnchor="middle" fontSize="10" fill="#334155">...</text>
                    <circle cx="40" cy="12" r="6" fill="white" stroke="#334155" />
                    <foreignObject x="-150" y="5" width="80" height="30">
                        <div className="flex justify-end items-center h-full text-sm font-bold text-slate-900">
                            <Equation inline>{`c_t^{KV}`}</Equation>
                        </div>
                    </foreignObject>
                </g>

                {/* Lightning Indexer Path (Right side) */}
                <g transform="translate(650, 380)">
                    {/* q_t,j^I */}
                    <rect x="0" y="0" width="30" height="30" rx="4" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
                    <circle cx="15" cy="15" r="8" fill="#16a34a" fillOpacity="0.2" />
                    <foreignObject x="-10" y="35" width="50" height="20">
                        <div className="flex justify-center items-center h-full text-[10px] text-green-800">
                            <Equation inline>{`q_{t,j}^I`}</Equation>
                        </div>
                    </foreignObject>

                    {/* k_t^I */}
                    <rect x="50" y="0" width="30" height="30" rx="4" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
                    <circle cx="65" cy="15" r="8" fill="#16a34a" fillOpacity="0.2" />
                    <foreignObject x="40" y="35" width="50" height="20">
                        <div className="flex justify-center items-center h-full text-[10px] text-green-800">
                            <Equation inline>k_t^I</Equation>
                        </div>
                    </foreignObject>

                    {/* w_t,j */}
                    <rect x="100" y="0" width="30" height="30" rx="4" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
                    <circle cx="115" cy="15" r="2" fill="#166534" />
                    <foreignObject x="90" y="35" width="50" height="20">
                        <div className="flex justify-center items-center h-full text-[10px] text-green-800">
                            <Equation inline>{`w_{t,j}`}</Equation>
                        </div>
                    </foreignObject>
                </g>

                {/* --- Projections (Level 2) --- */}
                {/* q_t,i^C (Compressed Query) */}
                <g transform="translate(100, 320)">
                    <rect x="-40" y="0" width="80" height="20" rx="10" fill="white" stroke="#334155" strokeWidth="1.5" />
                    <circle cx="-20" cy="10" r="5" fill="white" stroke="#334155" />
                    <circle cx="20" cy="10" r="5" fill="white" stroke="#334155" />
                    <foreignObject x="-110" y="0" width="60" height="20">
                        <div className="flex justify-end items-center h-full text-xs font-bold text-slate-900">
                            <Equation inline>{`q_{t,i}^C`}</Equation>
                        </div>
                    </foreignObject>
                </g>

                {/* q_t,i^R (RoPE Query) */}
                <g transform="translate(250, 320)">
                    <rect x="-15" y="0" width="30" height="30" rx="4" fill="white" stroke="#334155" strokeWidth="1.5" />
                    <circle cx="0" cy="15" r="8" fill="white" stroke="#334155" />
                    <foreignObject x="25" y="0" width="60" height="20">
                        <div className="flex justify-start items-center h-full text-xs font-bold text-slate-900">
                            <Equation inline>{`q_{t,i}^R`}</Equation>
                        </div>
                    </foreignObject>
                    <text x="0" y="45" textAnchor="middle" fontSize="9" fill="#64748b">apply RoPE</text>
                </g>

                {/* k_t^R (RoPE Key) */}
                <g transform="translate(400, 320)">
                    <rect x="-15" y="0" width="30" height="30" rx="4" fill="white" stroke="#334155" strokeWidth="1.5" />
                    <circle cx="0" cy="15" r="8" fill="white" stroke="#334155" />
                    <foreignObject x="-80" y="0" width="60" height="20">
                        <div className="flex justify-end items-center h-full text-xs font-bold text-slate-900">
                            <Equation inline>{`k_t^R`}</Equation>
                        </div>
                    </foreignObject>
                    <text x="0" y="45" textAnchor="middle" fontSize="9" fill="#64748b">apply RoPE</text>
                </g>

                {/* --- Concatenation (Level 3) --- */}
                {/* [q^C; q^R] */}
                <g transform="translate(150, 250)">
                    <rect x="-60" y="0" width="120" height="24" rx="12" fill="white" stroke="#334155" strokeWidth="1.5" />
                    <circle cx="-40" cy="12" r="6" fill="white" stroke="#334155" />
                    <text x="0" y="16" textAnchor="middle" fontSize="10" fill="#334155">...</text>
                    <circle cx="40" cy="12" r="6" fill="white" stroke="#334155" />
                    <foreignObject x="-180" y="5" width="120" height="20">
                        <div className="flex justify-end items-center h-full text-xs font-bold text-slate-900">
                            <Equation inline>{`[q_{t,i}^C; q_{t,i}^R]`}</Equation>
                        </div>
                    </foreignObject>
                    <text x="0" y="35" textAnchor="middle" fontSize="9" fontStyle="italic" fill="#64748b">concatenate</text>
                </g>

                {/* [c^KV; k^R] */}
                <g transform="translate(450, 250)">
                    <rect x="-60" y="0" width="120" height="24" rx="12" fill="white" stroke="#334155" strokeWidth="1.5" />
                    <circle cx="-40" cy="12" r="6" fill="white" stroke="#334155" />
                    <text x="0" y="16" textAnchor="middle" fontSize="10" fill="#334155">...</text>
                    <circle cx="40" cy="12" r="6" fill="white" stroke="#334155" />
                    <foreignObject x="-180" y="5" width="120" height="20">
                        <div className="flex justify-end items-center h-full text-xs font-bold text-slate-900">
                            <Equation inline>{`[c_t^{KV}; k_t^R]`}</Equation>
                        </div>
                    </foreignObject>
                    <text x="0" y="35" textAnchor="middle" fontSize="9" fontStyle="italic" fill="#64748b">concatenate</text>
                </g>

                {/* --- Lightning Indexer & Selector --- */}
                <g transform="translate(680, 280)">
                    <rect x="0" y="0" width="80" height="40" rx="8" fill="#bbf7d0" stroke="#16a34a" strokeWidth="2" />
                    <text x="40" y="18" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0f172a">Lightning</text>
                    <text x="40" y="32" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0f172a">Indexer</text>
                </g>

                <g transform="translate(680, 240)">
                    {/* Bar chart icon */}
                    <rect x="-15" y="0" width="4" height="10" fill="#84cc16" />
                    <rect x="-8" y="-5" width="4" height="15" fill="#84cc16" />
                    <rect x="0" y="2" width="4" height="8" fill="#84cc16" />
                    <rect x="8" y="-8" width="4" height="18" fill="#84cc16" />
                </g>

                <g transform="translate(550, 200)">
                    <path d="M -60 0 L 60 0 L 70 24 L -70 24 Z" fill="#bbf7d0" stroke="#15803d" strokeWidth="2" />
                    <text x="0" y="17" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0f172a">Top-k Selector</text>
                </g>

                {/* --- Core Attention --- */}
                <g transform="translate(400, 140)">
                    <rect x="-380" y="0" width="760" height="30" rx="4" fill="#cbd5e1" stroke="#64748b" strokeWidth="1.5" />
                    <text x="0" y="20" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#0f172a">Multi-Query Attention (Core Attention)</text>
                </g>

                {/* --- Output --- */}
                <g transform="translate(400, 80)">
                    {/* o_t,i */}
                    <g transform="translate(50, 10)">
                        <rect x="0" y="0" width="60" height="20" rx="10" fill="white" stroke="#334155" strokeWidth="1.5" />
                        <circle cx="15" cy="10" r="5" fill="white" stroke="#334155" />
                        <circle cx="45" cy="10" r="5" fill="white" stroke="#334155" />
                        <foreignObject x="80" y="0" width="60" height="20">
                            <div className="flex justify-start items-center h-full text-xs font-bold text-slate-900">
                                <Equation inline>{`o_{t,i}`}</Equation>
                            </div>
                        </foreignObject>
                    </g>
                    {/* o_t,i^C */}
                    <g transform="translate(-100, 10)">
                        <rect x="0" y="0" width="80" height="20" rx="10" fill="white" stroke="#334155" strokeWidth="1.5" />
                        <circle cx="20" cy="10" r="5" fill="white" stroke="#334155" />
                        <text x="40" y="14" textAnchor="middle" fontSize="10" fill="#334155">...</text>
                        <circle cx="60" cy="10" r="5" fill="white" stroke="#334155" />
                        <foreignObject x="-80" y="0" width="60" height="20">
                            <div className="flex justify-end items-center h-full text-xs font-bold text-slate-900">
                                <Equation inline>{`o_{t,i}^C`}</Equation>
                            </div>
                        </foreignObject>
                    </g>
                </g>

                <g transform="translate(400, 40)">
                    <rect x="-100" y="0" width="200" height="30" rx="15" fill="white" stroke="#334155" strokeWidth="1.5" />
                    <circle cx="-80" cy="15" r="8" fill="white" stroke="#334155" />
                    <circle cx="-50" cy="15" r="8" fill="white" stroke="#334155" />
                    <text x="0" y="20" textAnchor="middle" fontSize="14" fill="#334155">...</text>
                    <circle cx="50" cy="15" r="8" fill="white" stroke="#334155" />
                    <circle cx="80" cy="15" r="8" fill="white" stroke="#334155" />
                    <foreignObject x="-350" y="5" width="240" height="30">
                        <div className="flex justify-end items-center h-full text-sm font-bold text-slate-900">
                            Output Hidden <Equation inline>u_t</Equation>
                        </div>
                    </foreignObject>
                </g>


                {/* --- Connections (Arrows) --- */}
                {/* Input to Latents */}
                <path d="M 300 450 L 300 430 L 100 430 L 100 404" fill="none" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrow)" /> {/* to Q */}
                <path d="M 300 450 L 300 430 L 500 430 L 500 404" fill="none" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrow)" /> {/* to KV */}
                <path d="M 300 450 L 300 430 L 665 430 L 665 410" fill="none" stroke="#22c55e" strokeWidth="1.5" markerEnd="url(#arrow-green)" /> {/* to Indexer q */}
                <path d="M 300 450 L 300 430 L 715 430 L 715 410" fill="none" stroke="#22c55e" strokeWidth="1.5" markerEnd="url(#arrow-green)" /> {/* to Indexer k */}
                <path d="M 300 450 L 300 430 L 765 430 L 765 410" fill="none" stroke="#22c55e" strokeWidth="1.5" markerEnd="url(#arrow-green)" /> {/* to Indexer w */}

                {/* Latent Q to Projections */}
                <path d="M 100 380 L 100 340" fill="none" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrow)" /> {/* to q^C */}
                <path d="M 100 380 L 100 360 L 250 360 L 250 350" fill="none" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrow)" /> {/* to q^R */}

                {/* Latent KV to Projections */}
                <path d="M 500 380 L 500 274" fill="none" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrow)" /> {/* to [c^KV; k^R] direct */}
                <path d="M 500 380 L 500 360 L 400 360 L 400 350" fill="none" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrow)" /> {/* to k^R */}

                {/* Projections to Concatenation */}
                <path d="M 100 320 L 100 290 L 130 290 L 130 274" fill="none" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrow)" />
                <path d="M 250 320 L 250 290 L 170 290 L 170 274" fill="none" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrow)" />

                <path d="M 400 320 L 400 290 L 470 290 L 470 274" fill="none" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrow)" />

                {/* Concatenation to Attention */}
                <path d="M 150 250 L 150 170" fill="none" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrow)" />
                <path d="M 450 250 L 450 224" fill="none" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrow)" /> {/* to Selector */}
                <path d="M 450 250 L 450 210 L 400 210 L 400 170" fill="none" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrow)" /> {/* to Attention */}

                {/* Indexer Flow */}
                <path d="M 665 380 L 665 360 L 700 360 L 700 320" fill="none" stroke="#22c55e" strokeWidth="1.5" markerEnd="url(#arrow-green)" />
                <path d="M 715 380 L 715 360 L 730 360 L 730 320" fill="none" stroke="#22c55e" strokeWidth="1.5" markerEnd="url(#arrow-green)" />
                <path d="M 765 380 L 765 360 L 750 360 L 750 320" fill="none" stroke="#22c55e" strokeWidth="1.5" markerEnd="url(#arrow-green)" />

                <path d="M 730 280 L 730 260" fill="none" stroke="#22c55e" strokeWidth="1.5" markerEnd="url(#arrow-green)" />
                <path d="M 730 240 L 730 230 L 620 230 L 620 224" fill="none" stroke="#22c55e" strokeWidth="1.5" markerEnd="url(#arrow-green)" />

                {/* Selector to Attention */}
                <path d="M 550 200 L 550 170" fill="none" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrow)" />

                {/* Attention to Output */}
                <path d="M 400 140 L 400 110" fill="none" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrow)" />
                <path d="M 400 80 L 400 70" fill="none" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrow)" />

            </svg>
        </div>
    );
};

export default DeepSeekArchitectureDiagram;
