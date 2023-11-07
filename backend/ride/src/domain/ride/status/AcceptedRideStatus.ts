import { Ride } from "../Ride";
import InProgressRideStatus from "./InProgressRideStatus";
import RideStatus from "./RideStatus";

export default class AcceptedRideStatus extends RideStatus {
    value: String;

    constructor(ride: Ride) {
        super(ride);
        this.value = "accepted";
    }
    request(): void {
        throw new Error("Status inválido");
    }
    accept(): void {        
        throw new Error("Status inválido");
    }
    start(): void {
        this.ride.status = new InProgressRideStatus(this.ride);
    }
    end(): void {
        throw new Error("Status inválido");
    }
}