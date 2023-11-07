import Passenger from "../../domain/passenger/Passenger";
import PassengerRepository from "../repository/PassengerRepository";

export default class CreatePassenger {
    constructor(readonly passengerRepository: PassengerRepository) {

    }

    async execute(input: Input): Promise<Output> {
       const passenger = Passenger.create(input.name, input.email, input.document);
        await this.passengerRepository.save(passenger);
        return {
            passengerId: passenger.passengerId
        };
    }
}

type Input = {
    name: String,
    email: String,
    document: String
}

type Output = {
    passengerId: String
}