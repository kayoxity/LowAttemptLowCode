
export interface AddResponseRequest {
    ModelId: string,
    Name: string;
    Response: ResponseSchema[]
}

export interface ResponseSchema {
    InputName: string,
    Value: string;
    Values: string[]
}