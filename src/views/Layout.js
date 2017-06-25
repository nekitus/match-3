import pixi from 'pixi.js'

import Circle from './Circle'
import Rect from './Rect'
import Triangle from './Triangle'

const GRID_SIZE = 9;
const CELL_SIZE = 25;

export default class Layout {
    constructor(params) {
        this.model = params.model;

        this.app = new PIXI.Application(800, 600, {backgroundColor : 0x1099bb});
        document.body.appendChild(this.app.view);
        this.init()
    }

    init(){
        var container = new PIXI.Container();

        this.children = [];
        for (let row = 0; row < 9; ++row) {
            for (let column = 0; column < 9; ++column) {
                const model = this.model.collection[row * 9 + column];
                const position = {
                    x: CELL_SIZE * row,
                    y: CELL_SIZE * column
                };
                const config = {
                    model,
                    container: container,
                    position,
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
        }


        this.app.stage.addChild(container);
        this.app.ticker.add(function() {
        });
    }

    change(target, index, destIndex){
        console.log(target.model.props.index)

        //this.model.collection.
    }

    createShapes(){

    }
}
