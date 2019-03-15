// async function CreateBoxScoreAdvanced(parent, args, context, info) {

//     return await context.db.query.updateGame({
//         where: {
//             nbaGameId: args.nbaGameId
//         },
//         data: {
//             BoxScoreAdvanced: {
//                 create: {
//                     offensiveRating: args.box.create.offensiveRating,
//                     defensiveRating: args.box.create.defensiveRating,
//                     netRating: args.box.create.netRating,
//                     assistPercentage: args.box.create.assistPercentage,
//                     assistToTurnovers: args.box.create.assistToTurnovers,
//                     assistRatio: args.box.create.assistRatio,
//                     offensiveReboundPercentage: args.box.create.offensiveReboundPercentage,
//                     defensiveReboundPercentage: args.box.create.defensiveReboundPercentage,
//                     reboundPercentage: args.box.create.reboundPercentage,
//                     effectiveFieldGoalPercentage: args.box.create.effectiveFieldGoalPercentage,
//                     trueShootingPercentage: args.box.create.trueShootingPercentage,
//                     usagePercentage: args.box.create.usagePercentage,
//                     pace: args.box.create.pace,
//                     PIE: args.box.create.PIE,
//                 }
//             }
//         }
//     }, info)
// }

// module.exports = {
//     CreateBoxScoreAdvanced
// }