import { Theta } from "./theta";
import ThetaRange from "./theta-range";

export default class Point {
    x: number;
    y: number;
    private _theta?: Theta;
    private _r?: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    fromPolar(theta: Theta, r: number) {
        return new Point( r * Math.cos(theta.theta), -r * Math.sin(theta.theta));
    }

    closestPointInthetaRange(thetaRange: ThetaRange): Point {
        if (thetaRange.pointInRange(this.x, this.y)) return this;
        const theta = this.theta();
        const lowerTheta = theta.thetaLowerThan(thetaRange.startTheta);
        const lowerThetaDist = thetaRange.startTheta.minus(lowerTheta).theta;
        const upperTheta = theta.thetaGreaterThan(thetaRange.endTheta);
        const upperThetaDist = upperTheta.minus(thetaRange.endTheta).theta;
        if (lowerThetaDist < upperThetaDist) {
            return this.fromPolar(thetaRange.startTheta, this.r());
        } else return this.fromPolar(thetaRange.endTheta, this.r());
    }

    theta() {
        return this._theta ||= new Theta(Math.atan2(-this.y, this.x))
    }

    r() {
        return this._r ||= Math.sqrt(this.x ** 2 + this.y ** 2);
    }

    withR(newR: number): Point {
        return this.fromPolar(this.theta(), newR);
    }

    plus(other: Point): Point {
        return new Point(this.x + other.x, this.y + other.y);
    }

    minus(other: Point): Point {
        return new Point(this.x - other.x, this.y - other.y);
    }

    multiply(other: Point): Point {
        return new Point(this.x * other.x, this.y * other.y);
    }

    divide(other: Point): Point {
        return new Point(this.x / other.x, this.y / other.y);
    }
}
