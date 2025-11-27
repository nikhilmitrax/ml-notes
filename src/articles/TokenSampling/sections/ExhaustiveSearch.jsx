import React from 'react';
import { Search } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';
import List from '../../../components/List';
import ListItem from '../../../components/ListItem';

const ExhaustiveSearch = () => {
    return (
        <Section title="Exhaustive Search Decoding" icon={Search}>
            <List>
                <ListItem>Exhaustive search, as the name suggests, considers every possible combination or permutation of output sequences and selecting the one that yields the highest score according to a given objective function.</ListItem>
                <ListItem>In the context of sequence-to-sequence models such as neural machine translation, exhaustive search decoding involves generating every possible output sequence and then evaluating each one using a scoring function that measures how well the output sequence matches the desired output. This can be a computationally intensive process, as the number of possible output sequences grows exponentially with the length of the input sequence.</ListItem>
                <ListItem>Exhaustive search decoding can produce highly accurate translations or summaries, but it is generally not feasible for most real-world applications due to its computational complexity.</ListItem>
                <ListItem>This would result in a time complexity of <Equation>{`O(V^{(T)})`}</Equation> where <Equation>{`V`}</Equation> is the vocab size and <Equation>{`T`}</Equation> is the length of the translation and as we can expect, this would be too expensive.</ListItem>
            </List>
        </Section>
    );
};

export default ExhaustiveSearch;
