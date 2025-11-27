import React from 'react';
import { Filter } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';
import InteractiveCard from '../../../components/InteractiveCard';
import List from '../../../components/List';
import ListItem from '../../../components/ListItem';
import { SamplingVisualizer } from './TopK'; // Reusing the visualizer

const MinP = () => {
    return (
        <Section title="min-p" icon={Filter}>
            <List>
                <ListItem>min-<Equation>{`p`}</Equation> sampling is a novel token selection or decoding strategy termed has been introduced in the Huggingface Transformers library, aiming to refine the generation capabilities of LLMs. This strategy has emerged as a potential solution to the limitations inherent in the established methods of top-<Equation>{`k`}</Equation> and top-<Equation>{`p`}</Equation> sampling.</ListItem>
                <ListItem><strong>Background on existing sampling strategies:</strong>
                    <List nested ordered>
                        <ListItem><strong>top-<Equation>{`k`}</Equation> Sampling:</strong> This technique orders tokens by descending probability, selects the highest <Equation>{`k`}</Equation> tokens, and then samples from this subset. Although effective, it often discards high-quality continuations, reducing word diversity.</ListItem>
                        <ListItem><strong>top-<Equation>{`p`}</Equation> Sampling:</strong> Unlike top-<Equation>{`k`}</Equation>, which limits the selection to a fixed number of tokens, top-<Equation>{`p`}</Equation> sampling considers the smallest set of tokens whose cumulative probability exceeds a threshold <Equation>{`p`}</Equation>. This method, however, may include low-probability tokens that can detract from the coherence of the generated text.</ListItem>
                    </List>
                </ListItem>
                <ListItem><strong>Limitations of existing strategies:</strong>
                    <List nested>
                        <ListItem><strong>top-<Equation>{`k`}</Equation>:</strong> The arbitrary exclusion of tokens beyond the most probable <Equation>{`k`}</Equation> can omit high-quality relevant continuations, leading to lack of word diversity.</ListItem>
                        <ListItem><strong>top-<Equation>{`p`}</Equation>:</strong> It risks including tokens with minimal probabilities, potentially leading to derailed generation and incoherent outputs.</ListItem>
                    </List>
                </ListItem>
                <ListItem><strong>Introduction of min-<Equation>{`p`}</Equation> sampling:</strong>
                    <List nested>
                        <ListItem>min-<Equation>{`p`}</Equation> sampling addresses these drawbacks by employing a dynamic filtering mechanism. Unlike the static nature of top-<Equation>{`k`}</Equation> and top-<Equation>{`p`}</Equation>, min-<Equation>{`p`}</Equation> sampling adjusts the filter based on the distribution's probability landscape:
                            <List nested>
                                <ListItem>It sets a base probability threshold, calculated as the product of a minimum probability factor (specified by <code className="bg-slate-100 px-1 rounded">min_p</code>) and the probability of the most likely upcoming token.</ListItem>
                                <ListItem>Tokens with probabilities below this computed threshold are excluded, ensuring a balance between diversity and coherence.</ListItem>
                            </List>
                        </ListItem>
                    </List>
                </ListItem>

                <InteractiveCard title="Interactive Sampling Visualization (Min-p)">
                    <SamplingVisualizer defaultMethod="min-p" />
                </InteractiveCard>

                <ListItem><strong>Benefits of min-<Equation>{`p`}</Equation> sampling:</strong>
                    <List nested>
                        <ListItem><strong>With a dominant high-probability token:</strong> Implements an aggressive filtering approach to maintain focus and coherence.</ListItem>
                        <ListItem><strong>Without a dominant high-probability token:</strong> Applies a more relaxed filter, allowing for a broader range of plausible continuations, beneficial in scenarios where many continuation possibilities are plausible (i.e., situations requiring creativity).</ListItem>
                    </List>
                </ListItem>
                <ListItem><strong>Recommended settings for min-<Equation>{`p`}</Equation> sampling:</strong>
                    <List nested>
                        <ListItem>For optimal performance, particularly in creative text generation, it is suggested to set <code className="bg-slate-100 px-1 rounded">min_p</code> between 0.05 and 0.1, combined with a temperature parameter greater than 1. This configuration harnesses the model's capability to generate diverse and imaginative text while maintaining logical coherence.</ListItem>
                    </List>
                </ListItem>
                <ListItem>In conclusion, min-<Equation>{`p`}</Equation> sampling offers a significant enhancement over traditional methods by dynamically adapting to the probability distribution of tokens, thus potentially setting a new standard for decoding strategies in language model generations. min-<Equation>{`p`}</Equation> sampling yields the benefit of enabling the use of high temperature settings, which can make models a lot more creative in practice. min-<Equation>{`p`}</Equation> also allows for the reduction or elimination of hacks like "repetition penalties".</ListItem>
            </List>
        </Section>
    );
};

export default MinP;
