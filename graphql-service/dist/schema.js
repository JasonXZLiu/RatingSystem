"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.typeDefs = void 0;var _apolloServer = require("apollo-server");

const typeDefs = _apolloServer.gql`
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
`;exports.typeDefs = typeDefs;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zY2hlbWEuanMiXSwibmFtZXMiOlsidHlwZURlZnMiLCJncWwiXSwibWFwcGluZ3MiOiJxR0FBQTs7QUFFTyxNQUFNQSxRQUFRLEdBQUdDLGlCQUFJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FBckIsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdxbCB9IGZyb20gXCJhcG9sbG8tc2VydmVyXCI7XHJcblxyXG5leHBvcnQgY29uc3QgdHlwZURlZnMgPSBncWxgXHJcbiAgdHlwZSBRdWVyeSB7XHJcbiAgICBwbGF5ZXJzOiBbUGxheWVyXVxyXG4gICAgcGxheWVyKGlkOiBJbnQhKTogUGxheWVyXHJcbiAgICB0b3VybmFtZW50czogW1RvdXJuYW1lbnRdXHJcbiAgICB0b3VybmFtZW50KGlkOiBJRCEpOiBUb3VybmFtZW50XHJcbiAgICByYXRpbmdzOiBbUmF0aW5nXVxyXG4gICAgbWF0Y2hlcyhwbGF5ZXJJZDogSW50LCB0b3VybmFtZW50SWQ6IEludCk6IFtNYXRjaF1cclxuICAgIG1hdGNoKGlkOiBJRCEpOiBNYXRjaFxyXG4gIH1cclxuXHJcbiAgdHlwZSBQbGF5ZXIge1xyXG4gICAgaWQ6IElEIVxyXG4gICAgbmFtZTogU3RyaW5nXHJcbiAgICByYXRpbmc6IFtSYXRpbmddXHJcbiAgICBwcm92aW5jZTogU3RyaW5nXHJcbiAgICBzZXg6IFN0cmluZ1xyXG4gICAgYWdlOiBJbnRcclxuICAgIG1hdGNoSGlzdG9yeTogUGxheWVyTWF0Y2hcclxuICB9XHJcblxyXG4gIHR5cGUgUGxheWVyTWF0Y2gge1xyXG4gICAgaWQ6IElEIVxyXG4gICAgdG91cm5hbWVudDogU3RyaW5nXHJcbiAgICBkYXRlOiBTdHJpbmdcclxuICAgIG9wcG9zaW5nUmF0aW5nOiBJbnRcclxuICAgIHJlc3VsdDogU3RyaW5nXHJcbiAgICBzY29yZTogW1N0cmluZ11cclxuICB9XHJcblxyXG4gIHR5cGUgUmF0aW5nIHtcclxuICAgIHBlcmlvZERhdGU6IFN0cmluZ1xyXG4gICAgcmF0aW5nOiBJbnRcclxuICB9XHJcblxyXG4gIHR5cGUgVG91cm5hbWVudCB7XHJcbiAgICBpZDogSW50XHJcbiAgICBuYW1lOiBTdHJpbmdcclxuICAgIHN0YXJ0RGF0ZTogU3RyaW5nXHJcbiAgICBlbmREYXRlOiBTdHJpbmdcclxuICAgIGxvY2F0aW9uOiBMb2NhdGlvblxyXG4gICAgZXZlbnRzOiBbU3RyaW5nXVxyXG4gIH1cclxuXHJcbiAgdHlwZSBMb2NhdGlvbiB7XHJcbiAgICBhZGRyZXNzOiBTdHJpbmdcclxuICAgIGNpdHk6IFN0cmluZ1xyXG4gICAgcG9zdGFsQ29kZTogU3RyaW5nXHJcbiAgICBwcm92aW5jZTogU3RyaW5nXHJcbiAgICBjb3VudHJ5OiBTdHJpbmdcclxuICB9XHJcblxyXG4gIHR5cGUgTWF0Y2gge1xyXG4gICAgdG91cm5hbWVudDogVG91cm5hbWVudCFcclxuICAgIGNhbGN1bGF0ZWQ6IEJvb2xlYW5cclxuICAgIGRhdGU6IFN0cmluZ1xyXG4gICAgd2lubmVyOiBQbGF5ZXIhXHJcbiAgICBsb3NlcjogUGxheWVyIVxyXG4gICAgc2NvcmU6IFtTdHJpbmddXHJcbiAgfVxyXG5gO1xyXG4iXX0=