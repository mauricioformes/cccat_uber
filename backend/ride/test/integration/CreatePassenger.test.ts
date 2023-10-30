import CreatePassenger from "../../src/application/usecase/CreatePassenger";
import GetPassenger from "../../src/application/usecase/GetPassenger";
import PassengerRespositoryDatabase from "../../src/infra/repository/PassengerRepositoryDatabase";

test("Deve cadastrar o passageiro", async function () {
    const input = {
        name: "John Doe",
        email: "john.doe@gmail.com",
        document: "83432616074"
    };
    const usecase = new CreatePassenger(new PassengerRespositoryDatabase());
    const output = await usecase.execute(input);
    expect(output.passengerId).toBeDefined();

});

test("Não deve cadastrar o passageiro com email inválido", async function () {
    const input = {
        name: "John Doe",
        email: "john.doe@gmail",
        document: "83432616074"
    };
    const usecase = new CreatePassenger(new PassengerRespositoryDatabase());
    await expect(() => usecase.execute(input)).rejects.toThrow(new Error("Email Inválido"));

});



test("Deve obter o passageiro", async function () {
    const input = {
        name: "John Doe",
        email: "john.doe@gmail.com",
        document: "83432616074"
    };
    const useCaseCreatePassenger = new CreatePassenger(new PassengerRespositoryDatabase());
    const outputCreatePassenger = await useCaseCreatePassenger.execute(input);
    const useCaseGetPassenger = new GetPassenger(new PassengerRespositoryDatabase());
    const outputGetPassenger = await useCaseGetPassenger.execute({ passengerId: outputCreatePassenger.passengerId });
    expect(outputGetPassenger.name).toBe("John Doe");
    expect(outputGetPassenger.email).toBe("john.doe@gmail.com");
    expect(outputGetPassenger.document).toBe("83432616074");
});
