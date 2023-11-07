import FareCalculator from "./FareCalculator";
import { Segment } from "../corrida/Segment";

export default class OvernighSundayFareCalculator implements FareCalculator{
    FARE = 5;
    
    calculate(segment: Segment): number {
        return segment.distance * this.FARE;
    }
}