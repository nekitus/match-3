import Shape from './app/shape/Model';
import Grid from './app/grid/Model';
import Layout, {GRID_SIZE, TYPES} from './app/grid/View';
import {randomInteger} from './lib/helpers'


const schema = [
    [0,1,2,0],
    [2,1,0,2],
    [0,1,1,0]
];

window.onload = function(){
    initialize()
};

function initialize(){
    const collection = new Grid({Model: Shape});
    let layout = new Layout({model: collection});

    const getTypeId = typeId();

    for(let i = 0; i < GRID_SIZE; i++) {
        for(let j = 0; j < GRID_SIZE; j++) {
            let s = getTypeId();
            let randomShapeType = TYPES[s];
            let model = new Shape({
                index: i * GRID_SIZE + j,
                type: randomShapeType
            });
            collection.add(model, i, j);
        }
    }
}

function typeId(){
    let index = randomInteger(3);
    let schemaIndex = randomInteger(2);
    return function(){
        if(index > 3) {
            index = 0;
            schemaIndex = schemaIndex > 1 ? 0 : schemaIndex + 1
        }
        return schema[schemaIndex][index++]
    }
}