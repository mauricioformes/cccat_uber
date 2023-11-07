import Driver from "../../src/domain/driver/Driver";

test("Deve criar um motorista", function () {
    const driver = Driver.create("Maurício Formes", "mauricioformes@hotmail.com", "83432616074", "AAA9999");
    expect(driver.driverId).toBeDefined();
    expect(driver.name).toBe("Maurício Formes",);
    expect(driver.email.value).toBe("mauricioformes@hotmail.com");
    expect(driver.document.value).toBe("83432616074");
    expect(driver.carPlate.value).toBe("AAA9999");
});


test("Não deve criar um motorista com CPF inválido", function () {
    expect(() => Driver.create("Maurício Formes", "mauricioformes@hotmail.com", "83432616076", "AAA9999")).toThrow(new Error("CPF Inválido"));
});

test("Não deve criar um motorista com email inválido", function () {
    expect(() => Driver.create("Maurício Formes", "emailerrado@errado", "83432616074", "AAA9999")).toThrow(new Error("Email Inválido"));
});

test("Não deve criar um motorista com placa do carro inválido", function () {
    expect(() => Driver.create("Maurício Formes", "mauricioformes@hotmail.com", "83432616074", "AAA999")).toThrow(new Error("Placa Inválida"));
});