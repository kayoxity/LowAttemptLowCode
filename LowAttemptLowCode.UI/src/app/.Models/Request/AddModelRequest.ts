import { FormModel } from "../FormModel";

export interface AddModelRequest {
    Author: string,
    ModelName: string;
    Model: FormModel;
}