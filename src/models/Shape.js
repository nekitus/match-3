import Model from "../app/Model"
export default class Shape extends Model {
    constructor(props) {
        super(props);
    }
    getType() {
        return this.props.type;
    }
}