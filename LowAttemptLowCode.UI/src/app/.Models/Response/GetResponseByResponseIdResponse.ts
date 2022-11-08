export interface GetResponseByResponseIdResponse {
    Data: Data;
    Error: string;
}

export interface Data {
    Id: string,
    Name: string,
    Responses: Response[]
}

export interface Response {
    Type: string,
    Label: string,
    Value: string,
    Required: string,
    Values: string[],
    AllValues: string[]
}