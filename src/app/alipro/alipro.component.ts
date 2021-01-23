import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alipro, Alipro2, Alipro3 } from './alipro';
@Component({
  selector: 'app-alipro',
  templateUrl: './alipro.component.html',
  styleUrls: ['./alipro.component.css']
})
export class AliproComponent implements OnInit {
  myForm: FormGroup;
  myForm2: FormGroup;
  id: AbstractControl;
  ProductName: AbstractControl;
  Nickname: AbstractControl;
  DeviceName: AbstractControl;
  ProductKey: AbstractControl;
  alipros$: Observable<Alipro>;
  alipros2$ = new Alipro2;
  alipros3$: Observable<Alipro3>;
  baseUrl = 'http://192.168.43.186:3000/';
  currentPro: Alipro;
  pro: number;
  constructor(private fb: FormBuilder, private httpClient: HttpClient, private fb2: FormBuilder) {
    this.myForm = this.fb.group({
      'GmtCreate': [''],
      'NodeType': [''],
      'DataFormat': [''],
      'AuthType': [''],
      'ProductName': [''],
      'ProductKey': [''],
      'DeviceCount': [''],
    });
    this.myForm2 = this.fb.group({
      'Nickname': [''],
      'DeviceName': ['']
    });

    // this.id = this.myForm.controls['id'];
    this.ProductName = this.myForm.controls['ProductName'];
    this.ProductKey = this.myForm.controls['ProductKey'];
    this.Nickname = this.myForm2.controls['Nickname'];
    this.DeviceName = this.myForm2.controls['DeviceName'];
  }

  ngOnInit() {
    this.alipros$ = <Observable<Alipro>>this.httpClient.get(this.baseUrl + 'alis');
    // this.alipros2$ = null;
    console.log(this.alipros2$);
  }

  search() {
    this.pro = 0;
    const params = new HttpParams()
      .set('ProductName', this.ProductName.value)
      .set('ProductKey', this.ProductKey.value)
    console.log(this.ProductKey.value)
    console.log(params)
    if (this.ProductKey.value) {
      var obser = this.httpClient.get(this.baseUrl + 'alis/' + params);
      obser.forEach((val: any) => {
        this.alipros2$.CategoryKey = val.CategoryKey;
        this.alipros2$.CategoryName = val.CategoryName;
        this.alipros2$.ProductKey = val.ProductKey;
        this.alipros2$.ProductName = val.ProductName;
      })

      console.log(this.alipros2$)
    } else {
      this.alipros$ = <Observable<Alipro>>this.httpClient.get(this.baseUrl + 'alis');
    }
  }

  add() {
    // console.log(this.myForm.value);
    this.httpClient.post(this.baseUrl + 'aliadd', this.myForm.value).subscribe(
      (val: any) => {
        if (val.succ) {
          alert('添加成功!');
          this.alipros$ = <Observable<Alipro>>this.httpClient.get(this.baseUrl + 'alis');
        }
        else if (val.false){
          alert("支持中文、英文字母、日文、数字、和特殊字符_-@()，长度限制 4~30个字符，中文及日文算 2 个字符")
        }
      })

  }

  delete() {
    const params = new HttpParams()
      .set('ProductName', this.currentPro.ProductName)
      .set('ProductKey', this.currentPro.ProductKey)
    console.log(params)
    if (!this.currentPro) {
      alert('必须选择用户！');
    }
    else {
      this.httpClient.delete(this.baseUrl + 'alidel/' + params).subscribe(
        (val: any) => {
          if (val.succ) {
            alert('删除成功！');
            this.alipros$ = <Observable<Alipro>>this.httpClient.get(this.baseUrl + 'alis');
            this.alipros2$
          }
        }
      )
      console.log(this.currentPro.ProductName)
    }
  }
  update() {
    var mymessage = confirm("请确保密钥未被修改");
    if (mymessage == false) {
      mymessage = confirm("请确保密钥未被修改");
    }
    else if (!this.currentPro) {
      alert('必须选择用户！');
    }
    else {
      this.httpClient.put(this.baseUrl + 'aliup', this.myForm.value).subscribe(
        (val: any) => {
          if (val.succ) {
            alert('修改成功！');
            this.alipros$ = <Observable<Alipro>>this.httpClient.get(this.baseUrl + 'alis');
          }
        }
      )
    }

  }

  deviceSearch() {
    this.pro = 1;
    const params = new HttpParams()
      .set('ProductKey', this.ProductKey.value)
    if (this.ProductKey.value) {
      this.alipros3$ = <Observable<Alipro3>>this.httpClient.get(this.baseUrl + 'devices/' + params);
    } else {
      this.pro = 2;
    }
  }

  deviceAdd() {
    const params = {
      Nickname: this.Nickname.value,
      ProductKey: this.ProductKey.value,
      DeviceName: this.DeviceName.value,
    }
    console.log(params)
    // console.log(this.myForm.value);
    this.httpClient.post(this.baseUrl + 'deviceadd', params).subscribe(
      (val: any) => {
        if (val.succ) {
          alert('添加成功!');
          this.alipros$ = <Observable<Alipro>>this.httpClient.get(this.baseUrl + 'alis');
        }
      })
  }

  deviceDelete() {
    const params = {
      DeviceName: this.DeviceName.value,
      ProductKey: this.ProductKey.value,
    }
    console.log(params)
    this.httpClient.post(this.baseUrl + 'devdel', params).subscribe(
      (val: any) => {
        if (val.succ) {
          alert('删除成功！');
        }
      }
    )
  }
  deviceUpdate() {
    const params = {
      DeviceName: this.DeviceName.value,
      ProductKey: this.ProductKey.value,
      Nickname: this.Nickname.value,
    }
    console.log(params)
    this.httpClient.post(this.baseUrl + 'devup', params).subscribe(
      (val: any) => {
        if (val.succ) {
          alert('更新成功！');
        }
      }
    )

  }

  select(p: Alipro) {
    this.currentPro = p;
    this.myForm.setValue(this.currentPro);
  }
}
