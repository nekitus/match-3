export default class Shape {
    constructor(props){
        this.onDragStart = this.onDragStart.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);

        this.props = props;
        this.model = props.model;
        this.container = props.container;
        this.position = props.position;

        this.graphics = new PIXI.Graphics();
        this.graphics.x = this.position.x;
        this.graphics.y = this.position.y;
        this.init();
        this.graphics.interactive = true;
        this.graphics.buttonMode = true;
        this.graphics
            .on('pointerdown', this.onDragStart)
            .on('pointerup', this.onDragEnd)
            .on('pointerupoutside', this.onDragEnd)


        //renderer.plugins.interaction.on('mousedown', function(){
        //    console.log("Mouse is down");
        //});

    }
    onDragStart(event){
        console.log(this)
        // store a reference to the data
        // the reason for this is because of multitouch
        // we want to track the movement of this particular touch
        this.data = event.data;
        this.alpha = 0.5;
        this.dragging = true;
    }
    onDragEnd(event){
        if(!this.dragging) {
            console.log(this)
        }

        this.alpha = 1;

        this.dragging = false;


        // set the interaction data to null
        this.data = null;
    }
}