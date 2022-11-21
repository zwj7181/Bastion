/**
 * 从url获取参数并转为对象
 * @param URL string http地址
 * @returns object
 * getParameters('https://www.google.com.hk/search?q=js+md&newwindow=1'); // {q: 'js+md', newwindow: '1'}
 */
export const getParameters = (URL: string = window.location.href) =>
  JSON.parse(`{"${decodeURI(URL.split('?')[1]).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"')}"}`);

/**
 * 实现trim
 * @param str
 * @returns string
 */
export function trim(str: string) {
  return str.trim?.() || str.replace(/^\s+|\s+$/g);
}

/**
 * 实现冒泡排序
 * @param arr
 * @returns array
 */
export function bubbleSort(arr: any[]) {
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (arr[i] > arr[j]) {
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
    }
  }
  return arr;
}

/**
 * 实现快排
 * @param arr
 * @returns array
 */
export function quickSort(arr: any[]) {
  const len = arr.length;
  if (len <= 1) return arr;
  const midIndex = Math.floor(len / 2);
  let left = [];
  let right = [];
  const midValue = arr[midIndex];
  for (let i = 0; i < len; i++) {
    if (i !== midIndex) {
      if (arr[i] < midValue) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }
  }
  return arguments.callee(left).concat([midValue], arguments.callee(right));
}

/**
 * 柯里化函数curry
 * @param fn
 * @returns
 * test ...
  function add (x, y) {
    return x + y
  }
  const fn = curry(add)

  console.log(fn(2)(3))
 */
export function curry(fn) {
  const len = fn.length;
  return function currying(...args) {
    if (len === args.length) {
      return fn.apply(null, args);
    }
    return function (...args2) {
      return currying.apply(null, [...args, ...args2]);
    };
  };
}

/**
 * 以为数组转树形结构
 *
 */
export function arrayToTree(items: { id: number; name: string; pid: number }[]) {
  let result = [];
  const itemMap = {};
  for (const item of items) {
    itemMap[item.id] = { ...item, children: [] };
  }

  for (const item of items) {
    const id = item.id;
    const pid = item.pid;
    const treeItem = itemMap[id];
    if (pid === 0) {
      result.push(treeItem);
    } else {
      if (!itemMap[pid]) {
        itemMap[pid] = {
          children: [],
        };
      }
      itemMap[pid].children.push(treeItem);
    }
  }
  return result;
}

/**
 * 给数字添加千位符
 * @param num
 * @returns
 */
export function numFormat(number: number) {
  let num = number.toString().split('.'); // [123456789, 123456678]
  const arr = num[0].split('').reverse();
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    if (i !== 0 && i % 3 === 0) {
      res.push(',');
    }
    res.push(arr[i]);
  }
  res.reverse();
  if (num[1]) {
    res = res.join('') + '.' + num[1];
  } else {
    res = res.join('');
  }
  return res;
}
