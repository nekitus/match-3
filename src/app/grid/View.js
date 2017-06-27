import pixi from 'pixi.js'

import View from '../../lib/View'
import Circle from '../shape/Circle'
import Rect from '../shape/Rect'
import Triangle from '../shape/Triangle'
import Counter from '../counter/View'
import CounterModel from '../counter/Model'


export const GRID_SIZE = 9;
export const CELL_SIZE = 25;
export const TYPES = ["rect", "circle", "triangle"];

export default class Layout extends View {
    constructor(props) {
        super(props)
        const model = this.props.model;

        this.change = this.change.bind(this);
        this.identical = this.identical.bind(this);
        this.add = this.add.bind(this);

        this.app = new PIXI.Application(240, 280, {backgroundColor : 0x1099bb});
        document.body.appendChild(this.app.view);
        this.container = new PIXI.Container();
        this.children = [];
        this.counterModel = new CounterModel();
        const counter = this.initCounter();
        this.container.addChild(counter.graphics);

        model.bind("add", this.add);
        model.bind("identical", this.identical);

        this.app.stage.addChild(this.container);
        this.app.ticker.add(function() {
        });
    }
    render() {
        this.children.forEach((child) => {
            child.render()
        })
    }
    initCounter() {
        return new Counter({
            model: this.counterModel,
            container: this.container
        })
    }
    identical(pointsArray) {
        this.counterModel.addPoints(pointsArray);
    }
    add(model) {
        const config = {
            model,
            container: this.container,
            //position,
            onChange: this.change
        };
        switch (model.getType()){
            case 'rect':
                this.children.push(new Rect(config));
                break;
            case 'triangle':
                this.children.push(new Triangle(config));
                break;
            case 'circle':
                this.children.push(new Circle(config));
                break;
        }
    }

    change(eventType, index) {
        let destIndex;
        switch (eventType) {
            case "left":
                destIndex = index - GRID_SIZE;
                break;
            case "right":
                destIndex = index + GRID_SIZE;
                break;
            case "up":
                destIndex = index - 1;
                break;
            case "down":
                destIndex = index + 1;

        }
        this.props.model.onChange(index, destIndex);
    }
}
