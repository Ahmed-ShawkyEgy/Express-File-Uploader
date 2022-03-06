import User from '../models/User';

export const createUser = async (userName: string) => {
  let user = await findUserByName(userName);
  if (!user) await User.create({ name: userName, files: [] });
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
