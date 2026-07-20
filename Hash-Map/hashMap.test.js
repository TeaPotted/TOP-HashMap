import { HashMap } from "./hashMap.js";

test("HashMap.hash(key) takes a key and returns a hash code with it", () => {
  expect(new HashMap().hash("Manon")).toBe(9);
});

test("HashMap.set(key, value) sets a new key value pair", () => {
  const h = new HashMap();
  h.set("first", "apple");
  expect(h.buckets[0].head()).toEqual({ first: "apple" });
});

test("HashMap.set(key, value) doubles the capacity when hash map reaches load factor", () => {
  const test = new HashMap();
  test.set("apple", "red");
  test.set("banana", "yellow");
  test.set("carrot", "orange");
  test.set("dog", "brown");
  test.set("elephant", "gray");
  test.set("frog", "green");
  test.set("grape", "purple");
  test.set("hat", "black");
  test.set("ice cream", "white");
  test.set("jacket", "blue");
  test.set("kite", "pink");
  test.set("lion", "golden");
  expect(test.capacity).toBe(16);
  test.set("moon", "silver");
  expect(test.capacity).toBe(32);
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

test("HashMap.length() returns the number of stored keys in the hash map", () => {
  const h = new HashMap();
  expect(h.length()).toBe(0);
  h.set("first", "apple");
  h.set("second", "banana");
  h.set("third", "coconut");
  expect(h.length()).toBe(3);
});

test("HashMap.clear() removes all entries in the hash map", () => {
  const h = new HashMap();
  h.set("first", "apple");
  h.set("second", "banana");
  h.set("third", "coconut");
  h.clear();
  expect(h.length()).toBe(0);
});

test("HashMap.clear() resets capacity back to 16", () => {
  const h = new HashMap();
  h.growBuckets();
  expect(h.capacity).toBe(32);
  h.clear();
  expect(h.capacity).toBe(16);
});

test("HashMap.keys() returns an array of all the keys inside the hash map", () => {
  const h = new HashMap();
  expect(h.keys()).toEqual([]);
  h.set("first", "apple");
  h.set("second", "banana");
  h.set("third", "coconut");
  expect(h.keys()).toEqual(["first", "second", "third"]);
});

test("HashMap.values() returns an array of all the values inside the hash map", () => {
  const h = new HashMap();
  expect(h.values()).toEqual([]);
  h.set("first", "apple");
  h.set("second", "banana");
  h.set("third", "coconut");
  expect(h.values()).toEqual(["apple", "banana", "coconut"]);
});

test("HashMap.entries() return an array that contains each key, value pair in hash map", () => {
  const h = new HashMap();
  expect(h.entries()).toEqual([]);
  h.set("first", "apple");
  h.set("second", "banana");
  h.set("third", "coconut");
  expect(h.entries()).toEqual([
    ["first", "apple"],
    ["second", "banana"],
    ["third", "coconut"],
  ]);
});
