import { Ride } from "../Ride";
import AcceptedRideStatus from "./AcceptedRideStatus";
import RideStatus from "./RideStatus";

export default class RequestedRideStatus extends RideStatus {
    value: String;

    constructor(ride: Ride) {
        super(ride);
        this.value = "requested";
    }
    request(): void {
        throw new Error("Status inválido");
    }
    accept(): void {
        this.ride.status = new AcceptedRideStatus(this.ride);
    }
    start(): void {
        throw new Error("Status inválido");
    }
    end(): void {
        throw new Error("Status inválido");
    }
}