import React from 'react';
import Article from '../../components/Article';
import TheArchitecture from './sections/TheArchitecture';
import ImplementationDetails from './sections/ImplementationDetails';
import ReparameterizationTrick from './sections/ReparameterizationTrick';
import ObjectiveFunction from './sections/ObjectiveFunction';
import DerivingELBO from './sections/DerivingELBO';
import BetaVAE from './sections/BetaVAE';
import PosteriorCollapse from './sections/PosteriorCollapse';
import LatentSpaceInterpolation from './sections/LatentSpaceInterpolation';

export const section = 'coalesced';

export default function VAE() {
  return (
    <Article
      title="Variational Autoencoders (VAEs)"
      description={
        <>
          Variational Autoencoders are a powerful class of generative models that learn to map complex data into a
          continuous, structured latent space. Unlike standard autoencoders, they don't just learn to compress data—they
          learn the <em>parameters of a probability distribution</em> representing the data.
        </>
      }
    >
      <TheArchitecture />
      <ImplementationDetails />
      <ReparameterizationTrick />
      <ObjectiveFunction />
      <DerivingELBO />
      <BetaVAE />
      <PosteriorCollapse />
      <LatentSpaceInterpolation />
    </Article>
  );
}
