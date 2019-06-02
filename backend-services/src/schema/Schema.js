import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} from "graphql";

const playerType = new GraphQLObjectType({});

const ratingType = new GraphQLObjectType({});

const filterType = new GraphQLObjectType({});

const queryType = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    player: {},
    rating: {},
    filter: {}
  })
});

export const PlayerRatingSchema = new GraphQLSchema({
  query: queryType,
  types: [playerType, ratingType, filterType]
});
