export default class Container extends PIXI.Container {
    constructor(...args) {
        super(...args);
        console.log(this)
    }
    xx() {
        console.log("xx")
    }
}