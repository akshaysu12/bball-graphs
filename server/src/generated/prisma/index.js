"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "Player",
    embedded: false
  },
  {
    name: "Game",
    embedded: false
  },
  {
    name: "Team",
    embedded: false
  },
  {
    name: "BoxScoreTraditional",
    embedded: false
  },
  {
    name: "BoxScoreAdvanced",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `https://us1.prisma.sh/akshaysub12-298f18/server/dev`
});
exports.prisma = new exports.Prisma();
