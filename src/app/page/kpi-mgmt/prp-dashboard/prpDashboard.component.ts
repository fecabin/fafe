import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PrpDashboardService } from 'src/app/service/prpDashboard.service';
import { _ } from 'ag-grid-community';

@Component({
  selector: 'app-prp-dashboard',
  templateUrl: './prpDashboard.html',
  styleUrls: ['./prpDashboard.component.css']
})
export class PrpDashboardComponent implements OnInit {
  constructor(private prpDashboardService: PrpDashboardService,
    private http:HttpClient){
      this.frameworkComponents = {  };
    }
    
  public open=false;
  public highlightOpen=true;
  public queryContentOpen=true;
  private frameworkComponents;
  public qryDateFrom;
  public qryDateTo;
  public qryMask;
  public prpToolCharts=[];
  query(){
    console.log(this.qryDateFrom);
    console.log(this.qryDateTo);
    this.prpDashboardService.getPrpDashboardByCond(this.qryDateFrom,this.qryDateTo).subscribe(
      dataList => {
        this.queryCallBack(dataList);
      },
      error => {
          console.log(error);
      });


  }  
  queryCallBack(qrtResult){
    console.log(qrtResult);
    if(qrtResult!=null && qrtResult.inspData!=null){
      this.inspData=qrtResult.inspData;
    }
    if(qrtResult!=null && qrtResult.prpData!=null){
      this.generatePrpDataTab(qrtResult.prpData.prpData);
    }
    if(qrtResult!=null && qrtResult.prpMonthlyChart!=null){
      this.generatePrpChartOverviewContent(qrtResult);
    }
  }
  generatePrpDataTab(data){
    let map=new Map();
    for (let d of data){
      if(!map.has(d.toolId)){
        console.log(d.toolId);
        var prpDataByToolAry:any[]=[];
        map.set(d.toolId,prpDataByToolAry);
      }
      map.get(d.toolId).push(d);
    }
 
    var rowDataList=[];
    var colList=[];
    let colHeadMap=new Map();
    colList.push(this.createPinCol("toolId","Tool"));
    for (let entry of map.entries()) {
      var o=new Object();
      o["toolId"]=entry[0];
      for (let stat of entry[1]){
       
        if(!colHeadMap.has(stat.timeBlock)){
          var groupHeadCol=this.createNonPinCol("",stat.timeBlock);
          var groupChildCol=[];
          groupChildCol.push(this.createNonPinCol(stat.timeBlock+"Dft","1C"));
          groupChildCol.push(this.createNonPinCol(stat.timeBlock+"Wm","Move"));
          groupChildCol.push(this.createNonPinCol(stat.timeBlock+"10K","10K"));
          groupChildCol.push(this.createGroupShowGroupCol(stat.timeBlock+"HitCnt","Hit"));
          groupChildCol.push(this.createGroupShowGroupCol(stat.timeBlock+"Scan","Scan"));
          groupChildCol.push(this.createGroupShowGroupCol(stat.timeBlock+"HitRate","HitRate"));
          groupHeadCol["children"]=groupChildCol;
          colList.push(groupHeadCol);
          colHeadMap.set(stat.timeBlock,groupHeadCol);
        }
        o[stat.timeBlock+"Wm"]=stat.waferMove;
        o[stat.timeBlock+"Dft"]=stat.criticalDftCnt;
        o[stat.timeBlock+"10K"]=stat.prp;
        o[stat.timeBlock+"HitCnt"]=stat.hitCnt;
        o[stat.timeBlock+"Scan"]=stat.scan;
        o[stat.timeBlock+"HitRate"]=stat.hitRate;
      }
      rowDataList.push(o);
    }
    this.prpDataColumns=colList;
    this.prpData=rowDataList;
    //this.prpDataGridApi.refreshCells();
  }
  generatePrpChartOverviewContent(qryResult){
    var prpMonthlyChart=qryResult.prpMonthlyChart;
    var prpWeeklyChart=qryResult.prpWeeklyChart;
    var eleWeeklyChart=qryResult.eleWeeklyChart;
    var eleOverviewChart=qryResult.eleOverviewChart;
    var prpByToolChart=qryResult.prpByToolChart;
    
    if(prpMonthlyChart!=null){
      this.prpWeeklyTrendChartData.title.text=prpMonthlyChart.title;
      this.prpWeeklyTrendChartData.title.subtext=prpMonthlyChart.subTitle;
        this.prpWeeklyTrendChartData.xAxis[0].data=prpMonthlyChart.x;
        this.prpWeeklyTrendChartData.yAxis[0].max=prpMonthlyChart.yMax;
        this.prpWeeklyTrendChartData.yAxis[0].interval=prpMonthlyChart.yMax/10;
        this.prpWeeklyTrendChartData.series[0].data=prpMonthlyChart.y[1];
         this.prpWeeklyTrendChartData.series[1].data=prpMonthlyChart.y[0];
    }
    this.prpWeeklyChartData= JSON.parse(JSON.stringify(this.prpWeeklyTrendChartData)); 
    
    if(prpWeeklyChart!=null){
      this.prpWeeklyChartData.title.text=prpWeeklyChart.title;
      this.prpWeeklyChartData.title.subtext=prpWeeklyChart.subTitle;
        this.prpWeeklyChartData.xAxis[0].data=prpWeeklyChart.x;
        this.prpWeeklyChartData.yAxis[0].max=prpWeeklyChart.yMax;
        this.prpWeeklyChartData.yAxis[0].interval=prpWeeklyChart.yMax/10;
        this.prpWeeklyChartData.series[0].data=prpWeeklyChart.y[1];
        this.prpWeeklyChartData.series[1].data=prpWeeklyChart.y[0];
    }

    if(eleWeeklyChart!=null){
      console.log(eleWeeklyChart);
      this.eleWeeklyChartData.title.subtext=eleWeeklyChart.subTitle;
      this.eleWeeklyChartData.legend.data=eleWeeklyChart.yName;
      this.eleWeeklyChartData.xAxis[0].data=eleWeeklyChart.x;
      var i=0;
      var dataList=[];
      for(let seriesData of eleWeeklyChart.y){
        dataList.push(this.createSeries(eleWeeklyChart.yName[i],"bar",seriesData,"s"));
        i++;
      }
      this.eleWeeklyChartData.series=dataList
    }
    if(eleOverviewChart!=null){
      var i=0;
      var dataList=[];
      for(let seriesData of eleWeeklyChart.y){
        dataList.push(this.createPieSeries(eleOverviewChart.x[i], eleOverviewChart.y[0][i]));
        i++;
      }
      this.defectEleOption.series[0].data=dataList;
    }
    if(prpByToolChart!=null){
      var i=0;
      var dataList=[];
      for(let seriesData of prpByToolChart){
        var toolPrpChart= JSON.parse(JSON.stringify(this.prpWeeklyTrendChartData)); 
        toolPrpChart.title.text=seriesData.title;
        toolPrpChart.title.subtext=seriesData.subTitle;
        toolPrpChart.xAxis[0].data=seriesData.x;
        toolPrpChart.yAxis[0].max=seriesData.yMax;
        toolPrpChart.yAxis[0].interval=seriesData.yMax/10;
        toolPrpChart.series[0].data=seriesData.y[1];
        toolPrpChart.series[1].data=seriesData.y[0];
        this.prpToolCharts.push(toolPrpChart);
        i++;
      }
    }
  }
  createPieSeries(name,val){
    var series={
      name: name,
      value: val
    }
    return series;
  }
  createSeries(seriesName,seriesType,dataAry,stack){
    var series={
      name: seriesName,
      type: seriesType,
      stack: stack,
      label: {
        show: true
    },
      emphasis: {
          focus: 'series'
      },
      data: dataAry
    }
    return series;
  }
  createPinCol(fieldName,headerName){
    var o=new Object();
    o["field"]=fieldName;
    o["headerName"]=headerName;
    o["width"]=100;
    o["cellClass"]='ag-header-cell-content';
    o["pinned"]='left';
    return o;
  }  
  createNonPinCol(fieldName,headerName){
    var o=new Object();
    o["field"]=fieldName;
    o["headerName"]=headerName;
    o["width"]=90;
    o["cellClass"]='ag-header-cell-content';
  
    return o;
  } 
  createGroupShowGroupCol(fieldName,headerName){
    var o=new Object();
    o["field"]=fieldName;
    o["headerName"]=headerName;
    o["width"]=120;
    o["cellClass"]='ag-header-cell-content';
    o["columnGroupShow"]='open';
    return o;
  }  
  createDiv(chartDataName){
    return '<div class="col-sm card h-30">'
        +' <div echarts [options]="'+chartDataName+'"  class="demo-chart" style="width: 100%;"></div>'
        +'</div>';
            
  }
  populatePrpDataColumn(){

    
  }
  populatePrpDataRowData(prpData){

    this.prpData=prpData;
  }


  public inspDataColumns=[];
  public inspData=[];
  public prpDataColumns=[];
  public prpData=[];


  public inspDataTabActive:false;
  public prpDataTabActive:false;
  public prpChartTabActive:false;
  public prpChartByToolTabActive:false;
  public rowHeight=30;
  
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
public prpWeeklyChartData: any =   {

}
public prpWeeklyTrendChartData: any =   {
  color: ['#93b7e3', '#FFBF00', '#73c0de', '#FF0087', '#FFBF00'],
  tooltip: {
    trigger: 'axis',
    axisPointer: {
        type: 'shadow'
    }
 },
  title: {
         text: 'PRP 2021Q1',
         subtext:'Overall',
         left: 'center'
     },
 toolbox: {
     feature: {
         dataView: {show: true, readOnly: false},
         saveAsImage: {show: true}
     }
 },
 legend: {
    bottom: '10',
    left: 'center',
     data: ['Wafer Move', 'PRP']
 },
 xAxis: [
     {
         type: 'category',
         data: ['W101', 'W102', 'W103', 'W104', 'W105', 'W106', 'W107', 'W108', 'W109', 'W110', 'W111', 'W112'],
         axisPointer: {
             type: 'shadow'
         }
     }
 ],
 yAxis: [
     {
         type: 'value',
         name: 'Wafer Move(pcs)',
         min: 0,
         max: 2000,
         interval: 200,
         axisLabel: {
             formatter: '{value}'
         }
     },
     {
         type: 'value',
         name: 'PRP(ea)',
         min: 0,
         max: 8,
         interval: 0.5,
         axisLabel: {
             formatter: '{value}'
         }
     }
 ],
 series: [
    
     {
         name: 'Wafer Move',
         type: 'bar',
         label: {
             show: true,
             position: 'inside'
         },
         data: [948, 851, 932, 865, 801, 697, 811,796, 994,1025,1130,956]
     },
     {
         name: 'PRP',
         type: 'line',
         yAxisIndex: 1,
         label: {
             show: true,
             position: 'inside'
         },
         markLine: {
             silent: true,
             lineStyle: {
                 color: 'red'
             },
             data: [{
                 yAxis: 5
             }]
         },
         data: [4.0, 3.2, 4.3, 3.5, 4.3, 3.2, 3.3, 3.4, 3.0, 5.1, 5.3, 4.9]
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
  defectEleOption = {
    title: {
        text: 'EUV Mask Defect Elements',
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
  
eleWeeklyChartData = {
  title: {
    text: 'EUV Mask Defect Elements',
    subtext: 'W101~W112',
    left: 'center'
  },
  tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
  },
  toolbox: {
    feature: {
        dataView: {show: true, readOnly: false},
        saveAsImage: {show: true}
    }
},
  legend: {
    bottom: '3',
    left: 'center',
      data: ['Sn', 'BN', 'Others']
  },
  grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      containLabel: true
  },
  xAxis: [
      {
          type: 'category',
          data: ['W101', 'W102', 'W103', 'W104', 'W105', 'W106', 'W107']
      }
  ],
  yAxis: [
      {
          type: 'value',
          max:100,
          min:0,
          interval:10
      }
  ],
  series: [
     
  ]
};
  inspRowData=[];

  onFirstDataRendered(params) {
    params.api.forEachNode(function (node) {
      node.setExpanded(false);
    });
  }
  onPrpDataGridReady(params) {
    this.prpDataGridApi = params.api;
    this.prpDataGridColumnApi = params.columnApi;
    // this.prpDataColumns = [
    //   { field: 'toolId',headerName:'Tool',width:'120px',cellClass:'ag-header-cell-content'},
    //   { field: 'm101',headerName:'M101' ,sortable: false,width:'240px',cellClass:'ag-header-cell-content',
    //    children:[
    //     { field: 'M101Wm',headerName:'Move' ,sortable: false,width:'90px'},
    //     { field: 'M101Dft',headerName:'1C' ,sortable: false,width:'90px',cellClass:'ag-header-cell-content'},
    //     { field: 'M10110K',headerName:'10K' ,sortable: false,width:'90px',cellClass:'ag-header-cell-content',
    //     cellStyle: params => {
    //       if (params.value >5) {
    //           //mark police cells as red
    //           return {color: 'red'};
    //       }
    //       return null;
    //   }},
    //     { field: 'M101Scan',headerName:'Scan' ,sortable: true,width:'90px',cellClass:'ag-header-cell-content',columnGroupShow: 'open'},
    //     { field: 'M101Hit',headerName:'Hit' ,sortable: true,width:'90px',cellClass:'ag-header-cell-content',columnGroupShow: 'open'},
    //     { field: 'M101HitRate',headerName:'HitRate' ,sortable: true,width:'120px',cellClass:'ag-header-cell-content',columnGroupShow: 'open'}
    //    ]
    //   },
    //   { field: 'm102',headerName:'M102' ,sortable: false,width:'240px',cellClass:'ag-header-cell-content',
    //   children:[
    //    { field: 'm102Wm',headerName:'Move' ,sortable: false,width:'90px'},
    //    { field: 'm102Dft',headerName:'1C' ,sortable: false,width:'90px',cellClass:'ag-header-cell-content'},
    //    { field: 'm102Prp',headerName:'10K' ,sortable: false,width:'90px',cellClass:'ag-header-cell-content',
    //    cellStyle: params => {
    //      if (params.value >5) {
    //          //mark police cells as red
    //          return {color: 'red'};
    //      }
    //      return null;
    //  }},
    //    { field: 'm102Scan',headerName:'Scan' ,sortable: true,width:'90px',cellClass:'ag-header-cell-content',columnGroupShow: 'open'},
    //    { field: 'm102Hit',headerName:'Hit' ,sortable: true,width:'90px',cellClass:'ag-header-cell-content',columnGroupShow: 'open'},
    //    { field: 'm102HitRate',headerName:'HitRate' ,sortable: true,width:'120px',cellClass:'ag-header-cell-content',columnGroupShow: 'open'}
    //   ]
    //  },
    //   { field: 'm103' ,headerName:'M103' ,sortable: true,width:'200px',cellClass:'ag-header-cell-content'},
    //   { field: 'w101',headerName:'W101' ,sortable: true,width:'200px',cellClass:'ag-header-cell-content'},
    //   { field: 'w102',headerName:'W102' ,sortable: true,width:'200px',cellClass:'ag-header-cell-content'},
    //   { field: 'w103' ,headerName:'W104' ,sortable: true,width:'200px',cellClass:'ag-header-cell-content'},
    //   { field: 'w101',headerName:'W105' ,sortable: true,width:'200px',cellClass:'ag-header-cell-content'},
    //   { field: 'w102',headerName:'W106' ,sortable: true,width:'200px',cellClass:'ag-header-cell-content'},
    //   { field: 'w103' ,headerName:'W107' ,sortable: true,width:'200px',cellClass:'ag-header-cell-content'}

    // ];


    // this.prpData = [
    //   { tool: 'APE301', m101Wm: '2000',m101Dft:'1', m101Prp:'5',m101Scan:'32',m101Hit:'4',m101HitRate:'12.%'},
    //   { tool: 'APE302', m101Wm: '4000',m101Dft:'12', m101Prp:'7.5',m101Scan:'60',m101Hit:'3',m101HitRate:'5%'},
    //   { tool: 'APE303', m101Wm: '4000',m101Dft:'7', m101Prp:'6.5',m101Scan:'60',m101Hit:'3',m101HitRate:'5%'},
    //   { tool: 'APE304', m101Wm: '4000',m101Dft:'4', m101Prp:'4.5',m101Scan:'60',m101Hit:'3',m101HitRate:'5%'},
    //   { tool: 'APE305', m101Wm: '5000',m101Dft:'3', m101Prp:'3.5',m101Scan:'60',m101Hit:'3',m101HitRate:'5%'},
    //   { tool: 'APE306', m101Wm: '4000',m101Dft:'11', m101Prp:'11.5',m101Scan:'60',m101Hit:'3',m101HitRate:'5%'},
    //   { tool: 'APE301', m101Wm: '2000',m101Dft:'1', m101Prp:'5',m101Scan:'32',m101Hit:'4',m101HitRate:'12.%'},
    //   { tool: 'APE302', m101Wm: '4000',m101Dft:'12', m101Prp:'7.5',m101Scan:'60',m101Hit:'3',m101HitRate:'5%'},
    //   { tool: 'APE303', m101Wm: '4000',m101Dft:'7', m101Prp:'6.5',m101Scan:'60',m101Hit:'3',m101HitRate:'5%'},
    //   { tool: 'APE304', m101Wm: '4000',m101Dft:'4', m101Prp:'4.5',m101Scan:'60',m101Hit:'3',m101HitRate:'5%'},
    //   { tool: 'APE305', m101Wm: '5000',m101Dft:'3', m101Prp:'3.5',m101Scan:'60',m101Hit:'3',m101HitRate:'5%'},
    //   { tool: 'APE306', m101Wm: '4000',m101Dft:'11', m101Prp:'11.5',m101Scan:'60',m101Hit:'3',m101HitRate:'5%'},
    //   { tool: 'APE301', m101Wm: '2000',m101Dft:'1', m101Prp:'5',m101Scan:'32',m101Hit:'4',m101HitRate:'12.%'},
    //   { tool: 'APE302', m101Wm: '4000',m101Dft:'12', m101Prp:'7.5',m101Scan:'60',m101Hit:'3',m101HitRate:'5%'},
    //   { tool: 'APE303', m101Wm: '4000',m101Dft:'7', m101Prp:'6.5',m101Scan:'60',m101Hit:'3',m101HitRate:'5%'},
    //   { tool: 'APE304', m101Wm: '4000',m101Dft:'4', m101Prp:'4.5',m101Scan:'60',m101Hit:'3',m101HitRate:'5%'},
    //   { tool: 'APE305', m101Wm: '5000',m101Dft:'3', m101Prp:'3.5',m101Scan:'60',m101Hit:'3',m101HitRate:'5%'},
    //   { tool: 'APE306', m101Wm: '4000',m101Dft:'11', m101Prp:'11.5',m101Scan:'60',m101Hit:'3',m101HitRate:'5%'},
    //   { tool: 'APE301', m101Wm: '2000',m101Dft:'1', m101Prp:'5',m101Scan:'32',m101Hit:'4',m101HitRate:'12.%'},
    //   { tool: 'APE302', m101Wm: '4000',m101Dft:'12', m101Prp:'7.5',m101Scan:'60',m101Hit:'3',m101HitRate:'5%'},
    //   { tool: 'APE303', m101Wm: '4000',m101Dft:'7', m101Prp:'6.5',m101Scan:'60',m101Hit:'3',m101HitRate:'5%'},
    //   { tool: 'APE304', m101Wm: '4000',m101Dft:'4', m101Prp:'4.5',m101Scan:'60',m101Hit:'3',m101HitRate:'5%'},
    //   { tool: 'APE305', m101Wm: '5000',m101Dft:'3', m101Prp:'3.5',m101Scan:'60',m101Hit:'3',m101HitRate:'5%'},
    //   { tool: 'APE306', m101Wm: '4000',m101Dft:'11', m101Prp:'11.5',m101Scan:'60',m101Hit:'3',m101HitRate:'5%'},
    //   { stage: 'BNYTA7', product: 'UXGG00',layer:'231', availivability:'0',availCnt:0,unavailCnt:4},
    //   { stage: 'NFSRR1', product: 'SFEAB1',layer:'235', availivability:'0',availCnt:0,unavailCnt:2},
    //   { stage: 'JFEAE7', product: 'UXGG04',layer:'330', availivability:'20',availCnt:1,unavailCnt:4},
    //   { stage: 'GRAGH5', product: 'LRASD2',layer:'790', availivability:'20',availCnt:1,unavailCnt:4},
    //   { stage: 'NPGE05', product: 'EABA04',layer:'330', availivability:'20',availCnt:1,unavailCnt:4},
    //   { stage: 'HTSAE5', product: 'EAGG04',layer:'260', availivability:'20',availCnt:1,unavailCnt:4},
    //   { stage: 'FEAHY1', product: 'BDEQW1',layer:'130', availivability:'25',availCnt:1,unavailCnt:3},
    //   { stage: 'FEHTE1', product: 'BDEQW1',layer:'130', availivability:'25',availCnt:1,unavailCnt:3},
    //   { stage: 'NDSHT2', product: 'BDEQW1',layer:'130', availivability:'25',availCnt:1,unavailCnt:3},
    // ]; 

  }


  onInspDataGridReady(params) {
    this.inspDataGridApi = params.api;
    this.inspDataGridColumnApi = params.columnApi;

    this.inspDataColumns = [
      { field: 'monthNo',headerName:'Month',sortable: true ,width:100,cellClass:'ag-header-cell-content',pinned:'left', cellStyle: {'text-align': 'center'}},
      { field: 'weekNo',headerName:'Week' ,sortable: true,width:100,cellClass:'ag-header-cell-content',pinned:'left', cellStyle: {'text-align': 'center'}},
      { field: 'maskId',headerName:'Mask' ,sortable: true,width:160,cellClass:'ag-header-cell-content',pinned:'left', cellStyle: {'text-align': 'center'}},

      { field: '',headerName:'Mask Inspection' ,sortable: true,width:180,cellClass:'ag-header-cell-content',
      children:[
        { field: 'inspDt' ,headerName:'Insp. Date' ,sortable: true,width:'150px',cellClass:'ag-header-cell-content',pinned:'left'},
        { field: 'lastInspDt',headerName:'Last Insp. Date' ,sortable: true,width:'150px',cellClass:'ag-header-cell-content',pinned:'left'},
        { field: 'inspTool',headerName:'Tool' ,sortable: true,width:'130px',cellClass:'ag-header-cell-content',pinned:'left'}
      ]},
      { field: 'Defect',headerName:'Defects' ,sortable: true,width:'120px',cellClass:'ag-header-cell-content',
      children:[
        { field: 'dft1c',headerName:'1C' ,sortable: true,width:'100px', cellStyle: {'text-align': 'center'} },
        { field: 'dft2c' ,headerName:'2C' ,sortable: true,width:'100px',cellClass:'grid-cell-centered-text'}
      ]},
      { field: '',headerName:'Elements' ,sortable: true,width:'140px',cellClass:'ag-header-cell-content',
      children:[
        { field: 'eleEdx',headerName:'Edx' ,sortable: true,width:'100px',cellClass:'ag-header-cell-content'},
        { field: 'elePredict' ,headerName:'Predict' ,sortable: true,width:'100px',cellClass:'ag-header-cell-content'}
      ]},
      { field: 'largeTool',headerName:'EUV Tool' ,sortable: true,width:'140px',cellClass:'ag-header-cell-content'},
      { field: 'prpDft',headerName:'PRP Defect' ,sortable: true,width:'140px',cellClass:'ag-header-cell-content'},
      { field: '',headerName:'Wafer Move' ,sortable: false,width:'140px',cellClass:'ag-header-cell-content',
      children:[
        { field: 'APE301',headerName:'A301' ,sortable: true,width:'100px',cellClass:'ag-header-cell-content'},
        { field: 'APE302' ,headerName:'A302' ,sortable: true,width:'100px',cellClass:'ag-header-cell-content'}
      ]},
    ];
    // this.inspData = [
    // { yearNo: 'NPGE01', monthNo:'M101',weekNo: 'W101',maskId:'CA456CX-985-A',inspTool:'AGG001', inspDt:'03/05 17:15',lastInspDt:'03/04 16:00',wm:'210',dft1c:'1',dft2c:'2',largeTool:'KCA001', prpDft:'Y'},
    // { yearNo: 'NPGE01', monthNo:'M101',weekNo: 'W101',maskId:'CA185EA-985-A',inspTool:'AGG002', inspDt:'03/05 19:30',lastInspDt:'03/04 19:29',wm:'194',dft1c:'0',dft2c:'0',largeTool:'KCA004', prpDft:'N'},
    // { yearNo: 'NPGE01', monthNo:'M101',weekNo: 'W101',maskId:'GE95015-285-A',inspTool:'AGG003', inspDt:'03/05 20:10',lastInspDt:'03/04 18:40',wm:'224',dft1c:'2',dft2c:'0',largeTool:'KCA003', prpDft:'N'},
    // { yearNo: 'NPGE01', monthNo:'M101',weekNo: 'W101',maskId:'GE95015-285-A',inspTool:'AGG004', inspDt:'03/05 20:10',lastInspDt:'03/04 18:40',wm:'224',dft1c:'2',dft2c:'0',largeTool:'KCA003', prpDft:'N'},
    // { yearNo: 'NPGE01', monthNo:'M101',weekNo: 'W101',maskId:'GE95015-285-A',inspTool:'AGG004', inspDt:'03/05 20:10',lastInspDt:'03/04 18:40',wm:'224',dft1c:'2',dft2c:'0',largeTool:'KCA003', prpDft:'N'},
    // { yearNo: 'NPGE01', monthNo:'M101',weekNo: 'W101',maskId:'GE95015-285-A',inspTool:'AGG004', inspDt:'03/05 20:10',lastInspDt:'03/04 18:40',wm:'224',dft1c:'2',dft2c:'0',largeTool:'KCA003', prpDft:'N'},
    // { yearNo: 'NPGE01', monthNo:'M101',weekNo: 'W101',maskId:'GE95015-285-A',inspTool:'AGG004', inspDt:'03/05 20:10',lastInspDt:'03/04 18:40',wm:'224',dft1c:'2',dft2c:'0',largeTool:'KCA003', prpDft:'N'},
    // { yearNo: 'NPGE01', monthNo:'M101',weekNo: 'W101',maskId:'GE95015-285-A',inspTool:'AGG004', inspDt:'03/05 20:10',lastInspDt:'03/04 18:40',wm:'224',dft1c:'2',dft2c:'0',largeTool:'KCA003', prpDft:'N'},
    // { yearNo: 'NPGE01', monthNo:'M101',weekNo: 'W101',maskId:'GE95015-285-A',inspTool:'AGG004', inspDt:'03/05 20:10',lastInspDt:'03/04 18:40',wm:'224',dft1c:'2',dft2c:'0',largeTool:'KCA003', prpDft:'N'},
    // { yearNo: 'NPGE01', monthNo:'M101',weekNo: 'W101',maskId:'GE95015-285-A',inspTool:'AGG004', inspDt:'03/05 20:10',lastInspDt:'03/04 18:40',wm:'224',dft1c:'2',dft2c:'0',largeTool:'KCA003', prpDft:'N'},
    // { yearNo: 'NPGE01', monthNo:'M101',weekNo: 'W101',maskId:'GE95015-285-A',inspTool:'AGG004', inspDt:'03/05 20:10',lastInspDt:'03/04 18:40',wm:'224',dft1c:'2',dft2c:'0',largeTool:'KCA003', prpDft:'N'},
    // { yearNo: 'NPGE01', monthNo:'M101',weekNo: 'W101',maskId:'GE95015-285-A',inspTool:'AGG004', inspDt:'03/05 20:10',lastInspDt:'03/04 18:40',wm:'224',dft1c:'2',dft2c:'0',largeTool:'KCA003', prpDft:'N'},
    // { yearNo: 'NPGE01', monthNo:'M101',weekNo: 'W101',maskId:'GE95015-285-A',inspTool:'AGG004', inspDt:'03/05 20:10',lastInspDt:'03/04 18:40',wm:'224',dft1c:'2',dft2c:'0',largeTool:'KCA003', prpDft:'N'},
    // { yearNo: 'NPGE01', monthNo:'M101',weekNo: 'W101',maskId:'GE95015-285-A',inspTool:'AGG004', inspDt:'03/05 20:10',lastInspDt:'03/04 18:40',wm:'224',dft1c:'2',dft2c:'0',largeTool:'KCA003', prpDft:'N'},
    // { yearNo: 'NPGE01', monthNo:'M101',weekNo: 'W101',maskId:'GE95015-285-A',inspTool:'AGG004', inspDt:'03/05 20:10',lastInspDt:'03/04 18:40',wm:'224',dft1c:'2',dft2c:'0',largeTool:'KCA003', prpDft:'N'},
    // { yearNo: 'NPGE01', monthNo:'M101',weekNo: 'W101',maskId:'GE95015-285-A',inspTool:'AGG004', inspDt:'03/05 20:10',lastInspDt:'03/04 18:40',wm:'224',dft1c:'2',dft2c:'0',largeTool:'KCA003', prpDft:'N'},
    // { yearNo: 'NPGE01', monthNo:'M101',weekNo: 'W101',maskId:'GE95015-285-A',inspTool:'AGG004', inspDt:'03/05 20:10',lastInspDt:'03/04 18:40',wm:'224',dft1c:'2',dft2c:'0',largeTool:'KCA003', prpDft:'N'},
    // { yearNo: 'NPGE01', monthNo:'M101',weekNo: 'W101',maskId:'GE95015-285-A',inspTool:'AGG004', inspDt:'03/05 20:10',lastInspDt:'03/04 18:40',wm:'224',dft1c:'2',dft2c:'0',largeTool:'KCA003', prpDft:'N'},
    // { yearNo: 'NPGE01', monthNo:'M101',weekNo: 'W101',maskId:'GE95015-285-A',inspTool:'AGG004', inspDt:'03/05 20:10',lastInspDt:'03/04 18:40',wm:'224',dft1c:'2',dft2c:'0',largeTool:'KCA003', prpDft:'N'},
    // { yearNo: 'NPGE01', monthNo:'M101',weekNo: 'W101',maskId:'GE95015-285-A',inspTool:'AGG004', inspDt:'03/05 20:10',lastInspDt:'03/04 18:40',wm:'224',dft1c:'2',dft2c:'0',largeTool:'KCA003', prpDft:'N'},
    // { yearNo: 'NPGE01', monthNo:'M101',weekNo: 'W101',maskId:'GE95015-285-A',inspTool:'AGG004', inspDt:'03/05 20:10',lastInspDt:'03/04 18:40',wm:'224',dft1c:'2',dft2c:'0',largeTool:'KCA003', prpDft:'N'},
    // { yearNo: 'NPGE01', monthNo:'M101',weekNo: 'W101',maskId:'GE95015-285-A',inspTool:'AGG004', inspDt:'03/05 20:10',lastInspDt:'03/04 18:40',wm:'224',dft1c:'2',dft2c:'0',largeTool:'KCA003', prpDft:'N'},
    // { yearNo: 'NPGE01', monthNo:'M101',weekNo: 'W101',maskId:'GE95015-285-A',inspTool:'AGG004', inspDt:'03/05 20:10',lastInspDt:'03/04 18:40',wm:'224',dft1c:'2',dft2c:'0',largeTool:'KCA003', prpDft:'N'},
    // { yearNo: 'NPGE01', monthNo:'M101',weekNo: 'W101',maskId:'GE95015-285-A',inspTool:'AGG004', inspDt:'03/05 20:10',lastInspDt:'03/04 18:40',wm:'224',dft1c:'2',dft2c:'0',largeTool:'KCA003', prpDft:'N'},
    // { yearNo: 'NPGE01', monthNo:'M101',weekNo: 'W101',maskId:'GE95015-285-A',inspTool:'AGG004', inspDt:'03/05 20:10',lastInspDt:'03/04 18:40',wm:'224',dft1c:'2',dft2c:'0',largeTool:'KCA003', prpDft:'N'},
    // { yearNo: 'NPGE01', monthNo:'M101',weekNo: 'W101',maskId:'GE95015-285-A',inspTool:'AGG004', inspDt:'03/05 20:10',lastInspDt:'03/04 18:40',wm:'224',dft1c:'2',dft2c:'0',largeTool:'KCA003', prpDft:'N'},
    // { yearNo: 'NPGE01', monthNo:'M101',weekNo: 'W101',maskId:'GE95015-285-A',inspTool:'AGG004', inspDt:'03/05 20:10',lastInspDt:'03/04 18:40',wm:'224',dft1c:'2',dft2c:'0',largeTool:'KCA003', prpDft:'N'},
    // { yearNo: 'NPGE01', monthNo:'M101',weekNo: 'W101',maskId:'GE95015-285-A',inspTool:'AGG004', inspDt:'03/05 20:10',lastInspDt:'03/04 18:40',wm:'224',dft1c:'2',dft2c:'0',largeTool:'KCA003', prpDft:'N'},
    // { yearNo: 'NPGE01', monthNo:'M101',weekNo: 'W101',maskId:'GE95015-285-A',inspTool:'AGG004', inspDt:'03/05 20:10',lastInspDt:'03/04 18:40',wm:'224',dft1c:'2',dft2c:'0',largeTool:'KCA003', prpDft:'N'},
   
    // ]; 
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
