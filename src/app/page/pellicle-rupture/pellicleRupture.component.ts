import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PrpDashboardService } from 'src/app/service/prpDashboard.service';
import { LinechartCellRendererComponent } from '../../renderer/linechart-cell-renderer.component';
import { ButtonRendererComponent } from '../../renderer/button-cell-renderer.component';


@Component({
  selector: 'app-pellicle-rupture',
  templateUrl: './pellicleRupture.html',
  styleUrls: ['./pellicleRupture.component.css']
})
export class PellicleRuptureComponent implements OnInit {
  constructor(private prpDashboardService: PrpDashboardService,
    private http:HttpClient){
      this.frameworkComponents = {
        btnCellRenderer: ButtonRendererComponent,
        linechartCellRendererComponent: LinechartCellRendererComponent };
   }


  public open=false;
  public highlightOpen=true;
  public queryContentOpen=true;
  private frameworkComponents;
  

  public inspDataColumns=[];
  public inspData=[];
  public prpDataColumns=[];
  public prpData=[];


  public inspDataTabActive:false;
  public prpDataTabActive:false;
  public prpChartTabActive:false;

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
  private inspDataGridApi;
  private inspDataGridColumnApi;

  private prpDataGridApi;
  private prpDataGridColumnApi;

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
    
    return null;

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

  

  inspRowData=[];
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
  onPrpDataGridReady(params) {
    this.prpDataGridApi = params.api;
    this.prpDataGridColumnApi = params.columnApi;
    this.prpDataColumns = [
      { field: 'tool',headerName:'Tool',sortable: true ,width:'120px',cellClass:'ag-header-cell-content',pinned:'left'},
      { field: 'm101',headerName:'M101' ,sortable: true,width:'240px',cellClass:'ag-header-cell-content',pinned:'left',
       children:[
        { field: 'm101Wm',headerName:'WN' ,sortable: true,width:'100px',pinned:'left',},
        { field: 'm101Dft',headerName:'DFT' ,sortable: true,width:'80px',cellClass:'ag-header-cell-content',pinned:'left',},
        { field: 'm101Prp',headerName:'10K' ,sortable: true,width:'80px',cellClass:'ag-header-cell-content',pinned:'left',
        cellStyle: params => {
          if (params.value >5) {
              //mark police cells as red
              return {color: 'red'};
          }
          return null;
      }},
        { field: 'm101Scan',headerName:'Scan' ,sortable: true,width:'80px',cellClass:'ag-header-cell-content',pinned:'left',},
        { field: 'm101Hit',headerName:'Hit' ,sortable: true,width:'80px',cellClass:'ag-header-cell-content',pinned:'left',},
        { field: 'm101HitRate',headerName:'HitRate' ,sortable: true,width:'100px',cellClass:'ag-header-cell-content',pinned:'left',}
       ]
      },
      { field: 'm102',headerName:'M102' ,sortable: true,width:'200px',cellClass:'ag-header-cell-content',pinned:'left',
      children:[
       { field: 'wm',headerName:'WN' ,sortable: true,width:'80px',pinned:'left',},
       { field: 'dft',headerName:'DFT' ,sortable: true,width:'80px',cellClass:'ag-header-cell-content',pinned:'left',},
       { field: '10k',headerName:'10K' ,sortable: true,width:'80px',cellClass:'ag-header-cell-content',pinned:'left',}
      ]},
      { field: 'm103' ,headerName:'M103' ,sortable: true,width:'200px',cellClass:'ag-header-cell-content',pinned:'left'},
      { field: 'w101',headerName:'W101' ,sortable: true,width:'200px',cellClass:'ag-header-cell-content'},
      { field: 'w102',headerName:'W102' ,sortable: true,width:'200px',cellClass:'ag-header-cell-content'},
      { field: 'w103' ,headerName:'W104' ,sortable: true,width:'200px',cellClass:'ag-header-cell-content'},
      { field: 'w101',headerName:'W105' ,sortable: true,width:'200px',cellClass:'ag-header-cell-content'},
      { field: 'w102',headerName:'W106' ,sortable: true,width:'200px',cellClass:'ag-header-cell-content'},
      { field: 'w103' ,headerName:'W107' ,sortable: true,width:'200px',cellClass:'ag-header-cell-content'}

    ];
    this.prpData = [
      { tool: 'APE301', m101Wm: '2000',m101Dft:'1', m101Prp:'5',m101Scan:'32',m101Hit:'4',m101HitRate:'12.%'},
      { tool: 'APE302', m101Wm: '4000',m101Dft:'12', m101Prp:'7.5',m101Scan:'60',m101Hit:'3',m101HitRate:'5%'},
      { tool: 'APE303', m101Wm: '4000',m101Dft:'7', m101Prp:'6.5',m101Scan:'60',m101Hit:'3',m101HitRate:'5%'},
      { tool: 'APE304', m101Wm: '4000',m101Dft:'4', m101Prp:'4.5',m101Scan:'60',m101Hit:'3',m101HitRate:'5%'},
      { tool: 'APE305', m101Wm: '5000',m101Dft:'3', m101Prp:'3.5',m101Scan:'60',m101Hit:'3',m101HitRate:'5%'},
      { tool: 'APE306', m101Wm: '4000',m101Dft:'11', m101Prp:'11.5',m101Scan:'60',m101Hit:'3',m101HitRate:'5%'},
      { tool: 'APE301', m101Wm: '2000',m101Dft:'1', m101Prp:'5',m101Scan:'32',m101Hit:'4',m101HitRate:'12.%'},
      { tool: 'APE302', m101Wm: '4000',m101Dft:'12', m101Prp:'7.5',m101Scan:'60',m101Hit:'3',m101HitRate:'5%'},
      { tool: 'APE303', m101Wm: '4000',m101Dft:'7', m101Prp:'6.5',m101Scan:'60',m101Hit:'3',m101HitRate:'5%'},
      { tool: 'APE304', m101Wm: '4000',m101Dft:'4', m101Prp:'4.5',m101Scan:'60',m101Hit:'3',m101HitRate:'5%'},
      { tool: 'APE305', m101Wm: '5000',m101Dft:'3', m101Prp:'3.5',m101Scan:'60',m101Hit:'3',m101HitRate:'5%'},
      { tool: 'APE306', m101Wm: '4000',m101Dft:'11', m101Prp:'11.5',m101Scan:'60',m101Hit:'3',m101HitRate:'5%'},
      { tool: 'APE301', m101Wm: '2000',m101Dft:'1', m101Prp:'5',m101Scan:'32',m101Hit:'4',m101HitRate:'12.%'},
      { tool: 'APE302', m101Wm: '4000',m101Dft:'12', m101Prp:'7.5',m101Scan:'60',m101Hit:'3',m101HitRate:'5%'},
      { tool: 'APE303', m101Wm: '4000',m101Dft:'7', m101Prp:'6.5',m101Scan:'60',m101Hit:'3',m101HitRate:'5%'},
      { tool: 'APE304', m101Wm: '4000',m101Dft:'4', m101Prp:'4.5',m101Scan:'60',m101Hit:'3',m101HitRate:'5%'},
      { tool: 'APE305', m101Wm: '5000',m101Dft:'3', m101Prp:'3.5',m101Scan:'60',m101Hit:'3',m101HitRate:'5%'},
      { tool: 'APE306', m101Wm: '4000',m101Dft:'11', m101Prp:'11.5',m101Scan:'60',m101Hit:'3',m101HitRate:'5%'},
      { tool: 'APE301', m101Wm: '2000',m101Dft:'1', m101Prp:'5',m101Scan:'32',m101Hit:'4',m101HitRate:'12.%'},
      { tool: 'APE302', m101Wm: '4000',m101Dft:'12', m101Prp:'7.5',m101Scan:'60',m101Hit:'3',m101HitRate:'5%'},
      { tool: 'APE303', m101Wm: '4000',m101Dft:'7', m101Prp:'6.5',m101Scan:'60',m101Hit:'3',m101HitRate:'5%'},
      { tool: 'APE304', m101Wm: '4000',m101Dft:'4', m101Prp:'4.5',m101Scan:'60',m101Hit:'3',m101HitRate:'5%'},
      { tool: 'APE305', m101Wm: '5000',m101Dft:'3', m101Prp:'3.5',m101Scan:'60',m101Hit:'3',m101HitRate:'5%'},
      { tool: 'APE306', m101Wm: '4000',m101Dft:'11', m101Prp:'11.5',m101Scan:'60',m101Hit:'3',m101HitRate:'5%'},
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

    this.qryCaseSummaries();
  }


  onInspDataGridReady(params) {
    this.inspDataGridApi = params.api;
    this.inspDataGridColumnApi = params.columnApi;

    this.inspDataColumns = [
      { field: 'rank',headerName:'Top',sortable: true ,width:80,cellClass:'ag-header-cell-content', cellStyle: {'text-align': 'center'}},
      { field: 'maskId',headerName:'Mask',sortable: true ,width:200,cellClass:'ag-header-cell-content', cellStyle: {'text-align': 'center'}},
      { field: '',headerName:'EOP Drift' ,sortable: true,width:200,cellClass:'ag-header-cell-content',
      children:[
        { field: 'eopDtr' ,headerName:'DtR' ,sortable: true,width:100,cellClass:'ag-header-cell-content'},
        { field: 'eopDtd',headerName:'DtD' ,sortable: true,width:100,cellClass:'ag-header-cell-content'}
      ]},
      { field: '',headerName:'Wafer Move' ,sortable: true,width:200,cellClass:'ag-header-cell-content',
      children:[
        { field: 'wmTotal' ,headerName:'All' ,sortable: true,width:100,cellClass:'ag-header-cell-content'},
        { field: 'wmPellicle',headerName:'Pellicle' ,sortable: true,width:100,cellClass:'ag-header-cell-content'}
      ]},
      { field: 'trend',headerName:'Trend' ,sortable: false,width:500,
        cellRenderer: 'linechartCellRendererComponent',
        cellRendererParams: {
          onClick: this.onBtnClick1.bind(this),
          label: 'Click 1'
        }
    }
    ];
    this.inspData = [
    { rank: 1, eopDtr:'9.1%',eopDtd: '3.3%',maskId:'CA456CX-985-A',wmTotal:'46021', wmPellicle:'46002'},
    { rank: 2, eopDtr:'8.2%',eopDtd: '1.5%',maskId:'CA456CX-985-A',wmTotal:'46021', wmPellicle:'46002'},
    { rank: 3, eopDtr:'7.7%',eopDtd: '1.3%',maskId:'CA456CX-985-A',wmTotal:'46021', wmPellicle:'46002'},
    { rank: 4, eopDtr:'6.4%',eopDtd: '3.7%',maskId:'CA456CX-985-A',wmTotal:'46021', wmPellicle:'46002'},
    { rank: 5, eopDtr:'5.0%',eopDtd: '2.8%',maskId:'CA456CX-985-A',wmTotal:'46021', wmPellicle:'46002'},
    { rank: 6, eopDtr:'4.9%',eopDtd: '2.4%',maskId:'CA456CX-985-A',wmTotal:'46021', wmPellicle:'46002'},
    { rank: 7, eopDtr:'4.7%',eopDtd: '2.3%',maskId:'CA456CX-985-A',wmTotal:'46021', wmPellicle:'46002'},
    { rank: 8, eopDtr:'4.7%',eopDtd: '1.0%',maskId:'CA456CX-985-A',wmTotal:'46021', wmPellicle:'46002'},
    { rank: 9, eopDtr:'4.6%',eopDtd: '2.8%',maskId:'CA456CX-985-A',wmTotal:'46021', wmPellicle:'46002'},
    { rank: 10, eopDtr:'4.1%',eopDtd: '0.4%',maskId:'CA456CX-985-A',wmTotal:'46021', wmPellicle:'46002'},

      ]; 
  }
  onCaseGridReady(params) {
    this.caseGridApi = params.api;
    this.caseGridColumnApi = params.columnApi;
  }
  


 
   /**
   * Close the modal and reset error states
   */
    public onBtnExport(): void {
      this.inspDataGridApi.exportDataAsCsv(null);
    }
    
}
