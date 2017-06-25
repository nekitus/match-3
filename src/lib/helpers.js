export function randomInteger(max) {
    var rand = Math.random() * (max + 1);
    rand = Math.floor(rand);
    return rand;
}