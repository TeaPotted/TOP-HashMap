import { LinkedList } from "./linked-lists.js";

test("LinkedList.append(value) adds a new node containing value to the end of the list", () => {
  const l = new LinkedList();
  l.append("apple");
  expect(l.toString()).toBe("( apple ) -> null");
  l.append("banana");
  expect(l.toString()).toBe("( apple ) -> ( banana ) -> null");
});

test("LinkedList.prepend(value) adds a new node containing value to the start of the list", () => {
  const l = new LinkedList();
  l.append("banana");
  l.prepend("apple")
  expect(l.toString()).toBe("( apple ) -> ( banana ) -> null")
})

test("LinkedList.size() returns total number of nodes in the list", () => {
  const l = new LinkedList();
  l.append("apple");
  l.append("banana");
  expect(l.size()).toBe(2);
});

test("LinkedList.head() returns the value of the first node in the list", () => {
  const l = new LinkedList();
  l.append("apple");
  l.append("banana");
  expect(l.head()).toBe("apple");
});

test("LinkedList.head() returns undefined if list is empty", () => {
  expect(new LinkedList().head()).toBe(undefined);
});

test("LinkedList.tail() returns the value of the final node in the list", () => {
  const l = new LinkedList();
  l.append("apple");
  l.append("banana");
  expect(l.tail()).toBe("banana");
});

test("LinkedList.tail() returns undefined if list is empty", () => {
  expect(new LinkedList().tail()).toBe(undefined);
});

test("LinkedList.at(index) returns the value of the node at the given index", () => {
  const l = new LinkedList();
  l.append("apple");
  l.append("banana");
  l.append("orange");
  expect(l.at(0)).toBe("apple");
  expect(l.at(1)).toBe("banana");
  expect(l.at(2)).toBe("orange");
});

test("LinkedList.at(index) returns undefined if there is no node at the given index", () => {
  expect(new LinkedList().at(0)).toBe(undefined);
});

test("LinkedList.pop() removes the head node from the list and returns it's value", () => {
  const l = new LinkedList();
  l.append("apple");
  l.append("banana");
  expect(l.pop()).toBe("apple");
});

test("LinkedList.pop() assigns the second node in list as the head", () => {
  const l = new LinkedList();
  l.append("apple");
  l.append("banana");
  l.pop();
  expect(l.head()).toBe("banana");
});

test("LinkedList.pop() returns undefined on an empty list", () => {
  expect(new LinkedList().pop()).toBe(undefined);
});

test("LinkedList.contains(value) returns true if the passed in value is in the list", () => {
  const l = new LinkedList();
  l.append("apple");
  l.append("banana");
  expect(l.contains("apple")).toBe(true);
  expect(l.contains("banana")).toBe(true);
});

test("LinkedList.contains(value) returns false if the passed in value is not in the list", () => {
  const l = new LinkedList();
  l.append("apple");
  l.append("banana");
  expect(l.contains("coconut")).toBe(false);
});

test("LinkedList.findIndex(value) returns the index of the node containing the given value", () => {
  const l = new LinkedList();
  l.append("apple");
  l.append("banana");
  l.append("apple");
  expect(l.findIndex("apple")).toBe(0);
  expect(l.findIndex("banana")).toBe(1);
});

test("LinkedList.findIndex(value) returns -1 if value can't be found in the list", () => {
  const l = new LinkedList();
  l.append("apple");
  l.append("banana");
  expect(l.findIndex("coconut")).toBe(-1);
});

test('LinkedList.toString() returns "( apple ) -> ( banana ) -> null"', () => {
  const l = new LinkedList();
  l.append("apple");
  l.append("banana");
  expect(l.toString()).toBe("( apple ) -> ( banana ) -> null");
});

test("LinkedList.toString() returns an empty string if the list is empty", () => {
  expect(new LinkedList().toString()).toBe("");
});

test("LinkedList.insertAt(index, ...values) inserts new nodes with the given values at the given index", () => {
  const l = new LinkedList();
  l.append("apple");
  l.append("dragonfruit");
  l.insertAt(1, "banana", "coconut");
  expect(l.toString()).toBe(
    "( apple ) -> ( banana ) -> ( coconut ) -> ( dragonfruit ) -> null",
  );
  l.insertAt(0, "watermelon", "guava");
  expect(l.toString()).toBe(
    "( watermelon ) -> ( guava ) -> ( apple ) -> ( banana ) -> ( coconut ) -> ( dragonfruit ) -> null",
  );
});

test("LinkedList.insertAt(index, ...values) throws a rangeError if the method is called with an index that is out of bounds", () => {
  const l = new LinkedList();
  l.append("apple");
  l.append("dragonfruit");
  expect(() => l.insertAt(3, "banana", "coconut")).toThrow(RangeError);
});

test("LinkedList.removeAt(index) removes the node at the given index", () => {
  const l = new LinkedList();
  l.append("apple");
  l.append("banana");
  l.append("coconut");
  l.removeAt(1);
  expect(l.toString()).toBe("( apple ) -> ( coconut ) -> null");
  l.removeAt(0);
  expect(l.toString()).toBe("( coconut ) -> null");
});

test("LinkedList.removeAt(index) throws a RangeError if the given index is out of bounds", () => {
  const l = new LinkedList();
  l.append("apple");
  l.append("banana");
  l.append("coconut");
  expect(() => l.removeAt(-1)).toThrow(RangeError);
  expect(() => l.removeAt(3)).toThrow(RangeError);
});
