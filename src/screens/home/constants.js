import { prefixObjectValues } from '../../utils/helpers'

export const PREFIX = '@@HOME/';
let types = {
  ADD_DOCUMENT: 'ADD_DOCUMENT',
  CHANGE_HASH: 'CHANGE_HASH'
};

types = prefixObjectValues(types, PREFIX);
export default types;