import NormalFareCalculator from "./NormalFareCalculator";
import OvernighFareCalculator from "./OvernighFareCalculator";
import OvernighSundayFareCalculator from "./OvernighSundayFareCalculator";
import { Segment } from "../../ride/Segment";
import SundayFareCalculator from "./SundayFareCalculator";

export default class FareCalculatorFactory{
    static create(segment: Segment){
        if (segment.isOvernigh() && !segment.isSunday()) {
            return new OvernighFareCalculator();
        }
        if (segment.isOvernigh() && segment.isSunday()) {
            return new OvernighSundayFareCalculator();
        }
        if (!segment.isOvernigh() && segment.isSunday()) {
            return new SundayFareCalculator();
        }
        if (!segment.isOvernigh() && !segment.isSunday()) {
            return new NormalFareCalculator();
        }
        throw new Error("Invalid segment");
    }
}