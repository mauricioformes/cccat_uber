import PassengerRepository from "../repository/PassengerRepository";

export default class GetPassenger {
    constructor(readonly passengerRepository: PassengerRepository) {

    }

    async execute(input: Input): Promise<Output> {
        const passenger = await this.passengerRepository.get(input.passengerId);
        return ({
            passengerId: passenger.passengerId,
            name: passenger.name,
            email: passenger.email.value,
            document: passenger.document.value
        });

    }
}

type Input = {
    passengerId: String
}

type Output = {
    passengerId: String,
    name: String,
    email: String,
    document: String
}