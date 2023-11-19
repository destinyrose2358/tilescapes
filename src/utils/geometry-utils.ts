
export function restrictNumberBetween(value: number, bound1: number, bound2: number): number {
    const lowerBound = Math.min(bound1, bound2);
    const upperBound = Math.max(bound1, bound2);
    let restrictedValue = Math.min(Math.max(value, lowerBound), upperBound);
    return restrictedValue;
}

export function restrictTheta(theta: number) {
    let modTheta = theta % (2 * Math.PI);
    if (Math.sign(modTheta) === -1) return modTheta + 2 * Math.PI;
    return modTheta;
}
