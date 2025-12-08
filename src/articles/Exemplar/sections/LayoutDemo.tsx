import React from 'react';
import { Layout } from 'lucide-react';
import Section from '../../../components/Section';
import Header3 from '../../../components/Header3';
import Paragraph from '../../../components/Paragraph';
import SideBySide from '../../../components/SideBySide';
import ImageCard from '../../../components/ImageCard';
import InteractiveCard from '../../../components/InteractiveCard';

const LayoutDemo = () => {
    return (
        <Section title="Layout & Media" icon={Layout}>
            <Header3>Side By Side</Header3>
            <Paragraph>
                The SideBySide component allows you to place two components next to each other on large screens.
                On smaller screens, they stack vertically.
            </Paragraph>

            <SideBySide>
                <InteractiveCard title="Left Component">
                    <div className="p-4 text-center text-slate-600">
                        This is the left side.
                    </div>
                </InteractiveCard>
                <InteractiveCard title="Right Component">
                    <div className="p-4 text-center text-slate-600">
                        This is the right side.
                    </div>
                </InteractiveCard>
            </SideBySide>

            <Header3>Image Cards</Header3>
            <Paragraph>
                Image cards are used to display images with optional captions.
            </Paragraph>

            <ImageCard
                src="/assets/VLM/CLIP.jpg"
                alt="CLIP Architecture"
                caption="Figure 1: The CLIP architecture (Contrastive Language-Image Pre-training)."
            />
        </Section>
    );
};

export default LayoutDemo;
