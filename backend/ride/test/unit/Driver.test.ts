import Driver from "../../src/domain/Driver";

test("Deve criar um motorista", function () {
    const driver = Driver.create("John Doe", "john.doe@gmail.com", "83432616074", "AAA9999");
    expect(driver.driverId).toBeDefined();
    expect(driver.name).toBe("John Doe",);
    expect(driver.email.value).toBe("john.doe@gmail.com");
    expect(driver.document.value).toBe("83432616074");
    expect(driver.carPlate.value).toBe("AAA9999");
});


test("Não deve criar um motorista com CPF inválido", function () {
    expect(() => Driver.create("John Doe", "john.doe@gmail.com", "83432616076", "AAA9999")).toThrow(new Error("CPF Inválido"));
});

test("Não deve criar um motorista com email inválido", function () {
    expect(() => Driver.create("John Doe", "john.doe@gmail", "83432616074", "AAA9999")).toThrow(new Error("Email Inválido"));
});

test("Não deve criar um motorista com placa do carro inválido", function () {
    expect(() => Driver.create("John Doe", "john.doe@gmail.com", "83432616074", "AAA999")).toThrow(new Error("Placa Inválida"));
});