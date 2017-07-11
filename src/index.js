import Shape from './app/shape/Model';
import Grid from './app/grid/Model';
import Layout, {GRID_SIZE, TYPES} from './app/grid/View';
import {randomInteger} from './lib/helpers'


const schema = [
    [0,1,2],
    [2,0,1],
    [0,2,1]
];

window.onload = function(){
    initialize()
};

function initialize(){
    const collection = new Grid({Model: Shape});
    let layout = new Layout({model: collection});

    const generate = indexGenerator(schema);

    for(let i = 0; i < GRID_SIZE; i++) {
        for(let j = 0; j < GRID_SIZE; j++) {
            let d = randomInteger(4)
            let shapeType = TYPES[d];
            let model = new Shape({
                index: i * GRID_SIZE + j,
                type: shapeType
            });
            collection.add(model, i, j);
        }
    }
}

// generate indexes form 0 to 2
function indexGenerator(schema){
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