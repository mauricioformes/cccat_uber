import express from "express";
import { calculate } from "./RideCalculator";
import { Ride } from "./Ride";
import pgp from "pg-promise";
import crypto from "crypto";
import { validate } from "./CpfValidator";

const app = express();
app.use(express.json());
app.post("/calculate_ride", function (req, res) {
    try {
        const ride = new Ride();
        for (const segment of req.body.segments) {
            ride.addSegment(segment.distance, new Date(segment.date));
        }
        const price = ride.calculate();
        res.json({ price });
    } catch (e: any) {
        res.status(422).send(e.message);
    }

});

app.post("/passengers", async function (req, res) {
    try {
        const connection = pgp()("postgres://postgres:mama1998@localhost:5432/postgres");
        const passengerId = crypto.randomUUID();
        if (!validate(req.body.document)) throw new Error("CPF Inválido");
        await connection.query("insert into cccat12.passenger(passenger_id, name, email, document) values ($1, $2, $3, $4)", [passengerId, req.body.name, req.body.email, req.body.document]);
        await connection.$pool.end();
        res.json({
            passengerId
        })
    } catch (e: any) {
        res.status(422).send(e.message);
    }

});

app.get("/passengers/:passengerId", async function (req, res) {
    const connection = pgp()("postgres://postgres:mama1998@localhost:5432/postgres");
    const [dataValue] = await connection.query(`select * from cccat12.passenger where passenger_id = '${req.params.passengerId}'`);
    await connection.$pool.end();
    res.json(dataValue);
});

app.post("/drivers", async function (req, res) {
    try {
        const connection = pgp()("postgres://postgres:mama1998@localhost:5432/postgres");
        const driverId = crypto.randomUUID();
        if (!validate(req.body.document)) throw new Error("CPF Inválido");
        await connection.query("insert into cccat12.driver(driver_id, name, email, document, car_plate) values ($1, $2, $3, $4, $5)", [driverId, req.body.name, req.body.email, req.body.document, req.body.carPlate]);
        await connection.$pool.end();
        res.json({
            driverId
        })
    } catch (e: any) {
        res.status(422).send(e.message);
    }

});

app.get("/drivers/:driverId", async function (req, res) {
    const connection = pgp()("postgres://postgres:mama1998@localhost:5432/postgres");
    const [dataValue] = await connection.query(`select * from cccat12.driver where driver_id = '${req.params.driverId}'`);
    await connection.$pool.end();
    res.json({
        driverId: dataValue.driver_id,
        name: dataValue.name,
        email: dataValue.email,
        document: dataValue.document,
        carPlate: dataValue.car_plate
    });
});

app.listen(3000);