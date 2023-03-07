import Canvas from "./canvas.js"
import Color from "./color.js"
import Filter from "./filter.js"
import Gradient from "./gradient.js"

export default class Item{
	/**
	 * Position of x coordinate
	 * @type {number=}
	 */
	x = 0
	/**
	 * Position of y coordinate
	 * @type {number=}
	 */
	y = 0 
	/**
	 * Scale of width by x
	 * @type {number=}
	 */
	scale_x = 1
	/**
	 * Scale of height by y
	 * @type {number=}
	 */
	scale_y = 1
	/**
	 * The rotation of item 
	 * @type {number=}
	 */
	rotation = 0
	/**
	 * The size of item's width
	 * @type {number}
	 */
	width
	/**
	 * The size of item's height
	 * @type {number}
	 */
	height
	/**
	 * The color of item border
	 * @type {number}
	 */
	stroke_color
	/**
	 * The color of item's background
	 * @type {number|string}
	 */
	fill_color
	/**
	 * The thickness of border thickness
	 * @type {number=}
	 */
	stroke_size = 0
	/**
	 * A line array the determines the border
	 * @type {Array}
	 */
	#lines
	/**
	 * Filter items 
	 * @type {Filter}
	 */
	filter = new Filter
	/**
	 * Pivot point
	 */
	pivot = {x : 0, y : 0}

	constructor(x, y, width = null, height = null){
		this.x = x
		this.y = y
		this.width = width
		this.height = height
	}

	/**
	 * Modify the pivot point 
	 * @param {'center'|'top-left'|'top-right'|'left'|'right'|'middle'|'bottom-left'|'bottom-right'} type 
	 */
	pivotPoint(type){
		switch(type){
			case 'top-left' : 
				this.pivot = {x : 0, y : 0}
			break
			case 'top-right' : 
				this.pivot = {x : this.width, y : 0}
			break
			case 'right' : 
				this.pivot = {x : this.width, y : this.height / 2}
			break
			case 'left' : 
				this.pivot = {x : 0, y : this.height / 2}
			break
			case 'middle' : 
				this.pivot = {x : this.width / 2, y : this.height / 2}
			break
			case 'bottom-left' : 
				this.pivot = {x : 0, y : this.height}
			break
			case 'bottom-right' : 
				this.pivot = {x : this.width, y : this.height}
			break
		}

		return this
	}

	/**
	 * Translate current item from its position
	 * @param {number} x 
	 * @param {number} y 
	 */
	translate(x, y){
		this.x+= x
		this.y+= y
		return this
	}
	
	/**
	 * Rotate item to specified angle
	 * @param {number} angle 
	 */
	rotate(angle){
		this.rotation = angle
		return this
	}

	/**
	 * Scale item to x and y
	 * @param {number} x 
	 * @param {number} y 
	 */
	scale(x = 1, y = 1){
		console.log(this.scale_x)
		if(arguments.length == 1){
			this.scale_x = this.scale_y = x
		}
		else{
			this.scale_x = x
			this.scale_y = y
		}

		return this
	}

	/**
	 * Fill background color of the item
	 * @param {Color|Gradient} color 
	 */
	fill(color){
		this.fill_color = color
		return this
	}

	/**
	 * Set the size and color of the border
	 * @param {number} size 
	 * @param {*} color 
	 */
	stroke(size, color){
		this.stroke_size = size
		this.stroke_color = color
		return this
	}

	/**
	 * Creates unique border
	 * @param  {...any} num 
	 */
	lineDash(...num){
		if(arguments.length > 0){
			this.#lines = num
			return this
		}
		else
			return this.#lines
	}

	/**
	 * Resets the matrix transformation
	 */
	reset(){
		this.rotation = 
		this.x = 
		this.y = 
		this.scale_x = 
		this.scale_y = 0
		return this
	}

	/**
	 * Set unique property with getter and setter callback
	 * @param {string} name 
	 * @param {CallableFunction} get 
	 * @param {CallableFunction} set 
	 */
	setProp(name, get, set){
		Object.defineProperty(this, name, {get, set})
		return this
	}

	/**
	 * 
	 * @param {Canvas} canvas 
	 */
	draw(canvas){
		const { ctx } = canvas
		ctx.translate(this.x + this.pivot.x, this.y + this.pivot.y)
		ctx.rotate(this.rotation * (Math.PI / 180))
		ctx.translate(this.x + -(this.pivot.x), this.y + -(this.pivot.y))
		ctx.scale(this.scale_x, this.scale_y)
	}
}