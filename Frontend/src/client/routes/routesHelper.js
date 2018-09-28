import React, {Component} from 'react';
import renderRoutes from './renderRoutes';

class RoutesHelper extends Component {

    constructor(props){
        super(props)
    }

    render(){
        return (
            <div>
                {renderRoutes(this.props.route.routes, this.props.authed, this.props.authPath)}
            </div>
        )
    }
}

export default RoutesHelper;