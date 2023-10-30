import DriverRespository from "../../infra/repository/DriverRepositoryDatabase";

export default class GetDriver {
    constructor(readonly driverRepository: DriverRespository) {

    }

    async execute(input: Input): Promise<Output> {
        const driverData = await this.driverRepository.get(input.driverId);
        return ({
            driverId: driverData.driver_id,
            name: driverData.name,
            email: driverData.email,
            document: driverData.document,
            carPlate: driverData.car_plate
        });
    }
}

type Input = {
    driverId: String
}

type Output = {
    driverId: String,
    name: String,
    email: String,
    document: String,
    carPlate: String
}