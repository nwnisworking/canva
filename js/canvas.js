import Image from "./image.js"
import Color from "./color.js"
import Gradient from "./gradient.js"
import Shape from "./shape.js"

export default class Canvas{
	get width(){ return this.element.width }
	set width(val){ this.element.width = val }

	get height(){ return this.element.height }
	set height(val){ this.element.height = val }

	get element(){ return this.ctx.canvas }

	get filter(){ return this.ctx.filter }
	set filter(val){ return this.ctx.filter = val }

	set fill_color(val){ this.ctx.fillStyle = val }
	get fill_color(){ return this.ctx.fillStyle }

	set stroke_color(val){ this.ctx.strokeStyle = val }
	get stroke_color(){ return this.ctx.strokeStyle }

	set stroke_size(val){ this.ctx.lineWidth = val }
	get stroke_size(){ return this.ctx.lineWidth }

	/**
	 * Canvas context
	 * @type {CanvasRenderingContext2D}
	 */
	ctx
	/**
	 * Background of the canvas
	 * @type {Color|Gradient}
	 */
	background

	constructor(width, height){
		this.ctx = document.createElement('canvas').getContext('2d')
		this.width = width
		this.height = height
	}

	draw(data, x = 0, y = 0, width = null, height = null){
		this.ctx.save()
		width = width ?? data.width
		height = height ?? data.height

		if(
			data instanceof Image && (this.filter = data.filter ?? 'none', data = data.bitmap) || 
			data instanceof ImageBitmap
		){
			this.ctx.drawImage(data, x, y, width, height)
		}
		else if(data instanceof ImageData){
			this.ctx.putImageData(data, x, y)
		}
		else if(data instanceof Shape){
			this.filter = data.filter
			this.stroke_color = data.stroke_color
			this.fill_color = data.fill_color
			this.stroke_size = data.stroke_size

			width = data.width
			height = data.height
			x = data.x
			y = data.y

			if(data.lines.length > 0)	
				this.ctx.setLineDash(data.lines)

			if(data.type === 'triangle'){
				let angle = 0,
				arr = new Array(data.edges).fill(0),
				min_x,
				min_y

				this.ctx.beginPath()
				
				arr = arr.map((_, i)=>{
					const rad = angle * Math.PI / 180
					angle+= 360 / arr.length
					return [ width / 2 * Math.sin(rad), height / 2 * Math.cos(rad) ]
				})

				min_x = Math.abs(Math.min(...arr.map(e=>e[0])))
				min_y = Math.abs(Math.min(...arr.map(e=>e[1])))

				arr.forEach(([a, b])=>this.ctx.lineTo(a + min_x + x, b + min_y + y))
				
				this.ctx.closePath()
			}
			else if(data.type === 'square'){
				this.ctx.beginPath()
				this.ctx.rect(x, y, width, height)
				this.ctx.closePath()
			}
			else{
				this.ctx.beginPath()
				this.ctx.ellipse(x + data.width / 2, y + data.height / 2, data.width / 2, data.height / 2, Math.PI / 4, 0, 2 * Math.PI)
				this.ctx.closePath()
			}

			if(data.stroke_size > 0)
				this.ctx.stroke()
			this.ctx.fill()
		}
			
		this.ctx.restore()

		return this
	}

	/**
	 * 
	 * @param {Color|Gradient} color 
	 */
	fill(color){
		this.background = color

		this.ctx.save()

		if(color instanceof Gradient){
			const { type, colors, coord } = color
			/**@type {CanvasGradient} */
			let gradient

			switch(type){
				case 'linear' : 
					gradient = this.ctx.createLinearGradient(
						coord[0].x, 
						coord[0].y, 
						coord[1].x, 
						coord[1].y
					)
				break
				case 'radial' : 
					gradient = this.ctx.createRadialGradient(
						coord[0].x, 
						coord[0].y,
						coord[0].r,
						coord[1].x, 
						coord[1].y,
						coord[1].r
					)
				break
				case 'conic' :
					gradient = this.ctx.createConicGradient(
						coord[0].angle,
						coord[0].x,
						coord[0].y
					)
				break
			}

			colors.forEach(({offset, color})=>gradient.addColorStop(offset, color))
			color = gradient
		}
		this.ctx.fillStyle = color
		this.ctx.fillRect(0, 0, this.width, this.height)
		this.ctx.restore()

		return this
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
		if(arguments.length === 0)
			return this.ctx.getImageData(0, 0, this.width, this.height)
		return this.ctx.getImageData(x, y, width, height)
	}

	/**
	 * Returns a base64 string
	 * @param {'jpeg'|'png'} type
	 * @returns {string}
	 */
	toDataURL(type){
		return this.element.toDataURL(type)
	}

	/**
	 * Returns a BLOB
	 * @param {'jpeg'|'png'} type
	 * @returns {Blob}
	 */
	async toBlob(type){
		return new Promise(res=>{
			this.element.toBlob(res, type)
		})
	}

}