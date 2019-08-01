import React, { Component } from 'react'
import { Query, Mutation } from 'react-apollo'
import {getDirectorsQuery, getMoviesQuery, newMovieMutation} from '../query/query'
export default class NewMovieForm extends Component {
    state={
        title: '',
        description: '',
        year:null,
        directorId:' '
    }
    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    render() {
        return (
            <Mutation mutation={newMovieMutation}>
                { (addMovie, {loading, error}) => (
                    <div>
                <form onSubmit={ (e) => { 
                    e.preventDefault()
                    addMovie({
                        variables:{
                            title:this.state.title,
                            description: this.state.description,
                            year: parseInt(this.state.year, 10),
                            directorId: this.state.directorId
                        },
                        refetchQueries: [{ query: getMoviesQuery }]
                    }) 
                    }}>
                    <div>
                    <label htmlFor="title girin"></label>
                        <input type="text" name="title" onChange={(e) => this.onChange(e)} placeholder="title"/>
                    </div>
                    <div>
                    <label htmlFor="description"></label>
                        <textarea type="text" name="description" onChange={(e) => this.onChange(e)} placeholder="description"/>
                    </div>
                    <div>
                    <label htmlFor="year"></label>
                        <textarea type="text" name="year" onChange={(e) => this.onChange(e)} placeholder="year"/>
                    </div>
                    <div>
                        <select name="director" id="director" onChange={(e) => this.onChange(e)}>
                            <option>director seç</option>
                            <Query query={getDirectorsQuery}>
								{({ loading, error, data }) => {
									if (loading) return <option disabled={true}>Loading...</option>;
									if (error) return <option disabled={true}>Error.</option>;
                                    
                                    return data.directors.map(({ id, name }) => (
										<option key={id} value={id}>
											{name}
										</option>
									))
								}}
							</Query>
                        </select>
                    </div>
                    <div>
                        <input type="submit" value="button"/>
                    </div>
                </form>
                { loading && <div>loading...</div> }
                { error && <div>error...</div> }
            </div>

                )}
            </Mutation>
        )
    }
}
