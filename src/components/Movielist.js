import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import {getMoviesQuery,getMovieQuery} from '../query/query'
import LoadIcon from '../utils/LoadIcon'
import { Modal, Button } from 'antd';
import {Movieul} from './style'

const style = {
  margin:'0 10px'
}
class Movielist extends Component {
  state = { visible: false, id:"" };

  showModal = id => {
    this.setState({
      id: id,
      visible: true,
    });
  };

  handleOk = e => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  data = () => { 
    return <Query query={getMoviesQuery}>
      {({loading,error,data}) => {
          if(( data && data.movies && data.movies.length > 0)){
      return data.movies.map(({ id, title, description, year }) => (
            <li key={id} onClick={() => {
              this.showModal(id)
            }}>
              <span style={style}><strong>Film adı: </strong><i>{title}</i></span>
{/*               <span style={style}><strong>Film açıklaması: </strong><i>{description}</i></span>
              <span style={style}><strong>yılı: </strong><i>{year}</i></span> */}
              {/* <span style={style}><strong>yönetmeni: </strong><i>{movie.directorId}</i></span> */}
             </li>
        ))
    }
    if(loading){
      debugger
      return <LoadIcon/>
    }
    if(error){
      return <div>Data Not Found!</div>
    }
    }}
</Query>
  }
    render() {
          return (
            <Fragment>
             <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
        <Query query={getMovieQuery} variables={{id: this.state.id}}>
              {({loading,error,data}) => {
                    if(loading) return <LoadIcon/>
                    if(error) return <div>error!</div>
                    if(data){
                        return <div key={data.movie.id}>
                          <div>
                            <strong>Film:</strong>
                            <span>{data.movie.title}</span>
                          </div>
                          <div>
                            <strong>Açıklama:</strong>
                            <span>{data.movie.description}</span>
                          </div>
                          <div>
                            <strong>Yıl:</strong>
                            <span>{data.movie.year}</span>
                          </div>
                        </div>
                    }
                    
              }}
        </Query>
        </Modal>
        <Movieul>
        <ul>
          {this.data()}
        </ul>
        </Movieul>
            </Fragment>
        )
    }
}
export default Movielist