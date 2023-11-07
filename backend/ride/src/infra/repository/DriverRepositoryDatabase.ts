import DriverRepository from "../../application/repository/DriverRepository";
import Driver from "../../domain/driver/Driver";
import DatabaseConnection from "../database/DatabaseConnection";

// Interface Adapters
export default class DriverRespositoryDatabase implements DriverRepository {

    constructor(readonly connection: DatabaseConnection){
    }

    async save(driver: Driver) {
        
        await this.connection.query("insert into cccat12.driver(driver_id, name, email, document, car_plate) values ($1, $2, $3, $4, $5)", [driver.driverId, driver.name, driver.email.value, driver.document.value, driver.carPlate.value]);
        
    }

    async get(driverId: String) {
        
        const [dataValue] = await this.connection.query("select * from cccat12.driver where driver_id = $1", [driverId]);
        
        return new Driver(dataValue.driver_id, dataValue.name, dataValue.email, dataValue.document, dataValue.car_plate);
    }
}