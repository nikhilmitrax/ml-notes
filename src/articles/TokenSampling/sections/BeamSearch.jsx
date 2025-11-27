import React from 'react';
import { GitBranch } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';
import List from '../../../components/List';
import ListItem from '../../../components/ListItem';
import BeamSearchVisualizer from '../components/BeamSearchVisualizer';

const BeamSearch = () => {
    return (
        <Section title="Beam Search" icon={GitBranch}>
            <List>
                <ListItem>Beam search is a search algorithm, frequently used in machine translation tasks, to generate the most likely sequence of words given a particular input or context. It is an efficient algorithm that explores multiple possibilities and retains the most likely ones, based on a pre-defined parameter called the beam size.</ListItem>
                <ListItem>Beam search is widely used in sequence-to-sequence models, including recurrent neural networks and transformers, to improve the quality of the output by exploring different possibilities while being computationally efficient.</ListItem>
                <ListItem>The core idea of beam search is that on each step of the decoder, we want to keep track of the <Equation>{`k`}</Equation> most probable partial candidates/hypotheses (such as generated translations in case of a machine translation task) where <Equation>{`k`}</Equation> is the beam size (usually 5 - 10 in practice). Put simply, we book-keep the top <Equation>{`k`}</Equation> predictions, generate the word after next for each of these predictions, and select whichever combination had less error.</ListItem>
                <ListItem>The interactive visualization below shows how the algorithm works with a beam size of 2.</ListItem>
            </List>
            <BeamSearchVisualizer />
            <List>
                <ListItem>We can see how at each step, it calculates two most probable options along with their score, and creates the top scoring hypothesis (best guess of the likely sequence). It will then backtrack to obtain the full hypothesis.</ListItem>
                <ListItem>In beam search decoding, different hypotheses may produce <code className="bg-slate-100 px-1 rounded">&lt;END&gt;</code> tokens on different timesteps.</ListItem>
                <ListItem>When a hypothesis produces <code className="bg-slate-100 px-1 rounded">&lt;END&gt;</code>, that hypothesis is complete so we place it aside and continue exploring other hypotheses via beam search.</ListItem>
                <ListItem>Usually we continue beam search until:
                    <List nested>
                        <ListItem>We reach timestep <Equation>{`T`}</Equation> (where <Equation>{`T`}</Equation> is some pre-defined cutoff), or</ListItem>
                        <ListItem>We have at least <Equation>{`n`}</Equation> completed hypotheses (where n is pre-defined cutoff).</ListItem>
                    </List>
                </ListItem>
                <ListItem>So now that we have a list of completed hypotheses, how do we select the one with the highest score that fits our task the best?
                    <List nested>
                        <ListItem>It's to be noted that the longer hypotheses have lower scores, so simply selecting the largest score may not work. Thus, we need to normalize the hypotheses by length and then use this to select the top one.</ListItem>
                    </List>
                </ListItem>
                <ListItem>Note, hypothesis here is the <Equation>{`k`}</Equation> most probable partial translation (if the task is machine translation) and has a score which is the log probability. Since the log of a number <Equation>{`\\in [0 ,1]`}</Equation> falls under <Equation>{`[-\\infty, 0]`}</Equation>, all the scores are non-positive and a higher score the hypothesis has, the better it is.
                    <List nested>
                        <ListItem>Additionally, beam search is not guaranteed to find the optimal solution, but it is more efficient than conducting an exhaustive search.</ListItem>
                    </List>
                </ListItem>
            </List>
        </Section>
    );
};

export default BeamSearch;
