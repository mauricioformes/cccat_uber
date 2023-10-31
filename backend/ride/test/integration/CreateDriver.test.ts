import axios from "axios";
import CreateDriver from "../../src/application/usecase/CreateDriver";
import GetDriver from "../../src/application/usecase/GetDriver";
import DriverRespository from "../../src/infra/repository/DriverRepositoryDatabase";
import sinon from "sinon";
import DriverRespositoryDatabase from "../../src/infra/repository/DriverRepositoryDatabase";
import Driver from "../../src/domain/Driver";

test("Deve cadastrar o motorista", async function () {
    const driverRepository: DriverRespository = {
        async save(driver: any): Promise<void> {

        },
        async get(driverId: string): Promise<any> {
            return {
                driver_id: "",
                name: "Maurício Formes - MOTORISTA",
                email: "mauricioformes@hotmail.com",
                document: "83432616074",
                car_plate: "AAA9999"
            }
        }
    }
    const input = {
        name: "Maurício Formes - MOTORISTA",
        email: "mauricioformes@hotmail.com",
        document: "83432616074",
        carPlate: "AAA9999"
    };
    const usecase = new CreateDriver(driverRepository);
    const output = await usecase.execute(input);
    expect(output.driverId).toBeDefined();

});

test("Deve obter o motorista", async function () {
    const driverRepository: DriverRespository = {
        async save(driver: any): Promise<void> {

        },
        async get(driverId: string): Promise<any> {
            return Driver.create("Maurício Formes - MOTORISTA", "mauricioformes@hotmail.com", "83432616074", "AAA9999");
        }
    }
    const input = {
        name: "Maurício Formes - MOTORISTA",
        email: "mauricioformes@hotmail.com",
        document: "83432616074",
        carPlate: "AAA9999"
    };
    const responseCreateDriver = new CreateDriver(driverRepository);
    const outputCreateDriver = await responseCreateDriver.execute(input);
    const responseGetDriver = new GetDriver(driverRepository);
    const outputGetDriver = await responseGetDriver.execute({ driverId: outputCreateDriver.driverId });
    expect(outputGetDriver.name).toBe("Maurício Formes - MOTORISTA");
    expect(outputGetDriver.email).toBe("mauricioformes@hotmail.com");
    expect(outputGetDriver.document).toBe("83432616074");
    expect(outputGetDriver.carPlate).toBe("AAA9999");
});


// ESSE TESTE DEPENDE DO BANCO DE DADOS, SE A TABELA OU O BANCO ESTIVEREM INDISPONÍVEIS IRÁ QUEBRAR
test("Deve obter o motorista", async function () {
    const input = {
        name: "Maurício Formes - MOTORISTA",
        email: "mauricioformes@hotmail.com",
        document: "83432616074",
        carPlate: "AAA9999"
    };
    const responseCreateDriver = new CreateDriver(new DriverRespositoryDatabase());
    const outputCreateDriver = await responseCreateDriver.execute(input);
    const responseGetDriver = new GetDriver(new DriverRespositoryDatabase());
    const outputGetDriver = await responseGetDriver.execute({ driverId: outputCreateDriver.driverId });
    expect(outputGetDriver.name).toBe("Maurício Formes - MOTORISTA");
    expect(outputGetDriver.email).toBe("mauricioformes@hotmail.com");
    expect(outputGetDriver.document).toBe("83432616074");
    expect(outputGetDriver.carPlate).toBe("AAA9999");
});