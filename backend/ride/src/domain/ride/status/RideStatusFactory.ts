import { Ride } from "../Ride";
import AcceptedRideStatus from "./AcceptedRideStatus";
import FinishedRideStatus from "./FinishedRideStatus";
import InProgressRideStatus from "./InProgressRideStatus";
import RequestedRideStatus from "./ResquestedRideStatus";

export default class RideStatusFactory{
    static create(ride: Ride, status: String){
        if(status === "requested"){
            return new RequestedRideStatus(ride);
        }
        if(status === "accepted"){
            return new AcceptedRideStatus(ride);
        }
        if(status === "in_progress"){
            return new InProgressRideStatus(ride);
        }
        if(status === "finished"){
            return new FinishedRideStatus(ride);
        }
        throw new Error("Status inválido");
    }
}