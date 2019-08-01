import React, { Component } from 'react';
import { Query } from 'react-apollo';
import {getMoviesQuery,getMovieQuery} from '../query/query'
import LoadIcon from '../utils/LoadIcon'
import { Modal, Button } from 'antd';

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
      if(data.movies !== undefined && data.movies.length > 0){
      return data.movies.map(({ id, title, description, year }) => (
          <ul key={id}> 
            <li onClick={() => {
              this.showModal(id)
            }}>
              <span style={style}><strong>Film adı: </strong><i>{title}</i></span>
              <span style={style}><strong>Film açıklaması: </strong><i>{description}</i></span>
              <span style={style}><strong>yılı: </strong><i>{year}</i></span>
              {/* <span style={style}><strong>yönetmeni: </strong><i>{movie.directorId}</i></span> */}
             </li>
          </ul>
        ))
    }
    else{
      return <div>içerik yok</div>
    }
    if(loading){
      return <LoadIcon/>
    }
    if(error){
      return <div>error</div>
    }
    }}
</Query>
  }
    render() {
          return (
            <div>
             <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
        <Query query={getMovieQuery} variables={{id: this.state.id}}>
              {({loading,error,data}) => {
                debugger
                    if(loading) return <LoadIcon/>
                    if(error) return <div>error!</div>
                    if(data){
                      console.log(data)
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
              {this.data()}
            </div>
        )
    }
}
export default Movielist