import CarPlate from "./CarPlate";
import Cpf from "./Cpf";
import Email from "./Email";
import UUIDGenerator from "./UUIDGenerator";
export default class Driver {
    document: Cpf;
    email: Email;
    carPlate: CarPlate;

    constructor(readonly driverId: String, readonly name: String, email: String, document: String, carPlate: String) {
        this.document = new Cpf(document);
        this.email = new Email(email);
        this.carPlate = new CarPlate(carPlate);
    }

    static create(name: String, email: String, document: String, carPlate: String) {
        const driverId = UUIDGenerator.create();
        return new Driver(driverId, name, email, document, carPlate)
    }
}