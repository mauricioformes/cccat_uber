import { Ride } from "../Ride";
import RideStatus from "./RideStatus";

export default class FinishedRideStatus extends RideStatus {
    value: String;

    constructor(ride: Ride) {
        super(ride);
        this.value = "finished";
    }
    request(): void {
        throw new Error("Status inválido");
    }
    accept(): void {
        throw new Error("Status inválido");
    }
    start(): void {
        throw new Error("Status inválido");
    }
    end(): void {
        throw new Error("Status inválido");
    }
}