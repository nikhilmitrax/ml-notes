import React from 'react';
import { Layers, Activity } from 'lucide-react';
import Section from '../../../components/Section';
import Equation from '../../../components/Equation';
import ImageCard from '../../../components/ImageCard';
import { getAssetPath } from '../../../utils/assetUtils';
import Header3 from '../../../components/Header3';
import Paragraph from '../../../components/Paragraph';


const TheArchitecture = () => {
    return (
        <Section title="The Architecture" icon={Layers}>
            <Paragraph className="mb-4">
                A VAE consists of two main parts, connected by a bottleneck (latent space):
            </Paragraph>

            <ImageCard
                src={getAssetPath("/assets/VariationalAutoencoders/vae_placeholder.png")}
                alt="VAE Architecture Diagram"
                caption="Figure 1: High-level architecture of a Variational Autoencoder."
            />
            <ul className="list-disc pl-6 space-y-2 mb-6 text-gray-700 dark:text-gray-300">
                <li>
                    <strong>The Encoder (Inference Network):</strong> Maps input <Equation>x</Equation> to a hidden distribution <Equation>q_\phi(z|x)</Equation>.
                    Instead of outputting a single vector <Equation>z</Equation>, it outputs parameters <Equation>\mu</Equation> (mean) and <Equation>\sigma</Equation> (standard deviation).
                </li>
                <li>
                    <strong>The Decoder (Generative Network):</strong> Samples <Equation>z</Equation> from the distribution and attempts to reconstruct the original input <Equation>x</Equation>,
                    modeling <Equation>p_\theta(x|z)</Equation>.
                </li>
            </ul>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800 mb-6">
                <Header3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2">
                    <Activity size={20} /> Why Probabilistic?
                </Header3>
                <Paragraph className="text-blue-900 dark:text-blue-200">
                    Standard autoencoders map an input to a specific point in latent space. This can lead to a "discontinuous" space
                    where points between training examples yield garbage output. VAEs map inputs to <em>regions</em> (distributions),
                    forcing the network to smooth out the latent space, making it ideal for generation and interpolation.
                </Paragraph>
            </div>
        </Section>
    );
};

export default TheArchitecture;
