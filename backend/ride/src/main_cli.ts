import CreatePassenger from "./application/usecase/CreatePassenger";
import CLIController from "./infra/cli/CLIController";
import NodeInputOutput from "./infra/cli/NodeInputOutput";
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter";
import PassengerRespositoryDatabase from "./infra/repository/PassengerRepositoryDatabase";

// main composition root
const connection = new PgPromiseAdapter();
const passengerRepository = new PassengerRespositoryDatabase(connection);
const createPassenger = new CreatePassenger(passengerRepository);
const inputOutput = new NodeInputOutput();
new CLIController(inputOutput, createPassenger);