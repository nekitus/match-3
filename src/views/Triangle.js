import Shape from './Shape'

export default class Circle extends Shape {
    constructor(props) {
        super(props)
    }
    init() {
        this.graphics.beginFill(0xFF3300);
        this.graphics.moveTo(10,10);
        this.graphics.lineTo(30, 10);
        this.graphics.lineTo(20, 30);
        this.graphics.lineTo(10, 10);
        this.graphics.endFill();
        this.container.addChild(this.graphics);
    }
}