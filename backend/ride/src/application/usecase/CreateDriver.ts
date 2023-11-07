import Driver from "../../domain/driver/Driver";
import DriverRespository from "../repository/DriverRepository";

export default class CreateDriver {
    constructor(readonly driverRepository: DriverRespository) {

    }

    async execute(input: Input): Promise<Output> {
        const driver = Driver.create(input.name, input.email, input.document, input.carPlate)
        await this.driverRepository.save(driver);

        return {
            driverId: driver.driverId
        };
    }
}

type Input = {
    name: String,
    email: String,
    document: String,
    carPlate: String
}

type Output = {
    driverId: String
}