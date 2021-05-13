
import { CaseCenterService } from "../../service/caseCenter.service";

import { HttpClient } from '@angular/common/http';
import { DetailCellRenderer } from '../../detail-cell-renderer.component';
import { ButtonRendererComponent } from '../../renderer/button-cell-renderer.component';
import { Component, OnInit,ViewChild,ElementRef } from "@angular/core";
import 'ag-grid-enterprise';

import { CaseDetail } from 'src/app/caseDetail';
import { DefectInfo } from 'src/app/DefectInfo';
import '@cds/core/modal/register.js';
import '@cds/core/modal/register.js';
import '@cds/core/modal/modal-actions.element';
import '@cds/core/modal/modal-header.element';
import '@cds/core/modal/modal-content.element';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditDefectModalComponent } from '../edit-defect-modal/edit-defect-modal.component';
@Component({
  selector: 'app-caseCenter',
  templateUrl: './caseCenter.html',
  styleUrls: ['./caseCenter.component.css']
})

export class CaseCenterComponent implements OnInit {
  
   @ViewChild(EditDefectModalComponent) public modal: EditDefectModalComponent;
   @ViewChild("caseBasicGrid") caseBasicGrid: ElementRef;
   @ViewChild("casePotentialLotGrid") casePotentialLotGrid: ElementRef;

   ngOnInit(): void {
   
    this.qryCaseSummaries(this.qryDateFrom,this.qryDateTo,this.qryMask);
    
  };
  public qryDateFrom;
  public qryDateTo;
  public qryMask;
  public caseSummaryOpen=true;
  public caseDetailOpen=true;
   editDefect:DefectInfo = {maskId:"TMIG",ebNumber:"EB",defectId:2,defectNo:"001",locX:"121",locY:"212",defectCd:"1C",
   defectSize:"70",defectElement:"Sn",prpDefect:"N"};
  
  ngAfterViewInit(): void {
      this.modal.onOK.subscribe(editDefect => {
          this.editDefect = editDefect;
          this.modal.close();
      });
  }

  closeResult = '';
  constructor(private caseCenterService: CaseCenterService,
    private http:HttpClient,private modalService: NgbModal){
      this.detailCellRenderer = 'myDetailCellRenderer';
      this.frameworkComponents = { myDetailCellRenderer: DetailCellRenderer, 
        btnCellRenderer: ButtonRendererComponent };
  }
  query(){
    console.log(this.qryDateFrom);
    console.log(this.qryDateTo);
    this.qryCaseSummaries(this.qryDateFrom,this.qryDateTo,this.qryMask);
  } 
  qryCaseSummaries(qryDateFrom,qryDateTo,maskId){
    this.caseCenterService.getCaseCenterSummariesByCond(qryDateFrom,qryDateTo,maskId).subscribe(
      dataList => {
          this.caseCenterRowData = dataList
      },
      error => {
          console.log(error);
      });
   // return this.caseCenterService.getCaseCenterSummaries();
    //return this.caseCenterService.getCaseCenterSummariesByCond(qryDateFrom,qryDateTo,maskId);
  }
  onEditSubmitClick(data){


    // if (this.params.onClick instanceof Function) {

    //   console.log(this.params.node.data);
    //   // put anything into params u want pass into parents component
 
    //   this.caseCenterService.updateDefectInfo(
    //     "MaskId",
    //     "InspDtStr",
    //     this.params.node.data.defectId,
    //     this.params.node.data.defectSize,
    //     this.params.node.data.elementPredict,
    //     this.params.node.data.elementActual,
    //     this.params.node.data.isPrpDefect
    //   ).subscribe(
    //     response => {
    //       this.caseCenterService.getCaseCenterSummariesByCond("","","").subscribe(
    //         dataList => {
                
    //         },
    //         error => {
    //             console.log(error);
    //         });
    //     },
    //     error => {
    //       console.log(error);
    //     });;
      

    // }
  }


  public editOpen;
  public caseEditData:DefectInfo;
  openEdit() {
    this.editOpen = true;
 
  }
  private detailCellRenderer;
  private frameworkComponents;
  public editModalOpen=true;
  public error=false;
  public chartOption: any = {
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [820, 932, 901, 934, 1290, 1430, 1550, 1200, 1650.1450, 1680.1890],
      type: 'line',
      areaStyle: {}
    }]
  };
 
  private  rowSelection;
  private caseSummaryGridApi;
  private caseSummaryColumnApi;
  private caseGridApi;
  private caseGridColumnApi;
  public selCaseDetailList;
   /**
   * Close the modal and reset error states
   */
   public cancel(): void {
     
  }
  
    public removeCategory(): void {
      
    }
  
    /**
     * Save the currently edited category
     */
    public save(): void {
     
    }
  

  addItem(newItem) {
    // if (newItem != "") {
    //     this.list.addItem(newItem);
    // }
  }
  //AG-Grid Case Summary Row Selection
  onCaseSummarySelectionChanged(params) {
    console.log(params);
    var selectedRows = this.caseSummaryGridApi.getSelectedRows();
    // document.querySelector('#selectedRows').innerHTML =
    //   selectedRows.length === 1 ? selectedRows[0].athlete : '';
    this.selCaseDetailList=selectedRows[0].criticalDftCases;
    console.log(this.selCaseDetailList);  
  }
  onCaseDetailSelectionChanged(selected) {
    console.log(selected);
    this.selectedCaseObj=selected.caseDetail;
    console.log(this.selCaseDetailList);  
  }
 
  onCaseSelectionChanged(params) {
   
    var selectedRows = this.caseGridApi.getSelectedRows();
    // document.querySelector('#selectedRows').innerHTML =
    //   selectedRows.length === 1 ? selectedRows[0].athlete : '';

    console.log(selectedRows[0]);  
  }
 
  caseCenterRowModelType="serverSide";
  defaultColDef = {
    editable: false,
    sortable: true,
    flex: 1,
    minWidth: 120,
    filter: true,
    resizable: true,
  };
  
  caseSummaryColumnDefs = [
    { field: 'procStatus',headerName:'Status' ,sortable: false,width:'130px',cellClass:'ag-header-cell-content'},
    { field: 'criticalDftCnt',headerName:'1C' ,sortable: true,width:'130px',cellClass:'ag-header-cell-content'},
    
    { field: 'pellicleDftCnt1',headerName:' ',sortable: true ,width:'120px',cellClass:'ag-header-cell-content'},
   
    { field: 'rbiCenterCnt1',headerName:'',sortable: true ,width:'120px',cellClass:'ag-header-cell-content'},
    { field: 'rbiEdgeCnt1',headerName:'',sortable: true ,width:'120px',cellClass:'ag-header-cell-content'},
    { field: 'rbiBx100Cnt1',headerName:'',sortable: true ,width:'120px',cellClass:'ag-header-cell-content'},
    { field: 'maskOutOfCnt1',headerName:'',sortable: true ,width:'120px',cellClass:'ag-header-cell-content'},
    { field: 'pellicleRuptureCnt1',headerName:'',sortable: true ,width:'140px',cellClass:'ag-header-cell-content'},
    { field: 'pellicleRuptureCnt1',headerName:'',sortable: true ,width:'140px',cellClass:'ag-header-cell-content'},
    { field: 'pellicleRuptureCnt1',headerName:'',sortable: true ,width:'140px',cellClass:'ag-header-cell-content'},
    { field: 'pellicleRuptureCnt1',headerName:'',sortable: true ,width:'140px',cellClass:'ag-header-cell-content'},
    { field: 'pellicleRuptureCnt1',headerName:'',sortable: true ,width:'140px',cellClass:'ag-header-cell-content'},
   
  ];
  caseCenterRowData = [
    { procStatus: 'New', criticalDftCnt: '1',onoDftCnt:'2', pellicleDftCnt:'0',rbiDftCnt:'2',wiaCnt:'4',criticalDftCase:[] },
    { procStatus: 'Processing', criticalDftCnt: '1',onoDftCnt:'2', pellicleDftCnt:'0',rbiDftCnt:'2',wiaCnt:'4', criticalDftCase:[] },
    { procStatus: 'Closed', criticalDftCnt: '1',onoDftCnt:'2', pellicleDftCnt:'0',rbiDftCnt:'2',wiaCnt:'4', criticalDftCase:[]},
  ]; 
  rowData = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 }
  ]; 
  
  caseColDefs=[
    { field: 'procStatus',headerName:'Status' ,width:'100px',cellClass:'ag-header-cell-content'},
    { field: 'caseId',headerName:'Insp. Dt' ,width:'150px' },
    { field: 'maskId',headerName:'Mask Id' ,width:'140px'  },
    
  ];
  caseRowData=[
    {caseId: '2021/02/01 12:40:11', maskId: 'TMLV31-780A-3', procStatus:'New',price: 35000 ,
     caseProcess:[
      {name:'ADC',status:"",startDt:"3/4 12:00"},
      {name:'MDC',status:"",startDt:"3/4 12:00"},
      {name:'WIA',status:"",startDt:"3/4 12:00"},
      {name:'Potential Lot',status:"",startDt:"3/4 12:00"},
      {name:'Element Prediction',status:"",startDt:"3/4 12:00"},
      {name:'Closed',status:"",startDt:"3/4 14:00"}
     ]},
    { caseId: '2021/02/01 05:50:55', maskId: 'TMLR66-985A-2',procStatus:'New', price: 35000 },
    { caseId: '2021/02/01 11:43:27', maskId: 'TMLR32-280B-6',procStatus:'Processing', price: 35000 },
    { caseId: '2021/02/01 22:18:39', maskId: 'TMIG18-385A-3',procStatus:'Processing', price: 35000 },
    { caseId: '2021/01/31 18:57:59', maskId: 'TNNV21-409B-1',procStatus:'Closed', price: 35000 },
    { caseId: '2021/02/01 10:51:32', maskId: 'TMKG88-99BA-4',procStatus:'Closed', price: 35000 }
    
  ];
  defectColDefs=[
    { field: 'defectId',headerName:'Defect Id' ,minWidth: 100,sortable: false,cellRenderer: 'agGroupCellRenderer',suppressMenu : true},
    { field: 'defectCd',headerName:'Code' ,minWidth: 60,sortable: false,cellClass:'ag-header-cell-content',suppressMenu : true },
    { field: 'locX',headerName:'Mask(X,Y)' ,  minWidth: 180, valueFormatter: this.requalFormatter, suppressMenu : true,sortable: false,cellClass:'ag-header-cell-content'},
    { field: 'waferLoc',headerName:'EBO(X,Y)' ,minWidth: 180,valueFormatter: this.eboFormatter,sortable: false,cellClass:'ag-header-cell-content',suppressMenu : true},
    { field: 'defectSize',headerName:'Size(um)' ,minWidth: 110,sortable: false,cellClass:'ag-header-cell-content',suppressMenu : true},
    { field: 'elementPredict',headerName:'Ele.(Predict)' ,minWidth: 130,editable:true,sortable: false,cellClass:'ag-header-cell-content',suppressMenu : true},
    { field: 'elementActual',headerName:'Ele.(Confirm)' ,minWidth: 130,editable:true,sortable: false,cellClass:'ag-header-cell-content',suppressMenu : true},
    { field: 'isPrpDefect',headerName:'PRP Defect' ,sortable: false,editable:true,cellClass:'ag-header-cell-content',suppressMenu : true},
    { field: 'action',headerName:'Action' ,sortable: false,
      cellRenderer: 'btnCellRenderer',
      cellRendererParams: {
        clicked: this.onEditSubmitClicked.bind(this)
      }
    }
  ];

  requalFormatter(params) {
    return '(' + params.data.reqlLocX +','+ params.data.reqlLocY +')';
  }
  eboFormatter(params) {
    return '(' + params.data.eboLocX +','+ params.data.eboLocY +')';
  }
  
  onEditSubmitClicked(field) {
    console.log(field);

      this.caseCenterService.updateDefectInfo(
        "MaskId",
        "InspDtStr",
        field.defectId,
        field.defectSize,
        field.elementPredict,
        field.elementActual,
        field.isPrpDefect
      ).subscribe(
        response => {
          this.caseCenterService.getCaseCenterSummariesByCondAfter("","","").subscribe(
            dataList => {
              this.caseCenterRowData = dataList
              this.selCaseDetailList=dataList[1].criticalDftCases;
              this.caseGridApi.refreshCells();
            },
            error => {
                console.log(error);
            });
        },
        error => {
          console.log(error);
        });;
  };
  processClick(a) {
    console.log(a);
    this.caseBasicGrid.nativeElement.style="blackground-color://#endregion";
    this.casePotentialLotGrid.nativeElement.style="display:none";
    
  };
  defectRowData=[
    { defectId: '1', defectCd: '1C', maskLoc: "(2812,6221)" ,waferLoc: "(977,811)",gdsLoc: "(433,631)",defectSize: "60",defectElement: "Sn",prpDefect:"Y" },
    { defectId: '2', defectCd: '2C', maskLoc: "(8129,11901)" ,waferLoc: "(312,432)",gdsLoc: "(112,595)",defectSize: "110",defectElement: "Sn",prpDefect:"Y" },
    { defectId: '3', defectCd: '2C', maskLoc: "(4121,3209)" ,waferLoc: "(3212,712)",gdsLoc: "(2691,318)",defectSize: "30",defectElement: "",prpDefect:"N" }
  ];  

  
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  showComplete: boolean = false;
  onFirstDataRendered(params) {
    params.api.forEachNode(function (node) {
      node.setExpanded(false);
    });
  }
  onCaseSummaryGridReady(params) {
    this.caseSummaryGridApi = params.api;
   
    this.caseSummaryColumnApi = params.columnApi;
  }
  onCaseGridReady(params) {
    this.caseGridApi = params.api;
  
    this.caseGridColumnApi = params.columnApi;
  }
  public selectedCaseObj:CaseDetail

  onCaseMaskSelected(caseObj:CaseDetail):void{
    this.selectedCaseObj=caseObj;
  }
  
}
