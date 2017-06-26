import pixi from 'pixi.js'

import Circle from './Circle'
import Rect from './Rect'
import Triangle from './Triangle'

export const GRID_SIZE = 9;
export const CELL_SIZE = 25;

export default class Layout {
    constructor(params) {
        this.change = this.change.bind(this);
        this.add = this.add.bind(this);

        this.model = params.model;

        this.app = new PIXI.Application(800, 600, {backgroundColor : 0x1099bb});
        document.body.appendChild(this.app.view);
        this.container = new PIXI.Container();

        this.children = [];
        this.model.bind("add", this.add);
        this.app.stage.addChild(this.container);
        this.app.ticker.add(function() {
        });
    }
    render(){
        this.children.forEach((child) => {
            child.render()
        })
    }
    add(model, row, column){
        //const position = {
        //    x: CELL_SIZE * row,
        //    y: CELL_SIZE * column
        //};
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

    change(eventType, index){
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
        this.model.onChange(index, destIndex);
    }

    createShapes(){

    }
}
