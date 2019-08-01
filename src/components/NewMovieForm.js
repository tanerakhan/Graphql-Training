import React, { Component } from 'react'
import { Query, Mutation } from 'react-apollo'
import {getDirectorsQuery, getMoviesQuery, newMovieMutation} from '../query/query'
import {FormContainer, FormEl, LoadScreen} from '../components/style'
import LoadIcon from '../utils/LoadIcon';
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
                    <FormContainer>
                <form onSubmit={ (e) => { 
                    debugger
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
                    <FormEl>
                        <input type="text" name="title" onChange={(e) => this.onChange(e)} placeholder="title"/>
                    </FormEl>
                    <FormEl>
                        <textarea type="text" name="description" onChange={(e) => this.onChange(e)} placeholder="description"/>
                    </FormEl>
                    <FormEl>
                        <textarea type="text" name="year" onChange={(e) => this.onChange(e)} placeholder="year"/>
                    </FormEl>
                    <FormEl>
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
                    </FormEl>
                    <FormEl>
                        <input type="submit" value="button"/>
                    </FormEl>
                </form>
                { loading && <LoadScreen><div><LoadIcon/></div></LoadScreen> }
                { error && <div>error...</div> }
            </FormContainer>

                )}
            </Mutation>
        )
    }
}
