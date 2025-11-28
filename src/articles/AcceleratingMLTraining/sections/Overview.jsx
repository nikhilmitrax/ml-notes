import React from 'react';
import { Box, MemoryStick, Cpu, ChevronsLeftRight } from 'lucide-react';
import Section from '../../../components/Section';
import Header3 from '../../../components/Header3';
import List from '../../../components/List';
import ListItem from '../../../components/ListItem';


const Overview = () => {
    return (
        <Section title="Overview" icon={Box}>
            <Header3>Scaling ML Training</Header3>

            There are primarily 3 things to focus on when scaling ML training,

            <div className="grid grid-cols-3 md:grid-cols-3 gap-4 my-4 bg-slate-50 dark:bg-slate-800">
                <div className="flex flex-col gap-2 px-2 py-4 bg-red-50 dark:bg-slate-800 rounded items-center">
                    <div className="flex items-center gap-2">
                        <MemoryStick size={24} className="text-red-800 dark:text-red-200" />
                        <b className='text-lg text-red-800 dark:text-red-200'>Memory usage</b>
                    </div>
                    <br />This is a hard limitation - if a training step doesn't fit in memory, training cannot proceed.
                </div>
                <div className="flex flex-col gap-2 px-2 py-4 bg-green-50 dark:bg-slate-800 rounded items-center">
                    <div className="flex items-center gap-2">
                        <ChevronsLeftRight size={24} className="text-green-800 dark:text-green-200" />
                        <b className='text-lg text-green-800 dark:text-green-200'>Communication overhead</b>
                    </div>
                    <br />We want to minimize communication overhead, as it keeps GPUs idle. To achieve this, we will try to make the best use of intra-node (fast) and inter-node (slower) bandwidths and to overlap communication with compute as much as possible.
                </div>
                <div className="flex flex-col gap-2 px-2 py-4 bg-blue-50 dark:bg-slate-800 rounded items-center">
                    <div className="flex items-center gap-2">
                        <Cpu size={24} className="text-blue-800 dark:text-blue-200" />
                        <b className='text-lg text-blue-800 dark:text-blue-200'>Compute efficiency</b>
                    </div>
                    <br />We want our hardware to spend most time computing, so we need to reduce time spent on data transfers or waiting for other GPUs to perform work.
                </div>
            </div>
        </Section >
    );
};

export default Overview;
