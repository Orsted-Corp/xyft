import { getRandomValues as expoCryptoGetRandomValues, getRandomBytes } from 'expo-crypto';


class Crypto {
  getRandomValues = expoCryptoGetRandomValues;
  getRandomBase64 = function(length) {
    return getRandomBytes(length).then(bytes => {
      return Buffer.from(bytes).toString('base64');
    });
  }
}

// eslint-disable-next-line no-undef
const webCrypto = typeof crypto !== 'undefined' ? crypto : new Crypto();

(() => {
  if (typeof crypto === 'undefined') {
    Object.defineProperty(window, 'crypto', {
      configurable: true,
      enumerable: true,
      get: () => webCrypto,
    });
  }
})();