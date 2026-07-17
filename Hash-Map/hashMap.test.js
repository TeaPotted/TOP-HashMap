import { HashMap } from "./hashMap.js";

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

test("HashMap.growBuckets() doubles the capacity", () => {
  const h = new HashMap();
  h.growBuckets();
  expect(h.buckets.length).toBe(32);
});

test("HashMap.growBuckets() rehashes all entries", () => {
  const h = new HashMap();
  h.set("first", "apple");
  expect(h.buckets[0].containsKey("first")).toBe(true);
  h.growBuckets();
  expect(h.buckets[16].containsKey("first")).toBe(true);
});

test("HashMap.get(key) returns the value of the given key and returns null if key is not found", () => {
  const h = new HashMap();
  h.set("first", "apple");
  expect(h.get("first")).toBe("apple");
  expect(h.get("second")).toBe(null);
});

test("HashMap.has(key) returns true if key is found in hash map and false if not", () => {
  const h = new HashMap();
  h.set("first", "apple");
  expect(h.has("first")).toBe(true);
  expect(h.has("second")).toBe(false);
});

test("HashMap.reomove(key) removes the entry with that key from hash map", () => {
  const h = new HashMap();
  h.set("first", "apple");
  h.remove("first");
  expect(h.has("first")).toBe(false);
});

test("HashMap.reomove(key) returns false if key is not in hash map", () => {
  const h = new HashMap();
  expect(h.remove("first")).toBe(false);
});