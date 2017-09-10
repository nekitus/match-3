import Model from '../../lib/Model'
export default class CounterModel extends Model {
    constructor(props){
        super(props);
        this.summ = 0
    }
    addPoints(arr) {
        let result = arr.reduce(add, 0);
        this.summ += result;
        this.change("summ", this.summ)
    }

    getPoints() {
        return this.summ
    }
}

function add(a, b) {
    return a + b;
}