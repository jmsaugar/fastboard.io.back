/**
 * Inject service dependencies.
 *
 * @param {Object} params Dependencies { storageService }.
 *
 * @throws {Error} In case dependencies are not passed.
 */
export default function injectDependencies({ storageService }) {
  if (!storageService) {
    throw new Error('Service : Http : injectDependencies : missing dependencies');
  }

  this.dependencies = {
    storageService,
  };
}
