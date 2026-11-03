export const routePath = (id: string) => id ? '/' + id : '/';
let restoring = false;
export const isRestoring = () => restoring;
export function restoreRoute(run: () => void) {
  restoring = true;
  try { run(); } finally { restoring = false; }
}
export function navigate(id: string) {
  const path = id === 'not-found' ? location.pathname : routePath(id);
  if (!restoring && (location.pathname !== path || location.hash)) history.pushState(null, '', path);
}
