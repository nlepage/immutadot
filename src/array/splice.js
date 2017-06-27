import toArray from 'lodash/toArray'
import update from '../object/update'

/**
 * Changes the contents of an array by removing existing elements and/or adding new elements.
 * @function splice
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {number} start Index at which to start changing the array.
 * @param {number} [deleteCount] The number of old array elements to remove.
 * @param {...*} values The values to add.
 * @return {Object} Returns the updated object.
 * @example splice({ nested: { prop: [1, 2, 3, 4] } }, 'nested.prop', 1, 2, 5, 6) // => { nested: { prop: [1, 5, 6, 4] } }
 * @see {@link https://lodash.com/docs#toArray|lodash.toArray} for more information.
 * @see {@link https://mdn.io/Array.prototype.splice|Array.prototype.splice} for more information.
 * @see {@link object.update|update} for more information.
 * @since 0.1.14
 */
export default update((array, ...args) => {
  const newArray = toArray(array)
  newArray.splice(...args)
  return newArray
})