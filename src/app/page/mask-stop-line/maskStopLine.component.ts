import { Component,OnInit } from '@angular/core';

import { CaseCenterService } from "../../service/caseCenter.service";

import { HttpClient } from '@angular/common/http';
import { DetailCellRenderer } from '../../detail-cell-renderer.component';
import { ButtonRendererComponent } from '../../renderer/button-cell-renderer.component';

import 'ag-grid-enterprise';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-maskStopLine',
  templateUrl: './maskStopLine.html',
  styleUrls: ['./maskStopLine.component.css']
})
export class MaskStopLineComponent implements OnInit {
  constructor(private caseCenterService: CaseCenterService,
    private http:HttpClient){
      this.detailCellRenderer = 'myDetailCellRenderer';
      this.frameworkComponents = { myDetailCellRenderer: DetailCellRenderer, 
        btnCellRenderer: ButtonRendererComponent };
    }
  public open=false;
  public highlightOpen=true;
  public queryContentOpen=true;
  private detailCellRenderer;
  private frameworkComponents;
  
  public rowHeight=30;
  public trendChartOption:any={
    color: ['#91cc75', '#FFBF00', '#FF0087', '#FF0087', '#FFBF00'],
      tooltip: {
          trigger: 'axis',
          axisPointer: {
              type: 'shadow'
          }
      },
      legend: {
        bottom: '10',
        left: 'center',
          data: ['Total', 'Health','Warning', 'Stop-Line']
      },
      title: {
        text: 'Mask Stop Line Trend',
        subtext:'',
        left: 'center'
      },
      toolbox: {
          feature: {
              dataView: {show: true, readOnly: false},
              saveAsImage: {show: true}
          }
      },
      xAxis: [
          {
              type: 'category',
              axisTick: {show: false},
              data: ['0302', '0303', '0304', '0305', '0306','0307','0308']
          }
      ],
      yAxis: [
          {
              type: 'value'
          }
      ],
      series: [
          
          {
              name: 'Health',
              type: 'bar',
              stack:'Total',
              emphasis: {
                  focus: 'series'
              },
              data: [340,344, 358, 380, 390,421,410]
          },
          {
              name: 'Warning',
              type: 'bar',
              stack:'Total',
              emphasis: {
                  focus: 'series'
              },
              data: [6, 1,2, 5, 14,5,12]
          },
          {
            name: 'Stop-Line',
            type: 'bar',
            stack:'Total',
            emphasis: {
                focus: 'series'
            },
            data: [4, 11, 2, 5, 6,4,8]
        }
          
      ]
  
  };
  pieChartOption = {
    color: ['#91cc75', '#FFBF00', '#FF0087', '#FF0087', '#FFBF00'],
    title: {
        text: 'Mask Stop-Line Risk',
        subtext: '2021Q1',
        left: 'center'
    },
    tooltip: {
        trigger: 'item'
    },
    legend: {
      bottom: '10',
      left: 'center'
    },
    series: [
        {
            name: 'Elements',
            type: 'pie',
            radius: '50%',
            label: {
              show: true,
              formatter: function (params) {
                return  params.value+"%";
              },
              position: 'inside'
          },
            data: [
                {value: 90, name: 'Health'},
                {value: 9, name: 'Warning'},
                {value: 1, name: 'Stop-Line'}
                
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};
  ngOnInit(): void {
   
    // this.caseCenterService.getCaseCenterSummaries().subscribe(
    //   dataList => {
    //       this.caseCenterRowData = dataList
    //   },
    //   error => {
    //       console.log(error);
    //   }
  //)
    
  };
  private  rowSelection;
  private caseSummaryGridApi;
  private caseSummaryColumnApi;
  private caseGridApi;
  private caseGridColumnApi;
  

  addItem(newItem) {
    // if (newItem != "") {
    //     this.list.addItem(newItem);
    // }
  }
  //AG-Grid Case Summary Row Selection
  onSelectionChanged(params) {
   
    var selectedRows = this.caseSummaryGridApi.getSelectedRows();
    // document.querySelector('#selectedRows').innerHTML =
    //   selectedRows.length === 1 ? selectedRows[0].athlete : '';

    console.log(selectedRows[0]);  
  }
  onCaseSelectionChanged(params) {
   
    var selectedRows = this.caseGridApi.getSelectedRows();
    // document.querySelector('#selectedRows').innerHTML =
    //   selectedRows.length === 1 ? selectedRows[0].athlete : '';

    console.log(selectedRows[0]);  
  }
  qryCaseSummaries(){
    

      
    return this.caseCenterService.getCaseCenterSummaries();

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
  top10ColumnDef = [
    { field: 'availivability',headerName:'Avail.(%)',sortable: true ,width:'120px',cellClass:'ag-header-cell-content'},
    { field: 'stage',headerName:'Stage' ,sortable: true,width:'100px',cellClass:'ag-header-cell-content'},
    { field: 'product',headerName:'Product' ,sortable: true,width:'120px',cellClass:'ag-header-cell-content'},
    { field: 'layer' ,headerName:'Layer' ,sortable: true,width:'90px',cellClass:'ag-header-cell-content'},
   
     { field: 'availCnt',headerName:'Avail.(#)',sortable: true ,width:'120px',cellClass:'ag-header-cell-content'},
     { field: 'unavailCnt',headerName:'UnAvail.(#)',sortable: true ,width:'120px',cellClass:'ag-header-cell-content'},
  ];
  top10RowData = [
    { stage: 'NPGE01', product: 'GHRWA1',layer:'651', availivability:'0',availCnt:0,unavailCnt:2},
    { stage: 'BNYTA7', product: 'UXGG00',layer:'231', availivability:'0',availCnt:0,unavailCnt:4},
    { stage: 'NFSRR1', product: 'SFEAB1',layer:'235', availivability:'0',availCnt:0,unavailCnt:2},
    { stage: 'JFEAE7', product: 'UXGG04',layer:'330', availivability:'20',availCnt:1,unavailCnt:4},
    { stage: 'GRAGH5', product: 'LRASD2',layer:'790', availivability:'20',availCnt:1,unavailCnt:4},
    { stage: 'NPGE05', product: 'EABA04',layer:'330', availivability:'20',availCnt:1,unavailCnt:4},
    { stage: 'HTSAE5', product: 'EAGG04',layer:'260', availivability:'20',availCnt:1,unavailCnt:4},
    { stage: 'FEAHY1', product: 'BDEQW1',layer:'130', availivability:'25',availCnt:1,unavailCnt:3},
    { stage: 'FEHTE1', product: 'BDEQW1',layer:'130', availivability:'25',availCnt:1,unavailCnt:3},
    { stage: 'NDSHT2', product: 'BDEQW1',layer:'130', availivability:'25',availCnt:1,unavailCnt:3},
    
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
    {caseId: '2021/02/01 12:40:11', maskId: 'TMLV31-780A-3', procStatus:'New',price: 35000 },
    { caseId: '2021/02/01 05:50:55', maskId: 'TMLR66-985A-2',procStatus:'New', price: 35000 },
    { caseId: '2021/02/01 11:43:27', maskId: 'TMLR32-280B-6',procStatus:'Processing', price: 35000 },
    { caseId: '2021/02/01 22:18:39', maskId: 'TMIG18-385A-3',procStatus:'Processing', price: 35000 },
    { caseId: '2021/01/31 18:57:59', maskId: 'TNNV21-409B-1',procStatus:'Closed', price: 35000 },
    { caseId: '2021/02/01 10:51:32', maskId: 'TMKG88-99BA-4',procStatus:'Closed', price: 35000 }
    
  ];
  defectColDefs=[
    { field: 'defectId',headerName:'Defect Id' ,sortable: false,cellRenderer: 'agGroupCellRenderer',cellClass:'ag-header-cell-content'},
    { field: 'defectCd',headerName:'Defect Code' ,sortable: true,cellClass:'ag-header-cell-content'},
    { field: 'maskLoc',headerName:'Mask(X,Y)' ,sortable: false,cellClass:'ag-header-cell-content'},
    { field: 'waferLoc',headerName:'Wafer(X,Y)' ,sortable: false,cellClass:'ag-header-cell-content'},
    { field: 'gdsLoc',headerName:'GDS(X,Y)' ,sortable: false,cellClass:'ag-header-cell-content'},
    { field: 'defectSize',headerName:'Size(um)' ,sortable: false,cellClass:'ag-header-cell-content'},
    { field: 'defectElement',headerName:'Element' ,sortable: false,cellClass:'ag-header-cell-content'},
    { field: 'prpDefect',headerName:'PRP Defect' ,sortable: false,cellClass:'ag-header-cell-content'},
    { field: 'action',headerName:'Action' ,sortable: false,
      cellRenderer: 'btnCellRenderer',
      cellRendererParams: {
        onClick: this.onBtnClick1.bind(this),
        label: 'Click 1'
      }
    }
  ];

  onBtnClick1(e) {
    console.log(e.rowData);
  };
  defectRowData=[
    { defectId: '1', defectCd: '1C', maskLoc: "(2812,6221)" ,waferLoc: "(977,811)",gdsLoc: "(433,631)",defectSize: "60",defectElement: "Sn",prpDefect:"Y" },
    { defectId: '2', defectCd: '2C', maskLoc: "(8129,11901)" ,waferLoc: "(312,432)",gdsLoc: "(112,595)",defectSize: "110",defectElement: "Sn",prpDefect:"Y" },
    { defectId: '3', defectCd: '2C', maskLoc: "(4121,3209)" ,waferLoc: "(3212,712)",gdsLoc: "(2691,318)",defectSize: "30",defectElement: "",prpDefect:"N" }
  ];  

  
  showComplete: boolean = false;
  onFirstDataRendered(params) {
    params.api.forEachNode(function (node) {
      node.setExpanded(false);
    });
  }
  onCaseCennterGridReady(params) {
    this.caseSummaryGridApi = params.api;
    this.caseSummaryColumnApi = params.columnApi;
  }
  onCaseGridReady(params) {
    this.caseGridApi = params.api;
    this.caseGridColumnApi = params.columnApi;
  }
  
}
