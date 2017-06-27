import View from '../lib/View'
import {
    CELL_SIZE,
    GRID_SIZE
} from "../app/grid/View";

export default class Shape extends View {
    constructor(props){
        super(props);
        this.onDragStart = this.onDragStart.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.onDragMove = this.onDragMove.bind(this);
        this.changePosition = this.changePosition.bind(this);
        this.changeColor = this.changeColor.bind(this);
        this.changeDisplay = this.changeDisplay.bind(this);

        this.position = {};
        this.display = true;

        this.graphics = new PIXI.Graphics();
        this.changePosition(this.props.model.getIndex());
        this.render();
        this.props.container.addChild(this.graphics);
        this.graphics.interactive = true;
        this.graphics.buttonMode = true;
        this.graphics
            .on('pointerdown', this.onDragStart)
            .on('pointerup', this.onDragEnd)
            .on('pointerupoutside', this.onDragEnd)
            .on('pointermove', this.onDragMove)
            .on('mousemove', this.onDragMove)
            .on('touchmove', this.onDragMove);

        this.props.model.bind("index",this.changePosition);
        this.props.model.bind("color",this.changeColor);
        this.props.model.bind("display",this.changeDisplay);
    }
    changeDisplay(value){
        this.display = value;
        this.render();
    }
    changeColor(value){
        this.color = value;
        this.render();
    }
    changePosition(value){
        const column = Math.floor(value / 9);
        const row = value % 9;
        this.position.x = CELL_SIZE * column;
        this.position.y = CELL_SIZE * row;
        this.graphics.x = this.position.x;
        this.graphics.y = this.position.y;
    }

    onDragStart(event){
        // store a reference to the data
        // the reason for this is because of multitouch
        // we want to track the movement of this particular touch
        this.data = event.data;
        this.alpha = 0.5;
        this.dragging = true;
    }
    onDragMove() {
        if (this.dragging) {
            var newPosition = this.data.getLocalPosition(this.graphics.parent);
            let eventType;
            const index = this.props.model.getIndex();
            if(newPosition.x < this.position.x - 10) {
                this.dragging = false;
                eventType = "left";
            } else if (newPosition.x > this.position.x + 40) {
                this.dragging = false;
                eventType = "right";
            } else if (newPosition.y < this.position.y) {
                this.dragging = false;
                eventType = "up";
            } else if (newPosition.y > this.position.y + 40) {
                this.dragging = false;
                eventType = "down";
            }

            this.graphics.x = newPosition.x - 20;
            this.graphics.y = newPosition.y - 20;

            eventType && this.props.onChange(eventType, index)
        }
    }

    onDragEnd(event){
        this.alpha = 1;
        this.dragging = false;
        // set the interaction data to null
        this.data = null;
    }
}