import Canvas from "./canvas.js"
import Color from "./color.js"
import Image from "./image.js"
import { Shape } from "./shape.js"

const img = await new Image('sprite.png')
const a = new Canvas(1000, 1000)

const square = new Shape.Square(1010, 45, 0, 10)
square.fill('orange')
a.draw(square)
console.log(square)
// img
// .scale(1.5)
// .translate(0, 5)
// .pivotPoint('bottom-right')
// .rotate(10)
// .stroke(5, 'yellow')
// .fill('transparent')

// img.filter.dropShadow(0, 0, 9, 'black')

// a.draw(img)

document.body.appendChild(a.element)