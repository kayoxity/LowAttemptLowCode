import { FormModel } from "../FormModel";

export interface UpdateModelRequest {
    Id: string,
    Author: string,
    ModelName: string;
    ResponseCount: number;
    Model: FormModel;
}