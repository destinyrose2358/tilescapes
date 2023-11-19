import { Theta } from "./theta";

export default class ThetaRange {
    startTheta: Theta;
    endTheta: Theta;
    split: boolean;

    constructor(startTheta: Theta | number = 0, endTheta: Theta | number = 2 * Math.PI) {
        this.startTheta = typeof startTheta === "number" ? new Theta(startTheta) : startTheta;
        this.endTheta = typeof endTheta === "number" ? new Theta(endTheta) : endTheta;
        this.split = this.startTheta.theta > this.endTheta.theta;
    }

    sweep() {
        return this.split ? (2 * Math.PI) - this.startTheta.theta + this.endTheta.theta : this.endTheta.theta - this.startTheta.theta;
    }

    reverse() {
        return new ThetaRange(this.endTheta, this.startTheta);
    }

    thetaInRange(theta: Theta) {
        if (!this.split) {
            // continuous range
            return theta.theta >= this.startTheta.theta && theta.theta <= this.endTheta.theta;
        } else {
            // split range
            return theta.theta >= this.startTheta.theta || theta.theta <= this.endTheta.theta;
        }
    }

    pointInRange(x: number, y: number, cx: number = 0, cy: number = 0) {
        return this.thetaInRange(new Theta(Math.atan2(-(y-cy), x-cx)))
    }

    // refactor to intersection
    merge(other: ThetaRange): ThetaRange[] | undefined {
        const containsOtherStart = this.thetaInRange(other.startTheta);
        const containsOtherEnd = this.thetaInRange(other.endTheta);

        const startContained = other.thetaInRange(this.startTheta);
        const endContained = other.thetaInRange(this.endTheta);
        
        const finalThetaRanges: ThetaRange[] = [];

        if (containsOtherEnd && startContained) {
            finalThetaRanges.push(new ThetaRange(
                this.startTheta,
                other.endTheta
            ))
        } else if (containsOtherEnd && containsOtherStart) {
            finalThetaRanges.push(new ThetaRange(
                other.startTheta,
                other.endTheta
            ))
        }
        if (endContained && containsOtherStart) {
            finalThetaRanges.push(new ThetaRange(
                other.startTheta,
                this.endTheta
            ))
        } else if (endContained && startContained) {
            finalThetaRanges.push(new ThetaRange(
                this.startTheta,
                this.endTheta
            ))
        }

        if (finalThetaRanges.length) return finalThetaRanges;
    }
}
