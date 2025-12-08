<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DeepSeek Sparse Attention & MLA: A Visual Guide</title>

    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>

    <!-- React & ReactDOM -->
    <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>

    <!-- Babel for JSX -->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

    <!-- KaTeX for Math -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
    <script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"></script>

    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;1,300&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

    <style>
        body {
            font-family: 'Merriweather', serif;
            color: #111827;
            background-color: #ffffff;
            line-height: 1.8;
        }
        h1, h2, h3, h4, h5, h6, .sans {
            font-family: 'Inter', sans-serif;
        }
        .math-display {
            overflow-x: auto;
            padding: 1rem 0;
        }
        /* Sidenote logic for large screens */
        @media (min-width: 1280px) {
            .sidenote-container {
                position: relative;
            }
            .sidenote {
                position: absolute;
                right: -280px;
                width: 240px;
                font-size: 0.85rem;
                line-height: 1.5;
                color: #6b7280;
                top: 0;
            }
        }
        @media (max-width: 1279px) {
            .sidenote {
                display: block;
                background: #f9fafb;
                padding: 1rem;
                margin: 1rem 0;
                border-left: 3px solid #e5e7eb;
                color: #4b5563;
                font-size: 0.9rem;
            }
        }
        
        .interactive-figure {
            font-family: 'Inter', sans-serif;
            background: #fcfcfc;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 1.5rem;
            margin: 2rem 0;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        }
    </style>
</head>
<body>

<div id="root"></div>

<script type="text/babel">
    const { useState, useEffect, useRef, useMemo } = React;

    // --- Components ---

    const Latex = ({ children, block = false }) => {
        const containerRef = useRef(null);

        useEffect(() => {
            if (containerRef.current && window.renderMathInElement) {
                containerRef.current.innerHTML = children; // Reset content
                window.renderMathInElement(containerRef.current, {
                    delimiters: [
                        {left: "$$", right: "$$", display: true},
                        {left: "$", right: "$", display: false}
                    ],
                    throwOnError: false
                });
            } else if (containerRef.current && window.katex) {
                 try {
                    window.katex.render(children, containerRef.current, {
                        displayMode: block,
                        throwOnError: false
                    });
                } catch (e) {
                    containerRef.current.textContent = children;
                }
            }
        }, [children, block]);

        return <span ref={containerRef} className={block ? "block text-center my-4 math-display" : "inline"} />;
    };

    const Sidenote = ({ children }) => {
        return (
            <div className="sidenote-container inline">
                <span className="text-blue-600 font-bold text-xs align-super cursor-help xl:hidden">*</span>
                <div className="sidenote">
                    {children}
                </div>
            </div>
        );
    };

    // --- Interactive 1: Lightning Indexer ---
    const LightningIndexerDemo = () => {
        const [hoveredIdx, setHoveredIdx] = useState(null);
        const [k, setK] = useState(3);
        const tokenCount = 12;
        
        // Generate stable random scores for visualization
        const scores = useMemo(() => {
            const arr = [];
            for (let i = 0; i < tokenCount; i++) {
                const row = [];
                for (let j = 0; j < tokenCount; j++) {
                    // Score is higher if indices are closer, plus some noise
                    const dist = Math.abs(i - j);
                    let base = 1.0 / (dist * 0.5 + 1);
                    row.push(Math.min(0.99, Math.max(0.01, base + (Math.random() * 0.4 - 0.2))));
                }
                arr.push(row);
            }
            return arr;
        }, []);

        const getStatus = (targetIdx, queryIdx) => {
            if (queryIdx === null) return 'neutral';
            if (targetIdx > queryIdx) return 'future';
            if (targetIdx === queryIdx) return 'query';
            
            // Determine if top-k
            // Rename variable 's' to 'scoreVal' to avoid any shadowing/reference errors
            const pastScores = scores[queryIdx].slice(0, queryIdx).map((scoreVal, i) => ({s: scoreVal, i}));
            pastScores.sort((a, b) => b.s - a.s);
            const topKIndices = pastScores.slice(0, k).map(x => x.i);
            
            return topKIndices.includes(targetIdx) ? 'selected' : 'skipped';
        };

        return (
            <div className="interactive-figure">
                <h3 className="text-lg font-bold mb-2">Interactive: The Lightning Indexer</h3>
                <p className="text-sm text-gray-600 mb-4">
                    Hover over a token (box) to see how the Lightning Indexer selects relevant past tokens. 
                    <br/>
                    <span className="inline-block w-3 h-3 bg-blue-500 rounded-sm mr-1"></span>Query 
                    <span className="inline-block w-3 h-3 bg-green-500 rounded-sm ml-3 mr-1"></span>Selected (Top-k) 
                    <span className="inline-block w-3 h-3 bg-gray-200 rounded-sm ml-3 mr-1"></span>Skipped
                </p>

                <div className="flex justify-center items-center space-x-4 mb-6">
                    <label className="text-sm font-semibold">Sparsity (Top-k): {k}</label>
                    <input 
                        type="range" min="1" max="6" value={k} 
                        onChange={(e) => setK(Number(e.target.value))} 
                        className="w-32 accent-blue-600"
                    />
                </div>

                <div className="flex flex-wrap justify-center gap-2 relative h-32 items-end">
                    {Array.from({ length: tokenCount }).map((_, idx) => {
                        const status = getStatus(idx, hoveredIdx);
                        let bgClass = "bg-white border-gray-300";
                        let height = "h-12";
                        let score = 0;
                        
                        if (hoveredIdx !== null && idx < hoveredIdx) {
                            score = scores[hoveredIdx][idx];
                        }

                        if (status === 'query') {
                            bgClass = "bg-blue-500 border-blue-600 text-white shadow-lg transform -translate-y-2";
                            height = "h-16";
                        } else if (status === 'selected') {
                            bgClass = "bg-green-500 border-green-600 text-white shadow-md";
                            height = "h-14";
                        } else if (status === 'skipped') {
                            bgClass = "bg-gray-100 border-gray-200 text-gray-400 opacity-50";
                        } else if (status === 'future') {
                            bgClass = "bg-gray-50 border-gray-100 opacity-20";
                        }

                        return (
                            <div 
                                key={idx}
                                onMouseEnter={() => setHoveredIdx(idx)}
                                onMouseLeave={() => setHoveredIdx(null)}
                                className={`w-10 ${height} border-2 rounded flex flex-col items-center justify-end p-1 transition-all duration-200 cursor-pointer ${bgClass}`}
                            >
                                {status === 'selected' && (
                                    <div className="text-[9px] mb-1 font-mono">{score.toFixed(2)}</div>
                                )}
                                <div className="text-xs font-bold">t<sub>{idx}</sub></div>
                            </div>
                        );
                    })}
                </div>
                
                <div className="mt-4 text-center h-8">
                     {hoveredIdx !== null ? (
                        <p className="text-sm text-gray-700">
                             {`For Query $t_{${hoveredIdx}}$, computing $I_{${hoveredIdx}, s}$. Selecting top ${k} past tokens.`}
                        </p>
                    ) : (
                        <p className="text-sm text-gray-400 italic">Hover over a token to activate the indexer.</p>
                    )}
                </div>
            </div>
        );
    };

    // --- Interactive 2: MLA Explorer ---
    const MLAExplorer = () => {
        const [mode, setMode] = useState('MLA'); // 'MHA' or 'MLA'

        return (
            <div className="interactive-figure">
                <h3 className="text-lg font-bold mb-2">Architecture: MHA vs. MLA</h3>
                <p className="text-sm text-gray-600 mb-6">
                    Comparison of standard Multi-Head Attention (MHA) and DeepSeek's Multi-Head Latent Attention (MLA).
                    Notice how MLA compresses the Key-Value cache.
                </p>

                <div className="flex justify-center space-x-8 mb-8">
                    <button 
                        onClick={() => setMode('MHA')}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${mode === 'MHA' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    >
                        Standard MHA
                    </button>
                    <button 
                        onClick={() => setMode('MLA')}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${mode === 'MLA' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    >
                        DeepSeek MLA
                    </button>
                </div>

                <div className="flex justify-center items-center h-64 relative">
                    {/* Common Input */}
                    <div className="absolute left-10 flex flex-col items-center">
                        <div className="w-16 h-48 bg-gray-200 border-2 border-gray-400 rounded flex items-center justify-center text-xs font-bold text-gray-600 writing-vertical">
                            Input Hidden State ($h_t$)
                        </div>
                    </div>

                    {/* Arrows */}
                    <svg className="absolute w-full h-full pointer-events-none">
                        <defs>
                            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                                <polygon points="0 0, 10 3.5, 0 7" fill="#9CA3AF" />
                            </marker>
                        </defs>
                        {/* Lines depend on mode */}
                        {mode === 'MHA' ? (
                            <>
                                <line x1="20%" y1="50%" x2="40%" y2="20%" stroke="#9CA3AF" strokeWidth="2" markerEnd="url(#arrowhead)" />
                                <line x1="20%" y1="50%" x2="40%" y2="50%" stroke="#9CA3AF" strokeWidth="2" markerEnd="url(#arrowhead)" />
                                <line x1="20%" y1="50%" x2="40%" y2="80%" stroke="#9CA3AF" strokeWidth="2" markerEnd="url(#arrowhead)" />
                            </>
                        ) : (
                            <>
                                <line x1="20%" y1="50%" x2="35%" y2="50%" stroke="#9CA3AF" strokeWidth="2" markerEnd="url(#arrowhead)" />
                                <line x1="45%" y1="50%" x2="60%" y2="30%" stroke="#9CA3AF" strokeWidth="2" markerEnd="url(#arrowhead)" />
                                <line x1="45%" y1="50%" x2="60%" y2="70%" stroke="#9CA3AF" strokeWidth="2" markerEnd="url(#arrowhead)" />
                            </>
                        )}
                    </svg>

                    {/* Processing Blocks */}
                    {mode === 'MHA' ? (
                        <div className="absolute left-1/3 w-1/3 flex flex-col justify-between h-48 py-2">
                             <div className="bg-red-100 border-2 border-red-300 p-2 rounded text-center">
                                <div className="text-xs font-bold text-red-800">Query Heads</div>
                                <div className="text-[10px] text-red-600">Many params</div>
                             </div>
                             <div className="bg-green-100 border-2 border-green-300 p-2 rounded text-center">
                                <div className="text-xs font-bold text-green-800">Key Heads</div>
                                <div className="text-[10px] text-green-600">Heavy Cache</div>
                             </div>
                             <div className="bg-blue-100 border-2 border-blue-300 p-2 rounded text-center">
                                <div className="text-xs font-bold text-blue-800">Value Heads</div>
                                <div className="text-[10px] text-blue-600">Heavy Cache</div>
                             </div>
                        </div>
                    ) : (
                        <>
                            {/* MLA Compression */}
                            <div className="absolute left-[35%] top-[40%] bg-purple-100 border-2 border-purple-400 rounded p-2 flex flex-col items-center z-10 w-24">
                                <div className="text-[10px] font-bold text-purple-800 mb-1">Down Proj</div>
                                <div className="w-16 h-4 bg-purple-300 rounded mb-1"></div>
                                <div className="text-[9px] text-purple-600 italic">Compressed Latent</div>
                            </div>

                            {/* Up Projection */}
                             <div className="absolute left-[60%] w-1/4 flex flex-col justify-between h-40 py-4">
                                <div className="bg-green-50 border-2 border-green-200 border-dashed p-2 rounded text-center opacity-80">
                                    <div className="text-xs font-bold text-green-700">Generated Keys</div>
                                    <div className="text-[9px]">Up-projected on fly</div>
                                </div>
                                <div className="bg-blue-50 border-2 border-blue-200 border-dashed p-2 rounded text-center opacity-80">
                                    <div className="text-xs font-bold text-blue-700">Generated Values</div>
                                    <div className="text-[9px]">Up-projected on fly</div>
                                </div>
                             </div>
                        </>
                    )}
                </div>

                <div className="mt-4 p-3 bg-gray-50 rounded text-sm text-gray-700 border-l-4 border-indigo-500">
                    {mode === 'MHA' ? (
                        <span>
                            <strong>Impact:</strong> Massive KV Cache. Every head stores full dimensional Key and Value vectors for every token.
                            <br/><span className="text-red-600 font-mono">Memory ~ O(L × Heads × d_head)</span>
                        </span>
                    ) : (
                        <span>
                            <strong>Impact:</strong> Low-Rank Compression. We only store the tiny <em>Latent Vector</em>. Keys and Values are regenerated during computation.
                            <br/><span className="text-green-600 font-mono">Memory ~ O(L × d_compressed)</span> (Much smaller!)
                        </span>
                    )}
                </div>
            </div>
        );
    };

    // --- Interactive 3: Cost Chart ---
    const CostChart = () => {
        // Approximate data from Figure 3 of the paper
        const points = 10;
        const maxX = 128; // 128K context
        
        const dataDense = [];
        const dataSparse = [];
        
        for (let i = 0; i <= points; i++) {
            const x = (i / points) * maxX;
            // Dense: roughly linear growth (cost per token)
            const yDense = 0.05 + (0.60 * (x / maxX)); 
            // Sparse: very flat growth
            const ySparse = 0.05 + (0.13 * (x / maxX));
            
            dataDense.push({ x, y: yDense });
            dataSparse.push({ x, y: ySparse });
        }

        // SVG Helpers
        const width = 600;
        const height = 300;
        const padding = 40;
        
        const scaleX = (val) => padding + (val / maxX) * (width - 2 * padding);
        const scaleY = (val) => height - padding - (val / 0.8) * (height - 2 * padding);

        const makePath = (data) => {
            return "M " + data.map(p => `${scaleX(p.x)},${scaleY(p.y)}`).join(" L ");
        };

        return (
            <div className="interactive-figure">
                <h3 className="text-lg font-bold mb-2">Efficiency: Inference Cost vs Context Length</h3>
                <p className="text-sm text-gray-600 mb-6">
                    Cost per million tokens (Decoding) as context length increases to 128K. 
                    <span className="text-orange-500 font-bold ml-2">DeepSeek-V3.2 (Sparse)</span> remains efficient while 
                    <span className="text-blue-600 font-bold ml-2">V3.1 (Dense)</span> costs rise linearly.
                </p>
                
                <div className="overflow-x-auto flex justify-center">
                    <svg width={width} height={height} className="bg-white rounded border border-gray-100">
                        {/* Axes */}
                        <line x1={padding} y1={height-padding} x2={width-padding} y2={height-padding} stroke="#ccc" />
                        <line x1={padding} y1={height-padding} x2={padding} y2={padding} stroke="#ccc" />
                        
                        {/* Grid Lines */}
                        {[0, 32, 64, 96, 128].map(v => (
                            <g key={v}>
                                <line x1={scaleX(v)} y1={height-padding} x2={scaleX(v)} y2={padding} stroke="#f3f4f6" />
                                <text x={scaleX(v)} y={height-padding+20} fontSize="10" textAnchor="middle" fill="#666">{v}K</text>
                            </g>
                        ))}
                         {[0, 0.2, 0.4, 0.6, 0.8].map(v => (
                            <g key={v}>
                                <line x1={padding} y1={scaleY(v)} x2={width-padding} y2={scaleY(v)} stroke="#f3f4f6" />
                                <text x={padding-10} y={scaleY(v)+4} fontSize="10" textAnchor="end" fill="#666">${v}</text>
                            </g>
                        ))}

                        {/* Lines */}
                        <path d={makePath(dataDense)} fill="none" stroke="#2563eb" strokeWidth="3" />
                        <path d={makePath(dataSparse)} fill="none" stroke="#f97316" strokeWidth="3" />

                        {/* Labels */}
                        <text x={scaleX(100)} y={scaleY(0.6)} fill="#2563eb" fontSize="12" fontWeight="bold">V3.1 (Dense)</text>
                        <text x={scaleX(100)} y={scaleY(0.22)} fill="#f97316" fontSize="12" fontWeight="bold">V3.2 (Sparse)</text>
                        
                        {/* Axis Titles */}
                        <text x={width/2} y={height-5} fontSize="12" textAnchor="middle" fill="#333">Token Position</text>
                        <text transform={`translate(15, ${height/2}) rotate(-90)`} fontSize="12" textAnchor="middle" fill="#333">Cost ($)</text>
                    </svg>
                </div>
            </div>
        );
    };

    // --- Main Layout ---

    const App = () => {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <header className="max-w-3xl mx-auto text-center mb-16">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
                        DeepSeek Sparse Attention
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        Boosting long-context efficiency by ignoring what doesn't matter.
                    </p>
                    <div className="mt-6 flex justify-center space-x-4 text-sm text-gray-500 sans">
                        <span>Based on DeepSeek-V3.2-Exp</span>
                        <span>•</span>
                        <span>Visual Explainer</span>
                    </div>
                </header>

                {/* Abstract / Intro */}
                <article className="max-w-3xl mx-auto">
                    <div className="bg-slate-50 p-6 rounded-lg border-l-4 border-slate-900 mb-12 italic text-slate-700">
                        <strong>Abstract:</strong> Transformers struggle with long contexts because standard attention is quadratic, $O(L^2)$. 
                        DeepSeek-V3.2 introduces <strong>DeepSeek Sparse Attention (DSA)</strong>. By using a fast "Lightning Indexer" to select only the most relevant tokens, 
                        it reduces computation to $O(Lk)$ without sacrificing performance.
                    </div>

                    <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-8">1. The Quadratic Bottleneck</h2>
                    <p className="mb-6">
                        In a standard Transformer, every token attends to every previous token. As the sequence length ($L$) grows, the computation grows quadratically. 
                        For a 128K context window, a dense attention map is massive.
                    </p>
                    <p className="mb-6">
                        Most of these connections are noise. A query token usually only cares about a few specific keys. 
                        If we could find those keys <em>cheaply</em>, we could skip the expensive attention calculation for everything else.
                    </p>

                    <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-12">2. DeepSeek Sparse Attention (DSA)</h2>
                    <p className="mb-6">
                        DSA splits the attention process into two steps:
                    </p>
                    <ol className="list-decimal pl-6 mb-6 space-y-2">
                        <li><strong>Coarse Selection (The Lightning Indexer):</strong> A lightweight mechanism scans previous tokens and assigns a "relevance score".</li>
                        <li><strong>Fine-grained Attention:</strong> Standard attention is performed <em>only</em> on the top-$k$ tokens identified by the indexer.</li>
                    </ol>

                    <h3 className="text-lg font-bold text-slate-800 mb-3 mt-8">The Lightning Indexer</h3>
                    <p className="mb-4">
                        {'The indexer computes a score $I_{t,s}$ between a query token $t$ and a past token $s$. It uses a ReLU activation to enforce sparsity naturally.'}
                    </p>
                    
                    <Latex block={true}>
                        {'I_{t,s} = \\sum_{j=1}^{H^I} w_{t,j}^I \\cdot \\text{ReLU}(q_{t,j}^I \\cdot k_s^I)'}
                    </Latex>

                    <Sidenote>
                        The indexer uses fewer heads ($H^I$) and can run in FP8 precision, making it incredibly fast compared to the main attention block.
                    </Sidenote>

                    <LightningIndexerDemo />

                    <p className="mb-6">
                        Once the scores are computed, we select the set of indices where the score is in the top-$k$. 
                        The main attention output $u_t$ is then:
                    </p>
                    <Latex block={true}>
                        {'u_t = \\text{Attn}(h_t, \\{c_s \\mid I_{t,s} \\in \\text{Top-}k(I_{t,\\cdot})\\})'}
                    </Latex>

                    <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-12">3. The Foundation: Multi-Head Latent Attention (MLA)</h2>
                    <p className="mb-6">
                        DSA isn't built on standard Multi-Head Attention (MHA). It is instantiated under <strong>MLA</strong>, 
                        an architecture introduced in DeepSeek-V2 to solve the memory bottleneck of the Key-Value (KV) cache.
                    </p>
                    <p className="mb-6">
                        In standard MHA, every head has its own Key and Value matrices. Storing these for 128K tokens consumes massive GPU memory. 
                        MLA compresses these heads into a single low-rank "Latent Vector".
                    </p>

                    <MLAExplorer />

                    <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-12">4. Performance Results</h2>
                    <p className="mb-6">
                        The combination of MLA (memory efficiency) and DSA (compute efficiency) leads to dramatic gains.
                        Core attention complexity drops from $O(L^2)$ to roughly $O(Lk)$.
                    </p>
                    <p className="mb-6">
                        As shown below, the inference cost for DeepSeek-V3.2 remains nearly flat as context length increases, 
                        whereas the previous dense version (V3.1) sees linear cost growth per token generated.
                    </p>

                    <CostChart />

                    <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-12">Conclusion</h2>
                    <p className="mb-8">
                        DeepSeek-V3.2 demonstrates that full dense attention is not necessary for long-context performance. 
                        By intelligently indexing the context with a lightweight "Lightning Indexer" and maintaining a compressed KV cache via MLA, 
                        we can achieve state-of-the-art efficiency.
                    </p>
                    
                    <hr className="border-gray-200 mb-8" />
                    <p className="text-xs text-gray-500 text-center">
                        Generated for educational purposes. Based on <em>DeepSeek-V3.2-Exp: Boosting Long-Context Efficiency with DeepSeek Sparse Attention</em>.
                    </p>
                </article>
            </div>
        );
    };

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<App />);
</script>

<script>
    // Initialize Lucide icons
    lucide.createIcons();
</script>

</body>
</html>
