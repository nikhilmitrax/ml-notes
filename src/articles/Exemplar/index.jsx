import React from 'react';
import Article from '../../components/Article';
import TypographyDemo from './sections/TypographyDemo';
import InteractiveDemo from './sections/InteractiveDemo';
import LayoutDemo from './sections/LayoutDemo';

export const unfinished = true;

export default function Exemplar() {
    return (
        <Article
            title="Component Exemplar"
            description="A comprehensive demonstration of all available components in the interactive-notes system. Use this as a reference for creating new articles."
        >
            <TypographyDemo />
            <InteractiveDemo />
            <LayoutDemo />
        </Article>
    );
}
