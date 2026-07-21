import { HashSet } from "./hashSet.js";

test("HashSet.hash(key) takes a key and returns a hash code with it", () => {
  expect(new HashSet().hash("Manon")).toBe(9);
});

test("HashSet.growBuckets() doubles the capacity", () => {
  const h = new HashSet();
  h.growBuckets();
  expect(h.buckets.length).toBe(32);
});

test("HashSet.growBuckets() rehashes all entries", () => {
  const h = new HashSet();
  h.set("first");
  expect(h.buckets[0].contains("first")).toBe(true);
  h.growBuckets();
  expect(h.buckets[16].contains("first")).toBe(true);
});

test("HashSet.set(key) sets a new key in buckets", () => {
  const h = new HashSet();
  h.set("first");
  expect(h.buckets[0].head()).toBe("first");
});

test("HashSet.set(key) doubles capacity if buckets reach load factor", () => {
  const h = new HashSet();
  h.set("apple");
  h.set("banana");
  h.set("coconut");
  h.set("durian");
  h.set("egg fruit");
  h.set("fig");
  h.set("grape");
  h.set("honeydew melon");
  h.set("ice cream");
  h.set("juice");
  h.set("karot");
  h.set("lemon");
  h.set("watermelon");
  h.set("pineapple");
  expect(h.capacity).toBe(32);
});

test("HashSet.set(key) doesn't set a key that already exists in buckets", () => {
  const h = new HashSet();
  h.set("first");
  h.set("first");
  expect(h.buckets[0].size()).toBe(1);
});

test("HashSet.set(key) appends new key value pair to bucket if bucket is not empty", () => {
  const h = new HashSet();
  h.set("Rama");
  h.set("Sita");
  expect(h.buckets[3].head()).toEqual("Rama");
  expect(h.buckets[3].tail()).toEqual("Sita");
});
