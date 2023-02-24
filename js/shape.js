import Color from "./color.js"
import Filter from "./filter.js"
import Gradient from "./gradient.js"

export default class Shape{
	/**
	 * Types of shape
	 * @type {'square'|'circle'|'line'|'triangle'}
	 */
	type
	/**
	 * Size of the width
	 * @type {number}
	 */
	width
	/**
	 * Size of the height
	 * @type {number}
	 */
	height
	/**
	 * X coordinate 
	 * @type {number}
	 */
	x
	/**
	 * Y coordinate
	 * @type {number}
	 */
	y
	/**
	 * Angle of the shape. Only applicable to circle
	 * @type {number|null}
	 */
	angle =null
	/**
	 * Shape edges. Only applicable to triangle
	 * @type {number|null}
	 */
	edges = null
	/**
	 * Shape filter
	 * @type {Filter}
	 */
	filter = new Filter
	/**
	 * Background color of the shape
	 * @type {Color|Gradient}
	 */
	fill_color
	/**
	 * Stroke color of the shape
	 * @type {Color|Gradient}
	 */
	stroke_color
	/**
	 * Stroke size for the shape
	 * @type {number}
	 */
	stroke_size = 0
	/**
	 * Line stroke type
	 * @type {Array<number>}
	 */
	lines = []

	constructor(type, x, y, width, height, options){
		this.type = type
		this.x = x
		this.y = y
		this.width = width
		this.height = height

		if(this.type === 'triangle')
			this.edges = options
		else if(this.type === 'circle')
			this.angle = options

	}

	fill(color){
		this.fill_color = color
		return this
	}

	stroke(size, color){
		this.stroke_size = size
		this.stroke_color = color
		return this
	}

	lineDash(arr){
		this.lines = arr
		return this
	}

	static square(x, y, width, height){
		return new this('square', x, y, width, height)
	}

	static circle(x, y, width, height, angle){
		return new this('circle', x, y, width, height, angle)
	}

	static triangle(x, y, width, height, edges = 3){
		if(edges < 3)
			throw new Error('Triangle must have 3 or more edges')

		return new this('triangle', x, y, width, height, edges)
	}
}