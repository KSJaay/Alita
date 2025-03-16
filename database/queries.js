const UserSchema = require("./schema/user");

const fetchOrCreateUser = async (userId) => {
  const user = await UserSchema.findOne({ userId }).lean();

  if (user) {
    return user;
  }

  const newUser = new UserSchema({ userId });
  await newUser.save();
  return newUser;
};

const updateUser = (userId, data) => {
  return UserSchema.findOneAndUpdate({ userId }, data, {
    upsert: true,
  });
};

const fetchGuildLeaderboard = async () => {
  return UserSchema.find({}).sort({ balance: -1 }).limit(10).lean();
};

module.exports = {
  fetchOrCreateUser,
  updateUser,
  fetchGuildLeaderboard,
};
