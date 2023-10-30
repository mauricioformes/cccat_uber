import axios from "axios";

axios.defaults.validateStatus = function () {
    return true;
}

test("Deve fazer o cálculo do preço de uma corrida", async function () {
    const input = {
        segments: [
            { distance: 10, date: "2021-03-01T10:00:00" }
        ]
    };
    const response = await axios.post("http://localhost:3000/calculate_ride", input);
    const output = response.data;

    expect(output.price).toBe(21);
});

test("Se a distância for inválida deve lançar um erro", async function () {
    const input = {
        segments: [
            { distance: -10, date: "2021-03-01T10:00:00" }
        ]
    };
    const response = await axios.post("http://localhost:3000/calculate_ride", input);
    expect(response.status).toBe(422);
    const output = response.data;
    expect(output).toBe("Distância inválida");
});

test("Deve cadastrar o passageiro", async function () {
    const input = {
        name: "John Doe",
        email: "john.doe@gmail.com",
        document: "83432616074"
    };
    const responseCreatePassenger = await axios.post("http://localhost:3000/passengers", input);
    const outputCreatePassenger = responseCreatePassenger.data;
    expect(outputCreatePassenger.passengerId).toBeDefined();

});

test("Não deve cadastrar o passageiro com CPF inválido", async function () {
    const input = {
        name: "John Doe",
        email: "john.doe@gmail.com",
        document: "83432616076"
    };
    const response = await axios.post("http://localhost:3000/passengers", input);
    expect(response.status).toBe(422);
    const output = response.data;
    expect(output).toBe("CPF Inválido");

});

test("Deve obter o passageiro", async function () {
    const input = {
        name: "John Doe",
        email: "john.doe@gmail.com",
        document: "83432616074"
    };
    const responseCreatePassenger = await axios.post("http://localhost:3000/passengers", input);
    const outputCreatePassenger = responseCreatePassenger.data;
    const responseGetPassenger = await axios.get(`http://localhost:3000/passengers/${outputCreatePassenger.passengerId}`);
    const outputGetPassenger = responseGetPassenger.data;
    expect(outputGetPassenger.name).toBe("John Doe");
    expect(outputGetPassenger.email).toBe("john.doe@gmail.com");
    expect(outputGetPassenger.document).toBe("83432616074");
});


test("Deve cadastrar o motorista", async function () {
    const input = {
        name: "John Doe",
        email: "john.doe@gmail.com",
        document: "83432616074",
        carPlate: "AAA999"
    };
    const responseCreateDriver = await axios.post("http://localhost:3000/drivers", input);
    const outputCreateDriver = responseCreateDriver.data;
    expect(outputCreateDriver.driverId).toBeDefined();

});

test("Não deve cadastrar o motorista com CPF inválido", async function () {
    const input = {
        name: "John Doe",
        email: "john.doe@gmail.com",
        document: "83432616076",
        carPlate: "AAA9999"
    };
    const response = await axios.post("http://localhost:3000/drivers", input);
    expect(response.status).toBe(422);
    const output = response.data;
    expect(output).toBe("CPF Inválido");

});

test("Deve obter o motorista", async function () {
    const input = {
        name: "John Doe",
        email: "john.doe@gmail.com",
        document: "83432616074",
        carPlate: "AAA9999"
    };
    const responseCreateDriver = await axios.post("http://localhost:3000/drivers", input);
    const outputCreateDriver = responseCreateDriver.data;
    const responseGetDriver = await axios.get(`http://localhost:3000/drivers/${outputCreateDriver.driverId}`);
    const outputGetDriver = responseGetDriver.data;
    expect(outputGetDriver.name).toBe("John Doe");
    expect(outputGetDriver.email).toBe("john.doe@gmail.com");
    expect(outputGetDriver.document).toBe("83432616074");
    expect(outputGetDriver.carPlate).toBe("AAA9999");
});

