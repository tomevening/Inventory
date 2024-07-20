/**  Reusable util that creates a unique ID */
export function newId() {
  const id = Math.random().toString(36).slice(2);
  return '_' + id;
}
