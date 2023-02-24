import Color from "./color.js"

/**
 * Gradient coordinate for all types of gradients
 * @typedef GradientCoord
 * @property {number} x
 * @property {number} y
 * @property {number|null} r
 * @property {number|null} angle
 */

/**
 * Gradient color and total step
 * @typedef GradientColor
 * @property {Color} color
 * @property {number} offset
 */

export default class Gradient{
	/** 
	 * Type of gradient 
	 * @type {'linear'|'radial'|'conic'}
	 */
	type
	/**
	 * Gradient coordinates
	 * @type {Array<GradientCoord>}
	 **/
	coord
	/**
	 * Color of the gradient
	 * @type {Array<GradientColor>} 
	 */
	colors = []

	/**
	 * 
	 * @param {'linear'|'radial'|'conic'} type 
	 * @param {object} coord
	 */
	constructor(type, coord = {}){
		this.type = type
		 this.coord = coord
	}

	/**
	 * Add color to the gradient 
	 * @param {Color} color 
	 * @param {number} offset 
	 */
	addColor(color, offset = 0){
		if(color instanceof Color)
			this.colors.push({color, offset})
		
		return this
	}

	/**
	 * Creates a linear gradient from first to last coordinates
	 * @param {number} x0 
	 * @param {number} y0 
	 * @param {number} x1 
	 * @param {number} y1 
	 */
	static linear(x0, y0, x1, y1){
		return new this('linear', [{x : x0, y : y0}, {x : x1, y : y1}] )
	}

	/**
	 * Creates a radial gradient from the start circle to the end circle
	 * @param {number} x0
	 * @param {number} y0
	 * @param {number} r0
	 * @param {number} x1
	 * @param {number} y1
	 * @param {number} r1
	 */
	static radial(x0, y0, r0, x1, y1, r1){
		return new this('radial', [{x : x0, y : y0, r : r0}, {x : x1, y : y1, r : r1}])
	}

	/**
	 * Create a conic gradient 
	 * @param {number} x 
	 * @param {number} y 
	 * @param {number} angle 
	 */
	static conic(x, y, angle){
		return new this('conic', [{x, y, angle}])
	}
}