import {
  getSliceBounds,
  isIndex,
  isSlice,
} from './path.utils'

import {
  isNil,
  length,
} from 'util/lang'

import { unsafeToPath } from './toPath'

/**
 * Makes a copy of value.
 * @function
 * @param {*} value The value to make a copy of
 * @param {boolean} asArray The value should be copied as an array
 * @returns {Object|Array} A copy of value
 * @memberof core
 * @private
 * @since 1.0.0
 */
const copy = (value, asArray) => {
  if (isNil(value)) {
    if (asArray) return []
    return {}
  }
  if (Array.isArray(value)) return [...value]
  return { ...value }
}

const getNewObj = (obj, prop, doCopy) => {
  if (!doCopy) return obj
  return copy(obj, isIndex(prop))
}

/**
 * Operation to apply on a nested property of an object, to be called by {@link core.apply|apply}.
 * @memberof core
 * @callback operation
 * @param {*} obj The last nested object
 * @param {string|number} prop The prop of the last nested object
 * @param {*} value The value of the prop
 * @param {...*} args The remaining args (passed to the {@link core.appliedOperation|appliedOperation})
 * @private
 * @since 1.0.0
 */

/**
 * A function able to apply an {@link core.operation|operation} on a nested property of an object, returned by {@link core.apply|apply}.
 * @memberof core
 * @callback appliedOperation
 * @param {*} obj The last nested object
 * @param {string} path The prop of the last nested object
 * @param {...*} args The remaining args (to be passed to the {@link core.operation|operation})
 * @returns {*} Result of the operation
 * @private
 * @since 1.0.0
 */

/**
 * Creates a function able to apply <code>operation</code> on a nested property.
 * @memberof core
 * @function
 * @param {core.operation} operation The operation to apply
 * @returns {core.appliedOperation} A function able to apply <code>operation</code>
 * @private
 * @since 1.0.0
 */
const apply = operation => {
  const curried = (path, ...args) => obj => {
    const walkPath = (curObj, curPath, doCopy = true) => {
      const [prop, ...pathRest] = curPath

      if (isSlice(prop)) {
        const [start, end] = getSliceBounds(prop, length(curObj))

        const newArr = copy(curObj, true)
        let noop = true

        for (let i = start; i < end; i++) {
          const [iNoop] = walkPath(newArr, [i, ...pathRest], false)
          noop = noop && iNoop
        }

        if (noop) return [true, curObj]

        return [false, newArr]
      }

      const value = isNil(curObj) ? undefined : curObj[prop]

      if (curPath.length === 1) {
        const newObj = getNewObj(curObj, prop, doCopy)
        operation(newObj, prop, value, ...args)
        return [false, newObj]
      }

      const [noop, newValue] = walkPath(value, pathRest)
      if (noop) return [true, curObj]

      const newObj = getNewObj(curObj, prop, doCopy)

      newObj[prop] = newValue

      return [false, newObj]
    }

    const [, result] = walkPath(obj, unsafeToPath(path))
    return result
  }

  const uncurried = (obj, path, ...args) => curried(path, ...args)(obj)

  uncurried.curried = curried

  return uncurried
}

export { apply }
