import {HashMap} from "./hashMap.js"

test("HashMap.hash(key) takes a key and returns a hash code with it", () => {
  expect(new HashMap().hash("Manon")).toBe(9);
});

test("HashMap.set(key, value) sets a new key value pair", () => {
  const h = new HashMap();
  h.set("first", "apple");
  expect(h.buckets[0].head()).toEqual({ first: "apple" });
});

test("HashMap.set(key, value) updates key's value if key already exists in bucket", () => {
  const h = new HashMap();
  h.set("first", "apple");
  h.set("first", "banana");
  expect(h.buckets[0].head()).toEqual({ first: "banana" });
});

test("HashMap.set(key, value) appends new key value pair to list if list is not empty", () => {
  const h = new HashMap();
  h.set("Rama", "apple");
  h.set("Sita", "banana");
  expect(h.buckets[3].head()).toEqual({ Rama: "apple" });
  expect(h.buckets[3].tail()).toEqual({ Sita: "banana" });
});