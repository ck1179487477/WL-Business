import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-light',
  templateUrl: './light.component.html',
  styleUrls: ['./light.component.css']
})
export class LightComponent implements OnInit {
  aaa: number;

  constructor(private route: Router, private httpclient: HttpClient) { }

  ngOnInit(): void {
    timer(2000, 2000).subscribe(() => {
      this.httpclient.get('http://192.168.43.186:3000/light1').subscribe((value: any) => {
        // console.log(value[0].value)
        if (value[0].value == 1) {
          this.aaa = 1
          // console.log(this.aaa)
        } else {
          this.aaa = 0
          // console.log(this.aaa)
        }
      })
    });
  };
  turnOn() {
    const obj = {
      status: 1
    };
    this.httpclient.put('http://192.168.43.186:3000/alisetlight', obj).subscribe((val: any) => {
      if (val.succ) {
        alert('开灯');
      }
    })
    console.log("ok");

  }

  turnOff() {
    const obj = {
      status: 0
    };
    this.httpclient.put('http://192.168.43.186:3000/alisetlight', obj).subscribe((val: any) => {
      if (val.succ) {
        alert('关灯');
      }
    })
    console.log("ok");
  }
  back() {
    this.route.navigateByUrl("/dao/aliproinfo")
  }

}
