export class Segment {
    constructor(readonly distance: number, readonly date: Date) {
        if (!this.isValidDistance()) throw new Error("Distância inválida");
        if (!this.isValidDate()) throw new Error("Data inválida");
    }

    isOvernigh() {
        return this.date.getHours() >= 22 || this.date.getHours() <= 6;
    }

    isSunday() {
        return this.date.getDay() === 0;
    }

    isValidDistance() {
        return this.distance && this.distance != undefined && typeof this.distance === "number" && this.distance > 0;
    }

    isValidDate() {
        return this.date && this.date instanceof Date && this.date.toString() !== "Invalid Date";
    }
}