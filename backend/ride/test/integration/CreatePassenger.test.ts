import CreatePassenger from "../../src/application/usecase/CreatePassenger";
import GetPassenger from "../../src/application/usecase/GetPassenger";
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter";
import PassengerRespositoryDatabase from "../../src/infra/repository/PassengerRepositoryDatabase";

test("Deve cadastrar o passageiro", async function () {
    const input = {
        name: "Maurício Fomres - PASSAGEIRO",
        email: "mauricioformes@hotmail.com",
        document: "83432616074"
    };
    const connection = new PgPromiseAdapter();
    const usecase = new CreatePassenger(new PassengerRespositoryDatabase(connection));
    const output = await usecase.execute(input);
    expect(output.passengerId).toBeDefined();
    await connection.close();

});

test("Não deve cadastrar o passageiro com email inválido", async function () {
    const input = {
        name: "Maurício Fomres - PASSAGEIRO",
        email: "john.doe@gmail",
        document: "83432616074"
    };
    const connection = new PgPromiseAdapter();
    const usecase = new CreatePassenger(new PassengerRespositoryDatabase(connection));
    await expect(() => usecase.execute(input)).rejects.toThrow(new Error("Email Inválido"));
    await connection.close();
});



test("Deve obter o passageiro", async function () {
    const input = {
        name: "Maurício Fomres - PASSAGEIRO",
        email: "mauricioformes@hotmail.com",
        document: "83432616074"
    };
    const connection = new PgPromiseAdapter();
    const useCaseCreatePassenger = new CreatePassenger(new PassengerRespositoryDatabase(connection));
    const outputCreatePassenger = await useCaseCreatePassenger.execute(input);
    const useCaseGetPassenger = new GetPassenger(new PassengerRespositoryDatabase(connection));
    const outputGetPassenger = await useCaseGetPassenger.execute({ passengerId: outputCreatePassenger.passengerId });
    expect(outputGetPassenger.name).toBe("Maurício Fomres - PASSAGEIRO");
    expect(outputGetPassenger.email).toBe("mauricioformes@hotmail.com");
    expect(outputGetPassenger.document).toBe("83432616074");
    await connection.close();
});
