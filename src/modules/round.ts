export function round(number, precision) {
    let factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
}

// module.exports.kround = kround;