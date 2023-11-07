import AcceptRide from "../../src/application/usecase/AcceptRide";
import CreateDriver from "../../src/application/usecase/CreateDriver";
import CreatePassenger from "../../src/application/usecase/CreatePassenger";
import GetRide from "../../src/application/usecase/GetRide";
import RequestRide from "../../src/application/usecase/RequestRide";
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter";
import DriverRespositoryDatabase from "../../src/infra/repository/DriverRepositoryDatabase";
import PassengerRespositoryDatabase from "../../src/infra/repository/PassengerRepositoryDatabase";
import RideRepositoryDatabase from "../../src/infra/repository/RideRepositoryDatabase";

test("Deve aceitar uma corrida", async function () {
    const inputCreatePassenger = {
        name: "Maurício Fomres - PASSAGEIRO",
        email: "mauricioformes@hotmail.com",
        document: "83432616074"
    };
    const connection = new PgPromiseAdapter();
    const useCaseCreatePassenger = new CreatePassenger(new PassengerRespositoryDatabase(connection));
    const outputCreatePassenger = await useCaseCreatePassenger.execute(inputCreatePassenger);
    const inputRequestRide = {
        passengerId: outputCreatePassenger.passengerId,
        from: {
            lat: -27.584905257808835,
            long: -48.545022195325124
        },
        to: {
            lat: -27.49688758317275,
            long: -48.522234807851476
        },
        date: new Date("2021-03-01T10:00:00")
    };
    const requestRide = new RequestRide(new RideRepositoryDatabase(connection));
    const outputRequestRide = await requestRide.execute(inputRequestRide);

    const inputCreateDriver = {
        name: "Maurício Formes - MOTORISTA",
        email: "mauricioformes@hotmail.com",
        document: "83432616074",
        carPlate: "AAA9999"
    };
    const useCaseCreateDriver = new CreateDriver(new DriverRespositoryDatabase(connection));
    const outputCreateDriver = await useCaseCreateDriver.execute(inputCreateDriver);

    const inputAcceptRide = {
        rideId: outputRequestRide.rideId,
        driverId: outputCreateDriver.driverId,
        date: new Date("2021-03-01T10:00:00")
    };
    const acceptRide = new AcceptRide(new RideRepositoryDatabase(connection));
    const outputAcceptRide = acceptRide.execute(inputAcceptRide);

    const getRide = new GetRide(new RideRepositoryDatabase(connection));
    const outputGetRide = await getRide.execute({ rideId: outputRequestRide.rideId });
    expect(outputGetRide.driverId).toBe(outputCreateDriver.driverId);
    expect(outputGetRide.status).toBe("accepted");
    expect(outputGetRide.acceptDate).toEqual(new Date("2021-03-01T10:00:00"));
    await connection.close();
});