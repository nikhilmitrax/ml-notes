/**
 * Helper function to resolve asset paths correctly for both local development and GitHub Pages deployment.
 * It prepends the base URL to the asset path.
 * 
 * @param {string} path - The absolute path to the asset (e.g., "/assets/image.png")
 * @returns {string} - The resolved path including the base URL
 */
export const getAssetPath = (path) => {
    // Remove leading slash if present to avoid double slashes when joining
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return `${import.meta.env.BASE_URL}${cleanPath}`;
};
