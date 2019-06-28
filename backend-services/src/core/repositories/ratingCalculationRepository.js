import { RatingCalculation } from "../schemas/ratingCalculation";

export async function getRatingCalculation(params) {
  return await RatingCalculation.findOne()
    .where("pointDifference")
    .lt(params.pointDifference)
    .sort("-pointDifference")
    .then(data => data);
}
