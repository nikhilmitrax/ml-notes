import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, ReferenceArea } from 'recharts';
import { Activity, Cpu, Database, Info } from 'lucide-react';
import Section from '../../../components/Section';
import Header3 from '../../../components/Header3';
import Paragraph from '../../../components/Paragraph';
import Callout from '../../../components/Callout';
import Equation from '../../../components/Equation';
import EquationBlock from '../../../components/EquationBlock';

const RooflineAnalysis = () => {
    // H100 Specs (FP8)
    const H100_PEAK_FLOPS = 2000; // TFLOPS
    const H100_BW = 3; // TB/s
    const H100_RIDGE = H100_PEAK_FLOPS / H100_BW; // ~666.67

    // TPU v7 Specs (FP8) - Estimated
    const TPUV7_PEAK_FLOPS = 4614; // TFLOPS
    const TPUV7_BW = 7.2; // TB/s
    const TPUV7_RIDGE = TPUV7_PEAK_FLOPS / TPUV7_BW; // ~640.8

    // Generate data points for the roofline plot
    // Log scale for X axis (Arithmetic Intensity)
    const generateData = () => {
        const data = [];
        const intensities = [0.1, 0.5, 1, 5, 10, 50, 100, 200, 400, 600, 800, 1000, 2000, 5000];

        intensities.forEach(ai => {
            // H100 Performance = min(Peak, BW * AI)
            const h100_perf = Math.min(H100_PEAK_FLOPS, H100_BW * ai);

            // TPU v7 Performance = min(Peak, BW * AI)
            const tpuv7_perf = Math.min(TPUV7_PEAK_FLOPS, TPUV7_BW * ai);

            data.push({
                ai: ai,
                h100: h100_perf,
                tpuv7: tpuv7_perf,
            });
        });
        return data;
    };

    const data = generateData();

    return (
        <Section title="Roofline Analysis" icon={Activity}>
            <Header3>Roofline Analysis & Arithmetic Intensity</Header3>
            <Paragraph>
                To understand the performance limits of our hardware and models, we use the <b>Roofline Model</b>.
                It relates the floating-point performance of a system to its memory bandwidth using a metric called <b>Arithmetic Intensity</b>.
            </Paragraph>

            <Header3>Arithmetic Intensity</Header3>
            <Paragraph>
                Arithmetic Intensity is the ratio of floating-point operations (FLOPs) performed to the amount of data (Bytes) moved from memory.
            </Paragraph>

            <EquationBlock>
                <Equation>{`\\text{Arithmetic Intensity} = \\frac{\\text{FLOPs}}{\\text{Bytes}}`}</Equation>
            </EquationBlock>

            <Paragraph>
                It tells us how much "work" we do for every byte of data we fetch.
                <br />
                - <b>Low Intensity:</b> We fetch a lot of data but do little math (e.g., element-wise operations like activation functions). These are <b>Memory Bound</b>.
                <br />
                - <b>High Intensity:</b> We do a lot of math for every byte fetched (e.g., large matrix multiplications). These are <b>Compute Bound</b>.
            </Paragraph>

            <Header3>The Roofline Plot</Header3>
            <Paragraph>
                The Roofline Plot visualizes the attainable performance (in TFLOPS) as a function of Arithmetic Intensity.
                <br />
                - The <b>slanted part</b> represents the <b>Memory Wall</b>: Performance is limited by how fast we can feed data to the cores.
                <br />
                - The <b>flat part</b> represents the <b>Compute Wall</b>: Performance is limited by the raw speed of the compute units.
            </Paragraph>

            <div className="h-96 w-full min-w-0 bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700 my-6">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={data}
                        margin={{ top: 20, right: 30, left: 80, bottom: 40 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                        <XAxis
                            dataKey="ai"
                            type="number"
                            scale="log"
                            domain={['auto', 'auto']}
                            tickFormatter={(tick) => tick}
                            label={{ value: 'Arithmetic Intensity (FLOPs/Byte)', position: 'insideBottom', offset: -5 }}
                        />
                        <YAxis
                            type="number"
                            scale="log"
                            domain={['auto', 'auto']}
                            tickFormatter={(tick) => tick}
                            label={{ value: 'Performance (TFLOPS)', angle: -90, position: 'insideLeft' }}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#f8fafc' }}
                            formatter={(value) => [`${value.toFixed(1)} TFLOPS`, '']}
                            labelFormatter={(label) => `Intensity: ${label} FLOPs/Byte`}
                        />
                        <Legend verticalAlign="top" height={36} />
                        <Line type="monotone" dataKey="h100" stroke="#8884d8" strokeWidth={3} name="NVIDIA H100 (FP8)" dot={false} activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="tpuv7" stroke="#82ca9d" strokeWidth={3} name="Google TPU v7 (FP8)" dot={false} activeDot={{ r: 8 }} />

                        {/* Annotations for Memory Bound vs Compute Bound */}
                        <ReferenceLine x={H100_RIDGE} stroke="red" strokeDasharray="3 3" label={{ position: 'top', value: 'H100 Ridge', fill: 'red', fontSize: 12 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <Callout type="info" title="Chip Comparison: H100 vs B200 vs TPU v6/v7">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left text-slate-500 dark:text-slate-400">
                        <thead className="text-xs text-slate-700 uppercase bg-slate-100 dark:bg-slate-700 dark:text-slate-400">
                            <tr>
                                <th scope="col" className="px-4 py-2 rounded-tl-lg">Chip</th>
                                <th scope="col" className="px-4 py-2">Peak Compute</th>
                                <th scope="col" className="px-4 py-2">Precision</th>
                                <th scope="col" className="px-4 py-2">Bandwidth</th>
                                <th scope="col" className="px-4 py-2 rounded-tr-lg">Ridge Point</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white border-b dark:bg-slate-800 dark:border-slate-700">
                                <td className="px-4 py-2 font-medium text-slate-900 dark:text-white">NVIDIA H100 (SXM5)</td>
                                <td className="px-4 py-2">1,979 TFLOPS</td>
                                <td className="px-4 py-2">FP8</td>
                                <td className="px-4 py-2">3.35 TB/s</td>
                                <td className="px-4 py-2">~590</td>
                            </tr>
                            <tr className="bg-white border-b dark:bg-slate-800 dark:border-slate-700">
                                <td className="px-4 py-2 font-medium text-slate-900 dark:text-white">NVIDIA B200 (SXM)</td>
                                <td className="px-4 py-2">4,500 TFLOPS</td>
                                <td className="px-4 py-2">FP8</td>
                                <td className="px-4 py-2">8.0 TB/s</td>
                                <td className="px-4 py-2">~562</td>
                            </tr>
                            <tr className="bg-white border-b dark:bg-slate-800 dark:border-slate-700">
                                <td className="px-4 py-2 font-medium text-slate-900 dark:text-white">Google TPU v6 (Trillium)</td>
                                <td className="px-4 py-2">918 TFLOPS</td>
                                <td className="px-4 py-2">BF16</td>
                                <td className="px-4 py-2">1.6 TB/s</td>
                                <td className="px-4 py-2">~574</td>
                            </tr>
                            <tr className="bg-white dark:bg-slate-800">
                                <td className="px-4 py-2 font-medium text-slate-900 dark:text-white">Google TPU v7 (Ironwood)</td>
                                <td className="px-4 py-2">4,614 TFLOPS</td>
                                <td className="px-4 py-2">FP8 (Est.)</td>
                                <td className="px-4 py-2">7.2 TB/s</td>
                                <td className="px-4 py-2">~641</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="mt-4 text-sm">
                    <b>Note:</b> Ridge Point = Peak Compute / Bandwidth. All chips hover around 550-650 FLOPs/Byte, indicating a similar balance between compute and memory capability for these low-precision formats.
                </p>
            </Callout>

            <Header3>Matrix Multiplication Intensity</Header3>
            <Paragraph>
                Most of the compute in LLM training comes from Matrix Multiplications (MatMuls). Let's analyze the intensity of a MatMul operation:
                <Equation>C = A \times B</Equation>, where <Equation>A: [M \times K]</Equation>, <Equation>B: [K \times N]</Equation>, <Equation>{`C: [M \\times N]`}</Equation>.
            </Paragraph>

            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg my-4">
                <Paragraph>
                    <b>Operations:</b> <Equation>{`2MKN`}</Equation> (Multiply and Add for each element)
                    <br />
                    <b>Memory Access:</b> <Equation>{`2(MK + KN + MN)`}</Equation> bytes (assuming FP16/BF16, 2 bytes per element. For FP8, it would be 1 byte).
                </Paragraph>
                <Paragraph>
                    <b>Arithmetic Intensity:</b>
                </Paragraph>
                <EquationBlock>
                    <Equation>{`\\frac{2MKN}{2(MK + KN + MN)} \\approx \\frac{MKN}{MK + KN + MN}`}</Equation>
                </EquationBlock>
                <Paragraph>
                    For large square matrices where <Equation>M=N=K</Equation>:
                </Paragraph>
                <EquationBlock>
                    <Equation>{`\\text{Intensity} \\approx \\frac{N ^ 3}{3N^2} = \\frac{N}{3}`}</Equation>
                </EquationBlock>
            </div>

            <Paragraph>
                This is crucial! As the matrix size <Equation>{`N`}</Equation> increases, the Arithmetic Intensity increases linearly.
                This explains why <b>larger batch sizes</b> and <b>larger model dimensions</b> help us utilize the GPU better.
                They push us to the right on the Roofline Plot, moving us from the Memory Bound region towards the Compute Bound region.
            </Paragraph>

        </Section>
    );
};

export default RooflineAnalysis;
