import View from '../lib/View'

export class Container extends View {
    constructor(props) {
        super(props);
        this.children = [];
        this.container = new PIXI.Container();
        this.props.container.addChild(this.container)
    }

    render() {

    }
    add(child) {
        this.children.push(child)
    }
}