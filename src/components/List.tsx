import React, { ReactNode } from 'react';

interface ListProps {
    children?: ReactNode;
    nested?: boolean;
    ordered?: boolean;
    className?: string;
}

const List: React.FC<ListProps> = ({ children, nested = false, ordered = false, className = "" }) => {
    const baseStyles = nested
        ? `${ordered ? 'list-decimal' : 'list-disc'} list-inside ml-6 mt-1`
        : `${ordered ? 'list-decimal' : 'list-disc'} list-inside space-y-2 mb-4 ml-4`;

    const Component = ordered ? 'ol' : 'ul';

    return (
        <Component className={`${baseStyles} ${className}`}>
            {children}
        </Component>
    );
};

export default List;
