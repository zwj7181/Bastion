/**
 * 常见的判断函数
 */

/**
 * 检测 `value` 的类型
 *
 * @since 0.1.1
 * @param value 要检测的值
 * @returns 返回检测值的类型
 * @example
 * ```ts
 *  getType(1) // => 'Number'
 *  getType(true) // => 'Boolean'
 * ```
 */
export default function getType(value: any) {
  return Object.prototype.toString.call(value).slice(8, -1);
}

export function isNull(value: any) {
  return getType(value) === 'Null';
}

/**
 * 检查 `value` 是否是 `undefined`
 *
 * @param value 要检查的值
 * @returns `value` 是 `undefined` 返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * isUndefined(undefined) // => true
 * ```
 */
export function isUndefined(value: any): value is undefined {
  // return getType(value) === 'Undefined';
  return value === undefined;
}

/**
 * 检查 `value` 是否是一个字符串
 *
 * @param value 要检查的值
 * @returns `value` 是字符串返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * isString('') // => true
 * isString('hello') // => true
 * ```
 */
export function isString(value: any): value is string {
  return typeof value === 'string';
}

/**
 * 检查 `value` 是否是一个数字。
 *
 * @param value 要检查的值
 * @returns `value` 是数字返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * isNumber(1) // => true
 * isNumber(0.1) // => true
 * isNumber(NaN) // => false
 * isNumber(Infinity) // => false
 * ```
 */
export function isNumber(value: any): value is number {
  return typeof value === 'number';
}

/**
 * 检查 `value` 是否是一个整数。
 *
 * @param value 要检查的值
 * @returns `value` 是整数返回 `true`，否则返回 `false`
 * @example
 * ```
 * isInteger(1) // => true
 * isInteger(1.2) // => false
 * isInteger(-1) // => true
 * ```
 */
export function isInteger(value: any): value is number {
  return Number.isInteger(value);
}

/**
 * 检查 `value` 是否是一个数组。
 *
 * @param value 要检查的值
 * @returns `value` 是数组返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * isArray(['x']) // => true
 * isArray('x') // => false
 * ```
 */
export function isArray(value: any): value is any[] {
  return Array.isArray(value);
}

/**
 * 检查 `value` 是否是一个布尔值。
 *
 * @param value 要检查的值
 * @returns `value` 是布尔值返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * isBoolean(true) // => true
 * isBoolean(false) // => true
 * isBoolean('true') // => false
 * ```
 */
export function isBoolean(value: any): value is boolean {
  return typeof value === 'boolean';
}

/**
 * 检查 `value` 是否是一个函数。
 *
 * @param value 要检查的值
 * @returns `value` 是函数返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * isFunction(() => {}) // => true
 * isFunction(2000) // => false
 * ```
 */
export function isFunction(value: any): value is Function {
  return typeof value === 'function';
}

/**
 * 检查 `value` 是否是一个日期。
 *
 * @param value 要检查的值
 * @returns `value` 是日期返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * isDate(new Date()) // => true
 * ```
 */
export function isDate(value: any): value is Date {
  return getType(value) === 'Date';
}

/**
 * 检查 `obj` 是否是一个空对象
 *
 * @since 0.1.1
 * @param obj 要检查的值
 * @returns `obj` 是空对象返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * isEmptyObject({}) // => true
 * isFunction({a: 1}) // => false
 * ```
 */
export function isEmptyObject(obj: object): boolean {
  if (!obj || typeof obj !== 'object' || isArray(obj)) {
    return false;
  }
  return !Object.keys(obj).length;
}

/**
 * 检查 `value` 是否是一个对象。
 *
 * @param value 要检查的值
 * @returns `value` 是对象返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * isObject({}) // => true
 * isObject(() => {}) // => true
 * isObject(null) // => false
 * ```
 */
export function isObject(value: any): value is object {
  const type = typeof value;
  return value !== null && (type === 'object' || type === 'function');
}

/**
 * 检查 `value` 是否是一个正则对象。
 *
 * @param value 要检查的值
 * @returns `value` 是正则对象返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * isRegExp(/hello/) // => true
 * isRegExp(new RegExp('hello')) // => true
 * ```
 */
export function isRegExp(value: any): value is RegExp {
  return getType(value) === 'RegExp';
}

const protocolAndDomainRE = /^(?:\w+:)?\/\/(\S+)$/;

const localhostDomainRE = /^localhost[\:?\d]*(?:[^\:?\d]\S*)?$/;
const nonLocalhostDomainRE = /^[^\s\.]+\.\S{2,}$/;

/**
 * 检查字符串是否是 url
 *
 * @param value 要检查的值
 * @returns `value` 是 Url 返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * isUrl('https://www.baidu.com') // => true
 * ```
 */
export function isUrl(value: string) {
  if (!isString(value)) {
    return false;
  }

  const match = value.match(protocolAndDomainRE);
  if (!match) {
    return false;
  }

  const everythingAfterProtocol = match[1];
  if (!everythingAfterProtocol) {
    return false;
  }

  if (localhostDomainRE.test(everythingAfterProtocol) || nonLocalhostDomainRE.test(everythingAfterProtocol)) {
    return true;
  }

  return false;
}

export function isUrl2(string) {
  const protocolRE = /^(?:\w+:)?\/\/(\S+)$/;
  // const domainRE = /^[^\s\.]+\.\S{2,}$/;
  if (typeof string !== 'string') return false;
  return protocolRE.test(string);
}

/**
 * 判断微信浏览器
 */
export function isWeChat(): boolean {
  // window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
  const ua = window.navigator.userAgent.toLowerCase();
  // 通过正则表达式匹配ua中是否含有MicroMessenger字符串
  const match = ua.match(/MicroMessenger/i);
  if (match?.includes('micromessenger')) {
    return true;
  }
  return false;
}

export const isMap = (value: unknown): value is Map<any, any> => getType(value) === 'Map';
export const isSet = (value: unknown): value is Set<any> => getType(value) === 'Set';
export const isSymbol = (value: unknown): value is symbol => typeof value === 'symbol';
export const isPromise = <T = any>(value: unknown): value is Promise<T> => {
  return isObject(value) && isFunction(value.then) && isFunction(value.catch);
};
export const isClient = typeof window !== 'undefined';
export const isWindow = (value: unknown): value is Window =>
  typeof window !== 'undefined' && getType(value) === 'Window';

/**
 * whether in browser env
 */
export const isBrowser = (): boolean =>
  typeof window !== 'undefined' &&
  typeof window.document !== 'undefined' &&
  typeof window.document.createElement !== 'undefined';
