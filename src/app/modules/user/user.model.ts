import { model, Schema } from "mongoose";
import { IAuthProvider, IUser, Role } from "./user.interface";

const authProviderSchema = new Schema<IAuthProvider>({
    provider: {
        type: String,
        required: true
    },
    providerId: {
        type: String,
        required: true
    }
}, {
    versionKey: false,
    _id: false
})
const userSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    role: {
        type: String,
        enum: Role,
        default: Role.RIDER
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    auths: {
        type: [authProviderSchema]
    }
})

export const User = model<IUser>('User', userSchema)