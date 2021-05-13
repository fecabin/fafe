// Author: T4professor

import { Component,Input  } from '@angular/core';

@Component({
  selector: 'widget-highlight',
  template: `
  <div class="card-block">
    <div class="{{alarmClass}}" style="width:100%">
      <span>-</span>
    </div>
    <div class="card-title bg-white h-20"  style="text-align: center;font-size: x-large;font-weight: bold;">
      {{title}}
    </div>
    <div class="card-title bg-white h-20"  style="text-align: center;font-size: x-large;font-weight: bold;">
    {{value}}
    </div>
    <div class="bg-white h-20"  style="text-align: center;font-size: x-large;font-weight: bold;">
    {{unit}}
    </div>
    <div class="bg-white h-30"  style="text-align: center;font-size: x-large;font-weight: bold;">
      
    </div>
  </div>`
})
export class HighlightComponent  {
  @Input() alarmClass: string;
  @Input() title: string;
  @Input() value: string;
  @Input() unit: string;
  @Input() trendData: any;
 
  agInit(params): void {
    
  }

  refresh(params?: any): boolean {
    return true;
  }
  setData(alarmClass,title,value,unit,trendData){
    this.alarmClass=alarmClass;
    this.title=title;
    this.value=value;
    this.unit=unit;
    this.trendData=trendData;
  };
  onClick($event) {
    // if (this.params.onClick instanceof Function) {
    //   // put anything into params u want pass into parents component
    //   const params = {
    //     event: $event,
    //     rowData: this.params.node.data
    //     // ...something
    //   }
    //   this.params.onClick(params);

    // }
  }
}