// ISP - Interface Segregation Principle a partir da camada de Interface Adapter
export default interface DatabaseConnection {
    query(statement: String, params: any): Promise<any>;
    close(): Promise<void>;
}


