import React from 'react'
import {PropagateLoader} from 'react-spinners';

export default class LoadIcon extends React.Component {
    render() {
        return(
            <PropagateLoader sizeUnit={"px"} size={15} color={'#123abc'}/>
        )
    }
}