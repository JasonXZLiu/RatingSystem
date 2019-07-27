import { gql } from "apollo-server";

export const typeDefs = gql`
  type Query {
    players: [Player]
    player(id: Int!): Player
    tournaments: [Tournament]
    tournament(id: ID!): Tournament
    ratings: [Rating]
    matches(playerId: Int, tournamentId: Int): [Match]
    match(id: ID!): Match
  }

  type Player {
    id: ID!
    name: String
    rating: [Rating]
    province: String
    sex: String
    age: Int
    matchHistory: PlayerMatch
  }

  type PlayerMatch {
    id: ID!
    tournament: String
    date: String
    opposingRating: Int
    result: String
    score: [String]
  }

  type Rating {
    periodDate: String
    rating: Int
  }

  type Tournament {
    id: Int
    name: String
    startDate: String
    endDate: String
    location: Location
    events: [String]
  }

  type Location {
    address: String
    city: String
    postalCode: String
    province: String
    country: String
  }

  type Match {
    tournament: Tournament!
    calculated: Boolean
    date: String
    winner: Player!
    loser: Player!
    score: [String]
  }
`;
