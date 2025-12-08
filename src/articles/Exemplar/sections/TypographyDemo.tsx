import React from 'react';
import { Type } from 'lucide-react';
import Section from '../../../components/Section';
import Header3 from '../../../components/Header3';
import Header4 from '../../../components/Header4';
import Paragraph from '../../../components/Paragraph';
import List from '../../../components/List';
import ListItem from '../../../components/ListItem';
import Quote from '../../../components/Quote';

const TypographyDemo = () => {
    return (
        <Section title="Typography & Basic Text" icon={Type}>
            <Paragraph>
                This section demonstrates the basic typographic components available for writing articles.
                Standard paragraphs have relaxed leading for better readability.
            </Paragraph>

            <Header3>Header Level 3</Header3>
            <Paragraph>
                Header 3 is used for main subsections. It has significant top margin to separate it from previous content.
            </Paragraph>

            <Header4>Header Level 4</Header4>
            <Paragraph>
                Header 4 is used for smaller subdivisions. It's bold but smaller than Header 3.
            </Paragraph>

            <Header3>Lists</Header3>
            <Paragraph>We support both unordered and ordered lists, including nesting.</Paragraph>

            <Header4>Unordered List</Header4>
            <List>
                <ListItem>First item in an unordered list</ListItem>
                <ListItem>Second item with some more text to show wrapping</ListItem>
                <ListItem>
                    Third item with a nested list:
                    <List nested>
                        <ListItem>Nested item one</ListItem>
                        <ListItem>Nested item two</ListItem>
                    </List>
                </ListItem>
            </List>

            <Header4>Ordered List</Header4>
            <List ordered>
                <ListItem>First ordered step</ListItem>
                <ListItem>Second ordered step</ListItem>
                <ListItem>Third ordered step</ListItem>
            </List>

            <Header3>Quotes</Header3>
            <Quote>
                "This is a quote component. It's useful for highlighting important concepts, definitions, or actual quotes from papers."
            </Quote>
            <Paragraph>
                Quotes are styled with a left border and italic text to distinguish them from regular paragraphs.
            </Paragraph>
        </Section>
    );
};

export default TypographyDemo;
