import Collection from '../../lib/Collection'
import {randomInteger} from '../../lib/helpers'

const GRID_SIZE = 9;
const TYPES = ["rect", "circle", "triangle"];
const balles = {rect: 10, triangle: 20, circle: 30};


export default class Grid extends Collection {
    constructor(props) {
        super(props)
    }

    onChange(index, destIndex) {
        this.swap(index, destIndex);

        const results = [...this.search(index),...this.search(destIndex)];
        const filteredResults = results.filter((result) => {
            return this.hasIdentical(result)
        });

        if(filteredResults.length) {
            const identicalArr = filteredResults[0];
            this.deleteEqualHorizontal(identicalArr).then(() => {
                this.searchFromHead(index);
            })
        } else {
            this.delay(500).then(() => this.swap(destIndex, index))
        }
    }

    searchFromHead(index){
        const results = [
            this.searchVertical(index),
            this.searchHorizontal(index)
        ];
        const filteredResults = results.filter((result) => {
            return this.hasIdentical(result)
        });
        const nextIndex = index - 1;
        const columnIndex = index % GRID_SIZE;
        const columnNextIndex = nextIndex % GRID_SIZE;
        const isNotEndCol = !(columnNextIndex > columnIndex) && nextIndex >= 0;


        if(filteredResults.length) {
            this.deleteEqualHorizontal(filteredResults[0]).then(() => {
                if(isNotEndCol) {
                    this.searchFromHead(nextIndex)
                }
            })
        } else {
            if(isNotEndCol) {
                this.searchFromHead(nextIndex)
            }
        }
    }

    search(index) {
        return [
            this.searchVertical(index),
            this.searchHorizontal(index)
        ]
    }

    delay(ms) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, ms || 0)
        })
    }

    verticalWork(index) {
        const identical = this.searchVertical(index);
        if (this.hasIdentical(identical)) {
            return this.deleteEqualVertical(index, identical);
        }
        return this.delay()
    }

    horizontalWork(index) {
        const identical = this.searchHorizontal(index);
        if (this.hasIdentical(identical)) {
            return this.deleteEqualHorizontal(identical);
        }
        return this.delay()
    }

    deletes(index, destIndex){
        this.delay().then(() => {
            return this.verticalWork(index)
        }).then(() => {
            return this.verticalWork(destIndex)
        }).then(() => {
            return this.horizontalWork(index)
        }).then(() => {
            return this.horizontalWork(destIndex)
        });
    }

    deleteEqualHorizontal(identical) {
        if(this.hasIdentical(identical)) {
            identical.forEach((index)=>{
                this.collection[index].change("color", 0xffffff);
            });
            return this.delay(900).then(()=> {
                this.change("identical", identical.map((index) =>{
                    const model = this.collection[index];
                    return balles[model.props.type]
                }));

                identical.forEach((index)=> {
                    let firstColIndex = index - (index % GRID_SIZE);

                    const newModel = new this.Model({
                        index: firstColIndex,
                        type: TYPES[randomInteger(2)]
                    });
                    const model = this.collection[index];
                    model.change("display", false);
                    this.collection.splice(index, 1);
                    this.collection.splice(firstColIndex, 0, newModel);
                    this.dispatch("add", newModel)
                });
                this.collection.forEach((model, index)=> {
                    model.change("index", index)
                });
                return this.delay()
            })
        }
    }

    deleteEqualVertical(currentIndex, identical){
        if(this.hasIdentical(identical)){
            identical.sort((a,b) => a > b);
            identical.forEach((index)=>{
                this.collection[index].change("color", 0xffffff);
            });
            this.delay(900).then(()=> {
                const toDelete = this.collection.splice(identical[0], identical.length);
                toDelete.forEach((model) => {
                    model.change("display", false)
                });

                let firstColIndex = currentIndex - (currentIndex % GRID_SIZE);
                identical.forEach((model, index)=>{
                    const newModel = new this.Model({
                        index: firstColIndex,
                        type: TYPES[randomInteger(2)]
                    });
                    this.collection.splice(firstColIndex, 0, newModel);
                    firstColIndex++;
                    this.dispatch("add", newModel)
                });
                this.collection.forEach((model, index)=>{
                    model.change("index", index)
                })
                return this.delay()
            });

        }
    }

    hasIdentical(arr){
        return arr && arr.length > 2;
    }

    searchVertical(index){
        return this.searchDown(index, this.searchUp(index, [index]));
    }

    searchHorizontal(index){
        return this.searchRight(index, this.searchLeft(index, [index]));
    }

    searchDown(index, identical = []) {
        const model = this.collection[index];
        const nextIndex = index + 1;
        const columnIndex = index % GRID_SIZE;
        const columnNextIndex = nextIndex % GRID_SIZE;
        if(columnNextIndex < columnIndex) {
            return;
        }
        if(this.collection[nextIndex] && model.props.type === this.collection[nextIndex].props.type) {
            identical.push(nextIndex);
            return this.searchDown(nextIndex, identical)
        } else {
            return identical;
        }
    }

    searchUp(index,  identical = []){
        const model = this.collection[index];
        const nextIndex = index - 1;
        const columnIndex = index % GRID_SIZE;
        const columnNextIndex = nextIndex % GRID_SIZE;
        if(columnNextIndex > columnIndex) {
            return;
        }

        if(this.collection[nextIndex] && model.props.type === this.collection[nextIndex].props.type) {
            identical.push(nextIndex);
            return this.searchUp(nextIndex, identical);
        } else {
            return identical;
        }
    }

    searchLeft(index, identical = []) {
        const model = this.collection[index];
        const nextIndex = index - 9;
        if(this.collection[nextIndex] && model.props.type === this.collection[nextIndex].props.type) {
            identical.push(nextIndex);
            return this.searchLeft(nextIndex, identical)
        } else {
            return identical
        }
    }

    searchRight(index, identical = []){
        const model = this.collection[index];
        const nextIndex = index + 9;
        if(this.collection[nextIndex] && model.props.type === this.collection[nextIndex].props.type) {
            identical.push(nextIndex);
            return this.searchRight(nextIndex, identical)
        } else {
            return identical
        }
    }
}