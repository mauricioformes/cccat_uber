import express from "express";
import CalculateRide from "./application/usecase/CalculateRide";
import CreatePassenger from "./application/usecase/CreatePassenger";
import CreateDriver from "./application/usecase/CreateDriver";
import GetPassenger from "./application/usecase/GetPassenger";
import GetDriver from "./application/usecase/GetDriver";

const app = express();
app.use(express.json());
app.post("/calculate_ride", async function (req, res) {
    try {
        const usecase = new CalculateRide();
        const output = await usecase.execute({ segments: req.body.segments });
        console.log(output);
        res.json(output);
    } catch (e: any) {
        res.status(422).send(e.message);
    }

});

app.post("/passengers", async function (req, res) {
    try {
        const usecase = new CreatePassenger();
        const output = await usecase.execute(req.body);
        res.json(output);
    } catch (e: any) {
        res.status(422).send(e.message);
    }

});

app.get("/passengers/:passengerId", async function (req, res) {
    const usecase = new GetPassenger();
    const output = usecase.execute({ passengerId: req.params.passengerId });
    res.json(output);
});

app.post("/drivers", async function (req, res) {
    try {
        const usecase = new CreateDriver();
        const output = await usecase.execute(req.body);
        res.json(output);
    } catch (e: any) {
        res.status(422).send(e.message);
    }

});

app.get("/drivers/:driverId", async function (req, res) {
    const usecase = new GetDriver();
    const output = await usecase.execute({ driverId: req.params.driverId });
    res.json(output);
});

app.listen(3000);