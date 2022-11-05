import { ChangeDetectionStrategy, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import exampleData from '../../assets/sample.json';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormsComponent implements OnInit {
  jsonData = exampleData.controls;
  dynamicForm: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.createDynamicForm();
  }

  createDynamicForm() {
    this.jsonData.forEach(element => {
      this.dynamicForm.addControl(element.name, this.fb.control(element.value));
    });
  }

  onSubmit() {
    console.log(this.dynamicForm);
    this.http.post('https://api-lowattemptlowcode.pcfreakz.co.in/', this.dynamicForm.value).subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error)
    })
  }

}
