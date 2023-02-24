export default class Filter{
	filters = {}

	constructor(){
		return new Proxy(this, {
			get(obj, p, r){
				if(typeof obj[p] !== 'function' || ['valueOf', 'toString'].includes(p)) return obj[p]
				p = p.replace(/([A-Z])/, '-$1').toLowerCase()

				return (...val)=>{
					if(p === 'drop-shadow')
						val = [
							(Number.isInteger(val[0]) ? CSS.px(val[0]) : val[0]) + '',
							(Number.isInteger(val[1]) ? CSS.px(val[1]) : val[1]) + '',
							(Number.isInteger(val[2]) ? CSS.px(val[2]) : (val[2] ?? 0)) + '',
							val[3] ?? 'black'
						]
					else{
						val = val[0]
						
						if(p === 'hue-rotate')
							val = Number.isInteger(val) ? CSS.deg(val) : val
						else if(p === 'blur')
							val = Number.isInteger(val) ? CSS.px(val) : val
					}

					const value = `${p}(${Array.isArray(val) ? val.join(' ') : val})`

					if(CSS.supports('filter', value))
						if(p === 'drop-shadow')
							if(obj.filters[p])
								obj.filters[p].push(val)
							else
								obj.filters[p] = [val]
						else
							obj.filters[p] = val + ''
					else
						throw new Error(`Invalid ${p} filter value`)

					return r
				}
			}
		})
	}

	/**
	 * @param {number|string} value 
	 * @return {Filter}
	 */
	blur(value){}

	/**
	 * @param {number|string} value 
	 * @return {Filter}
	 */
	brightness(value){}

	/**
	 * @param {number|string} value 
	 * @return {Filter}
	 */
	contrast(value){}

	/**
	 * @return {Filter}
	 */
	dropShadow(x, y, radius = 0, color = 'black'){}

	/**
	 * @param {number|string} value 
	 * @return {Filter}
	 */
	grayscale(value){}

	/**
	 * @param {number|string} value 
	 * @return {Filter}
	 */
	hueRotate(value){}

	/**
	 * @param {number|string} value 
	 * @return {Filter}
	 */
	invert(value){}

	/**
	 * @param {number|string} value 
	 * @return {Filter}
	 */
	opacity(value){}

	/**
	 * @param {number|string} value 
	 * @return {Filter}
	 */
	saturate(value){}

	/**
	 * @param {number|string} value 
	 * @return {Filter}
	 */
	sepia(value){}

	toString(){
		const { filters } = this

		return Object.keys(filters).map(e=>{
			const filter = filters[e]

			if(typeof filter === 'string')
				return `${e}(${filter})`
			else
				return filter.map(d=>`${e}(${d.join(' ')})`).join(' ')
		}).join(' ')
	}
}