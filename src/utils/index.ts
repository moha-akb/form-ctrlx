/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-return */
import { Maybe } from '../useFormController/types'

export const updateFieldSchema = <T>(obj: T, path: string, value: any): T => {
  const clonedObj = Object.assign({}, obj)
  let o = clonedObj
  const list = path.split('.')
  let l = 0
  for (l = 0; l < list.length - 1; l++) {
    const key = list[l]
    if (!o[key]) {
      o[key] = {}
    }
    o = o[key]
  }
  o[list[l]] = value
  return clonedObj
}

export const isEqual = (obj1: any, obj2: any): boolean => {
  return obj1 === obj2
}

export const deepEqual = <T extends Object>(
  source: Maybe<T>,
  target: Maybe<T>
): boolean => {
  if ((source === null || source === undefined) && target) {
    return false
  }
  if ((target === null || target === undefined) && source) {
    return false
  }
  if (source === null && target === null) {
    return true
  }
  if (source && target) {
    const sourceKeys = Object.keys(source)
    const targetKeys = Object.keys(target)
    if (sourceKeys.length !== targetKeys.length) {
      return false
    }
    for (const key of sourceKeys) {
      const sourceValue = source[key]
      const targetValue = target[key]
      const objects = isObject(sourceValue) && isObject(targetValue)
      if (
        (objects && !deepEqual(sourceValue, targetValue)) ||
        (!objects && sourceValue !== targetValue)
      ) {
        return false
      }
    }
  }
  return true
}

export const isObject = (object: any): boolean => {
  return object != null && typeof object === 'object'
}

export const isValueChanged = <T extends Object>(
  source: T,
  target: T
): { [K in keyof T]: boolean } => {
  const res: any = {}
  const sourceKeys = Object.keys(source)
  for (const key of sourceKeys) {
    const sourceValue = source[key]
    const targetValue = target[key]
    res[key] = sourceValue !== targetValue
  }
  return res
}
