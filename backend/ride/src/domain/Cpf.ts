// @ts-nocheck
export default class Cpf {
    value: String;
    constructor(value: String) {
        if (!this.validate(value)) throw new Error("CPF Inválido");
        this.value = value;
    }
    private validate(cpf: String) {
        cpf = this.clean(cpf);
        if (this.isValidLength(cpf)) return false;
        if (this.hasAllDigitsEqual(cpf)) return false;
        const dg1 = this.calculateDigit(cpf, 10);
        const dg2 = this.calculateDigit(cpf, 11);
        return this.extractCheckDigit(cpf) == `${dg1}${dg2}`;
    }

    // @ts-nocheck
    private clean(cpf: String) {
        return cpf.replace(/\D/g, "");
    }

    private isValidLength(cpf: String) {
        return cpf.length !== 11;
    }

    private hasAllDigitsEqual(cpf: String) {
        const [firstDigit] = cpf
        return [...cpf].every(digit => digit === firstDigit);
    }

    private calculateDigit(cpf: String, factor: Number) {
        let total = 0;
        for (const digit of cpf) {
            if (factor > 1) total += parseInt(digit) * factor--;
        }
        const rest = total % 11;
        return (rest < 2) ? 0 : 11 - rest;
    }

    private extractCheckDigit(cpf: String) {
        return cpf.slice(9);
    }
}