const mocks = import.meta.glob("./data/mocks/*.json", { eager: true }) as Record<
  string,
  { default: unknown }
>;

export async function getMockData<T>(name: string, fallback: () => Promise<T>): Promise<T> {
  const mod = mocks[`./data/mocks/${name}.json`];
  if (mod) return mod.default as T;
  return fallback();
}
