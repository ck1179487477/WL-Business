import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { timer, Observable } from 'rxjs';
import { Car, Bbb } from '../dp/car';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'dp-root',
  templateUrl: './dp.component.html',
  styleUrls: ['./dp.component.css']
})
export class DpComponent implements OnInit {
  aaa: number;
  bbb: number;
  ccc: number;
  ddd: number;

  statusCards: string;
  user: '1111';
  //line:
  chartOptionline: any;
  updateOptionline: any;
  //pie:
  chartOptionpie: any;
  updateOptionpie: any;
  //bar
  chartOptionbar: any;
  updateOptionbar: any;
  car$ = new Car;
  aaa$ = new Bbb;
  bbb$ = new Bbb;
  ccc$ = new Bbb;
  ddd$ = new Bbb;
  led$ = null;
  public cos = [];
  public xAxis = [];
  public xAxisData = [];
  public data1 = [];
  public data2 = [];

  constructor(private httpclient: HttpClient, private router: Router) {

    //line
    this.chartOptionline = {
      title: {
        text: 'co浓度'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['co']
      },
      toolbox: {
        feature: {
          savaAsImage: {

          }
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          bounderGap: false,
          date: []
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'co',
          type: 'line',
          stack: '%',
          // areaStyle:{normal:{}},
          smooth: true,
          data: []
        }

      ],
    };
    this.updateOptionline = {};
    //pie
    this.chartOptionpie = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      series: [
        {
          name: '设备名',
          type: 'pie',
          radius: ['20%', '44%'],
          center: ['50%', '40%'],
          data: [],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ],
    };
    this.updateOptionpie = {};
    //bar
    this.chartOptionbar = {
      //   title: {
      //     text: '柱状图动画延迟'
      // },
      toolbox: {
        // y: 'bottom',
        feature: {
          magicType: {
            type: ['stack', 'tiled']
          },
          dataView: {},
          saveAsImage: {
            pixelRatio: 2
          }
        }
      },
      tooltip: {},
      xAxis: {
        data: this.xAxisData,
        splitLine: {
          show: false
        }
      },
      yAxis: {
        name: '柱状图动画延迟',
      },
      series: [{
        name: 'bar',
        type: 'bar',
        data: this.data1,
      }, {
        name: 'bar2',
        type: 'bar',
        data: this.data2,
      }],
    };
    this.updateOptionbar = {};
  }

  ngOnInit(): void {
    // console.log("Enter dp ngOnInit ....");
    ///////////////////////灯1/////////////////////
    timer(2000000, 2000000).subscribe(() => {
      this.httpclient.get('http://192.168.43.186:3000/light').subscribe((value: any) => {
        // console.log(value[0].value)
        if (value[0].value == 1) {
          this.aaa = 1
          this.aaa$.num = "ON";
          // console.log(this.aaa)
        } else {
          this.aaa = 0
          this.aaa$.num = "OFF";
          // console.log(this.aaa)
        }
      })
    });
    ///////////////////////灯2/////////////////////
    timer(2000, 2000).subscribe(() => {
      this.httpclient.get('http://192.168.43.186:3000/light2').subscribe((value: any) => {
        // console.log(value[0].value)
        if (value[0].value == 1) {
          this.bbb = 1
          this.bbb$.num = "ON";
          // console.log(this.bbb)
        } else {
          this.bbb = 0
          this.bbb$.num = "OFF";
          // console.log(this.bbb)
        }
      })
    });
    ///////////////////////灯3/////////////////////
    timer(2000, 2000).subscribe(() => {
      this.httpclient.get('http://192.168.43.186:3000/light3').subscribe((value: any) => {
        console.log(value[0].value)
        if (value[0].value == 1) {
          this.ccc = 1
          this.ccc$.num = "ON";
          console.log(this.aaa)
        } else {
          this.ccc = 0
          this.ccc$.num = "OFF";
          console.log(this.aaa)
        }
      })
    });
    ///////////////////////风扇/////////////////////
    timer(2000, 2000).subscribe(() => {
      this.httpclient.get('http://192.168.43.186:3000/fan').subscribe((value: any) => {
        console.log(value[0].value)
        if (value[0].value == 1) {
          this.ddd = 1
          this.ddd$.num = "ON";
          console.log(this.ddd)
        } else {
          this.ddd = 0
          this.ddd$.num = "OFF";
          console.log(this.ddd)
        }
      })
    });


    for (var i = 0; i < 100; i++) {
      this.xAxisData.push('类目' + i);
      this.data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
      this.data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
    };
    timer(2000, 2000).subscribe(() => {
      // console.log('取车数量');
      var nume = this.httpclient.get('http://192.168.43.186:3000/cw');
      // console.log('resp:'+nume);
      nume.forEach((val: any) => {
        // console.log(val);
        this.car$.num = val[0].value;
      })
      // console.log(this.car$.num);
    });
    // console.log('123');
    //加载pie的数据
    this.httpclient.get('http://192.168.43.186:3000/pieData').subscribe((value: any) => {
      if (value && value.data && value.data.length) {
        // console.log("设备数量" + value.data);
        this.chartOptionpie = {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          series: [
            {
              name: '设备名',
              type: 'pie',
              radius: ['20%', '44%'],
              center: ['50%', '40%'],
              data: value.data,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ],
        }
        // console.log(this.chartOption.series[2].data)
        /*for (let i = value.data.length - 1; i >= 0; i--) {
          console.log(value.data[i]);
        }*/
      }
    });

    this.router.events.subscribe(
      (evt: any) => {
        if (evt instanceof NavigationEnd) {
          if (evt.url === '/dao/dp') {
            const d = this.chartOptionpie.series[0].data;
            // this.updateOptionpie = d;
            //this.chartOptionpie.series[0].data = [];
            //this.chartOptionpie.series[0].data = d;
            this.updateOptionpie = {
              series: [{
                data: d
              }]
            }
          }
        }
      }
    )

    //加载line的数据
    timer(2000, 2000).subscribe(() => {

      this.httpclient.get('http://192.168.43.186:3000/ws/1000').subscribe((value: any) => {
        if (value && value.data && value.data.length) {
          let i = value.data.length - 1;
          for (let item of value.data) {
            const d = new Date(Number(item.time));
            this.xAxis[i] = d.getHours() > 9 ? d.getHours() : '0' + d.getHours();
            this.xAxis[i] += ":" + (d.getMinutes() > 9 ? d.getMinutes() : 0 + d.getMinutes());
            this.xAxis[i] += ":" + (d.getSeconds() > 9 ? d.getSeconds() : 0 + d.getSeconds());
            this.cos[i] = (item.co);
            i--;
          }
          this.updateOptionline = {
            xAxis: [
              {
                data: this.xAxis
              }
            ],
            series: [
              {
                data: this.cos
              }
            ]
          }
        }
      })
    });
  }

}
