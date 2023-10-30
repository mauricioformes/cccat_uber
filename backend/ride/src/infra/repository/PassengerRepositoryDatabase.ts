import pgp from "pg-promise";
import PassengerRepository from "../../application/repository/PassengerRepository";
import Passenger from "../../domain/Passenger";

export default class PassengerRespositoryDatabase implements PassengerRepository {

    async save(passenger: Passenger) {
        const connection = pgp()("postgres://postgres:mama1998@localhost:5432/postgres");
        await connection.query("insert into cccat12.passenger(passenger_id, name, email, document) values ($1, $2, $3, $4)", [passenger.passengerId, passenger.name, passenger.email.value, passenger.document.value]);
        await connection.$pool.end();
    }

    async get(passengerId: String) {
        const connection = pgp()("postgres://postgres:mama1998@localhost:5432/postgres");
        const [dataValue] = await connection.query(`select * from cccat12.passenger where passenger_id = '${passengerId}'`);
        await connection.$pool.end();
        return new Passenger(dataValue.passenger_id, dataValue.name, dataValue.email, dataValue.document);
    }
}