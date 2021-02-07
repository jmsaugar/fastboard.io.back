/**
 * Inject service dependencies.
 *
 * @param {Object} params Dependencies { storageService }.
 *
 * @throws {Error} In case dependencies are not passed.
 */
export default function injectDependencies({ boardsService, storageService }) {
  if (!boardsService || !storageService) {
    throw new Error('Service : Http : injectDependencies : missing dependencies');
  }

  this.dependencies = {
    boardsService,
    storageService,
  };
}
