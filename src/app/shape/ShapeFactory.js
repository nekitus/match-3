import Shape from '../../lib/m3/Shape';

export default class ShapeFactory {
    constructor(props){
        this.props = props
    }
    create(name, config){
        const props = this.props;
        return new this[name]({...props,...config})
    }
    yellow(config) {
        return new Shape(PIXI.Texture.fromImage('src/images/1.png'), config);
    }
    blue(config) {
        return new Shape(PIXI.Texture.fromImage('src/images/2.png'), config);
    }
    green(config) {
        return new Shape(PIXI.Texture.fromImage('src/images/3.png'), config);
    }
    pink(config) {
        return new Shape(PIXI.Texture.fromImage('src/images/4.png'), config);
    }
    red(config) {
        return new Shape(PIXI.Texture.fromImage('src/images/5.png'), config);
    }
}