import Canvas from "./canvas.js"
import Filter from "./filter.js"

export default class Image{
	/**
	 * Image bitmap data
	 * @type {ImageBitmap}
	 */
	bitmap
	/**
	 * Direction of x-axis
	 * @type {number}
	 */
	x = 0
	/**
	 * Direction of y-axis
	 * @type {number}
	 */
	y = 0
	/**
	 * Image filter
	 * @type {Filter}
	 */
	filter = new Filter
	/**
	 * Width of the bitmap
	 * @type {number}
	 */
	get width(){ return this.bitmap.width }
	/**
	 * Height of the bitmap
	 * @type {number}
	 */
	get height(){ return this.bitmap.height }
	
	constructor(data){
		return new Promise(async(res, rej)=>{
			if(data instanceof ImageBitmap)
				this.bitmap = data
			else
				this.bitmap = await createImageBitmap(await fetch(data).then(e=>e.blob()).catch(rej))
			res(this)
		})
	}

	/**
	 * Data URL of an image 
	 * @param {'jpeg'|'png'} type 
	 */
	async toDataURL(type = 'png'){
		const data = new Canvas(this.width, this.height)
		return await data.toDataURL(type)
	}

	/**
	 * Blob of the image 
	 * @param {'jpeg'|'png'} type 
	 * @return {Promise<Blob>}
	 */
	async toBlob(type = 'png'){
		const data = new Canvas(this.width, this.height)
		return await data.toBlob(type)
	}

	/**
	 * Returns an image data
	 * @param {number} x 
	 * @param {number} y 
	 * @param {number} width 
	 * @param {number} height 
	 * @returns {ImageData}
	 */
	toImageData(x, y, width, height){
		width = width ?? this.width
		height = height ?? this.height

		const data = new Canvas(width, height)

		if(arguments.length === 0)
			return data.toImageData(0, 0, width, height)
		else
			return data.toImageData(x, y, width, height)
	}

	/**
	 * Crop and return part of the image
	 * @param {number} x 
	 * @param {number} y 
	 * @param {number} width 
	 * @param {number} height 
	 */
	async crop(x, y, width, height){
		return new Image(await createImageBitmap(this.bitmap, x, y, width, height))
	}

	/**
	 * The mask data of the image
	 * @returns {Array<number>}
	 */
	mask(){
		const image_data = this.toImageData(0, 0, this.width, this.height),
		data = []

		for(let i = 0; i < image_data.length; i+=4)
			data.push(image_data[i + 3] >> 7)

		return data
	}
}