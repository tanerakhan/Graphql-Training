import React from 'react'
import {PropagateLoader} from 'react-spinners';
import {LoadWrapper} from '../components/style'
export default class LoadIcon extends React.Component {
    render() {
        return(
            <LoadWrapper>
                <PropagateLoader sizeUnit={"px"} size={15} color={'#123abc'}/>
            </LoadWrapper>
        )
    }
}