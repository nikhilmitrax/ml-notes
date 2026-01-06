import { ComponentType, ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

/**
 * Represents an article in the navigation sidebar.
 */
export interface Article {
    path: string;
    name: string;
    component: ComponentType;
    unfinished: boolean;
    section: 'coalesced' | 'papers' | 'concepts';
}

/**
 * The shape of an article module as imported via import.meta.glob.
 */
export interface ArticleModule {
    default: ComponentType;
    unfinished?: boolean;
    section?: 'coalesced' | 'papers';
    name?: string;
}

/**
 * Common component props with children.
 */
export interface PropsWithChildren {
    children?: ReactNode;
}

/**
 * Common component props with children and className.
 */
export interface PropsWithChildrenAndClassName extends PropsWithChildren {
    className?: string;
}
