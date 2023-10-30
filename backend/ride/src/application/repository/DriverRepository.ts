import Driver from "../../domain/Driver";

export default interface DriverRepository{

    save(driver: Driver): Promise<void>;
    get(driverId: String): Promise<Driver>;
}