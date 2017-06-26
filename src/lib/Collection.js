export default class Collection {
    constructor(props){
        this.listeners = [];

        this.Model = props.Model;
        this.collection = [];
    }

    add(){
        let [model, ...args] = arguments;
        this.collection.push(model);
        this.dispatch("add", model, ...args)
    }

    change(name, value){
        this.dispatch(name, value)
    }

    dispatch(){
        let [name, value, ...args] = arguments;
        this.listeners.forEach((listener) => {
            if (listener.name === name) {
                listener.handler(value, ...args)
            }
        })
    }

    bind(name, handler) {
        this.listeners.push({name, handler})
    }

    swap(index, destIndex){
        const destModel = this.collection[destIndex];
        this.collection[destIndex] = this.collection[index];
        this.collection[index] = destModel;

        this.collection[destIndex].change("index", destIndex);
        this.collection[index].change("index", index);
    }
}