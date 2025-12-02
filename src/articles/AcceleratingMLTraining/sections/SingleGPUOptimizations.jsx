import React from 'react';
import { Box, MemoryStick, Cpu, ChevronsLeftRight } from 'lucide-react';
import Section from '../../../components/Section';
import Header3 from '../../../components/Header3';
import List from '../../../components/List';
import ListItem from '../../../components/ListItem';


const Overview = () => {
    return (
        <Section title="Optimizations for Single GPU" icon={Box}>
            <Header3>Optimizations for Single GPU</Header3>

            There are two primary ways to optimize for single GPU training, primarily focused on reducing memory usage.

        </Section >
    );
};

export default Overview;
