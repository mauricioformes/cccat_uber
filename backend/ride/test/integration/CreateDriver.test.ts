import axios from "axios";
import CreateDriver from "../../src/application/usecase/CreateDriver";
import GetDriver from "../../src/application/usecase/GetDriver";
import DriverRespository from "../../src/infra/repository/DriverRepositoryDatabase";
import sinon from "sinon";

test("Deve cadastrar o motorista", async function () {
    const input = {
        name: "John Doe",
        email: "john.doe@gmail.com",
        document: "83432616074",
        carPlate: "AAA999"
    };
    const usecase = new CreateDriver();
    const output = await usecase.execute(input);
    expect(output.driverId).toBeDefined();

});

test("Deve obter o motorista", async function () {
    const input = {
        name: "John Doe",
        email: "john.doe@gmail.com",
        document: "83432616074",
        carPlate: "AAA9999"
    };
    const stubSave = sinon.stub(DriverRespository.prototype, "save").resolves();
    const responseCreateDriver = new CreateDriver();
    const outputCreateDriver = await responseCreateDriver.execute(input);
    stubSave.restore();
    const stubGet = sinon.stub(DriverRespository.prototype, "get").resolves({
        name: "John Doe",
        email: "john.doe@gmail.com",
        document: "83432616074",
        car_plate: "AAA9999"
    });
    const responseGetDriver = new GetDriver(new DriverRespository());
    const outputGetDriver = await responseGetDriver.execute({ driverId: outputCreateDriver.driverId });
    stubGet.restore();
    expect(outputGetDriver.name).toBe("John Doe");
    expect(outputGetDriver.email).toBe("john.doe@gmail.com");
    expect(outputGetDriver.document).toBe("83432616074");
    expect(outputGetDriver.carPlate).toBe("AAA9999");
});


// ESSE TESTE DEPENDE DO BANCO DE DADOS, SE A TABELA OU O BANCO ESTIVEREM INDISPONÍVEIS IRÁ QUEBRAR
test("Deve obter o motorista", async function () {
    const input = {
        name: "John Doe",
        email: "john.doe@gmail.com",
        document: "83432616074",
        carPlate: "AAA9999"
    };
    const responseCreateDriver = new CreateDriver();
    const outputCreateDriver = await responseCreateDriver.execute(input);
    const responseGetDriver = new GetDriver(new DriverRespository());
    const outputGetDriver = await responseGetDriver.execute({ driverId: outputCreateDriver.driverId });
    expect(outputGetDriver.name).toBe("John Doe");
    expect(outputGetDriver.email).toBe("john.doe@gmail.com");
    expect(outputGetDriver.document).toBe("83432616074");
    expect(outputGetDriver.carPlate).toBe("AAA9999");
});