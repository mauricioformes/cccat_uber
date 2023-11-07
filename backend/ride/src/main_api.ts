import CalculateRide from "./application/usecase/CalculateRide";
import CreatePassenger from "./application/usecase/CreatePassenger";
import CreateDriver from "./application/usecase/CreateDriver";
import GetPassenger from "./application/usecase/GetPassenger";
import GetDriver from "./application/usecase/GetDriver";
import DriverRespositoryDatabase from "./infra/repository/DriverRepositoryDatabase";
import PassengerRespositoryDatabase from "./infra/repository/PassengerRepositoryDatabase";
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter";
import MainController from "./infra/http/MainController";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import HapiAdapter from "./infra/http/HapiAdapter";

// main composition root
const connection = new PgPromiseAdapter();
const calculateRide = new CalculateRide();
const createPassenger = new CreatePassenger(new PassengerRespositoryDatabase(connection));
const getPassenger = new GetPassenger(new PassengerRespositoryDatabase(connection));
const createDriver = new CreateDriver(new DriverRespositoryDatabase(connection));
const getDriver = new GetDriver(new DriverRespositoryDatabase(connection));
const httpServer = new ExpressAdapter();
// const httpServer = new HapiAdapter();

new MainController(httpServer, calculateRide, createPassenger, getPassenger, createDriver, getDriver);
httpServer.listen(8000);