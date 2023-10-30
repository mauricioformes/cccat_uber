import { validate } from "../../CpfValidator";
import DriverRespository from "../../infra/repository/DriverRepositoryDatabase";

export default class CreateDriver {
    constructor() {

    }

    async execute(input: Input): Promise<Output> {
        const driverId = crypto.randomUUID();
        if (!validate(input.document)) throw new Error("CPF Inválido");
        const driverRepository = new DriverRespository();
        await driverRepository.save(Object.assign(input, {driverId}));
      
        return {
            driverId
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