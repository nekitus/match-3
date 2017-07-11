import Sprite from './Sprite'
import Tween from '../tween'
import {
    CELL_SIZE,
    GRID_SIZE
} from "../../app/grid/View";

export default class Shape extends Sprite {
    constructor(...args){
        super(...args);

        const [
            texture,
            props
        ] = args;

        this.props = props;
        this.props.pos = {
            x: null,
            y: null
        };

        this.onDragStart = this.onDragStart.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.onDragMove = this.onDragMove.bind(this);
        this.changePosition = this.changePosition.bind(this);
        this.changeColor = this.changeColor.bind(this);
        this.changeDisplay = this.changeDisplay.bind(this);

        this.display = true;

        this.changePosition(this.props.model.getIndex());
        this.interactive = true;
        this.buttonMode = true;
        this.setPosition(this.props.model.getIndex());

        this
            .on('pointerdown', this.onDragStart)
            .on('pointerup', this.onDragEnd)
            .on('pointerupoutside', this.onDragEnd)
            .on('pointermove', this.onDragMove)
            .on('mousemove', this.onDragMove)
            .on('touchmove', this.onDragMove);

        this.props.model.bind("index",this.changePosition);
        this.props.model.bind("color",this.changeColor);
        this.props.model.bind("display",this.changeDisplay);


        this.props.ticker.add(() => {
            Tween.runTweens();
        });
    }

    getPos(){
        return this.props.pos
    }

    changeDisplay(value){
        this.alpha = 0
    }

    changeColor(value){
        this.alpha = 0.2;
    }

    calculatePosition(value) {
        const column = Math.floor(value / 9);
        const row = value % 9;
        return {
            x: CELL_SIZE * column,
            y: CELL_SIZE * row
        }
    }

    setPosition(index) {
        const {x,y} = this.calculatePosition(index);
        this.props.pos.x = x;
        this.props.pos.y = y;
        this.x = x;
        this.y = y;
    }

    changePosition(index) {
        const {x,y} = this.calculatePosition(index);
        this.props.pos.x = x;
        this.props.pos.y = y;
        const pos = this.getPos();

        var elasticTweenX = new Tween(this, "position.x", pos.x, 5500, true);
        var elasticTweenY = new Tween(this, "position.y", pos.y, 5500, true);
        elasticTweenX.easing = Tween.outCubic;
        elasticTweenY.easing = Tween.outCubic;
    }

    onDragStart(event) {
        this.data = event.data;
        this.dragging = true;
    }

    onDragMove() {
        if (this.dragging) {
            var newPosition = this.data.getLocalPosition(this.parent);
            let eventType;
            const index = this.props.model.getIndex();
            if(newPosition.x < this.props.pos.x - 10) {
                this.dragging = false;
                eventType = "left";
            } else if (newPosition.x > this.props.pos.x + 40) {
                this.dragging = false;
                eventType = "right";
            } else if (newPosition.y < this.props.pos.y) {
                this.dragging = false;
                eventType = "up";
            } else if (newPosition.y > this.props.pos.y + 40) {
                this.dragging = false;
                eventType = "down";
            }

            this.x = newPosition.x - 20;
            this.y = newPosition.y - 20;

            eventType && this.props.onChange(eventType, index)
        }
    }

    onDragEnd(event){
        this.dragging = false;
        // set the interaction data to null
        this.data = null;
    }
}