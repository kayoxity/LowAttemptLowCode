export interface FormModel {
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
  