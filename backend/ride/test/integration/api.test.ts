import axios from "axios";

axios.defaults.validateStatus = function () {
    return true;
}

test("Deve fazer o cálculo do preço de uma corrida durante o dia", async function () {
    const input = {
        positions: [
            { lat: -27.584905257808835, long: -48.545022195325124, date: new Date("2021-03-01T10:00:00") },
            { lat: -27.496887588317275, long: -48.522234807851476, date: new Date("2021-03-01T10:00:00") }
        ]
    };
    const response = await axios.post("http://localhost:8000/calculate_ride", input);
    const output = response.data;
    expect(output.price).toBe(21);
});

test("Se a data for inválida deve lançar um erro", async function () {
    const input = {
        positions: [
            { lat: - 27.584905257808835, long: -48.545022195325124, date: "data invalida" },
            { lat: - 27.496887588317275, long: -48.522234807851476, date: "data invalida" }
        ]
    };
    const response = await axios.post("http://localhost:8000/calculate_ride", input);
    expect(response.status).toBe(422);
    const output = response.data;
    expect(output).toBe("Data inválida");
});

test("Deve cadastrar o passageiro", async function () {
    const input = {
        name: "Maurício Pires Formes",
        email: "mauriciformes@hotmail.com",
        document: "83432616074"
    };
    const responseCreatePassenger = await axios.post("http://localhost:8000/passengers", input);
    const outputCreatePassenger = responseCreatePassenger.data;
    expect(outputCreatePassenger.passengerId).toBeDefined();

});

test("Não deve cadastrar o passageiro com CPF inválido", async function () {
    const input = {
        name: "Maurício Pires Formes",
        email: "mauriciformes@hotmail.com",
        document: "83432616076"
    };
    const response = await axios.post("http://localhost:8000/passengers", input);
    expect(response.status).toBe(422);
    const output = response.data;
    expect(output).toBe("CPF Inválido");

});

test("Deve obter o passageiro", async function () {
    const input = {
        name: "Maurício Pires Formes",
        email: "mauriciformes@hotmail.com",
        document: "83432616074"
    };
    const responseCreatePassenger = await axios.post("http://localhost:8000/passengers", input);
    const outputCreatePassenger = responseCreatePassenger.data;    
    const responseGetPassenger = await axios.get(`http://localhost:8000/passengers/${outputCreatePassenger.passengerId}`);
    const outputGetPassenger = responseGetPassenger.data;
    expect(outputGetPassenger.name).toBe("Maurício Pires Formes");
    expect(outputGetPassenger.email).toBe("mauriciformes@hotmail.com");
    expect(outputGetPassenger.document).toBe("83432616074");
});


test("Deve cadastrar o motorista", async function () {
    const input = {
        name: "Maurício Pires Formes",
        email: "mauriciformes@hotmail.com",
        document: "83432616074",
        carPlate: "AAA9999"
    };
    const responseCreateDriver = await axios.post("http://localhost:8000/drivers", input);
    const outputCreateDriver = responseCreateDriver.data;
    expect(outputCreateDriver.driverId).toBeDefined();

});

test("Não deve cadastrar o motorista com CPF inválido", async function () {
    const input = {
        name: "Maurício Pires Formes",
        email: "mauriciformes@hotmail.com",
        document: "83432616076",
        carPlate: "AAA9999"
    };
    const response = await axios.post("http://localhost:8000/drivers", input);
    expect(response.status).toBe(422);
    const output = response.data;
    expect(output).toBe("CPF Inválido");

});

test("Deve obter o motorista", async function () {
    const input = {
        name: "Maurício Pires Formes",
        email: "mauriciformes@hotmail.com",
        document: "83432616074",
        carPlate: "AAA9999"
    };
    const responseCreateDriver = await axios.post("http://localhost:8000/drivers", input);
    const outputCreateDriver = responseCreateDriver.data;
    const responseGetDriver = await axios.get(`http://localhost:8000/drivers/${outputCreateDriver.driverId}`);
    const outputGetDriver = responseGetDriver.data;
    expect(outputGetDriver.name).toBe("Maurício Pires Formes");
    expect(outputGetDriver.email).toBe("mauriciformes@hotmail.com");
    expect(outputGetDriver.document).toBe("83432616074");
    expect(outputGetDriver.carPlate).toBe("AAA9999");
});

