import express from "express";
import { calculate } from "./RideCalculator";
import { Ride } from "./Ride";
import pgp from "pg-promise";
import crypto from "crypto";

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
    const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
    const passengerId = crypto.randomUUID();
    await connection.query("insert into cccat12.passenger(passenger_id, name, email, document) values ($1, $2, $3, $4", [passengerId, req.body.name, req.body.email, req.body.document]);
    await connection.$pool.end();
    res.json({
        passengerId
    })
    
});

app.get("/passengers/:passengerId", function (req, res) {
    res.end();
});

app.listen(3000);