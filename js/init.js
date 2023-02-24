import Filter from "./filter.js"
import Image from "./image.js"
import Canvas from "./canvas.js"
import Color from "./color.js"
import Gradient from "./gradient.js"
import Sprite from "./sprite.js"
import Shape from "./shape.js"

const image = await new Image('sprite.png')
const sprite = await new Sprite(image, 120, 120)

const canvas = new Canvas(1000, 1000)
await sprite.createState('idle', 0, 120)
await sprite.addFrame('idle', 0, 240)
const arr = sprite.state['idle'].bitmaps

let i = 0
canvas
.draw(Shape.square(100, 0, 100, 100))
.draw(Shape.circle(0, 0, 100, 100, 100).fill('red'))
.draw(Shape.triangle(300, 0, 100, 100, 3).fill('orange'))
.draw(arr[0])
canvas.element.style.border = '1px solid black'
document.body.appendChild(canvas.element)