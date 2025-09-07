import User from "../models/User.js";

/**
 * Award XP and update streak for a user
 * @param {String} userId - WhatsApp number / unique userId
 * @param {Number} xpEarned - XP for this completion (default: 10)
 * @returns {Object} updated user {xp, streak}
 */
export const awardXP = async (userId, xpEarned = 10) => {
  const user = await User.findOne({ userId });
  if (!user) {
    throw new Error("User not found");
  }

  user.xp += xpEarned;

  const today = new Date();
  const lastCompleted = user.lastCompletedDate;

  if (!lastCompleted) {

    user.streak = 1;
  } else {
    const diffDays = Math.floor(
      (today.setHours(0, 0, 0, 0) - lastCompleted.setHours(0, 0, 0, 0)) /
        (1000 * 60 * 60 * 24)
    );

    if (diffDays === 1) {
      user.streak += 1;
    } else if (diffDays === 0) {
    } else {
      user.streak = 1;
    }
  }

  user.lastCompletedDate = new Date();

  await user.save();

  return { xp: user.xp, streak: user.streak };
};
