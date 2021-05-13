import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExecDashboardComponent } from './page/exec-dashboard/execDashboard.component';
import { CaseCenterComponent } from './page/case-center/caseCenter.component';
import { MaskStopLineComponent } from './page/mask-stop-line/maskStopLine.component';
import { PrpDashboardComponent } from './page/kpi-mgmt/prp-dashboard/prpDashboard.component';
import {PellicleRuptureComponent } from './page/pellicle-rupture/pellicleRupture.component';

const routes: Routes = [
  { path: 'execDashboard', component: ExecDashboardComponent },
  { path: 'caseCenter', component: CaseCenterComponent },
  { path: 'maskStopLine', component: MaskStopLineComponent },
  { path: 'prpDashboard', component: PrpDashboardComponent },
  { path: 'pellicleRupture', component: PellicleRuptureComponent },

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }