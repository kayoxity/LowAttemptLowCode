import { FormModel } from '../FormModel'

export interface GetModelResponse {
    Data: FormObjectEntity;
    Error: boolean;
    ErrorDetails: string;
  }
export interface FormObjectEntity {
  ModelName: string;
  Author: string;
  ResponseCount: number,
  Model: FormModel;
}
export interface Model {
  controls?: (ControlsEntity)[] | null;
}
export interface ControlsEntity {
  name: string;
  type: string;
  label: string;
  value?: string | null;
  validators?: (ValidatorsEntity) | null;
}
export interface ValidatorsEntity {
  required: boolean;
  minlength: number;
  maxlength: number;
}
