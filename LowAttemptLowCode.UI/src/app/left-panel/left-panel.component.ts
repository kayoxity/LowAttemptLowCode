import { Component, OnInit, OnChanges, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputEntity } from '../.Models/FormModel';
import { Lists } from '../.Models/Lists';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss']
})
export class LeftPanelComponent implements OnInit,OnChanges {
  @Input() editFormInputData: InputEntity;
  @Output() saveFormInputEventEmitter = new EventEmitter<InputEntity>();

  attributesForm: FormGroup = this.fb.group({});
  lists = Lists;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.editFormInputData != null) {
      this.attributesForm.addControl("type", this.fb.control(this.editFormInputData.type));
      this.attributesForm.addControl("label", this.fb.control(this.editFormInputData.label, Validators.required));
      this.attributesForm.addControl("placeholder", this.fb.control(this.editFormInputData.placeholder));
      this.attributesForm.addControl("initialValue", this.fb.control(this.editFormInputData.initialValue));
      this.attributesForm.addControl("size", this.fb.control(this.editFormInputData.size));
      this.attributesForm.addControl("validators", this.fb.group({
        "required": this.fb.control(this.editFormInputData.validators.required),
        "minlength": this.fb.control(this.editFormInputData.validators.minlength),
        "maxlength": this.fb.control(this.editFormInputData.validators.maxlength)
      }));
      

      this.attributesForm.setControl("type", this.fb.control(this.editFormInputData.type));
      this.attributesForm.setControl("label", this.fb.control(this.editFormInputData.label, Validators.required));
      this.attributesForm.setControl("placeholder", this.fb.control(this.editFormInputData.placeholder));
      this.attributesForm.setControl("initialValue", this.fb.control(this.editFormInputData.initialValue));
      this.attributesForm.setControl("size", this.fb.control(this.editFormInputData.size));
      this.attributesForm.setControl("validators", this.fb.group({
        "required": this.fb.control(this.editFormInputData.validators.required),
        "minlength": this.fb.control(this.editFormInputData.validators.minlength),
        "maxlength": this.fb.control(this.editFormInputData.validators.maxlength)
      }));
    }
  }

  saveFormInput() {
    if(this.attributesForm.valid){
      let validators = this.attributesForm.value["validators"];

      let inputFormData:InputEntity = {
        name: this.editFormInputData.name,
        type: this.attributesForm.value["type"],
        label: this.attributesForm.value["label"],
        placeholder: this.attributesForm.value["placeholder"],
        order: this.editFormInputData.order,
        size: this.attributesForm.value["size"],
        initialValue: this.attributesForm.value["initialValue"],
        validators: Object.fromEntries(Object.entries(validators).filter(([_, v]) => v != null).filter(([_, v]) => v != ""))
      }
      this.saveFormInputEventEmitter.emit(inputFormData);
    }
  }

}
