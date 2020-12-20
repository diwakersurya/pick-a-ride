let context = {};
export function get(key) {
  return context[key];
}
export function set(key, value) {
  context[key] = value;
}
