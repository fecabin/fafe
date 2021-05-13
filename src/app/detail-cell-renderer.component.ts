import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
@Component({
  selector: 'app-detail-cell-renderer',
  template: `
  <div class="clr-row" style="background-color:hsl(198, 0%, 98%)">
    <div class="clr-col-3">
        <div class="card">
            <div class="card-img-header">
                X8U Defect (T)
            </div>
            <div class="card-block">
                <div class="card-media-block">
                    <img src="../assets/d2.png" >
                </div>
            </div>
           
        </div>
    </div>
    <div class="clr-col-3">
        <div class="card">
            <div class="card-img-header" style="height:12px;font-size:12px;text-align:center">
                X8U Defect (R)
            </div>
            <div class="card-block">
                <div class="card-media-block">
                <img src="../assets/d2.png"  style="text-align:center">
                </div>
            
            </div>
        
        </div>
    </div>
    <div class="clr-col-3">
        <div class="card">
            <div class="card-img-header" >
                X8U Defect (R)
            </div>
            <div class="card-block">
                <div class="card-media-block">
                <img src="../assets/d2.png"  style="text-align:center">
                </div>
            
            </div>
        
        </div>
    </div>
    <div class="clr-col-3">
        <div class="card">
            <div class="card-img-header" >
                X8U Defect (R)
            </div>
            <div class="card-block">
                <div class="card-media-block">
                <img src="../assets/d2.png"  style="text-align:center">
                </div>
            
            </div>
        
        </div>
    </div>
    <div class="clr-col-3">
    <div class="card">
        <div class="card-img-header" >
            X8U Cut(P)
        </div>
        <div class="card-block">
            <div class="card-media-block">
            <img src="../assets/d2.png"  style="text-align:center">
            </div>
        
        </div>
    
    </div>
    </div>
    <div class="clr-col-3">
    <div class="card">
        <div class="card-img-header" >
            X8U Cut(S)
        </div>
        <div class="card-block">
            <div class="card-media-block">
            <img src="../assets/d2.png"  style="text-align:center">
            </div>
        
        </div>
    
    </div>
    </div>
</div>
  
  
  `,
})
export class DetailCellRenderer implements ICellRendererAngularComp {
  agInit(params: any): void {}

  refresh(params: any): boolean {
    return false;
  }
}
