import Shape from './Shape'
import { Point } from 'paper'

export default class Eight extends Shape {
    drawShape(path, centerX, centerY, width, height) {
        path.add(new Point(centerX + ( 0 * width ), centerY + ( 0.50 * height )))
        path.add(new Point(centerX + ( 0.25 * width ), centerY + ( 0 * height )))
        path.add(new Point(centerX + ( 0.50 * width ),  centerY + ( 0.20 * height )))
        path.add(new Point(centerX + ( 0.75 * width ), centerY + ( 0 * height )))
        path.add(new Point(centerX + ( 1 * width ), centerY + ( 0.50 * height )))
        path.add(new Point(centerX + ( 0.75 * width ), centerY + ( 1 * height )))
        path.add(new Point(centerX + ( 0.50 * width ), centerY + ( 0.80 * height )))
        path.add(new Point(centerX + ( 0.25 * width ), centerY + ( 1 * height )))
    }
}
