import PassengerGateway from "./PassengerGateway";
import HttpClient from "../http/HttpClient";

export default class PassengerGatewayHttp implements PassengerGateway {

    constructor(readonly httpClient: HttpClient){

    }

    async save(passenger: any) {
        return await this.httpClient.post("http://localhost:8000/passengers", passenger);
    }
}