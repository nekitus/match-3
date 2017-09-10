export default class Model {
    constructor(props){
        this.listeners = [];
        const defaults = {
            type: "circle",
            position: {
                x: null,
                y: null
            },
            display: true,
            index: null,
            id: this.generateId()
        };
        this.props = Object.assign(defaults, props);
    }
    generateId() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16)
    }
    getId() {
        return this.props.id
    }
    getIndex() {
        return this.props.index;
    }
    change(name, value) {
        this.props[name] = value;
        this.dispatch(name, this.props[name])
    }
    dispatch(name, value) {
        this.listeners.forEach((listener) => {
            if (listener.name === name) {
                listener.handler(value)
            }
        })
    }
    bind(name, handler) {
        this.listeners.push({name, handler})
    }
};