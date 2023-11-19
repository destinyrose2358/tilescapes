import _ from "lodash";
import View from "../game/view";
import Point from "./point";
import { Theta } from "./theta";
import ThetaRange from "./theta-range";

export default class Line {
    controlPoint1: Point;
    controlPoint2: Point;

    constructor(point1: Point, point2: Point) {
        this.controlPoint1 = point1;
        this.controlPoint2 = point2;
    }

    rFromTheta(theta: Theta): number {
        return (this.controlPoint1.x-(this.controlPoint1.y / this.slope()))/(Math.cos(theta.theta)+(Math.sin(theta.theta)/this.slope()));
    }

    yIntercept() {
        return this.slope()*this.controlPoint1.x + this.controlPoint1.y;
    }

    slope() {
        const diffVector = this.controlPoint2.minus(this.controlPoint1);
        return diffVector.y/diffVector.x;
    }

    lineThetaRange() {
        const newLineTheta = new ThetaRange(this.controlPoint2.theta().theta, this.controlPoint1.theta().theta);
        return newLineTheta.sweep() >= Math.PI ? newLineTheta.reverse() : newLineTheta;
    }

    private withinThetaRangeHelper(thetaRange: ThetaRange) {
        const basePoint = new Point(1, 0);

        return new Line(basePoint.fromPolar(thetaRange.startTheta, this.rFromTheta(thetaRange.startTheta)), basePoint.fromPolar(thetaRange.endTheta, this.rFromTheta(thetaRange.endTheta)));
    }

    withinThetaRange(thetaRange: ThetaRange) {
        const lineThetaRange = this.lineThetaRange().merge(thetaRange);
        if (!lineThetaRange) return;

        return lineThetaRange.map((currentThetaRange) => this.withinThetaRangeHelper(currentThetaRange));
    }

    withinView(view: View) {
        return _.reduce<ThetaRange, Line[]>(view.thetaRanges, (acc, currentThetaRange) => {
            const newLines = this.withinThetaRange(currentThetaRange)
            if (newLines) acc = [...acc, ...newLines]
            return acc;
        }, []);
    }
}
