"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actionValidity = void 0;
const actionValidity = (currentAction, newAction, role) => {
    var _a, _b, _c;
    const actions = {
        REQUESTED: {
            ACCEPTED: ['driver'],
            CANCELLED: ['rider', 'super_admin', 'admin']
        },
        ACCEPTED: {
            STARTED: ['driver'],
            CANCELLED: ['driver', 'super_admin', 'admin']
        },
        STARTED: {
            COMPLETED: ['driver'],
            CANCELLED: ['driver', 'super_admin', 'admin']
        },
        COMPLETED: [],
        CANCELLED: [],
    };
    const check = (_c = (_b = (_a = actions[currentAction]) === null || _a === void 0 ? void 0 : _a[newAction]) === null || _b === void 0 ? void 0 : _b.includes(role)) !== null && _c !== void 0 ? _c : false;
    return check;
};
exports.actionValidity = actionValidity;
