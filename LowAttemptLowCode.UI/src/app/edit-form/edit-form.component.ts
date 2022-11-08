import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import {  InputEntity } from '../.Models/FormModel';
import { FormObjectEntity, GetModelResponse } from '../.Models/Response/GetModelResponse';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})
export class EditFormComponent implements OnInit {
  formData: FormObjectEntity;
  editFormInputData: InputEntity = null;

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.formData = {
      Author: "",
      ModelName: "",
      Model: {
        inputs: []
      },
      ResponseCount: 0
    };

    if(this.route.snapshot.routeConfig.path.endsWith('edit')) {
      let url = this.baseUrl + '/api/Model/GetModelById?id=' + this.route.snapshot.params['id'];
      this.http.get<GetModelResponse>(url).subscribe({
        next: (response) => {
          this.formData = response.Data;
        },
        error: (error) => console.log(error)
      });
    }    
  }

  editForm(order: number){
    let control = this.formData.Model.inputs.find(x => x.order == order);
    this.editFormInputData = control;
    //console.log(control);
  }

  addFormInput(customInputData: { inputEntity: InputEntity, formName: string, author: string }) {
    this.formData.Model.inputs.push(customInputData.inputEntity);
    this.formData.Author = customInputData.author;
    this.formData.ModelName = customInputData.formName;
  }

  saveFormInput(formInputData: InputEntity) {
    let updateItem = this.formData.Model.inputs.find(x => x.order == formInputData.order);
    let index = this.formData.Model.inputs.indexOf(updateItem);
    this.formData.Model.inputs[index] = formInputData;
  }

  deleteFormInput(order: number) {
    let deleteItem = this.formData.Model.inputs.find(x => x.order == order);
    const index = this.formData.Model.inputs.indexOf(deleteItem, 0);
    if (index > -1) {
      this.formData.Model.inputs.splice(index, 1);
   }

   console.log(this.formData.Model.inputs);
  }

}
