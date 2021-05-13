import { Component, OnInit, Input, ViewChildren, ViewChild, AfterViewInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';

import { DefectInfo } from 'src/app/DefectInfo';
@Component({
  selector: 'edit-defect-modal',
  templateUrl: './edit-defect-modal.component.html'
  
})
export class EditDefectModalComponent {
  @Output() onOK: EventEmitter<DefectInfo> = new EventEmitter<DefectInfo>();

  public editModalOpen = true;

  defect:DefectInfo ;
 
  open(d: DefectInfo) {
    console.log(d);
    this.editModalOpen = true;
    this.defect = Object.create(d); // clone the user (we don't want to modify the original in the dialog)
    console.log(this.defect); 

  }

  close() {
    this.editModalOpen = false;
  }

  onKeyPress(event) {
    if (event.keyCode === 13) {
      this.onOK.emit(this.defect);
    }
  }

  onSubmit() {
    this.onOK.emit(this.defect);
  }

}
