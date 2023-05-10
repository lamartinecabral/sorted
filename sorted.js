// @ts-check

function comparator(a, b) {
  let [x, y] = [+a, +b];
  // @ts-ignore
  if (isNaN(x) || isNaN(y)) [x, y] = ["" + a, "" + b];
  return x < y ? -1 : x > y ? 1 : 0;
}

/** @param {any[]} arr */
function sort(arr) {
  return arr.sort(comparator);
}

/** @param {any[]} arr */
function ltCount(arr, x) {
  let [l, r] = [0, arr.length - 1];
  while (l <= r) {
    let m = Math.floor((l + r) / 2);
    if (comparator(arr[m], x) < 0) l = m + 1;
    else r = m - 1;
  }
  return l;
}

/** @param {any[]} arr */
function lteCount(arr, x) {
  let [l, r] = [0, arr.length - 1];
  while (l <= r) {
    let m = Math.floor((l + r) / 2);
    if (comparator(arr[m], x) <= 0) l = m + 1;
    else r = m - 1;
  }
  return l;
}

/** @param {any[]} arr */
function lowerBound(arr, x) {
  return arr[ltCount(arr, x)];
}

/** @param {any[]} arr */
function upperBound(arr, x) {
  return arr[lteCount(arr, x)];
}

/** @param {any[]} arr */
function insert(arr, x, multi = true) {
  const i = lteCount(arr, x);
  if (multi || comparator(arr[i], x) !== 0) arr.splice(i, 0, x);
  return arr;
}

/** @param {any[]} arr */
function remove(arr, x) {
  const i = ltCount(arr, x);
  if (comparator(arr[i], x) === 0) arr.splice(i, 1);
  return arr;
}

/** @param {any[]} arr */
function removeAll(arr, x) {
  const i = ltCount(arr, x);
  const j = lteCount(arr, x);
  arr.splice(i, j - i);
  return arr;
}

/**
 * @param {any[]} arr
 * @param {number} i
 * */
function erase(arr, i) {
  arr.splice(i, 1);
  return arr;
}

/**
 * @param {any[]} arr
 * @param {number} i
 * @param {number} j
 * */
function eraseRange(arr, i, j) {
  arr.splice(i, j - i);
  return arr;
}

/** @template T */
class Sorted {
  static comparator = comparator;
  static sort = sort;
  static ltCount = ltCount;
  static lteCount = lteCount;
  static lowerBound = lowerBound;
  static upperBound = upperBound;
  static insert = insert;
  static remove = remove;
  static removeAll = removeAll;
  static erase = erase;
  static eraseRange = eraseRange;

  /** @param {(a: T, b: T) => number} comparator */
  constructor(comparator) {
    if (!comparator)
      throw new TypeError("An instance of Sorted needs a comparator function");
    if (typeof comparator !== "function")
      throw new TypeError("The comparator parameter must be a function");
    this.comparator = comparator;
  }

  /** @param {T[]} arr */
  sort(arr) {
    return arr.sort(this.comparator);
  }

  /**
   * @param {T[]} arr
   * @param {T} x
   * */
  ltCount(arr, x) {
    let [l, r] = [0, arr.length - 1];
    while (l <= r) {
      let m = Math.floor((l + r) / 2);
      if (this.comparator(arr[m], x) < 0) l = m + 1;
      else r = m - 1;
    }
    return l;
  }

  /**
   * @param {T[]} arr
   * @param {T} x
   * */
  lteCount(arr, x) {
    let [l, r] = [0, arr.length - 1];
    while (l <= r) {
      let m = Math.floor((l + r) / 2);
      if (this.comparator(arr[m], x) <= 0) l = m + 1;
      else r = m - 1;
    }
    return l;
  }

  /**
   * @param {T[]} arr
   * @param {T} x
   * */
  lowerBound(arr, x) {
    return arr[this.ltCount(arr, x)];
  }

  /**
   * @param {T[]} arr
   * @param {T} x
   * */
  upperBound(arr, x) {
    return arr[this.lteCount(arr, x)];
  }

  /**
   * @param {T[]} arr
   * @param {T} x
   * */
  insert(arr, x, multi = true) {
    const i = lteCount(arr, x);
    if (multi || comparator(arr[i], x) !== 0) arr.splice(i, 0, x);
    return arr;
  }

  /**
   * @param {T[]} arr
   * @param {T} x
   * */
  remove(arr, x) {
    const i = this.ltCount(arr, x);
    if (this.comparator(arr[i], x) === 0) arr.splice(i, 1);
    return arr;
  }

  /**
   * @param {T[]} arr
   * @param {T} x
   * */
  removeAll(arr, x) {
    const i = this.ltCount(arr, x);
    const j = this.lteCount(arr, x);
    arr.splice(i, j - i);
    return arr;
  }

  /**
   * @param {T[]} arr
   * @param {number} i
   * */
  erase(arr, i) {
    arr.splice(i, 1);
    return arr;
  }

  /**
   * @param {T[]} arr
   * @param {number} i
   * @param {number} j
   * */
  eraseRange(arr, i, j) {
    arr.splice(i, j - i);
    return arr;
  }
}

export default Sorted;

export {
  comparator,
  erase,
  eraseRange,
  insert,
  lowerBound,
  ltCount,
  lteCount,
  remove,
  removeAll,
  sort,
  upperBound,
};
