import Canvas from "./canvas.js"
import Item from "./item.js"

export default class Image extends Item{
	/**
	 * @type {ImageBitmap}
	 */
	bitmap

	constructor(data){
		super(0, 0)
		return new Promise(async(res, rej)=>{
			this.bitmap  = data instanceof ImageBitmap ? 
				data :
				await createImageBitmap(await fetch(data).then(e=>e.blob())).catch(rej)

				// Unique property that references other object will be cast as such
			this
			.setProp('width', ()=>this.bitmap.width * this.scale_x)
			.setProp('height', ()=>this.bitmap.height * this.scale_y)

			res(this)
		})
	}

	/**
	 * Draw image to context
	 * @param {Canvas} canvas
	 */
	draw(canvas){
		const { ctx } = canvas
		ctx.save()
		super.draw(canvas)
		canvas.fill_color = this.fill_color
		canvas.stroke_color = this.stroke_color
		canvas.stroke_size = this.stroke_size
		
		ctx.fillRect(this.x, this.y, this.width, this.height)
		canvas.filter = this.filter
		ctx.drawImage(this.bitmap, this.x, this.y, this.width, this.height)
		canvas.filter = 'none'
		ctx.strokeRect(this.x, this.y, this.width, this.height)
		ctx.restore()
		return this
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
		data.draw(this.bitmap)

		if(arguments.length === 0)
			return data.toImageData(0, 0, width, height)
		else
			return data.toImageData(x, y, width, height)
	}

	/**
	 * Crop an area of the image and returns a new image
	 * @param {number} x
	 * @param {number} y
	 * @param {number} width
	 * @param {number} height
	 */
	async crop(x, y, width, height){
		return new Image(await createImageBitmap(this.bitmap, x, y, width, height))
	}

	/**
	 * Get the mask data of the image
	 */
	mask(){
		const { data } = this.toImageData(0, 0, this.width, this.height),
		arr = []

		for(let i = 3; i < data.length; i+= 4)
			arr.push(data[i] >> 7)

		return arr
	}
}