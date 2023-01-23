import { ensureArray } from '@productive-codebases/toolbox'

/**
 * Transform values like "1200" to "1200px".
 */
export function toPx(value: number | string): string {
  return `${String(value).replace('px', '')}px`
}

/**
 * Transform values like "1200" to "1200%".
 */
export function toPercent(value: number): string {
  return `${String(value).replace('%', '')}%`
}

/**
 * Transform values like "1200px" or "50%" to 1200 or 50.
 */
export function valueWithUnitToNumber(value: string): number {
  return parseInt(value.replace('px', '').replace('%', ''), 10)
}

/**
 * Do an addition between a value with its unit and an operand.
 * Example: '50px' + 10 => '60px'
 */
export function add(
  valueWithUnit: string,
  operand: number,
  withUnit = true
): string | number {
  const [value, unit] = _splitValue(valueWithUnit)
  return withUnit
    ? `${Number(value) + operand}${unit}`
    : Number(value) + operand
}

/**
 * Do an substraction between a value with its unit and an operand.
 * Example: '50px' - 10 => '40px'
 */
export function sub(
  valueWithUnit: string,
  operand: number,
  withUnit = true
): string | number {
  const [value, unit] = _splitValue(valueWithUnit)
  return withUnit
    ? `${Number(value) - operand}${unit}`
    : Number(value) - operand
}

/**
 * Do a division between a value with its unit and an operand.
 * Example: '50px' / 2 => '25px'
 */
export function divide(
  valueWithUnit: string,
  operand: number,
  withUnit = true
): string | number {
  const [value, unit] = _splitValue(valueWithUnit)
  return withUnit
    ? `${Number(value) / operand}${unit}`
    : Number(value) / operand
}

/**
 * Do a multiplication between a value with its unit and an operand.
 * Example: '50px' * 2 => '100px'
 */
export function multiply(
  valueWithUnit: string,
  operand: number,
  withUnit = true
): string | number {
  const [value, unit] = _splitValue(valueWithUnit)
  return withUnit
    ? `${Number(value) * operand}${unit}`
    : Number(value) * operand
}

/**
 * Reverse the value.
 */
export function reverse(
  valueWithUnit: string,
  withUnit = true
): string | number {
  const [value, unit] = _splitValue(valueWithUnit)
  return withUnit ? `${-Number(value)}${unit}` : -Number(value)
}

function _splitValue(value: string): string[] {
  return ensureArray(value.match(/^(\d+)(\w+)$/)).slice(1)
}
