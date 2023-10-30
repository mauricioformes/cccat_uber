import pgp from "pg-promise";
import DriverRepository from "../../application/repository/DriverRepository";

export default class DriverRespositoryDatabase implements DriverRepository {

    async save(driver: any) {
        const connection = pgp()("postgres://postgres:mama1998@localhost:5432/postgres");
        await connection.query("insert into cccat12.driver(driver_id, name, email, document, car_plate) values ($1, $2, $3, $4, $5)", [driver.driverId, driver.name, driver.email, driver.document, driver.carPlate]);
        await connection.$pool.end();
    }

    async get(driverId: String) {
        const connection = pgp()("postgres://postgres:mama1998@localhost:5432/postgres");
        const [dataValue] = await connection.query(`select * from cccat12.driver where driver_id = '${driverId}'`);
        await connection.$pool.end();
        return dataValue;
    }
}