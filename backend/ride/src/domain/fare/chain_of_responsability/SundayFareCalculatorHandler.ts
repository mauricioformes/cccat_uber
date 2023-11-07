import { Segment } from "../../ride/Segment";
import FareCalculatorHandler from "./FareCalculatorHandler";

export default class SundayFareCaltulatorHandler implements FareCalculatorHandler {

    FARE = 2.9;

    constructor(readonly next?: FareCalculatorHandler) {

    }

    handle(segment: Segment): number {
        if (!segment.isOvernigh() && segment.isSunday()) {
            return segment.distance * this.FARE;
        }
        if (!this.next) throw new Error("Fim do handler");
        return this.next.handle(segment);
    }
}