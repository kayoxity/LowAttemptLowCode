export interface GetAllResponsesByModelIdResponse {
    Data: Data[];
    Error: string;
}

export interface Data {
    Id: string,
    Name: string,
    DateCreated: Date
}