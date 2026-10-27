/** Records what the library handed the page, for tests to read. */
export const log = (event: string, payload?: unknown) => {
  window.__events ??= [];
  window.__events.push({
    event,
    payload: JSON.parse(JSON.stringify(payload ?? null)),
  });
};

declare global {
  interface Window {
    __events?: { event: string; payload: unknown }[];
    __router?: ReturnType<typeof useRouter>;
  }
}
