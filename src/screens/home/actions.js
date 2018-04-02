import sjcl from 'sjcl';
import types from 'constants';

export function addDocument(doc) {
  debugger;
  const out = sjcl.hash.sha256.hash(doc);
  const hash = sjcl.codec.hex.fromBits(out)
  console.log(hash);

  return {
    type: types.ADD_DOCUMENT,
    hash
  }
}