import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import PassengerGatewayHttp from "./infra/gateway/PassengerGatewayHttp";
import DriverGatewayHttp from "./infra/gateway/DriverGatewayHttp";
import AxiosAdapter from "./infra/http/AxiosAdapter";

const app = createApp(App);
const httpClient = new AxiosAdapter();
app.provide("passengerGateway", new PassengerGatewayHttp(httpClient));
app.provide("driverGateway", new DriverGatewayHttp(httpClient));
app.mount("#app");
