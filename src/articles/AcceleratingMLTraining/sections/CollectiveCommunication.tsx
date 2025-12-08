import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Server,
    Share2,
    Upload,
    Download,
    RefreshCw,
    Minimize2,
    Circle,
    Cpu
} from 'lucide-react';
import Section from '../../../components/Section';
import InteractiveCard from '../../../components/InteractiveCard';
import Header3 from '../../../components/Header3';
import SideBySide from '../../../components/SideBySide';

// --- Internal Components ---

const Node = ({ id, data, isActive, isWaiting }) => (
    <div className={`
    relative flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-colors duration-300
    ${isActive ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'}
    ${isWaiting ? 'opacity-50' : 'opacity-100'}
  `}>
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded text-xs font-mono text-gray-500 dark:text-gray-400">
            GPU {id}
        </div>
        <Cpu className={`w-8 h-8 mb-2 ${isActive ? 'text-blue-500' : 'text-gray-400'}`} />
        <div className="h-16 flex flex-col items-center justify-center space-y-1 w-full">
            {Array.isArray(data) ? (
                <div className="flex flex-wrap justify-center gap-1">
                    {data.map((d, i) => (
                        <span key={i} className="text-xs font-bold bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded">
                            {d}
                        </span>
                    ))}
                </div>
            ) : (
                <span className="text-sm font-bold">{data || '-'}</span>
            )}
        </div>
    </div>
);

// --- Visualizers ---

const BroadcastVisualizer = () => {
    const [step, setStep] = useState(0);
    const [nodes, setNodes] = useState(['A', null, null, null]);

    useEffect(() => {
        const timer = setInterval(() => {
            setStep(s => (s + 1) % 3);
        }, 2000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (step === 0) setNodes(['A', null, null, null]);
        if (step === 1) setNodes(['A', 'A', 'A', 'A']);
    }, [step]);

    return (
        <div className="grid grid-cols-4 gap-4 relative py-8">
            {nodes.map((data, i) => (
                <Node key={i} id={i} data={data} isActive={i === 0 || step === 1} />
            ))}
            {step === 0 && (
                <>
                    <motion.div
                        className="absolute top-1/2 left-[12.5%] w-4 h-4 bg-blue-500 rounded-full z-10"
                        animate={{ left: ['12.5%', '37.5%'], opacity: [1, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <motion.div
                        className="absolute top-1/2 left-[12.5%] w-4 h-4 bg-blue-500 rounded-full z-10"
                        animate={{ left: ['12.5%', '62.5%'], opacity: [1, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <motion.div
                        className="absolute top-1/2 left-[12.5%] w-4 h-4 bg-blue-500 rounded-full z-10"
                        animate={{ left: ['12.5%', '87.5%'], opacity: [1, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                </>
            )}
        </div>
    );
};

const ReduceVisualizer = () => {
    const [step, setStep] = useState(0);
    const [nodes, setNodes] = useState([1, 2, 3, 4]);

    useEffect(() => {
        const timer = setInterval(() => {
            setStep(s => (s + 1) % 3);
        }, 2000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (step === 0) setNodes([1, 2, 3, 4]);
        if (step === 1) setNodes([10, 2, 3, 4]);
    }, [step]);

    return (
        <div className="grid grid-cols-4 gap-4 relative py-8">
            {nodes.map((data, i) => (
                <Node key={i} id={i} data={data} isActive={i === 0 && step === 1} />
            ))}
            {step === 0 && (
                <>
                    <motion.div
                        className="absolute top-1/2 left-[37.5%] w-4 h-4 bg-green-500 rounded-full z-10"
                        animate={{ left: ['37.5%', '12.5%'], opacity: [1, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <motion.div
                        className="absolute top-1/2 left-[62.5%] w-4 h-4 bg-green-500 rounded-full z-10"
                        animate={{ left: ['62.5%', '12.5%'], opacity: [1, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <motion.div
                        className="absolute top-1/2 left-[87.5%] w-4 h-4 bg-green-500 rounded-full z-10"
                        animate={{ left: ['87.5%', '12.5%'], opacity: [1, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                </>
            )}
        </div>
    );
};

const AllReduceVisualizer = () => {
    const [step, setStep] = useState(0);
    const [nodes, setNodes] = useState([1, 2, 3, 4]);

    useEffect(() => {
        const timer = setInterval(() => {
            setStep(s => (s + 1) % 4);
        }, 2000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (step === 0) setNodes([1, 2, 3, 4]);
        if (step === 1) setNodes([10, 2, 3, 4]);
        if (step === 2) setNodes([10, 10, 10, 10]);
    }, [step]);

    return (
        <div className="grid grid-cols-4 gap-4 relative py-8">
            {nodes.map((data, i) => (
                <Node key={i} id={i} data={data} isActive={step > 0} />
            ))}
            {step === 0 && (
                <>
                    {[1, 2, 3].map(i => (
                        <motion.div
                            key={`reduce-${i}`}
                            className="absolute top-1/2 w-4 h-4 bg-purple-500 rounded-full z-10"
                            style={{ left: `${i * 25 + 12.5}%` }}
                            initial={{ left: `${(i + 1) * 25 + 12.5}%` }}
                            animate={{ left: '12.5%', opacity: [1, 0] }}
                            transition={{ duration: 1.5 }}
                        />
                    ))}
                </>
            )}
            {step === 1 && (
                <>
                    {[1, 2, 3].map(i => (
                        <motion.div
                            key={`broadcast-${i}`}
                            className="absolute top-1/2 w-4 h-4 bg-purple-500 rounded-full z-10"
                            initial={{ left: '12.5%' }}
                            animate={{ left: `${(i + 1) * 25 + 12.5}%`, opacity: [1, 0] }}
                            transition={{ duration: 1.5 }}
                        />
                    ))}
                </>
            )}
        </div>
    );
};

const GatherVisualizer = () => {
    const [step, setStep] = useState(0);
    const [nodes, setNodes] = useState(['A', 'B', 'C', 'D']);

    useEffect(() => {
        const timer = setInterval(() => {
            setStep(s => (s + 1) % 3);
        }, 2000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (step === 0) setNodes(['A', 'B', 'C', 'D']);
        if (step === 1) setNodes([['A', 'B', 'C', 'D'], 'B', 'C', 'D']);
    }, [step]);

    return (
        <div className="grid grid-cols-4 gap-4 relative py-8">
            {nodes.map((data, i) => (
                <Node key={i} id={i} data={data} isActive={i === 0 && step === 1} />
            ))}
            {step === 0 && [1, 2, 3].map(i => (
                <motion.div
                    key={i}
                    className="absolute top-1/2 w-4 h-4 bg-orange-500 rounded-full z-10"
                    initial={{ left: `${i * 25 + 12.5}%` }}
                    animate={{ left: '12.5%', opacity: [1, 0] }}
                    transition={{ duration: 1.5 }}
                />
            ))}
        </div>
    );
};

const AllGatherVisualizer = () => {
    const [step, setStep] = useState(0);
    const [nodes, setNodes] = useState(['A', 'B', 'C', 'D']);

    useEffect(() => {
        const timer = setInterval(() => {
            setStep(s => (s + 1) % 3);
        }, 2000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (step === 0) setNodes(['A', 'B', 'C', 'D']);
        if (step === 1) setNodes([
            ['A', 'B', 'C', 'D'],
            ['A', 'B', 'C', 'D'],
            ['A', 'B', 'C', 'D'],
            ['A', 'B', 'C', 'D']
        ]);
    }, [step]);

    return (
        <div className="grid grid-cols-4 gap-4 relative py-8">
            {nodes.map((data, i) => (
                <Node key={i} id={i} data={data} isActive={step === 1} />
            ))}
            {step === 0 && (
                <div className="absolute inset-0 pointer-events-none">
                    {[0, 1, 2, 3].map(from =>
                        [0, 1, 2, 3].map(to => {
                            if (from === to) return null;
                            return (
                                <motion.div
                                    key={`${from}-${to}`}
                                    className="absolute top-1/2 w-3 h-3 bg-red-500 rounded-full z-10 opacity-50"
                                    initial={{ left: `${from * 25 + 12.5}%` }}
                                    animate={{ left: `${to * 25 + 12.5}%`, opacity: [0.5, 0] }}
                                    transition={{ duration: 1.5, delay: Math.random() * 0.5 }}
                                />
                            )
                        })
                    )}
                </div>
            )}
        </div>
    );
};

const ScatterVisualizer = () => {
    const [step, setStep] = useState(0);
    const [nodes, setNodes] = useState([['A', 'B', 'C', 'D'], null, null, null]);

    useEffect(() => {
        const timer = setInterval(() => {
            setStep(s => (s + 1) % 3);
        }, 2000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (step === 0) setNodes([['A', 'B', 'C', 'D'], null, null, null]);
        if (step === 1) setNodes(['A', 'B', 'C', 'D']);
    }, [step]);

    return (
        <div className="grid grid-cols-4 gap-4 relative py-8">
            {nodes.map((data, i) => (
                <Node key={i} id={i} data={data} isActive={step === 1} />
            ))}
            {step === 0 && [1, 2, 3].map(i => (
                <motion.div
                    key={i}
                    className="absolute top-1/2 w-4 h-4 bg-indigo-500 rounded-full z-10"
                    initial={{ left: '12.5%' }}
                    animate={{ left: `${i * 25 + 12.5}%`, opacity: [1, 0] }}
                    transition={{ duration: 1.5 }}
                />
            ))}
        </div>
    );
};

const ReduceScatterVisualizer = () => {
    const [step, setStep] = useState(0);
    const [nodes, setNodes] = useState([
        [1, 1, 1, 1],
        [2, 2, 2, 2],
        [3, 3, 3, 3],
        [4, 4, 4, 4]
    ]);

    useEffect(() => {
        const timer = setInterval(() => {
            setStep(s => (s + 1) % 3);
        }, 2500);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (step === 0) setNodes([
            [1, 1, 1, 1],
            [2, 2, 2, 2],
            [3, 3, 3, 3],
            [4, 4, 4, 4]
        ]);
        if (step === 1) setNodes([10, 10, 10, 10]);
    }, [step]);

    return (
        <div className="grid grid-cols-4 gap-4 relative py-8">
            {nodes.map((data, i) => (
                <Node key={i} id={i} data={data} isActive={step === 1} />
            ))}
            {step === 0 && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <motion.div
                        className="text-sm font-bold bg-white dark:bg-black px-2 py-1 rounded shadow"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1.2 }}
                        exit={{ opacity: 0 }}
                    >
                        Reduce + Scatter
                    </motion.div>
                </div>
            )}
        </div>
    );
};

const RingAllReduceVisualizer = () => {
    // 0-3: Scatter-Reduce steps
    // 4-7: All-Gather steps
    const [step, setStep] = useState(0);

    // Initial state: Each GPU has its own chunk of data
    // We'll track what chunks are on what GPU.
    // Format: Array of 4 arrays. nodes[i] = [chunk0, chunk1, chunk2, chunk3]
    // Values: 0 = empty/partial, 1 = own data, 2 = partial sum, 4 = full sum
    const [nodes, setNodes] = useState([
        ['C0', '', '', ''],
        ['', 'C1', '', ''],
        ['', '', 'C2', ''],
        ['', '', '', 'C3']
    ]);

    useEffect(() => {
        const timer = setInterval(() => {
            setStep(s => (s + 1) % 8);
        }, 1500);
        return () => clearInterval(timer);
    }, []);

    // Derived state for visualization based on step
    // We want to show the logical flow.
    // Scatter-Reduce:
    // Step 0: Initial
    // Step 1: GPU0->GPU1 (C0), GPU1->GPU2 (C1), GPU2->GPU3 (C2), GPU3->GPU0 (C3)
    // ...

    // Let's define the chunks present at each step explicitly for clarity
    const getChunks = (s) => {
        // Simple representation of "value" accumulation
        // Base: [C0, C1, C2, C3]

        // Scatter-Reduce Phase
        if (s === 0) return [
            ['C0', 'c1', 'c2', 'c3'], // GPU 0 has C0 (primary) and others (partial)
            ['c0', 'C1', 'c2', 'c3'],
            ['c0', 'c1', 'C2', 'c3'],
            ['c0', 'c1', 'c2', 'C3']
        ].map(row => row.map(c => c.toUpperCase())); // Start with full data everywhere? 
        // Actually, Ring AllReduce usually starts with everyone having a full vector, 
        // partitioned into chunks.
        // Let's visualize the *Chunks* specifically.
        // GPU i has Chunk j.

        // Let's simplify:
        // Everyone starts with [C0, C1, C2, C3] (all partials)
        // We want to reduce C0 on GPU?, C1 on GPU?...
        // Standard Ring AllReduce:
        // N nodes. Data split into N chunks.
        // Goal: Every node gets Sum(C0), Sum(C1), ... Sum(CN)

        // Phase 1: Scatter-Reduce
        // After N-1 steps, Node i has the complete Sum(Chunk i+1) (approx)

        const base = [['C0', 'C1', 'C2', 'C3'], ['C0', 'C1', 'C2', 'C3'], ['C0', 'C1', 'C2', 'C3'], ['C0', 'C1', 'C2', 'C3']];

        // This is hard to visualize perfectly with just text in boxes.
        // Let's stick to the "moving ball" concept but make it logical.
        // Show the "Active Chunk" moving and accumulating.

        return base;
    };

    return (
        <div className="flex flex-col space-y-8 py-8">
            <div className="flex justify-between items-center px-4">
                <div className="text-sm font-bold text-gray-500">
                    {step < 4 ? 'Phase 1: Scatter-Reduce' : 'Phase 2: All-Gather'}
                </div>
                <div className="text-xs text-gray-400">
                    Step {step % 4 + 1} / 4
                </div>
            </div>

            <div className="grid grid-cols-4 gap-4 relative">
                {[0, 1, 2, 3].map(i => (
                    <Node key={i} id={i} data={
                        <div className="grid grid-cols-2 gap-1 w-full">
                            {[0, 1, 2, 3].map(chunkIdx => {
                                // Determine status of this chunk on this GPU at this step
                                let status = 'partial'; // default

                                // Logic for Ring AllReduce State
                                // Target for Chunk k is Node k (arbitrary assignment for visualization)
                                // Let's say Node k ends up with Full Chunk k.

                                // Scatter-Reduce:
                                // Step 0: Send C0->N1, C1->N2, C2->N3, C3->N0
                                // ...

                                // Simplified visualization logic:
                                // Highlight the chunk that is being "worked on" or "completed"

                                const isTarget = chunkIdx === i;
                                const isCompleted = (step >= 4) || (step === 3 && isTarget); // Rough approx

                                // Better: explicitly define completion based on phases
                                let opacity = 0.3;
                                let color = 'bg-gray-200 dark:bg-gray-700';

                                // Phase 1: Accumulation
                                // By step 3, Node k has full Chunk k
                                if (step >= 3 && chunkIdx === (i + 1) % 4) {
                                    // Shifted target for visual flow? 
                                    // Let's stick to: Node i collects Chunk i.
                                }

                                // Let's just hardcode the "Full" chunks for clarity
                                // Phase 1 ends: 
                                // N0 has Full C0? Or N0 has Full C1?
                                // Standard: N(i) ends with Full C((i+1)%N)? Or similar.
                                // Let's assume Node i accumulates Chunk i.

                                if (step >= 4) {
                                    // All Gather Phase - spreading the full chunks
                                    if (chunkIdx === i) { opacity = 1; color = 'bg-green-500 text-white'; } // Owner
                                    else if (step >= 4 + ((chunkIdx - i + 4) % 4)) {
                                        opacity = 1; color = 'bg-green-500 text-white';
                                    }
                                } else {
                                    // Scatter Reduce Phase
                                    // Chunks are being summed.
                                    // Show "Active" chunks moving
                                    // At step s (0-3), chunk (i-s) is being sent to (i+1)

                                    // Just highlight the diagonal being processed?
                                    // Let's keep it static "Data" and show moving "Orbs" for the transfer
                                    opacity = 0.5;
                                }

                                // Override for "Completed" chunks in Phase 1
                                if (step >= 3 && chunkIdx === (i + 1) % 4) { // Example offset
                                    // It's complicated to map exactly without a complex state machine.
                                    // Let's simplify:
                                    // Phase 1: Diagonals turn Green (Accumulated)
                                    // Phase 2: Columns turn Green (Broadcast)
                                }

                                return (
                                    <div key={chunkIdx} className={`h-6 rounded flex items-center justify-center text-[10px] font-bold transition-colors duration-300 ${
                                        // Dynamic styling
                                        step >= 4
                                            ? ( // All Gather
                                                // If we have received the broadcast, turn green
                                                // Source is Node k (holding Chunk k)
                                                // Distance from source: (i - k + 4) % 4
                                                // Step in Phase 2: s_ag = step - 4
                                                // If distance <= s_ag, we have it.
                                                // Let's assume Node k holds Chunk k at start of Phase 2.
                                                ((i - chunkIdx + 4) % 4) <= (step - 4)
                                                    ? 'bg-green-500 text-white'
                                                    : 'bg-gray-200 dark:bg-gray-700 opacity-30'
                                            )
                                            : ( // Scatter Reduce
                                                // We are accumulating Chunk k on Node k.
                                                // Step s: Node (k-s-1) sends to Node (k-s)
                                                // Node k has accumulated (s+1) parts.
                                                // Let's just visualize "Partial" vs "Full"
                                                chunkIdx === i && step === 3
                                                    ? 'bg-blue-500 text-white' // Fully reduced on owner
                                                    : 'bg-gray-200 dark:bg-gray-700'
                                            )
                                        }`}>
                                        C{chunkIdx}
                                    </div>
                                );
                            })}
                        </div>
                    } isActive={true} />
                ))}

                {/* Flying Orbs for Data Transfer */}
                {[0, 1, 2, 3].map(i => {
                    // Logic for what is moving from Node i to Node (i+1)
                    const next = (i + 1) % 4;
                    const isScatterReduce = step < 4;
                    const localStep = step % 4;

                    // Scatter Reduce:
                    // Step 0: Node 0 sends C1 to Node 1? 
                    // Let's use the standard pattern:
                    // Step s: Node i sends Chunk (i - s + 4) % 4 ??
                    // Let's visualize a specific chunk moving.

                    // Simplified:
                    // Phase 1: Blue orbs moving.
                    // Phase 2: Green orbs moving.

                    if (localStep === 3 && isScatterReduce) return null; // Pause at end of phase
                    if (localStep === 3 && !isScatterReduce) return null; // Pause at end

                    return (
                        <motion.div
                            key={`${step}-${i}`}
                            className={`absolute top-1/2 w-4 h-4 rounded-full z-10 flex items-center justify-center text-[8px] font-bold text-white
                                ${isScatterReduce ? 'bg-blue-500' : 'bg-green-500'}
                            `}
                            initial={{ left: `${i * 25 + 12.5}%`, opacity: 1 }}
                            animate={{ left: `${next * 25 + 12.5}%`, opacity: 0 }} // Fade out as it arrives
                            transition={{ duration: 1, ease: "easeInOut" }}
                        >
                            {/* Label the moving chunk */}
                            {isScatterReduce
                                ? `C${(i - localStep + 1 + 4) % 4}` // Moving chunk in SR
                                : `C${(i - localStep + 4) % 4}`     // Moving chunk in AG
                            }
                        </motion.div>
                    );
                })}
            </div>

            <div className="text-center text-sm text-gray-500 h-6">
                {step < 4
                    ? "Nodes exchange partial gradients. Each node accumulates a specific chunk."
                    : "Nodes share their fully reduced chunks with the ring."}
            </div>
        </div>
    );
};

const BarrierVisualizer = () => {
    const [status, setStatus] = useState(['working', 'working', 'working', 'working']);

    useEffect(() => {
        const run = async () => {
            while (true) {
                setStatus(['working', 'working', 'working', 'working']);
                await new Promise(r => setTimeout(r, 1000));

                const order = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
                for (const idx of order) {
                    await new Promise(r => setTimeout(r, 500 + Math.random() * 500));
                    setStatus(prev => {
                        const next = [...prev];
                        next[idx] = 'waiting';
                        return next;
                    });
                }

                await new Promise(r => setTimeout(r, 500));
                setStatus(['proceeding', 'proceeding', 'proceeding', 'proceeding']);
                await new Promise(r => setTimeout(r, 1500));
            }
        };
        run();
    }, []);

    return (
        <div className="grid grid-cols-4 gap-4 relative py-8">
            {status.map((s, i) => (
                <Node
                    key={i}
                    id={i}
                    data={s === 'working' ? 'Crunching...' : s === 'waiting' ? 'Waiting' : 'Next Step'}
                    isActive={s === 'proceeding'}
                    isWaiting={s === 'waiting'}
                />
            ))}
            <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-red-500/50 border-l-2 border-dashed border-red-500" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-red-100 text-red-600 text-xs px-2 py-1 rounded">
                Synchronization Point
            </div>
        </div>
    );
};

const CollectiveCommunication = () => {
    return (
        <Section title="Collective Communication" icon={Server}>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
                Training modern machine learning models, especially Large Language Models (LLMs), requires massive computational resources.
                We often distribute the workload across hundreds or thousands of GPUs/TPUs.
                To make this work, these devices must communicate efficiently.
                <strong>Collective Communication</strong> primitives are the building blocks of this distributed coordination.
            </p>
            <p className="mb-8 text-gray-700 dark:text-gray-300">
                Libraries like <strong>NCCL</strong> (NVIDIA Collective Communications Library) and <strong>MPI</strong> (Message Passing Interface) implement these algorithms.
                Understanding them is key to debugging distributed training and optimizing performance.
            </p>

            <Header3>Broadcast</Header3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
                <strong>Broadcast</strong> sends data from one source node (root) to all other nodes in the group.
                This is commonly used to distribute model parameters from a parameter server to workers, or to ensure all workers start with the same random seed.
            </p>
            <InteractiveCard title="Broadcast Animation">
                <BroadcastVisualizer />
                <p className="mt-4 text-sm text-gray-500 text-center">
                    Node 0 sends its data "A" to Nodes 1, 2, and 3.
                </p>
            </InteractiveCard>

            <Header3>Reduce and AllReduce</Header3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
                <strong>Reduce</strong> combines data from all nodes into a single node using an operation like Sum, Min, Max, or Product.
                <strong>AllReduce</strong> performs a reduction and then broadcasts the result to all nodes, so everyone ends up with the final aggregated value.
            </p>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
                AllReduce is the workhorse of Data Parallel training. Gradients from all GPUs are summed up (Reduced) and then the updated weights (or averaged gradients) are available on all GPUs.
            </p>
            <SideBySide>
                <InteractiveCard title="Reduce (Sum)">
                    <ReduceVisualizer />
                    <p className="mt-4 text-sm text-gray-500 text-center">
                        Values are summed into Node 0.
                    </p>
                </InteractiveCard>
                <InteractiveCard title="AllReduce (Sum)">
                    <AllReduceVisualizer />
                    <p className="mt-4 text-sm text-gray-500 text-center">
                        Values are summed and result is shared with all.
                    </p>
                </InteractiveCard>
            </SideBySide>

            <Header3>Gather and AllGather</Header3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
                <strong>Gather</strong> collects data chunks from all nodes and concatenates them on a single root node.
                <strong>AllGather</strong> collects data from all nodes and ensures every node receives the full concatenated dataset.
            </p>
            <SideBySide>
                <InteractiveCard title="Gather">
                    <GatherVisualizer />
                    <p className="mt-4 text-sm text-gray-500 text-center">
                        Node 0 collects [A, B, C, D].
                    </p>
                </InteractiveCard>
                <InteractiveCard title="AllGather">
                    <AllGatherVisualizer />
                    <p className="mt-4 text-sm text-gray-500 text-center">
                        Everyone gets [A, B, C, D].
                    </p>
                </InteractiveCard>
            </SideBySide>

            <Header3>Scatter and ReduceScatter</Header3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
                <strong>Scatter</strong> takes a list of data on one node and slices it, sending one chunk to each node. It is the inverse of Gather.
                <strong>ReduceScatter</strong> is equivalent to a Reduce followed by a Scatter. It reduces the data (e.g., sums vectors) and then scatters the result blocks to the nodes.
            </p>
            <SideBySide>
                <InteractiveCard title="Scatter">
                    <ScatterVisualizer />
                    <p className="mt-4 text-sm text-gray-500 text-center">
                        Node 0 distributes [A, B, C, D].
                    </p>
                </InteractiveCard>
                <InteractiveCard title="ReduceScatter">
                    <ReduceScatterVisualizer />
                    <p className="mt-4 text-sm text-gray-500 text-center">
                        Vectors are summed, then split across nodes.
                    </p>
                </InteractiveCard>
            </SideBySide>

            <Header3>Ring AllReduce</Header3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
                A naive AllReduce (send everything to everyone) is bandwidth inefficient.
                <strong>Ring AllReduce</strong> is an optimized algorithm where nodes form a logical ring.
                Data is passed in chunks to neighbors. This balances bandwidth usage and is optimal for large payloads.
            </p>
            <InteractiveCard title="Ring Topology">
                <RingAllReduceVisualizer />
                <p className="mt-4 text-sm text-gray-500 text-center">
                    Data flows in a ring pattern to maximize bandwidth utilization.
                </p>
            </InteractiveCard>

            <Header3>Barrier</Header3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
                <strong>Barrier</strong> is a synchronization primitive. No process in the group can proceed past the barrier until all processes have reached it.
                This is crucial for ensuring that all nodes have finished a training step before starting the next one, preventing race conditions.
            </p>
            <InteractiveCard title="Barrier Synchronization">
                <BarrierVisualizer />
                <p className="mt-4 text-sm text-gray-500 text-center">
                    Fast nodes wait for slow nodes.
                </p>
            </InteractiveCard>
        </Section>
    );
};

export default CollectiveCommunication;
