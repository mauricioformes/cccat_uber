import Coord from "../distance/Coord";
import DistanceCalculator from "../distance/DistanceCalculator";
import FareCalculatorHandler from "../fare/chain_of_responsability/FareCalculatorHandler";
import NormalFareCaltulatorHandler from "../fare/chain_of_responsability/NormalFareCalculatorHandler";
import OvernighFareCaltulatorHandler from "../fare/chain_of_responsability/OvernightFareCalculatorHandler";
import OvernighSundayFareCaltulatorHandler from "../fare/chain_of_responsability/OvernightSundayFareCalculatorHandler";
import SundayFareCaltulatorHandler from "../fare/chain_of_responsability/SundayFareCalculatorHandler";
import UUIDGenerator from "../identity/UUIDGenerator";
import Position from "./Position";
import { Segment } from "./Segment";

export class Ride {
    positions: Position[];
    MIN_PRICE = 10;
    fareCalculator: FareCalculatorHandler;
    driverId?: String;
    acceptDate?: Date;
    startDate?: Date;
    endDate?: Date;

    constructor(readonly rideId: String, readonly passengerId: String, readonly from: Coord, readonly to: Coord, public status: String, readonly requestDate: Date) {
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

    accept(driverId: String, date: Date){
        if(this.status !== "requested") throw new Error("A corrida não foi solicitada");
        this.driverId = driverId;
        this.status = "accepted";
        this.acceptDate = date;
    }

    start(date: Date){
        if(this.status !== "accepted") throw new Error("A corrida não foi aceita");
        this.status = "in_progress";
        this.startDate = date
    }

    end(date: Date){
        if(this.status !== "in_progress") throw new Error("A corrida não foi iniciada");
        this.status = "finished";
        this.endDate = date;
    }

    static create(passengerId: String, from: Coord, to: Coord, requestDate: Date = new Date()) {
        const rideId = UUIDGenerator.create();
        const status = "requested";
        return new Ride(rideId, passengerId, from, to, status, requestDate);
    }
}