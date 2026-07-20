import { HashSet } from "./hashSet.js";

test("HashSet.hash(key) takes a key and returns a hash code with it", () => {
  expect(new HashSet().hash("Manon")).toBe(9);
});
