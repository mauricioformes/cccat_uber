import { Segment } from "../corrida/Segment";

export default interface FareCalculator{
    calculate(segment: Segment): number;
}