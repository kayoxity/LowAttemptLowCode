import { FormModel } from "../FormModel";

export interface AddModelRequest {
    Author: string;
    ModelName: string;
    ResponseCount: number;
    Model: FormModel;
}