// Author: T4professor

import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';
@Component({
  selector: 'app-linechart-cell-renderer',
  template: `
      
      <div style="width:800px ;height: 250px" echarts [options]="pellicleRuptureTop10" ></div>
    
    `
})

export class LinechartCellRendererComponent implements ICellRendererAngularComp {

  params;
  label: string;
  chartOption:any;
  public pellicleRuptureTop10: any =   {
    color: ['#73c0de', '#f3a43b', '#73c0de', '#FF0087', '#FFBF00'],
    tooltip: {
        trigger: 'axis',
        
    },
     title: {
            text: 'TOP 10 EUV Pellicle EOP Drift(%)',
            subtext:'',
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
       data: ['Wafer Move', 'EOP Drift']
    },
    xAxis: [
        {
            type: 'category',
            data: ['TMPL18-816A-5', 'TMKC19-760B-5', 'TMIG44-710B-5', 'TMLX31-120A-4', 'TMVB66-126B-2', 'TMRR99-996A-4', 'TMRR88-881B-4', 'TMRR39-450B-2', 'TMCA56-900B-2', 'TMEF85-552A-2'],
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
            max: 1400,
            interval: 200,
            axisLabel: {
                formatter: '{value}'
            }
        },
        {
            type: 'value',
            name: 'EOP Drift(%)',
            min: 0,
            max: 12,
            interval: 1,
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
            data: [948, 851,  801, 697, 811,796, 994,685,569,506]
        },
        {
            name: 'EOP Drift',
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
                    yAxis: 8
                }]
            },
            data: [9.0,8.3, 8.3, 8.2, 7.6, 7.3, 6.2, 6.0, 5.3, 5.1, 4.8, 4.7]
        }
    ]
   };
  agInit(params): void {
    this.params = params;
    this.label = this.params.label || null;
  }

  refresh(params?: any): boolean {
    return true;
  }

  onClick($event) {
    if (this.params.onClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data
        // ...something
      }
      this.params.onClick(params);

    }
  }
}