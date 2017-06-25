import {GRID_SIZE} from '../views/Layout'

export default class Collection {
    constructor(props){
        this.listeners = [];

        this.Model = props.Model;
        this.collection = [];
        this.line = []
    }
    add(){
        let [model, ...args] = arguments;
        this.collection.push(model);
        this.dispatch("add", model, ...args)
    }
    swap(index, destIndex){
        const destModel = this.collection[destIndex];
        this.collection[destIndex] = this.collection[index];
        this.collection[index] = destModel;

        this.collection[destIndex].change("index", destIndex);
        this.collection[index].change("index", index);
    }

    onChange(index, destIndex){
        this.swap(index, destIndex);
        this.search(index, destIndex);
    }
    search(index, destIndex){
        // vertical
        this.line.push(index);
        this.searchVertical(index);
        this.deleteEqualVertical(index);

        this.line.push(destIndex);
        this.searchVertical(destIndex);
        this.deleteEqualVertical(destIndex);

        // horisontal
        this.line.push(index);
        this.searchHorizontal(index);
        this.deleteEqualHorizontal(index);

        this.line.push(destIndex);
        this.searchHorizontal(destIndex);
        this.deleteEqualHorizontal(destIndex)
    }
    deleteEqualHorizontal(currentIndex){
        if(this.line.length > 2){
            this.line.forEach((index)=>{
                let firstColIndex = index - (index % GRID_SIZE);

                const newModel = new this.Model({
                    index: firstColIndex,
                    type: "circle"
                });

                const model = this.collection[index];
                this.collection[index].change("color", "delete");
                model.change("display", false);
                this.collection.splice(index, 1);
                this.collection.splice(firstColIndex, 0, newModel);
                this.dispatch("add", newModel)
            });
            this.line.forEach((index)=>{
            });
            this.collection.forEach((model, index)=>{
                model.change("index", index)
            })
        }
        this.cleanEqual()
    }
    deleteEqualVertical(currentIndex){
        if(this.line.length > 2){
            this.line.sort((a,b) => a > b);
            this.line.forEach((index)=>{
                this.collection[index].change("color", "delete");
            });

            const toDelete = this.collection.splice(this.line[0], this.line.length);
            toDelete.forEach((model) => {
                model.change("display", false)
            });

            let firstColIndex = currentIndex - (currentIndex % GRID_SIZE);
            this.line.forEach((model, index)=>{
                const newModel = new this.Model({
                    index: firstColIndex,
                    type: "circle"
                });
                this.collection.splice(firstColIndex, 0, newModel);
                firstColIndex++;
                this.dispatch("add", newModel)
            });
            this.collection.forEach((model, index)=>{
                model.change("index", index)
            })
        }
        this.cleanEqual()
    }
    cleanEqual(){
        this.line = [];
    }
    isEquals(){
        return this.line.length > 2;
    }

    searchVertical(index){
        this.searchUp(index);
        this.searchDown(index);
    }
    searchHorizontal(index){
        this.searchLeft(index);
        this.searchRight(index)
    }
    searchDown(index) {
        const model = this.collection[index];
        const nextIndex = index + 1;
        const columnIndex = index % GRID_SIZE;
        const columnNextIndex = nextIndex % GRID_SIZE;
        if(columnNextIndex < columnIndex) {
            return;
        }
        if(this.collection[nextIndex] && model.props.type === this.collection[nextIndex].props.type) {
            this.line.push(nextIndex);
            this.searchDown(nextIndex)
        }
    }
    searchUp(index){
        const model = this.collection[index];
        const nextIndex = index - 1;
        const columnIndex = index % GRID_SIZE;
        const columnNextIndex = nextIndex % GRID_SIZE;
        if(columnNextIndex > columnIndex) {
            return;
        }

        if(this.collection[nextIndex] && model.props.type === this.collection[nextIndex].props.type) {
            this.line.push(nextIndex);
            this.searchUp(nextIndex)
        }
    }
    searchLeft(index) {
        const model = this.collection[index];
        const nextIndex = index - 9;
        if(this.collection[nextIndex] && model.props.type === this.collection[nextIndex].props.type) {
            this.line.push(nextIndex);
            this.searchLeft(nextIndex)
        }
    }
    searchRight(index){
        const model = this.collection[index];
        const nextIndex = index + 9;
        if(this.collection[nextIndex] && model.props.type === this.collection[nextIndex].props.type) {
            this.line.push(nextIndex);
            this.searchRight(nextIndex)
        }
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
}