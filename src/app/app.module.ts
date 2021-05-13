import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';
import '@cds/core/alert/register.js';
//import { CaseCenterService } from './service/caseCenter.service';


//Grid Custom detail
import { DetailCellRenderer } from './detail-cell-renderer.component';
 
import { EditDefectModalComponent } from './page/edit-defect-modal/edit-defect-modal.component';
import { AppRoutingModule } from './app-routing.module';   
      
import { ExecDashboardComponent } from './page/exec-dashboard/execDashboard.component';
import { CaseCenterComponent } from './page/case-center/caseCenter.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaskStopLineComponent } from './page/mask-stop-line/maskStopLine.component';
import { PrpDashboardComponent } from './page/kpi-mgmt/prp-dashboard/prpDashboard.component';
import {PellicleRuptureComponent } from './page/pellicle-rupture/pellicleRupture.component';

import { HighlightComponent } from './widget/hightlight/highlight.component';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { LinechartCellRendererComponent } from './renderer/linechart-cell-renderer.component';

@NgModule({
  declarations: [
    AppComponent,DetailCellRenderer,ExecDashboardComponent,
    CaseCenterComponent,MaskStopLineComponent,EditDefectModalComponent,HighlightComponent,PrpDashboardComponent,PellicleRuptureComponent,
    LinechartCellRendererComponent,
    
  ],
  imports: [
    BrowserModule, FormsModule,AppRoutingModule,
    AgGridModule.withComponents([]),
    HttpClientModule,
    NgbPaginationModule,
    NgbAlertModule,
    ClarityModule,
    BrowserAnimationsModule,
    NgxEchartsModule.forRoot({
      echarts
    }),
    AgGridModule.withComponents([DetailCellRenderer,LinechartCellRendererComponent]),
    NgbModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
