/**
 * Path utilities namespace
 */
export namespace path {
  /**
   * Joins multiple paths into a single one
   */
  export function join(...paths: string[]): string {
    let joined = paths.shift();
    if (!joined) {
      return '';
    }

    paths.forEach(path => (joined = `${joined}/${path}`));
    return joined;
  }
}
