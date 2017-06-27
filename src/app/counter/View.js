import View from '../../lib/View'
export default class Counter extends View {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);

        this.position = {};
        this.display = true;

        this.graphics = new PIXI.Text("Очки: 0");
        this.graphics.x = 30;
        this.graphics.y = 240;
        this.render();
        this.props.container.addChild(this.graphics);
        this.props.model.bind("summ", this.onChange)
    }
    onChange(pointsArray) {
        this.render()
    }
    render() {
        if(this.display) {
            this.graphics.text = "Очки: " + this.props.model.getPoints() || 0;
        }
    }
}


