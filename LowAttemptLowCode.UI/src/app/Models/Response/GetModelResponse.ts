import { FormModel } from '../FormModel'

export interface GetModelResponse {
    Data: Data;
    Error: string;
  }
  export interface Data {
    FormId: number;
    FormName: string;
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
    validators?: (ValidatorsEntity)[] | null;
  }
  export interface ValidatorsEntity {
    required: boolean;
    minlength: number;
    maxlength: number;
    type?: string | null;
  }
  