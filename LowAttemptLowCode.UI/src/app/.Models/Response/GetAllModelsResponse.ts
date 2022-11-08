export interface GetAllModelsResponse {
    Data: Data[];
    Error: string;
}

export interface Data {
    Id: string,
    Author: string,
    ModelName: string,
    ResponseCount: number,
    Responses: number
}