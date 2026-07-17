import {HashMap} from "./hashMap.js"

test("HashMap.hash(key) takes a key and returns a hash code with it", () => {
  expect(new HashMap().hash("Manon")).toBe(9);
});