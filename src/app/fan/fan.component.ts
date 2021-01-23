import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { timer } from 'rxjs';


@Component({
  selector: 'app-fan',
  templateUrl: './fan.component.html',
  styleUrls: ['./fan.component.css']
})
export class FanComponent implements OnInit {
  aaa: number;
  constructor(private route: Router, private httpclient: HttpClient) { }

  ngOnInit(): void {
    // console.log('123');
    timer(2000, 2000).subscribe(() => {
      this.httpclient.get('http://192.168.43.186:3000/fan').subscribe((value: any) => {
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
  back() {
    this.route.navigateByUrl("/dao/aliproinfo")
  }

}
