import Shape from './app/shape/Model';
import Grid from './app/grid/Model';
import Layout, {GRID_SIZE, TYPES} from './app/grid/View';
import {randomInteger} from './lib/helpers'
import Tween from './lib/tween'


const schema = [
    [0,1,2],
    [2,0,1],
    [0,2,1]
];

const app = new PIXI.Application(400, 440, {backgroundColor : 0x1099bb});

window.onload = function(){
    initialize()
};

export function ticker() {
    return app.ticker;
}

function initialize() {
    const collection = new Grid({Model: Shape});
    let layout = new Layout({model: collection});
    document.body.appendChild(app.view);
    app.stage.addChild(layout);

    //app.ticker.add(() => {
        //Tween.runTweens();
    //});

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
    console.log(collection)
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