export function formatShopifyId(id) {
    if (id === null) return null;
    const strippedId = id.split('/');
    return strippedId[strippedId.length - 1];
  }