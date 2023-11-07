import { mount } from "@vue/test-utils";
import CreateDriverVue from "../src/CreateDriver.vue";
import DriverGateway from "../src/infra/gateway/DriverGateway";

function sleep(time: number) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    })
};

test("Deve criar um motorista", async function () {
    const driverGateway: DriverGateway = {
       async save (driver:any): Promise<any> {
            return { driverId: "69b0c3a5-e936-4e2f-88a7-a36690094931" };
        }
    }
    const wrapper = mount(CreateDriverVue, {
        global: {
            provide: {
                driverGateway
            }
        }
    });
    await wrapper.get(".driver-name").setValue("Mauricio");
    await wrapper.get(".driver-email").setValue("mauricio@hotmail.com");
    await wrapper.get(".driver-document").setValue("83432616074");
    await wrapper.get(".driver-car-plate").setValue("AAA9999");
    await wrapper.get(".create-driver-button").trigger("click");
    await sleep(200);
    expect(wrapper.get(".driver-id").text()).toHaveLength(36);
});