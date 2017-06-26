import Shape from '../../views/Shape'

export default class Circle extends Shape {
    constructor(props) {
        super(props);
    }
    render() {
        if(this.display){
            this.graphics.beginFill(this.model.props.color || 0xa6cc55);
            this.graphics.moveTo(10,10);
            this.graphics.lineTo(30, 10);
            this.graphics.lineTo(20, 30);
            this.graphics.lineTo(10, 10);
            this.graphics.endFill();
        } else {
            this.graphics.clear();
        }
    }
}