import DatabaseConnection from "./DatabaseConnection";
import pgp from "pg-promise";

// Framworkds and Drivers
export default class PgPromiseAdapter implements DatabaseConnection {

    private connection: any;
    constructor() {
        this.connection = pgp()("postgres://postgres:mama1998@localhost:5432/postgres");
    }
    async query(statement: string, params: any): Promise<any> {
        return this.connection.query(statement, params);
    }

    async close(): Promise<void> {
        await this.connection.$pool.end();
    }
}