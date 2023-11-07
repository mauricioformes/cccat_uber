import crypt from "crypto";
export default class UUIDGenerator {

    static create() {
        return crypto.randomUUID();
    }
}