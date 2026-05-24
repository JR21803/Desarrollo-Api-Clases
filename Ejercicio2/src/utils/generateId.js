export const generateId = (collection) => {
    const ids = Object.keys(collection).map(Number);

    return ids.length
        ? Math.max(...ids) + 1
        : 1;
};