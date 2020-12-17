/**
 * Inject service dependencies.
 *
 * @param {Object} params Dependencies { boardsService }.
 *
 * @throws {Error} In case dependencies are not passed.
 */
export default function injectDependencies({ boardsService }) {
  if (!boardsService) {
    throw new Error('Service : Realtime : injectDependencies : missing dependencies');
  }

  this.dependencies = {
    boardsService,
  };
}
