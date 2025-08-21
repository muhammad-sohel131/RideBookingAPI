"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDistanceInKm = getDistanceInKm;
function getDistanceInKm(pickup, drop) {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(drop.lat - pickup.lat);
    const dLng = toRad(drop.lng - pickup.lng);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(pickup.lat)) *
            Math.cos(toRad(drop.lat)) *
            Math.sin(dLng / 2) *
            Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}
