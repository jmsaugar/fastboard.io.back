/**
 * Inject service dependencies.
 *
 * @param {Object} params Dependencies { boardsService, httpService }.
 *
 * @throws {Error} In case dependencies are not passed.
 */
export default function injectDependencies({ boardsService, httpService }) {
  if (!boardsService || !httpService) {
    throw new Error('Service : Realtime : injectDependencies : missing dependencies');
  }

  this.dependencies = {
    boardsService,
    httpService,
  };
}
