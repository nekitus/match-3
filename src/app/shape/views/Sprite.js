import View from '../lib/View'

export default class Sprite {
    constructor(props) {
        super(props);

    }
    render() {
        const model = this.props.model;
        if(this.display) {
            this.graphics.beginFill(model.props.color || 0xe74c3c); // Red
            this.graphics.drawCircle(20, 20, 10); // drawCircle(x, y, radius)
        } else {
            this.graphics.clear();
        }
    }
}