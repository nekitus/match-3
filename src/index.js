import initApp from './app/initApp';
import Shape from './models/Shape';
import Collection from './app/Collection';

import Layout from './views/Layout'

const TYPES = ["rect", "circle", "triangle"];

const collection = initCollection();

window.onload = function(){
    let layout = new Layout({model: collection});
};


function initCollection(){
    const collection = new Collection();
    for(let i = 0; i < 9; i++) {
        for(let j = 0; j < 9; j++) {
            let randomShapeType = TYPES[randomInteger(2)];
            let model = new Shape({
                index: i * 9 + j,
                type: randomShapeType
            });
            collection.add(model);
        }
    }
    return collection;
}

function randomInteger(max) {
    var rand = Math.random() * (max + 1);
    rand = Math.floor(rand);
    return rand;
}


initApp();