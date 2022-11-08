export interface FormModel {
    inputs?: (InputEntity)[] | null;
  }
export interface InputEntity {
  name: string;
  type: string;
  label: string;
  placeholder: string;
  initialValue?: string | null;
  selectedValues?: string[];
  size: number;
  order: number;
  validators: (ValidatorEntity) ;
}
export interface ValidatorEntity {
  required?: string;
  minlength?: number;
  maxlength?: number;
}
  