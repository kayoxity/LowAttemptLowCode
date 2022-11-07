import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ControlsEntity, FormModel } from '../Models/FormModel';
import { HttpClient } from '@angular/common/http';
import { GetModelResponse } from '../Models/Response/GetModelResponse';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  modelData: FormModel;
  editControlData: ControlsEntity = null;

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.modelData = {
      controls: []
    };

    let url = this.baseUrl + '/api/Model/GetModel';
    this.http.get<GetModelResponse>(url).subscribe({
      next: (response) => {
        this.modelData = response.Data.Model;
      },
      error: (error) => console.log(error)
    });
  }

  addNewFormInput(formData: ControlsEntity) {
    this.modelData.controls.push(formData);
  }

  saveForm() {
    let url = this.baseUrl + '/api/Model/SaveModel';
    this.http.post(url, this.modelData).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => console.log(error)
    });
  }

  editForm(inputName: string){
    let control = this.modelData.controls.find(x => x.name == inputName);
    this.editControlData = control;
  }

}
