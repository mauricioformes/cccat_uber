import FareCalculator from "./FareCalculator";
import { Segment } from "./Segment";

export default class OvernighFareCalculator implements FareCalculator{
    FARE = 3.9;
    
    calculate(segment: Segment): number {
        return segment.distance * this.FARE;
    }
}