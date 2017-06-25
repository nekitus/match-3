import Shape from './Shape'

export default class Circle extends Shape {
    constructor(props) {
        super(props)
    }
    init() {
        this.graphics.beginFill(0xFF700B, 1);
        this.graphics.drawRect(10, 10, 20, 20);
        this.container.addChild(this.graphics);
    }

}