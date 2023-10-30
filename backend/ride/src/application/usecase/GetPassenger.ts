import pgp from "pg-promise";

export default class GetPassenger {
    constructor() {

    }

    async execute(input: Input): Promise<Output> {
        const connection = pgp()("postgres://postgres:mama1998@localhost:5432/postgres");
        const [dataValue] = await connection.query(`select * from cccat12.passenger where passenger_id = '${input.passengerId}'`);
        await connection.$pool.end();
        return ({
            passengerId: dataValue.passenger_id,
            name: dataValue.name,
            email: dataValue.email,
            document: dataValue.document
        });

    }
}

type Input = {
    passengerId: String
}

type Output = {
    passengerId: String,
    name: String,
    email: String,
    document: String
}