import React from 'react';

interface ImageCardProps {
    src: string;
    alt: string;
    caption?: string;
}

const ImageCard: React.FC<ImageCardProps> = ({ src, alt, caption }) => {
    return (
        <div className="mb-6 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm">
            <img src={src} alt={alt} className="w-full h-auto" />
            {caption && (
                <p className="text-xs text-center text-gray-500 dark:text-gray-400 p-2 bg-gray-50 dark:bg-gray-900">
                    {caption}
                </p>
            )}
        </div>
    );
};

export default ImageCard;
