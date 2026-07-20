import { LinkedList } from "../Linked-List/linked-lists.js";

class HashSet {
  constructor(loadFactor = 0.75, capacity = 16) {
    this.loadFactor = loadFactor;
    this.capacity = capacity;
    this.buckets = new Array(this.capacity).fill(new LinkedList);
  }

  #entries = [];
};

export {HashSet}