/**
 * This function will prefix all object values with the given prefix.
 */
export function prefixObjectValues(object, prefix) {
  return Object.keys(object).reduce((result, key) => {
    result[key] = prefix + object[key];
    return result;
  }, {});
}
