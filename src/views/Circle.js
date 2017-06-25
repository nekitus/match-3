import Shape from './Shape'

export default class Circle extends Shape {
    constructor(props) {
        super(props)
    }
    init() {
        this.graphics.beginFill(0xe74c3c); // Red
        this.graphics.drawCircle(20, 20, 10); // drawCircle(x, y, radius)
        this.container.addChild(this.graphics);
    }
}