export default class CarPlate {
    value: String;
    constructor(value: String) {
        if (!this.validate(value)) throw new Error("Placa Inválida");
        this.value = value;
    }

    validate(email: String) {
        if (String(email).toLowerCase().match(/^[a-z]{3}[0-9]{4}$/)) {
            return true;
        } else {
            return false;
        }
    }
}