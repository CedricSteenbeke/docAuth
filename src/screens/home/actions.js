import sjcl from 'sjcl';
import types from './constants';

export function addDocument(doc) {
  const out = sjcl.hash.sha256.hash(doc);
  const hash = sjcl.codec.hex.fromBits(out);

  return {
    type: types.ADD_DOCUMENT,
    hash
  }
}

export function changeHash(hash) {
  return {
    type: types.CHANGE_HASH,
    hash
  }
}
