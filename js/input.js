export const keys = {};


window.addEventListener("keydown", (e) => {
  const key = /^[a-z0-9]$/i.test(e.key) ? e.key.toLowerCase() : e.key;
  keys[key] = true;
});

window.addEventListener("keyup", (e) => {
  const key = /^[a-z0-9]$/i.test(e.key) ? e.key.toLowerCase() : e.key;
  keys[key] = false;
});