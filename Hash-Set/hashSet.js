import { LinkedList } from "../Linked-List/linked-lists.js";

class HashSet {
  constructor(loadFactor = 0.75, capacity = 16) {
    this.loadFactor = loadFactor;
    this.capacity = capacity;
    this.buckets = new Array(this.capacity).fill(new LinkedList());
  }

  #entries = [];

  // hash(key) takes a key and produces a hash code with it
  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }
    return hashCode;
  }

  // growBuckets() doubles the capacity and rehashes all keys in buckets
  growBuckets() {
    // double capacity
    this.capacity *= 2;
    // temporarily store the current buckets and current entries
    let oldBuckets = this.buckets;
    let entriesCopy = this.#entries;

    // create a new empty buckets thats double the size and reset the entries
    this.buckets = new Array(this.capacity).fill(new LinkedList());
    this.#entries = [];

    // rehash all entries
    entriesCopy.map((e) => this.set(e));
  }

  // set(key) will set a new key in buckets
  set(key) {
    // get the index of the bucket that will store the key
    const index = this.hash(key);

    // if index is out of bounds, throw an error
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    // if key already exists, return. else, append new key to bucket and index
    if (this.buckets[index].contains(key)) return;
    else {
      // if buckets have reached load factor, double the capacity before adding a new key
      if (this.#entries.length + 1 > this.capacity * this.loadFactor) {
        this.growBuckets();
      }

      this.buckets[index].append(key);
      this.#entries.push(key);
    }
  }

  // has(key) takes a key and returns true or false depending if key is in the hash set
  has(key) {
    const index = this.hash(key);

    // if index is out of bounds, throw an error
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
    return this.buckets[index].contains("apple");
  }

  // remove(key) removes the key in the hash set and return true. if key is not found, return false
  remove(key) {
    const index = this.hash(key);
    // if index is out of bounds, throw an error
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    // if key is not in hash map, return false
    if (!this.buckets[index].contains(key)) return false;

    // find the key's index in bucket then remove it from bucket and entries
    const keyIndex = this.buckets[index].findIndex(key);
    this.buckets[index].removeAt(keyIndex);
    this.#entries = this.#entries.filter((e) => !e === key);
    return true;
  }

  // length() returns the number of stored keys in the hash set
  length() {
    return this.#entries.length;
  }

  // clear() removes all entries in the hash set
  clear() {
    // empty out entries and buckets, then reset capacity back to 16
    this.#entries = [];
    this.buckets = [];
    this.capacity = 16;
  }
}

export { HashSet };
