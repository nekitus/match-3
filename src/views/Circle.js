import Shape from './Shape'

export default class Circle extends Shape {
    constructor(props) {
        super(props);

    }
    render() {
        if(this.display) {
            this.graphics.beginFill(this.model.props.color || 0xe74c3c); // Red
            this.graphics.drawCircle(20, 20, 10); // drawCircle(x, y, radius)
        } else {
            this.graphics.clear();
        }
    }
}