import { mount } from "@vue/test-utils";
import CreatePassengerVue from "../src/CreatePassenger.vue";
import PassengerGatewayHttp from "../src/infra/gateway/PassengerGatewayHttp";

function sleep(time: number) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    })
};

test("Deve criar um passageiro", async function () {
    const passengerGateway: PassengerGatewayHttp = {
        async save(passenger: any): Promise<any> {
            return { passengerId: "69b0c3a5-e936-4e2f-88a7-a36690094931" };
        }
    }
    const wrapper = mount(CreatePassengerVue, {
        global: {
            provide: {
                passengerGateway
            }
        }
    });
    await wrapper.get(".passenger-name").setValue("Mauricio");
    await wrapper.get(".passenger-email").setValue("mauricio@hotmail.com");
    await wrapper.get(".passenger-document").setValue("83432616074");
    await wrapper.get(".create-passenger-button").trigger("click");
    await sleep(200);
    expect(wrapper.get(".passenger-id").text()).toHaveLength(36);
});