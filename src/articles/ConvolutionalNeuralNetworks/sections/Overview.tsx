import React from 'react';
import { Layers } from 'lucide-react';
import Section from '../../../components/Section';
import Header3 from '../../../components/Header3';
import Paragraph from '../../../components/Paragraph';
import List from '../../../components/List';
import ListItem from '../../../components/ListItem';
import ImageCard from '../../../components/ImageCard';


import { getAssetPath } from '../../../utils/assetUtils';

const Overview = () => {
    return (
        <Section title="Overview" icon={Layers}>
            <Paragraph className="mb-4">
                <strong>Convolutional Neural Networks (CNNs)</strong> are the foundational architecture for computer vision tasks. They exploit spatial structure through local connectivity, parameter sharing, and hierarchical feature learning.
            </Paragraph>

            <Header3>Why CNNs?</Header3>
            <List>
                <ListItem><strong>Local connectivity</strong> — each neuron connects only to a small spatial region, not the entire input</ListItem>
                <ListItem><strong>Parameter sharing</strong> — same filter weights applied across all spatial locations → massive reduction in parameters</ListItem>
                <ListItem><strong>Translation equivariance</strong> — shifting the input shifts the feature map correspondingly</ListItem>
                <ListItem><strong>Hierarchical features</strong> — early layers detect edges/textures, deeper layers detect parts/objects</ListItem>
            </List>

            <ImageCard src={getAssetPath("assets/CNN/convolution-animation-3x3-kernel.gif")} alt="3x3 Kernel Convolution Animation" caption="[1,1,1,1] Padding AKA 'Same' Convolution (Credit AnimatedAI)" />
        </Section>
    );
};

export default Overview;
