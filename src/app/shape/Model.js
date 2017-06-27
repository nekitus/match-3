import Model from "../../lib/Model"

export default class Shape extends Model {
    constructor(props) {
        super(props);
    }
    getType() {
        return this.props.type;
    }
}