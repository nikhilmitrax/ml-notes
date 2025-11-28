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
    const [step, setStep] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setStep(s => (s + 1) % 8);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="grid grid-cols-4 gap-4 relative py-8">
            {[0, 1, 2, 3].map(i => (
                <Node key={i} id={i} data={`Chunk ${i}`} isActive={true} />
            ))}

            {[0, 1, 2, 3].map(i => {
                const next = (i + 1) % 4;
                const startLeft = i * 25 + 12.5;
                const endLeft = next * 25 + 12.5;

                return (
                    <motion.div
                        key={i}
                        className="absolute top-1/2 w-3 h-3 bg-teal-500 rounded-full z-10"
                        initial={{ left: `${startLeft}%`, opacity: 0 }}
                        animate={{
                            left: i === 3 ? ['87.5%', '12.5%'] : [`${startLeft}%`, `${endLeft}%`],
                            opacity: [0, 1, 1, 0]
                        }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    />
                );
            })}
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
