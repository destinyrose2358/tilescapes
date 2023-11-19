import { restrictTheta } from "../../../utils/geometry-utils";

export class Theta {
    theta: number;

    constructor(theta: number) {
        this.theta = restrictTheta(theta);
    }

    thetaLowerThan(other: Theta): Theta {
        return other.theta >= this.theta ? this : new Theta(this.theta - (2 * Math.PI));
    }

    thetaGreaterThan(other: Theta): Theta {
        return other.theta <= this.theta ? this : new Theta(this.theta + (2 * Math.PI));
    }

    plus(other: Theta) {
        return new Theta(this.theta + other.theta);
    }

    plusNum(offset: number) {
        return new Theta(this.theta + offset);
    }

    minus(other: Theta) {
        return new Theta(this.theta - other.theta);
    }
}
