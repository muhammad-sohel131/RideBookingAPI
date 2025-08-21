"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const user_interface_1 = require("./user.interface");
const authProviderSchema = new mongoose_1.Schema({
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
});
const userSchema = new mongoose_1.Schema({
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
        enum: user_interface_1.Role,
        default: user_interface_1.Role.RIDER
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    auths: {
        type: [authProviderSchema]
    }
});
exports.User = (0, mongoose_1.model)('User', userSchema);
