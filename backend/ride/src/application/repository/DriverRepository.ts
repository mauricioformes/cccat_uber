import Driver from "../../domain/motorista/Driver";

export default interface DriverRepository{

    save(driver: Driver): Promise<void>;
    get(driverId: String): Promise<Driver>;
}