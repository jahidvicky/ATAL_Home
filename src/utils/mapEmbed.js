export const getMapEmbedUrl = (mapQuery) => {
    if (!mapQuery) return "";

    const trimmed = mapQuery.trim();

    // Case 1: full <iframe ...> tag was pasted — extract the src attribute
    const iframeMatch = trimmed.match(/src=["']([^"']+)["']/i);
    if (iframeMatch) {
        return iframeMatch[1];
    }

    // Case 2: a full URL was pasted (embed?pb=... or maps?q=...)
    if (/^https?:\/\//i.test(trimmed)) {
        return trimmed;
    }

    // Case 3: plain address — build a simple embeddable query URL
    return `https://www.google.com/maps?q=${encodeURIComponent(trimmed)}&output=embed`;
};