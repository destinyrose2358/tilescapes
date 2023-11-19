import _ from "lodash";
import { Theta } from "../geometry/theta";
import ThetaRange from "../geometry/theta-range";

export default class View {
    thetaRanges: ThetaRange[];

    constructor(initialThetaRange: ThetaRange) {
        this.thetaRanges = [initialThetaRange];
    }

    private createFromList(thetaRanges: ThetaRange[]) {
        const [initialTheta, ...rest] = thetaRanges;
        const newView = new View(initialTheta);
        newView.thetaRanges.push(...rest);
        return newView
    }

    thetaInRange(theta: Theta) {
        return this.thetaRanges.some((thetaRange) => thetaRange.thetaInRange(theta));
    }

    pointInRange(x: number, y: number, cx: number = 0, cy: number = 0) {
        return this.thetaInRange(new Theta(Math.atan2(-(y-cy), x-cx)))
    }

    mergeWithThetaRange(thetaRange: ThetaRange) {
        const mergedThetaRanges = _.reduce<ThetaRange, ThetaRange[]>(this.thetaRanges, (acc, currentThetaRange) => {
            const mergedThetaRanges = currentThetaRange.merge(thetaRange);
            if (mergedThetaRanges) acc = [...acc, ...mergedThetaRanges]
            return acc;
        }, []);
        return mergedThetaRanges;
    }

    merge(other: View): View | undefined {
        const mergedThetaRanges = _.reduce<ThetaRange, ThetaRange[]>(this.thetaRanges, (acc, currentThetaRange) => {
            acc = [...acc, ...other.mergeWithThetaRange(currentThetaRange)]
            return acc;
        }, []);
        if (mergedThetaRanges.length > 0) return this.createFromList(mergedThetaRanges)
    }
}
