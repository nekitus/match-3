import Shape from './models/Shape';
import Collection from './lib/Collection';
import Layout from './views/Layout'
import {randomInteger} from './lib/helpers'

export const TYPES = ["rect", "circle", "triangle"];

const schema = [
    [0,1,2,0],
    [2,1,0,2],
    [0,1,1,0]
];

window.onload = function(){
    initialize()
};

function initialize(){
    const collection = new Collection({Model: Shape});
    let layout = new Layout({model: collection});

    const getTypeId = typeId();

    for(let i = 0; i < 9; i++) {
        for(let j = 0; j < 9; j++) {
            let s = getTypeId();
            let randomShapeType = TYPES[s];
            let model = new Shape({
                index: i * 9 + j,
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