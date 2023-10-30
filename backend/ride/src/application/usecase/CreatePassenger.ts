import pgp from "pg-promise";
import { validate } from "../../CpfValidator";

export default class CreatePassenger {
    constructor() {

    }

    async execute(input: Input): Promise<Output> {
        const connection = pgp()("postgres://postgres:mama1998@localhost:5432/postgres");
        const passengerId = crypto.randomUUID();
        if (!validate(input.document)) throw new Error("CPF Inválido");
        await connection.query("insert into cccat12.passenger(passenger_id, name, email, document) values ($1, $2, $3, $4)", [passengerId, input.name, input.email, input.document]);
        await connection.$pool.end();
        return {
            passengerId
        };
    }
}

type Input = {
    name: String,
    email: String,
    document: String
}

type Output = {
    passengerId: String
}