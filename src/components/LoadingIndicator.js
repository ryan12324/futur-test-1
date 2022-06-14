import {Component} from "react";
import loading from '../images/loading.svg'

class LoadingIndicator extends Component {
    render() {
        return (<div className="loadingIndicator">
            <img  src={loading} />
            <span>Loading</span>
        </div> )
    }
}

export default LoadingIndicator;