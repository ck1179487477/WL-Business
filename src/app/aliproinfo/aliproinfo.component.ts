import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-aliproinfo',
  templateUrl: './aliproinfo.component.html',
  styleUrls: ['./aliproinfo.component.css']
})
export class AliproinfoComponent implements OnInit {

  constructor(private route: Router, private httpclient: HttpClient) { }
  light() {
    this.route.navigateByUrl('/light')
  }
  fan() {
    this.route.navigateByUrl('/fan')
  }
  ac() {
    this.route.navigateByUrl('/ac')
  }
  co() {
    this.route.navigateByUrl('/co')
  }

  ngOnInit(): void {
  }

}
