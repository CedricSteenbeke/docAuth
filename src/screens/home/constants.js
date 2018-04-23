import { prefixObjectValues } from '../../utils/helpers'

export const PREFIX = '@@HOME/';
let types = {
  ADD_DOCUMENT: 'ADD_DOCUMENT',

  CHANGE_HASH: 'CHANGE_HASH',

  SET_DOCUMENT_METADATA: 'SET_DOCUMENT_METADATA'
};

types = prefixObjectValues(types, PREFIX);
export default types;