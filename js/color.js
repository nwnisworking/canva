export default class Color{
	static TRANSPARENT = null
	static BLACK   = new this(0x000000)
	static SILVER  = new this(0xC0C0C0)
	static GRAY    = new this(0x808080)
	static WHITE   = new this(0xFFFFFF)
	static MAROON  = new this(0x800000)
	static RED     = new this(0xFF0000)
	static PURPLE  = new this(0x800080)
	static FUCHSIA = new this(0xFF00FF)
	static GREEN   = new this(0x008000)
	static LIME    = new this(0x00FF00)
	static OLIVE   = new this(0x808000)
	static YELLOW  = new this(0xFFFF00)
	static NAVY    = new this(0x000080)
	static BLUE    = new this(0x0000FF)
	static TEAL    = new this(0x008080)
	static AQUA    = new this(0x00FFFF)
	/**
	 * Value of the color 
	 * @type {number} 
	 */
	value

	/**
	 * @param {number|string} color 
	 */
	constructor(color){
		if(color instanceof Color)
			return color

		if(!Number.isInteger(color)){
			color = color.toUpperCase()

			if(color[0] !== '#')
				if(this.constructor[color])
					return this.constructor[color]
				else
					throw new Error('Invalid color type')
			else
				color = parseInt(`0x${color.substring(1)}`)
		}

		if(!(color >= 0 && color <= 0xffffff))
			throw new Error('Value must be between 0 to 16777215')

		Object.defineProperty(this, 'value', {writable : false, value : color})
	}

	/**
	 * Get color as RGB
	 * @returns {object} 
	 */
	toRGB(){
		const { value } = this
		return {
			r : (value & 0xff0000) >> 16,
			g : (value & 0x00ff00) >> 8,
			b : (value & 0xff)
		}
	}

	toString(){
		return `#${this.value.toString(16).padStart(6,0)}`
	}
}