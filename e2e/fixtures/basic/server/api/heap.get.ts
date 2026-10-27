// Heap in use after a full GC, for the memory tests (server runs with --expose-gc)
export default defineEventHandler(() => {
  globalThis.gc?.();
  globalThis.gc?.();
  return process.memoryUsage().heapUsed;
});
