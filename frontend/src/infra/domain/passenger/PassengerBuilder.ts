import Passenger from "./Passenger";

export default class PassengerBuilder{
    name?: String;
    email?: String;
    document?: String;
    build(){
        return new Passenger(this);
    }
}