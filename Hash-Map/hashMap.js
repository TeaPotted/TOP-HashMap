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

  // growBuckets() doubles the capacity and rehashes all the entries to the new buckets
  growBuckets() {
    // double capacity
    this.capacity *= 2;
    // temporarily store the current buckets and current entries
    let oldBuckets = this.buckets;
    let entriesCopy = this.entries;
    // create a new empty buckets thats double the size and reset the entries
    this.buckets = new Array(this.capacity).fill(new LinkedList());
    this.entries = [];
    // reassign each entry to the new bucket
    for (let entry of entriesCopy) {
      // get the entry's property
      const property = Object.keys(entry).join("");
      this.set(property, entry[property]);
    }
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

  // get(key) returns the value that is assigned to the given key. if a key is not found, return null
  get(key) {
    // get the index of which bucket key would be stored in
    const index = this.hash(key);
    // if bucket at index doesn't contain key, return null
    if (!this.buckets[index].containsKey(key)) return null;

    // else, find the index of key in bucket, and return key's value
    const keyIndex = this.buckets[index].findKey(key);
    return this.buckets[index].at(keyIndex)[key];
  }

  // has(key) returns true or false based on whether or not the key is in the hash map
  has(key) {
    const index = this.hash(key);
    return this.buckets[index].containsKey(key) ? true : false;
  }

  // remove(key) removes the entry with that key in hash map. if key not in hash map, return false
  remove(key) {
    const index = this.hash(key);
    // if key is not in hash map, return false
    if (!this.buckets[index].containsKey(key)) return false;

    // find the key's index in bucket then remove it from bucket and entries
    const keyIndex = this.buckets[index].findKey(key);
    this.buckets[index].removeAt(keyIndex);
    this.entries = this.entries.filter((e) => !e.hasOwnProperty(key));
  }

  // length() returns the number of stored keys in the hash map
  length() {
    return this.entries.length;
  }
}

export { HashMap };
