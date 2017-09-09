import pixi from 'pixi.js'

import View from '../../lib/View'
import Container from '../../lib/m3/Container'
import ShapeFactory from '../shape/ShapeFactory'
import Counter from '../counter/View'
import CounterModel from '../counter/Model'

export const GRID_SIZE = 9;
export const CELL_SIZE = 40;

const GRID_WIDTH = CELL_SIZE * GRID_SIZE;
const GRID_HEIGHT = CELL_SIZE * GRID_SIZE;

export const TYPES = [
    "yellow",
    "blue",
    "green",
    "pink",
    "red"
];

export default class Layout extends PIXI.Container {
    constructor(...args) {
        super(...args);
        this.props = Object.assign({}, args[0]);
        const model = this.props.model;

        this.change = this.change.bind(this);
        this.identical = this.identical.bind(this);
        this.add = this.add.bind(this);

        this.shapeFactory = new ShapeFactory({
            width: 10000,
            height: 10000
        });


        this.position.x = 10;
        this.position.y = 10;
        this.counterModel = new CounterModel();
        const counter = this.initCounter();
        this.addChild(this.createBack());
        this.addChild(counter.graphics);

        model.bind("add", this.add);
        model.bind("identical", this.identical);
    }

    createBack() {
        const rect = new PIXI.Graphics();
        rect.drawRect(0, 0, GRID_WIDTH, GRID_HEIGHT);
        rect.beginFill(0xffffff);
        return rect;
    }

    initCounter() {
        return new Counter({
            model: this.counterModel,
            container: this
        })
    }
    identical(pointsArray) {
        this.counterModel.addPoints(pointsArray);
    }
    add(model) {
        const config = {
            model,
            container: this,
            onChange: this.change
        };
        const shape = this.shapeFactory.create(model.getType(), config);
        this.addChild(shape)
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
