export default class Email {
    value: String;
    constructor(value: String) {
        if (!this.validate(value)) throw new Error("Email Inválido");
        this.value = value;
    }

    validate(email: String) {
        if (String(email).toLowerCase().match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            return true;
        } else {
            return false;
        }
    }
}