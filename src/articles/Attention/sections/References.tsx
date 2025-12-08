import React from 'react';
import { BookOpen } from 'lucide-react';
import Section from '../../../components/Section';
import List from '../../../components/List';
import ListItem from '../../../components/ListItem';

const References = () => {
    return (
        <Section title="References" icon={BookOpen}>
            <List>
                <ListItem>
                    <a href="https://link.springer.com/chapter/10.1007/978-3-030-29513-4_31" className="text-blue-600 hover:underline">An Introductory Survey on Attention Mechanisms in NLP Problems</a> (<a href="https://arxiv.org/pdf/1811.05544.pdf" className="text-blue-600 hover:underline">arXiv.org version</a>)
                </ListItem>
                <ListItem>
                    <a href="https://arxiv.org/pdf/1409.0473.pdf" className="text-blue-600 hover:underline">Neural Machine Translation by Jointly Learning to Align and Translate</a> (<a href="https://www.iclr.cc/archive/www/lib/exe/fetch.php%3Fmedia=iclr2015:bahdanau-iclr2015.pdf" className="text-blue-600 hover:underline">slides</a>)
                </ListItem>
                <ListItem>
                    <a href="https://www.aclweb.org/anthology/D15-1166/" className="text-blue-600 hover:underline">Effective Approaches to Attention-based Neural Machine Translation</a> (<a href="https://nlp.stanford.edu/~lmthang/data/papers/emnlp15_attn.pptx" className="text-blue-600 hover:underline">slides</a>)
                </ListItem>
                <ListItem>
                    <a href="https://lilianweng.github.io/lil-log/2018/06/24/attention-attention.html" className="text-blue-600 hover:underline">“Attention, Attention” in Lil’Log</a>
                </ListItem>
                <ListItem>
                    <a href="https://arxiv.org/abs/2007.14062" className="text-blue-600 hover:underline">Big Bird: Transformers for Longer Sequences</a>
                </ListItem>
                <ListItem>
                    <a href="https://blog.gopenai.com/paper-review-llama-2-open-foundation-and-fine-tuned-chat-models-23e539522acb" className="text-blue-600 hover:underline">Paper Review: Llama 2: Open Foundation and Fine-Tuned Chat Models</a>
                </ListItem>
                <ListItem>
                    <a href="https://eugeneyan.com/writing/attention/" className="text-blue-600 hover:underline">“Attention” in Eugene Yan</a>
                </ListItem>
                <ListItem>
                    <a href="https://aman.ai" className="text-blue-600 hover:underline">Jain, Vinija and Chadha, Aman. "Attention." Aman's AI Journal (2021)</a>
                </ListItem>
                <ListItem>
                    <a href="https://github.com/deepseek-ai/DeepSeek-V3.2-Exp/blob/main/DeepSeek_V3_2.pdf" className="text-blue-600 hover:underline">DeepSeek-V3.2-Exp: Boosting Long-Context Efficiency with DeepSeek Sparse Attention</a>
                </ListItem>
            </List>
        </Section>
    );
};

export default References;
