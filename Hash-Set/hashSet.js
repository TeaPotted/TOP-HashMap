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
}

export { HashSet };
