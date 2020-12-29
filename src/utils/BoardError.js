/**
 * Custom error class. Extends Error class.
 * Includes an error code.
 */
export default class BoardError extends Error {
  /**
   * BoardError class constructor.
   *
   * @param {String} code Error code.
   * @param {...any} params Rest of params - passed to Error constructor.
   */
  constructor(code, ...params) {
    super(...params);

    this.code = code;
  }
}
