// import Filter from "../js-2.0.0/filter.js"
// import Image from "../js-2.0.0/image.js"
// Under construction 
// export default class Sprite{
// 	/**
// 	 * Image of a sprite
// 	 * @type {Image}
// 	 */
// 	image
// 	/**
// 	 * Sprite x-axis coordinate
// 	 * @type {number}
// 	 */
// 	x = 0
// 	/**
// 	 * Sprite y-axis coordinate
// 	 * @type {number}
// 	 */
// 	y = 0
// 	/**
// 	 * Sprite state animation
// 	 * @type {Object}
// 	 */
// 	state = {}
// 	/**
// 	 * Width of sprite box
// 	 * @type {number}
// 	 */
// 	width
// 	/**
// 	 * Height of sprite box
// 	 * @type {number}
// 	 */
// 	height
// 	/**
// 	 * Sprite filter
// 	 */
// 	filter = new Filter

// 	constructor(image, width, height){
// 		this.image = image
// 		this.width = width
// 		this.height = height
// 	}

// 	async createState(name, x, y){
// 		const { bitmap } = this.image,
// 		length = Math.ceil(bitmap.width / this.width)
		
// 		this.state[name] = {
// 			x, 
// 			y, 
// 			bitmaps : await Promise.all(Array.from(
// 				{ length }, 
// 				async(_, i)=>new Image(await createImageBitmap(bitmap, i * this.width + x, y, this.width, this.height))
// 			))
// 		}

// 		return this
// 	}

// 	async addFrame(name, x, y){
// 		const { bitmap } = this.image
// 		this.state[name].bitmaps.push(await new Image(await createImageBitmap(bitmap, x, y, this.width, this.height)))
// 		return this
// 	}
// }