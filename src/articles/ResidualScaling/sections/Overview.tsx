import React from 'react';
import { BookOpen } from 'lucide-react';
import Section from '../../../components/Section';
import Header3 from '../../../components/Header3';
import Paragraph from '../../../components/Paragraph';
import List from '../../../components/List';
import ListItem from '../../../components/ListItem';

const Overview = () => {
    return (
        <Section title="Introduction" icon={BookOpen}>
            <Header3>The Depth Scaling Imperative</Header3>
            <Paragraph>
                The pursuit of ever-deeper neural networks has been a defining theme in deep learning research. From the original 8-layer AlexNet to 152-layer ResNets, and now to Transformers scaled beyond 1,000 layers, depth has proven to be a crucial axis for model expressivity. Deeper networks can represent more complex hierarchical features, capture longer-range dependencies, and often achieve superior performance—provided they can be successfully trained.
            </Paragraph>
            <Paragraph>
                However, depth introduces fundamental optimization challenges. Without careful architectural design, training signals either explode or vanish as they propagate through hundreds of layers. The residual connection—pioneered by He et al. in ResNet—provided a breakthrough by allowing gradients to flow through identity shortcuts. But as we push to extreme depths (500+ layers), even standard residual connections encounter problems: variance explosion in the forward pass, gradient instability in the backward pass, and representation collapse that wastes model capacity.
            </Paragraph>

            <Header3>The Core Tension</Header3>
            <Paragraph>
                <strong>Residual scaling</strong> refers to a family of techniques that modify how information flows through residual connections to enable stable training at extreme depth. These methods navigate a fundamental tension:
            </Paragraph>
            <List>
                <ListItem>
                    <strong>Gradient Stability:</strong> At initialization, we want residual blocks to act nearly as identity functions. This keeps gradients well-behaved and enables signal propagation through hundreds of layers without explosion or vanishing.
                </ListItem>
                <ListItem>
                    <strong>Representation Expressivity:</strong> At convergence, we want each layer to contribute meaningfully to the final representation. If layers remain too close to identity throughout training, we waste capacity and depth provides no benefit.
                </ListItem>
            </List>
            <Paragraph>
                Different residual scaling methods resolve this tension in different ways: some use fixed scaling factors derived from theory, others employ learnable parameters that grow from zero during training, and the most recent approaches expand the residual stream itself to increase information bandwidth.
            </Paragraph>

        </Section>
    );
};

export default Overview;
