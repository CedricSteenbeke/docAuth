import { prefixObjectValues } from '../../utils/helpers'

export const PREFIX = '@@HOME/';
const types = {
  ADD_DOCUMENT: 'ADD_DOCUMENT'
};

export default prefixObjectValues(types, PREFIX);