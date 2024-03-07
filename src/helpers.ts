import {
  countryIso2Codes,
  countryIso3Codes,
} from './data';

/**
 * @func exists Whether the specified value is not null, undefined or NaN.
 *
 * @param  {any} thing
 * @return {boolean}
 */
export const exists = function exists(thing: any): boolean {
  return !(thing === undefined || thing === null || Number.isNaN(thing));
};

/**
 * @func is Whether the specified value is from the specified type regarding its whole prototype.
 *
 * @param  {function} Type Type function
 * @param  {any} thing
 * @return {boolean}
 */
export const is = function is(Type: Function, thing: any): boolean {
  return exists(Type)
  && exists(thing)
  && (thing.constructor === Type
  || thing instanceof Type);
};

/**
 * @func hasLen Whether a string has a specific length (without using length property).
 *
 * @param  {string}  str
 * @param  {number}  from Minimum 1
 * @param  {number}  to   Minimum 1
 * @return {boolean}
 */
export const hasLen = function hasLen(
  { str, from, to }: { str: string; from: number; to: number; },
): boolean {
  if (!is(String, str)) {
    return false;
  }

  const fromValue = from >= 1 ? from : 1;
  const toValue = to >= 1 && to >= fromValue ? to : fromValue;

  if (fromValue === toValue) {
    return str.charAt(fromValue - 1) !== '';
  }

  return str.charAt(fromValue - 1) !== '' || str.charAt(toValue - 1) !== '';
};

/**
 * @func match Whether the compare string matches the source string.
 *
 * @param  {string}  source  Source string
 * @param  {string}  compare Compared string
 * @param  {boolean} partial Whether to partially compare strings
 * @param  {boolean} strict  Whether to strictly compare strings
 * @return {boolean}
 */
export const match = function match({
  source,
  compare,
  partial = false,
  strict = false,
}: {
  source: string;
  compare: string;
  partial?: boolean;
  strict?: boolean;
}): boolean {
  if (!is(String, source) || !is(String, compare)) {
    return false;
  }

  if (partial === true) {
    return source.toLowerCase().includes(compare.toLowerCase());
  }

  if (strict === true) {
    return source === compare;
  }

  return source.toLowerCase() === compare.toLowerCase();
};

/**
 * @func isValidCountryIso Whether the country ISO code is a valid ISO 3166-1
 * alpha-2 or alpha-3 code.
 *
 * @param  {string}  code  ISO code (case sensitive)
 * @return {object}
 */
export const isValidCountryIso = function isValidCountryIso(
  code: string,
): { valid: boolean; iso2: boolean; iso3: boolean; } {
  const res = {
    valid: false,
    iso2: false,
    iso3: false,
  };

  if (!hasLen({ str: code, from: 2, to: 3 })) {
    return res;
  }

  if (countryIso2Codes.includes(code)) {
    res.valid = true;
    res.iso2 = true;
    return res;
  }

  if (countryIso3Codes.includes(code)) {
    res.valid = true;
    res.iso3 = true;
    return res;
  }

  return res;
};
