import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { InputEntity, FormModel } from '../.Models/FormModel';
import { HttpClient } from '@angular/common/http';
import { GetModelResponse } from '../.Models/Response/GetModelResponse';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
