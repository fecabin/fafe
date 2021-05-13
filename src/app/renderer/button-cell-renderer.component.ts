// Author: T4professor

import { Component,Output,EventEmitter } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

import { CaseCenterService } from "../service/caseCenter.service";

@Component({
  selector: 'app-button-renderer',
  template: `
    <button class="btn btn-outline-dark btn-sm" type="button" (click)="onClick($event)" >Submit</button>
    `
})

export class ButtonRendererComponent implements ICellRendererAngularComp {

  params;
  label: string;
  constructor(private caseCenterService: CaseCenterService){
   
  
  }
  agInit(params): void {
    this.params = params;
    this.label = this.params.label || null;
  }

  refresh(params?: any): boolean {
    return true;
  }
  onClick($event) {
    this.params.clicked(this.params.node.data)

  }
}