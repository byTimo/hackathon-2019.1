export function stringify<T extends Record<string, any>>(params: T): string {
  return Object.keys(params)
    .map(key => `${key}=${params[key]}`)
    .join("&");
}

export function parseSearch(search: string) {
  if (search.startsWith("?")) {
    search = search.slice(1);
  }
  const pairs = search.split("&").map(part => part.split("="));
  const result: Record<string, string> = {};
  for (const [key, value] of pairs) {
    result[key] = value;
  }
  return result;
}
