import RideRepository from "../repository/RideRepository";

export default class EndRide {
    constructor(readonly rideRepository: RideRepository) {

    }

    async execute(input: Input): Promise<void> {
        const ride = await this.rideRepository.get(input.rideId);
        ride.end(input.date);
        await this.rideRepository.update(ride);
    }
}

type Input = {
    rideId: String,
    date: Date
}