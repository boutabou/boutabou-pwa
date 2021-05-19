import Shape from './Shape'
import { Point } from 'paper'

export default class Circle extends Shape {
    drawShape(path, centerX, centerY, width, height) {
        path.add(new Point(centerX + ( 0 * width ), centerY + ( 0.50 * height )))
        path.add(new Point(centerX + ( 0.30 * width ), centerY + ( 0.10 * height )))
        path.add(new Point(centerX + ( 1 * width ),  centerY + ( 0 * height )))
        path.add(new Point(centerX + ( 0.80 * width ), centerY + ( 0.50 * height )))
        path.add(new Point(centerX + ( 0.90 * width ), centerY + ( 0.80 * height )))
        path.add(new Point(centerX + ( 0.40 * width ), centerY + ( 1 * height )))
    }
}
