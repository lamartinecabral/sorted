# Sorted

A javascript library to simplify the manipulation of sorted arrays.

# Motivation

Influenced by [GCC policy based data structures](https://www.geeksforgeeks.org/policy-based-data-structures-g/) the objective of this library is to provide the following operations:

- insert or remove an element in a set while keeping it sorted
- find in the set the kth element
- find in the set the first element greater than or equal to given value
- answer how many elements in the set are less than given value

# How does it work

Since the arrays are to be sorted, searches are based on the binary search algorithm. Insertions and removals rely on `Array.prototype.splice`.

### Isn't splice O(n)?

Yes, it is. But after several tests I discovered that this approach outperforms other implementations with logarithmic operations - up to around 30k elements.

According to my tests this approach is not recommended if you are going to handle hundreds of thousands of elements or more. In this case you should find a structure with logarithmic operations.

### Then why bother doing this?

Because it is very simple and very useful - at least for me. I am sharing it mostly because I want a better way to reuse this code.

# Installation

```
npm install lamartinecabral/sorted
```
or
```
yarn add lamartinecabral/sorted
```

# Usage

```javascript
import { insert, lowerBound, ltCount } from 'sorted';

const arr = [];
insert(arr, 5);
insert(arr, 7);
insert(arr, 2);

console.log(arr); // [2, 5, 7]
console.log(lowerBound(arr, 3)); // 5
console.log(ltCount(arr, 7)); // 2
```
or
```javascript
import Sorted from 'sorted';

const { insert, lowerBound, ltCount } = new Sorted((a,b)=>a.id-b.id);

const arr = [];
insert(arr, {id: 5, name: 'foo'});
insert(arr, {id: 7, name: 'bar'});
insert(arr, {id: 2, name: 'bak'});

console.log(arr.map(a=>a.id)); // [2, 5, 7]
console.log(lowerBound(arr, {id: 3})); // {id: 5, name: 'foo'})
console.log(ltCount(arr, {id: 7})); // 2
```
