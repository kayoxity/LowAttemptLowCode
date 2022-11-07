import { Component, OnInit, DoCheck, Output, EventEmitter, Input } from '@angular/core';
import { ControlsEntity } from '../Models/FormModel';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss']
})
export class LeftPanelComponent implements OnInit,DoCheck {
  @Input() editControlData: ControlsEntity;
  @Output() formInputAddedEventEmitter = new EventEmitter<ControlsEntity>();
  @Output() saveFormEventEmitter = new EventEmitter<null>();

  constructor() { }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    console.log(this.editControlData);
  }

  addNewComponent() {
    let formInputData:ControlsEntity = {
      label: "NewComponent",
      name: "NewComponent",
      type: "text"
    };

    this.formInputAddedEventEmitter.emit(formInputData);
  }

  saveForm() {
    this.saveFormEventEmitter.emit();
  }

}
