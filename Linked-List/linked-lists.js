import { Node } from "./node.js";

// LinkedList class which will represent the full list
class LinkedList {
  #head = null; // initially set the head to null

  // create a function append(value), that adds a new node containing [ value ] to the end of the list
  append(value) {
    // if head is empty, create a new Node using [ value ] then set head to the newly created Node
    if (this.#head === null) this.#head = new Node(value);
    // else, get the last node in the list, then set it's .nextNode value to a new Node using [ value ] parameter
    else {
      let current = this.#head; // get the head, this will be the current node we start from

      // while current.nextNode is not null, set current to it's next node
      while (current.nextNode !== null) {
        current = current.nextNode;
      }
      // once current is the last node, set it's .nextNode value by creating a new Node using [ value ]
      current.nextNode = new Node(value);
    }
  }

  // create a function prepend(value) adds a new node containing [ value ] to the start of the list.
  prepend(value) {
    // set head to a new Node using value and this.#head as it's .nextNode
    this.#head = new Node(value, this.#head);
  }

  // a function size(), returns the total number of nodes in the list
  size() {
    let i = 0;
    let current = this.#head;
    // while current is not null, increment i and assign current to it's next node
    while (current !== null) {
      i++;
      current = current.nextNode;
    }
    return i;
  }

  // function head(), should return the value of the first node in the list. If the list is empty, it should return undefined
  head() {
    return this.#head ? this.#head.value : undefined;
  }

  // function tail() should return the value of the final node in the list.  If the list is empty, it should return undefined
  tail() {
    let current = this.#head;
    if (current === null) return undefined;

    // while current has a .nextNode value, assign current to it's .nextNode value. until current does'nt have a next node
    while (current.nextNode) {
      current = current.nextNode;
    }
    return current.value;
  }

  // function at(index) should return the value of the node at the given index. If there’s no node at the given index, it should return undefined
  at(index) {
    // if index is bigger than the size of the list or less than zero, return undefined
    if (index > this.size() - 1 || index < 0) return undefined;
    else {
      let current = this.#head;
      // use a for loop to assign current to the value of it's .nextNode until i === index, then return current's value
      for (let i = 0; i <= this.size() - 1; i++) {
        // we will start counting from zero (like in an array)
        if (i === index) return current.value;
        current = current.nextNode;
      }
    }
  }

  // function pop() should remove the head node from the list and return its value. If it’s used on an empty list, it should just return undefined.
  pop() {
    if (!this.#head) return undefined; // if list is empty, return undefined

    // get the head node using .at(), then assign this.#head to the second node in the list
    const headNode = this.at(0);
    this.#head = this.#head.nextNode;
    return headNode;
  }

  // function contains(value) returns true if the passed in value is in the list and otherwise returns false
  contains(value) {
    // loop through each node in list, and check if each node's .value === value
    let current = this.#head;
    while (current !== null) {
      // return true if current.value === value, else move on to the next node
      if (current.value === value) return true;
      current = current.nextNode;
    }

    return false; // return false if all node's don't have a matching value
  }

  // findIndex(value) returns the index of the node containing the given value
  // if value is not in list, return -1.
  // if more than one node has a value that matches the given value, return the index of the first node that matches
  findIndex(value) {
    let current = this.#head;
    let i = 0; // start counting from zero
    while (current !== null) {
      // if current.value matches value, return i. else, increment i and move on to the next node
      if (current.value === value) return i;
      i++;
      current = current.nextNode;
    }

    return -1; // if there is not matching value in list, return -1
  }

  // function toString() represents your LinkedList objects as strings, so you can print them out and preview them in the console
  // if list is empty, return an empty string
  // The format should be: ( value ) -> ( value ) -> ( value ) -> null
  toString() {
    if (this.#head === null) return "";

    let current = this.#head;
    let result = "";
    // loop over each node in list, adding each node's value to result and moving onto the next node in list
    while (current) {
      result += `( ${current.value} ) -> `;
      current = current.nextNode;
    }
    // when we reached the end of the list add null to result and return result
    result += "null";
    return result;
  }

  // function insertAt(index, ...values) should insert new nodes with the given values at the given index
  insertAt(index, ...values) {
    switch (true) {
      // if index is below zero or above the list's size, throw a RangeError
      case index < 0:
      case index > this.size(): {
        throw RangeError("index out of bounds!");
        break;
      }

      // if index is 0, add the values to th`e start of the list
      case index === 0: {
        // first, prepend the first value to head
        this.prepend(values[0]);
        let current = this.#head;
        let nodeAfterIndex = current.nextNode;
        // use a loop to create a Node using the rest of the values
        for (let i = 1; i < values.length; i++) {
          current.nextNode = new Node(values[i]);
          current = current.nextNode; // set current to the next node
        }
        current.nextNode = nodeAfterIndex; // set the last value (in ...values) node's .nextNode to the node after the given index
        break;
      }

      default: {
        let current = this.#head;
        let i = 0;
        let nodeAtIndex;
        // use a loop that increments i and moves on to the next node in list, until i === the index of the node before the given index
        while (i !== index - 1) {
          current = current.nextNode;
          i++;
        }
        nodeAtIndex = current.nextNode; // keep the node at the given index

        // once we've got the node before the node at index, set it's .nextNode value to be the rest of the values
        for (let i = 0; i < values.length; i++) {
          current.nextNode = new Node(values[i]);
          current = current.nextNode;
        }
        // set the final value's (in ...values) .nextNode = the node at the given index we kept before
        current.nextNode = nodeAtIndex;
        break;
      }
    }
  }

  // function removeAt(index), removes the node at the given index
  removeAt(index) {
    switch (true) {
      // if index is below zero or index is bigger or equal to the size of the list, throw a RangeError
      case index < 0:
      case index >= this.size():
        throw RangeError("Index is out of bounds!");
        break;

      // if index === 0, just remove the first node in list
      case index === 0: {
        this.#head = this.#head.nextNode;
        break;
      }

      default: {
        let current = this.#head; // this will keep the node that is BEFORE the node at index
        let i = 0;
        // use a loop that moves on to the next node in list and increments i, until i === index - 1 (to get the number before index)
        while (i !== index - 1) {
          current = current.nextNode;
          i++;
        }

        // get the node at index. then assign current.nextNode to the node at the given index's .nextNode value
        let nodeAtIndex = current.nextNode;
        current.nextNode = nodeAtIndex.nextNode;
        break;
      }
    }
  }

  // function containsKey(key) returns true if the passed in key exists in list
  containsKey(key) {
    let current = this.#head;
    while (current !== null) {
      // if current node has a property "key", return true
      if (current.value.hasOwnProperty(key)) return true;
      current = current.nextNode;
    }
    return false;
  }

  // findKey(key) returns the index of the first node containing the given key
  // if key is not in list, return -1
  findKey(key) {
    let current = this.#head;
    let i = 0;
    // check each node's value until one has a property "key", then return i
    while (current !== null) {
      if (current.value.hasOwnProperty(key)) return i;
      i++;
      current = current.nextNode;
    }
    return -1;
  }
}

export { LinkedList };
