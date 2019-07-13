import { RatingCalculation } from "../schemas/ratingCalculation";

export async function getRatingCalculation(params) {
  const ratingChange = await RatingCalculation.findOne()
    .where("pointDifference")
    .lt(params.pointDifference)
    .sort("-pointDifference")
    .then(data => data);
  return (
    ratingChange ||
    RatingCalculation.findOne()
      .sort("-pointDifference")
      .then(data => data)
  );
}

export async function clearRatingCalculation(params) {
  return await RatingCalculation.remove({}).exec();
}
