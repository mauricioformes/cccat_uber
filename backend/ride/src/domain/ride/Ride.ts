import DistanceCalculator from "../distance/DistanceCalculator";
import FareCalculatorHandler from "../fare/chain_of_responsability/FareCalculatorHandler";
import NormalFareCaltulatorHandler from "../fare/chain_of_responsability/NormalFareCalculatorHandler";
import OvernighFareCaltulatorHandler from "../fare/chain_of_responsability/OvernightFareCalculatorHandler";
import OvernighSundayFareCaltulatorHandler from "../fare/chain_of_responsability/OvernightSundayFareCalculatorHandler";
import SundayFareCaltulatorHandler from "../fare/chain_of_responsability/SundayFareCalculatorHandler";
import Position from "./Position";
import { Segment } from "./Segment";

export class Ride {
    positions: Position[];
    MIN_PRICE = 10;
    fareCalculator: FareCalculatorHandler;

    constructor() {
        this.positions = [];
        const overnightSundayFareCalculator = new OvernighSundayFareCaltulatorHandler();
        const sundayFareCalculator = new SundayFareCaltulatorHandler(overnightSundayFareCalculator);
        const overnightFareCalculator = new OvernighFareCaltulatorHandler(sundayFareCalculator);
        this.fareCalculator = new NormalFareCaltulatorHandler(overnightFareCalculator);
    }

    addPosition(lat: number, long: number, date: Date) {
        this.positions.push(new Position(lat, long, date));
    }

    calculate() {
        let price = 0;
        for (const [index, position] of this.positions.entries()) {
            const nextPosition = this.positions[index + 1];
            if (!nextPosition) break;
            const distance = DistanceCalculator.calculate(position.coord, nextPosition.coord);
            const segment = new Segment(distance, nextPosition.date);
            // const fareCalculator = FareCalculatorFactory.create(segment);
            // price += fareCalculator.calculate(segment);
            price += this.fareCalculator.handle(segment);
        }
        return (price < this.MIN_PRICE) ? this.MIN_PRICE : price;
    }
}