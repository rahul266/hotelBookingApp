const { GraphQLSchema, GraphQLObjectType, GraphQLInt, GraphQLFloat , GraphQLString , GraphQLList } = require('graphql');
const { getModels } = require('../database'); 

const Hotel = new GraphQLObjectType({
    name: "Hotel",
    fields: () => ({
        id: { type: GraphQLInt },
        UUID: { type: GraphQLString },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        city: { type: GraphQLString },
        pricePerNight: { type: GraphQLFloat }
    })
});

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            hotels: {
                type: new GraphQLList(Hotel),
                resolve: async () => {
                    const { Hotels }=getModels()
                    return await Hotels.findAll()
                }
            },
            hotel: {
                type: Hotel,
                args: {
                    UUID: { type: GraphQLString }
                },
                resolve: async (parent,args) => {
                    const { Hotels } = getModels()
                    return await Hotels.findOne({ where: { UUID: args.UUID }})
                }
            }
            },
        }),
    })

module.exports = { schema };
