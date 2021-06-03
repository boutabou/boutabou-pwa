import Shape from './Shape'
import { Point } from 'paper'

export default class Circle extends Shape {
    drawShape(path, width, height) {
        path.add(new Point(0 * width, 0.50 * height))
        path.add(new Point(0.30 * width, 0.10 * height))
        path.add(new Point(1 * width, 0 * height ))
        path.add(new Point(0.80 * width, 0.50 * height))
        path.add(new Point(0.90 * width, 0.80 * height))
        path.add(new Point(0.40 * width, 1 * height))
    }
}
