export const groupBy = (source, key) => source.reduce((acc, current) => ({
  ...acc,
  [current[key]]: [...(acc[current[key]] || []), current],
}), {});
