export default interface HttpClient {
    get(url: String): Promise<any>;
    post(url: String, body: any): Promise<any>;
}