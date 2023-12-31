import Passenger from "../../src/domain/passenger/Passenger";

test("Deve criar um passageiro", function () {
    const passenger = Passenger.create("Maurício Pires Formes", "john.doe@gmail.com", "83432616074");
    expect(passenger.passengerId).toBeDefined();
    expect(passenger.name).toBe("Maurício Pires Formes",);
    expect(passenger.email.value).toBe("john.doe@gmail.com");
    expect(passenger.document.value).toBe("83432616074");

});


test("Não deve criar um passageiro com CPF inválido", function () {
    expect(() => Passenger.create("Maurício Pires Formes", "mformes@hotmail.com", "83432616076")).toThrow(new Error("CPF Inválido"));
});

test("Não deve criar um passageiro com email inválido", function () {
    expect(() => Passenger.create("Maurício Pires Formes", "mformes@hotmail.com", "83432616074")).toThrow(new Error("Email Inválido"));
});
