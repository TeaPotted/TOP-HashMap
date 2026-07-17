import { LinkedList } from "../Linked-List/linked-lists.js";

class HashMap {
  constructor(loadFactor = 0.75, capacity = 16) {
    this.loadFactor = loadFactor;
    this.capacity = capacity;
    this.buckets = new Array(this.capacity).fill(new LinkedList());
    this.entries = [];
  }

  // hash(key) takes a key and produces a hash code with it
  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }
    return hashCode;
  }

  // set(key, value) will set a new key value pair in buckets
  set(key, value) {
    // get the index of the bucket that will store the key value pair
    const index = this.hash(key);

    // if buckets has reached load factor, double buckets capacity
    if (this.entries + 1 >= this.capacity * this.loadFactor) {
      this.growBuckets();
    }
    // if key already exists, update the key's value, else just append new key value pair to bucket and entries
    if (this.buckets[index].containsKey(key)) {
      const keyIndex = this.buckets[index].findKey(key);
      this.buckets[index].removeAt(keyIndex);
      this.buckets[index].insertAt(keyIndex, { [key]: value });

      // update entries also
      // get the index of the existsing key value pair in entries and update the entry's value
      const entryIndex = this.entries.findIndex((e) => e.hasOwnProperty(key));
      this.entries[entryIndex] = { [key]: value };
      return;
    }

    this.buckets[index].append({ [key]: value });
    this.entries.push({ [key]: value });
  }
}

export { HashMap };
