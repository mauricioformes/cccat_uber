import PassengerBuilder from "./PassengerBuilder";

export default class Passenger {
    name: String;
    email: String;
    document: String;
    constructor(readonly builder: PassengerBuilder) {
        if (!builder.name) throw new Error("Nome inválido");
        if (!builder.email) throw new Error("Email inválido");
        if (!builder.document) throw new Error("CPF Inválido");
        this.name = builder.name;
        this.email = builder.email;
        this.document = builder.document;
    }
}