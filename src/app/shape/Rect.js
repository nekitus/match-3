import Shape from '../../views/Shape'

export default class Circle extends Shape {
    constructor(props) {
        super(props);
    }
    render() {
        const model = this.props.model;
        if(this.display) {
            this.graphics.beginFill(model.props.color || 0xFF700B, 1);
            this.graphics.drawRect(10, 10, 20, 20);
        } else {
            this.graphics.clear();
        }
    }
}