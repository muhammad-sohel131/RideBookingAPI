import { envVars } from "../../config/env";
import { IAuthProvider, IUser } from "./user.interface";
import bcryptjs from 'bcryptjs'
import { User } from "./user.model";

const getAllUsers = async() => {
    const users = await User.find().select('-password')

    return users
}
const createUser = async (payload: Partial<IUser>) => {
  const { email, password, ...rest } = payload;

  const hashPassword = await bcryptjs.hash(
    password as string,
    Number(envVars.BCRYPT_SALT_ROUND)
  );

  const authProvider: IAuthProvider = {
    provider: "credentials",
    providerId: email as string,
  };

  const user = await User.create({
    email,
    password: hashPassword,
    auths: [authProvider],
    ...rest,
  });

  return user;
};

const changeUserStatus = async (userId: string, payload: Partial<IUser>) => {
    const updatedUser = await User.findByIdAndUpdate(userId, payload, {
        new: true
    }).select('-password')

    return updatedUser
}

const getMe = async (userId: string) => {
    const updatedUser = await User.findById(userId).select('-password')

    return updatedUser
}

export const userServices = {
  createUser,
  getAllUsers,
  changeUserStatus,
  getMe
};
