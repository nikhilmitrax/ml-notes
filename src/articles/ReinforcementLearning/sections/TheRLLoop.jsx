import React, { useState } from 'react';
import { Activity, Target, AlertTriangle, RotateCcw } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';
import InteractiveCard from '../../../components/InteractiveCard';

const GridWorld = () => {
    const [agentPos, setAgentPos] = useState({ x: 0, y: 0 });
    const [cumulativeReward, setCumulativeReward] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [message, setMessage] = useState("Explore the grid to find the goal!");

    const gridSize = 4;
    const goal = { x: 3, y: 2 }; // 0-indexed
    const pit = { x: 1, y: 1 };
    const wall = { x: 2, y: 1 };

    const reset = () => {
        setAgentPos({ x: 0, y: 0 });
        setCumulativeReward(0);
        setGameOver(false);
        setMessage("Explore the grid to find the goal!");
    };

    const move = (dx, dy) => {
        if (gameOver) return;

        const newX = Math.max(0, Math.min(gridSize - 1, agentPos.x + dx));
        const newY = Math.max(0, Math.min(gridSize - 1, agentPos.y + dy));

        // Wall collision
        if (newX === wall.x && newY === wall.y) {
            setMessage("Bonk! Hit a wall.");
            return;
        }

        setAgentPos({ x: newX, y: newY });

        let stepReward = -1; // Living cost
        let isTerminal = false;
        let msg = "Step taken (-1)";

        if (newX === goal.x && newY === goal.y) {
            stepReward += 10;
            isTerminal = true;
            msg = "Goal Reached! (+10)";
        } else if (newX === pit.x && newY === pit.y) {
            stepReward -= 10;
            isTerminal = true;
            msg = "Fell in a pit! (-10)";
        }

        setCumulativeReward(prev => prev + stepReward);
        setMessage(msg);

        if (isTerminal) {
            setGameOver(true);
        }
    };

    const renderGrid = () => {
        const cells = [];
        for (let y = 0; y < gridSize; y++) {
            for (let x = 0; x < gridSize; x++) {
                let content = null;
                let bgColor = 'bg-slate-100 dark:bg-slate-800';

                if (x === agentPos.x && y === agentPos.y) {
                    content = <div className="w-6 h-6 bg-blue-500 rounded-full animate-pulse" />;
                } else if (x === goal.x && y === goal.y) {
                    content = <Target className="w-6 h-6 text-green-500" />;
                    bgColor = 'bg-green-100 dark:bg-green-900/30';
                } else if (x === pit.x && y === pit.y) {
                    content = <AlertTriangle className="w-6 h-6 text-red-500" />;
                    bgColor = 'bg-red-100 dark:bg-red-900/30';
                } else if (x === wall.x && y === wall.y) {
                    bgColor = 'bg-slate-400 dark:bg-slate-600';
                }

                cells.push(
                    <div
                        key={`${x}-${y}`}
                        className={`w-12 h-12 border border-slate-200 dark:border-slate-700 flex items-center justify-center ${bgColor}`}
                    >
                        {content}
                    </div>
                );
            }
        }
        return cells;
    };

    return (
        <div className="flex flex-col items-center gap-6 p-4">
            <div className="flex gap-8 items-start">
                <div
                    className="grid gap-1"
                    style={{ gridTemplateColumns: `repeat(${gridSize}, min-content)` }}
                >
                    {renderGrid()}
                </div>

                <div className="flex flex-col gap-4 min-w-[200px]">
                    <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
                        <div className="text-sm text-slate-500 dark:text-slate-400">Cumulative Reward</div>
                        <div className={`text-2xl font-bold ${cumulativeReward > 0 ? 'text-green-500' : cumulativeReward < 0 ? 'text-red-500' : 'text-slate-900 dark:text-white'}`}>
                            {cumulativeReward}
                        </div>
                    </div>

                    <div className="text-sm font-medium text-slate-700 dark:text-slate-300 min-h-[1.5em]">
                        {message}
                    </div>

                    <div className="grid grid-cols-3 gap-2 w-fit mx-auto">
                        <div />
                        <button
                            onClick={() => move(0, -1)}
                            disabled={gameOver}
                            className="p-2 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 rounded disabled:opacity-50"
                        >
                            ↑
                        </button>
                        <div />
                        <button
                            onClick={() => move(-1, 0)}
                            disabled={gameOver}
                            className="p-2 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 rounded disabled:opacity-50"
                        >
                            ←
                        </button>
                        <button
                            onClick={() => move(0, 1)}
                            disabled={gameOver}
                            className="p-2 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 rounded disabled:opacity-50"
                        >
                            ↓
                        </button>
                        <button
                            onClick={() => move(1, 0)}
                            disabled={gameOver}
                            className="p-2 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 rounded disabled:opacity-50"
                        >
                            →
                        </button>
                    </div>

                    {gameOver && (
                        <button
                            onClick={reset}
                            className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
                        >
                            <RotateCcw size={16} /> Reset Environment
                        </button>
                    )}
                </div>
            </div>
            <p className="text-xs text-slate-500 max-w-md text-center">
                <strong>Rules:</strong> Start at (0,0). Reach the Goal <Target className="inline w-3 h-3" /> for +10. Avoid the Pit <AlertTriangle className="inline w-3 h-3" /> (-10). Each step costs -1 (to encourage shortest path).
            </p>
        </div>
    );
};

const TheRLLoop = () => {
    return (
        <Section title="The RL Loop" icon={Activity}>
            <p className="mb-6 leading-relaxed text-slate-700 dark:text-slate-300">
                At the core of RL is the interaction loop: The Agent observes the <strong>State</strong> <Equation>S_t</Equation>, takes an <strong>Action</strong> <Equation>A_t</Equation>,
                and receives a <strong>Reward</strong> <Equation>R_t</Equation> and the next State <Equation>{`S_{t+1}`}</Equation>.
            </p>

            <InteractiveCard title="Interactive Grid World Environment">
                <GridWorld />
            </InteractiveCard>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Agent</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">The learner or decision-maker (the blue dot).</p>
                </div>
                <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Environment</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">The world the agent interacts with (the grid, walls, pits).</p>
                </div>
                <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2">State (<Equation>s</Equation>)</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">A specific situation or configuration (e.g., coordinates x, y).</p>
                </div>
                <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Reward (<Equation>r</Equation>)</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Feedback signal indicating success or failure (+10, -10, -1).</p>
                </div>
            </div>
        </Section>
    );
};

export default TheRLLoop;
