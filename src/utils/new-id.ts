/**  Reusable util that creates a unique ID */
export function newId() {
  return '_' + Math.random().toString(36).slice(2);
}
