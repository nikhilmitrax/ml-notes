import React, { lazy } from 'react';

export interface ConceptMetadata {
    id: string;
    name: string;
    description: string;
}

export interface Concept extends ConceptMetadata {
    component: React.ComponentType;
}

// Static metadata registry to avoid circular dependencies during initialization
// This allows Equation.tsx to get the name/id without importing the component modules
export const CONCEPT_METADATA: Record<string, ConceptMetadata> = {
    'bayestheorem': {
        id: 'bayestheorem',
        name: "Bayes' Theorem",
        description: 'Describes the probability of an event, based on prior knowledge of conditions that might be related to the event.'
    },
    'crossentropy': {
        id: 'crossentropy',
        name: 'Cross-Entropy',
        description: 'A measure of the difference between two probability distributions for a given random variable or set of events.'
    },
    'eigenvalueseigenvectors': {
        id: 'eigenvalueseigenvectors',
        name: 'Eigenvalues & Eigenvectors',
        description: 'Linear transformations that characterize the principal axes and scaling factors of a matrix.'
    },
    'jensensinequality': {
        id: 'jensensinequality',
        name: "Jensen's Inequality",
        description: 'Relates the value of a convex function of an integral to the integral of the convex function.'
    },
    'kldivergence': {
        id: 'kldivergence',
        name: 'KL Divergence',
        description: 'A measure of how one probability distribution is different from a second, reference probability distribution.'
    },
    'mle': {
        id: 'mle',
        name: 'Maximum Likelihood Estimation',
        description: 'A method of estimating the parameters of a probability distribution by maximizing a likelihood function.'
    },
    'pca': {
        id: 'pca',
        name: 'Principal Component Analysis',
        description: 'A dimensionality-reduction method that is often used to reduce the dimensionality of large data sets.'
    },
    'svd': {
        id: 'svd',
        name: 'Singular Value Decomposition',
        description: 'A factorization of a real or complex matrix that generalizes the eigendecomposition of a square normal matrix.'
    },
    'wassersteindistance': {
        id: 'wassersteindistance',
        name: 'Wasserstein Distance',
        description: 'A distance function defined between probability distributions on a given metric space.'
    }
};

export const CONCEPTS_LIST: ConceptMetadata[] = Object.values(CONCEPT_METADATA).sort((a, b) => a.name.localeCompare(b.name));

// Lazy discovery of components
const componentModules = import.meta.glob('./*.tsx', { eager: false });

export const getConceptMetadata = (id: string): ConceptMetadata | undefined => {
    return CONCEPT_METADATA[id.toLowerCase()];
};

// Legacy support for and compatibility with existing getConceptById calls
// This now returns metadata synchronously, which is what Equation.tsx needs for the badge
export const getConceptById = getConceptMetadata;

export const getConceptComponent = (id: string) => {
    // Find the path that matches the id
    const entry = Object.entries(componentModules).find(([path]) => {
        const pathId = path.replace('./', '').replace('.tsx', '').toLowerCase();
        return pathId === id.toLowerCase();
    });

    if (!entry) return null;

    return lazy(() => entry[1]() as Promise<{ default: React.ComponentType }>);
};
