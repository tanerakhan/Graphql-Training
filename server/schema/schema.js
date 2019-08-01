'use strict'

const graphql = require('graphql');
const _ = require('lodash')

// mongodb
const Movies = require('../models/movie')
const Directors = require('../models/director')

const { 
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull
} = graphql;

const MovieType = new GraphQLObjectType({
     name: 'Movie',
     fields: () => ({
         id: { type: GraphQLString },
         title: { type: GraphQLString },
         description: { type: GraphQLString },
         year: { type : GraphQLInt },
         director:{
             type:DirectorType,
             resolve(parent,args){
                 return Directors.findById(parent.directorId)
             }
         }
     })
});

const DirectorType = new GraphQLObjectType({
    name:'Director',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        birth: { type: GraphQLInt },
        movies: { 
            type: new GraphQLList(MovieType),
            resolve(parent, args){
                return Movies.find({ directorId: parent.id })
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        movie:{
            type:MovieType,
            args:{ id: { type : GraphQLString } },
            resolve(parent, args){
                return Movies.findById(args.id)
            }
        },
        director:{
            type:DirectorType,
            args:{ id: { type: GraphQLID } },
            resolve(parent, args){
                return Directors.findById(args.id)
            }
        },
        movies:{
            type: new GraphQLList(MovieType),
            resolve(parent, args){
                return Movies.find({})
            }
        },
        directors:{
            type: new GraphQLList(DirectorType),
            resolve(parent, args){
                return Directors.find({})
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        addMovie:{
            type:MovieType,
            args:{
                title: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLString },
                year: { type: new GraphQLNonNull(GraphQLInt) },
                directorId: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args){
                const movie = new Movies({
                    title: args.title,
                    description: args.description,
                    year: args.year,
                    directorId: args.directorId
                });
                return movie.save();
            }
        },
        addDirector:{
            type:DirectorType,
            args:{
                name: { type: new GraphQLNonNull(GraphQLString) },
                birth: { type: GraphQLInt }
            },
            resolve(parent, args){
                const director = new Directors({
                    name: args.name,
                    birth: args.birth,
                });
                return director.save();
            }
        }
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})