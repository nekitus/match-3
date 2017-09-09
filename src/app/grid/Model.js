import Collection from '../../lib/Collection'
import {randomInteger} from '../../lib/helpers'
import {TYPES, GRID_SIZE} from './View'
const balles = {
    yellow: 10,
    green: 20,
    blue: 30,
    red: 40,
    pink: 50
};


export default class Grid extends Collection {
    constructor(props) {
        super(props)
    }

    onChange(index, destIndex) {
        this.swap(index, destIndex);

        const res1 = this.search(index);
        const res2 = this.search(destIndex);
        const results = [...res1, ...res2];

        const filteredResults = results.filter((result) => {
            return this.hasIdentical(result)
        });

        if(filteredResults.length) {
            const identicalArr = filteredResults[0];
            //TODO: выдести удаление в контроллер или вью
            // удалять модели из коллекции примитивными методами, также выполнять поиск (отдать сложные манипуляции в контроллер)
            this.deleteEqualHorizontal(identicalArr).then(() => {
                this.searchEach(identicalArr);
            })
        } else {
            this.delay(500).then(() => this.swap(destIndex, index))
        }
    }
    searchEach(identicalArr){
        this.searchFromHead(identicalArr.pop()).then(() => {
            identicalArr.length && this.searchEach(identicalArr)
        })
    }

    searchFromHead(index){
        return new Promise((resolve, reject) => {
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

                        this.searchFromHead(index).then(() => {
                            setTimeout(()=>{
                                resolve()
                            },1000)
                        })
                    } else {
                        resolve()
                    }
                })
            } else {
                if(isNotEndCol) {
                    this.searchFromHead(nextIndex).then(() => {
                        resolve()
                    })
                } else {
                    resolve()
                }
            }
        });
    }
    delay(ms) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, ms || 0)
        })
    }

    search(index) {
        return [
            this.searchVertical(index),
            this.searchHorizontal(index)
        ]
    }

    deleteEqualHorizontal(identical) {
        return new Promise((resolve) => {
            identical.sort((a, b) => {
                return a < b
            });
            identical.forEach((index) => {
                this.collection[index].change("color", 0xffffff);
            });
            // вертикальное удаление провацирует баг
            return this.delay(800).then(() => {
                this.change("identical", identical.map((index) => {

                    const model = this.collection[index];
                    return balles[model.props.type]
                }));
                const toDelete = [];
                const toAdd = [];

                // удалять с обратной стороны
                for(let i = identical.length - 1; i >= 0; i--) {
                    const index = identical[i];
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
                }
/*
                identical.forEach((index)=> {
                    let firstColIndex = index - (index % GRID_SIZE);

                    const newModel = new this.Model({
                        index: firstColIndex,
                        type: TYPES[randomInteger(2)]
                    });
                    //const model = this.collection[index];
                    //model.change("display", false);
                    //this.collection.splice(index, 1);
                    this.collection.splice(firstColIndex, 0, newModel);
                    this.dispatch("add", newModel)
                });
*/
                this.collection.forEach((model, index) => {
                    model.change("index", index);
                });
                resolve()
            })
        });
    }

    deleteEqualVertical(currentIndex, identical){
        return new Promise((resolve, reject) => {
            if(this.hasIdentical(identical)){
                identical.sort((a,b) => a > b);
                identical.forEach((index)=>{
                    this.collection[index].change("color", 0xffffff);
                });
                this.delay(900).then(() => {
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
                    });
                    resolve()
                });
            }
        });
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
            return identical;
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
            return identical;
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