import Shape from './Shape'
import { Point } from 'paper'

export default class Eight extends Shape {
    drawShape(path, width, height) {
        path.add(new Point(0 * width, 0.50 * height))
        path.add(new Point(0.25 * width, 0 * height))
        path.add(new Point(0.50 * width,  0.20 * height))
        path.add(new Point(0.75 * width, 0 * height))
        path.add(new Point(1 * width, 0.50 * height))
        path.add(new Point(0.75 * width, 1 * height))
        path.add(new Point(0.50 * width, 0.80 * height))
        path.add(new Point(0.25 * width, 1 * height))
    }
}
