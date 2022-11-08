import { FormModel } from "../FormModel";

export interface UpdateModelRequest {
    Id: string,
    Author: string,
    ModelName: string;
    Model: FormModel;
}