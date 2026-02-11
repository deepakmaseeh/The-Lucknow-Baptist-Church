export const getApiUrl = (endpoint) => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
    // Ensure endpoint starts with / if not present (optional safety)
    if (!endpoint.startsWith('/')) {
        endpoint = '/' + endpoint;
    }
    return `${baseUrl}${endpoint}`;
};
