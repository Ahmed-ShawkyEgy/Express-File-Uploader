import User from '../models/User';

export const createUser = async (userName: string) => {
  let user = await User.find({ name: userName });
  if (!user || user.length === 0)
    await User.create({ name: userName, files: [] });
};

export const registerFilesToUser = async (userName: string, files: []) => {
  await User.updateOne(
    { name: userName },
    { $push: { files: { $each: [...files] } } }
  ).exec();
};

export const findUserByName = async (username: string) => {
  return await User.findOne({ name: username }).exec();
};
