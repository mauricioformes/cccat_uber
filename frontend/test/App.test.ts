import { mount } from "@vue/test-utils";
import AppVue from "../src/App.vue";

test("Deve testar a aplicação", function(){
    const wrapper = mount(AppVue, {});
    expect(wrapper.get(".url").text()).toBe("CCCAT Uber");
});