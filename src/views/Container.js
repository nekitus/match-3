export class Container {
    constructor() {
        this.children = []
    }

    draw() {
        var container = new PIXI.Container();
        graphics.beginFill(0xe74c3c); // Red
        graphics.drawCircle(x, y, 20); // drawCircle(x, y, radius)
    }
    add(child) {
        this.children.push(child)
    }
}