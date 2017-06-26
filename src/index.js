import Shape from './app/shape/Model';
import Grid from './app/grid/Model';
import Layout, {GRID_SIZE, TYPES} from './app/grid/View';
import {randomInteger} from './lib/helpers'


const schema = [
    [0,1,2],
    [2,1,0],
    [1,0,2]
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
    let index = 0;
    let count = 0;
    let schemaIndex = 0;
    return function(){
        const result = schema[schemaIndex][index];
        index++;
        count++;
        if(index > 2) {
            index = 0;
            if(count > 8) {
                count = 0;
                schemaIndex++;
            }
            if(schemaIndex > 2) {
                schemaIndex = 0
            }
        }

        return result
    }
}