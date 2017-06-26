export default class Counter {
    constructor(props) {
        this.onChange = this.onChange.bind(this);

        this.props = props;
        this.model = props.model;
        this.container = props.container;
        this.position = {};
        this.display = true;

        this.graphics = new PIXI.Text("Очки: 0");
        this.graphics.x = 30;
        this.graphics.y = 240;
        this.render();
        this.container.addChild(this.graphics);

        this.model.bind("summ", this.onChange)
    }
    onChange(pointsArray) {
        this.render()
    }
    render() {
        if(this.display) {
            this.graphics.text = "Очки: " + this.model.getPoints() || 0;
        }
    }
}


