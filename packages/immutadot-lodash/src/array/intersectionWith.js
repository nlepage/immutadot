import _intersectionWith from 'lodash/intersectionWith'
import { convert } from 'immutadot/core/convert'

/**
 * This method is like {@link array.intersection} except that it uses <code>comparator</code> to compare elements of the former array to <code>arrays</code>.
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {...Array} [arrays] The arrays to inspect.
 * @param {Function} [comparator] The comparator invoked per element.
 * @return {Object} Returns the updated object.
 * @example intersectionWith({ nested: { prop: [{ x: 1 }, { x: 2 }] } }, 'nested.prop', [{ x: 2 }, { x: 3 }], (a, b) => a.x === b.x) // => { nested: { prop: [{ x: 2 }] } }
 * @see {@link https://lodash.com/docs#intersectionWith|lodash.intersectionWith} for more information.
 * @since 1.0.0
 * @flow
 */
const intersectionWith = convert(_intersectionWith)
export { intersectionWith }