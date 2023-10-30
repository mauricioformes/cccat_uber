import axios from "axios";
import CreatePassenger from "../../src/application/usecase/CreatePassenger";
import GetPassenger from "../../src/application/usecase/GetPassenger";

test("Deve cadastrar o passageiro", async function () {
    const input = {
        name: "John Doe",
        email: "john.doe@gmail.com",
        document: "83432616074"
    };
    const usecase = new CreatePassenger();
    const output = await usecase.execute(input);
    expect(output.passengerId).toBeDefined();

});


test("Deve obter o passageiro", async function () {
    const input = {
        name: "John Doe",
        email: "john.doe@gmail.com",
        document: "83432616074"
    };
    const useCaseCreatePassenger = new CreatePassenger();
    const outputCreatePassenger = await useCaseCreatePassenger.execute(input);
    const useCaseGetPassenger = new GetPassenger();
    const outputGetPassenger = await useCaseGetPassenger.execute({ passengerId: outputCreatePassenger.passengerId });
    expect(outputGetPassenger.name).toBe("John Doe");
    expect(outputGetPassenger.email).toBe("john.doe@gmail.com");
    expect(outputGetPassenger.document).toBe("83432616074");
});
