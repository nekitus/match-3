import Shape from './Shape'

export default class Circle extends Shape {
    constructor(props) {
        super(props);
    }
    render() {
        if(this.display) {
            this.graphics.beginFill(this.model.props.color || 0xFF700B, 1);
            this.graphics.drawRect(10, 10, 20, 20);
        } else {
            this.graphics.clear();
        }
    }
}