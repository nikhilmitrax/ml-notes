import React from 'react';
import { Box } from 'lucide-react';
import Section from '../../../components/Section';
import Header3 from '../../../components/Header3';
import List from '../../../components/List';
import ListItem from '../../../components/ListItem';


const Overview = () => {
    return (
        <Section title="Overview" icon={Box}>
            <Header3>Scaling ML Training</Header3>

            There are primarily 3 things to focus on when scaling ML training,
            <List>
                <ListItem><b>Memory usage</b>
                    <br />This is a hard limitation - if a training step doesn't fit in memory, training cannot proceed.</ListItem>
                <ListItem><b>Compute efficiency</b>
                    <br />We want our hardware to spend most time computing, so we need to reduce time spent on data transfers or waiting for other GPUs to perform work.</ListItem>
                <ListItem><b>Communication overhead</b>
                    <br />We want to minimize communication overhead, as it keeps GPUs idle. To achieve this, we will try to make the best use of intra-node (fast) and inter-node (slower) bandwidths and to overlap communication with compute as much as possible.</ListItem>
            </List>
        </Section >
    );
};

export default Overview;
