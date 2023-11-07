import { Ride } from "../Ride";
import FinishedRideStatus from "./FinishedRideStatus";
import RideStatus from "./RideStatus";

export default class InProgressRideStatus extends RideStatus {
    value: String;

    constructor(ride: Ride) {
        super(ride);
        this.value = "in_progress";
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
        this.ride.status = new FinishedRideStatus(this.ride);
    }
}