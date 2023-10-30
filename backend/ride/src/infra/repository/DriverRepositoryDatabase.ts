import pgp from "pg-promise";
import DriverRepository from "../../application/repository/DriverRepository";
import Driver from "../../domain/Driver";

export default class DriverRespositoryDatabase implements DriverRepository {

    async save(driver: Driver) {
        const connection = pgp()("postgres://postgres:mama1998@localhost:5432/postgres");
        await connection.query("insert into cccat12.driver(driver_id, name, email, document, car_plate) values ($1, $2, $3, $4, $5)", [driver.driverId, driver.name, driver.email.value, driver.document.value, driver.carPlate.value]);
        await connection.$pool.end();
    }

    async get(driverId: String) {
        const connection = pgp()("postgres://postgres:mama1998@localhost:5432/postgres");
        const [dataValue] = await connection.query(`select * from cccat12.driver where driver_id = '${driverId}'`);
        await connection.$pool.end();
        return new Driver(dataValue.driver_id, dataValue.name, dataValue.email, dataValue.document, dataValue.car_plate);
    }
}