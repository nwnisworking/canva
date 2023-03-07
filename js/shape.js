import Item from "./item.js"
import Canvas from "./canvas.js"

class ShapeObject extends Item{
	preset(canvas){
		canvas.filter = this.filter
		canvas.fill_color = this.fill_color
		canvas.stroke_color = this.stroke_color
		canvas.stroke_size = this.stroke_size
	}
}

export class Square extends ShapeObject{
	constructor(width, height, x = 0, y = 0){
		super(x, y, width, height)
		this.width = width
		this.height = height
	}

	/**
	 * 
	 * @param {Canvas} canvas 
	 */
	draw(canvas){
		const { ctx } = canvas
		super.preset(canvas)
		ctx.fillRect(this.x, this.y, this.width, this.height)
	}
}

export const Shape = {
	Square
}