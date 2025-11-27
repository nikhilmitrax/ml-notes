import React from 'react';
import Article from '../../components/Article';
import TheNeedForPosition from './sections/TheNeedForPosition';
import LearnedVsFixed from './sections/LearnedVsFixed';
import StandardSinusoidal from './sections/StandardSinusoidal';
import WhyRelative from './sections/WhyRelative';
import RoPE from './sections/RoPE';
import AliBi from './sections/AliBi';
import RealWorldAdoption from './sections/RealWorldAdoption';

export const unfinished = false;

export default function PositionalEncoding() {
  return (
    <Article
      title="Positional Encoding"
      description="Transformers process tokens in parallel, losing the notion of order. Positional encodings inject this lost structure back into the model. From absolute sinusoids to relative rotations, explore how LLMs know &quot;where&quot; things are."
    >
      <TheNeedForPosition />
      <LearnedVsFixed />
      <StandardSinusoidal />
      <WhyRelative />
      <RoPE />
      <AliBi />
      <RealWorldAdoption />
    </Article>
  );
}
