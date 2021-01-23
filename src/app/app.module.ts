import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AliproComponent } from './alipro/alipro.component'
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DaoComponent } from './dao/dao.component';
import { AliproinfoComponent } from './aliproinfo/aliproinfo.component';
import { LightComponent } from './light/light.component';
import { FanComponent } from './fan/fan.component';
import { AcComponent } from './ac/ac.component';
import { CoComponent } from './co/co.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { DpComponent } from './dp/dp.component';

const mgtChildrenRoutes: Routes = [
  { path: 'alipro', component: AliproComponent },
  { path: 'dp', component: DpComponent },
  { path: '', redirectTo: 'dp', pathMatch: 'full' },
  { path: 'aliproinfo', component: AliproinfoComponent },
  { path: 'light', component: LightComponent },
  { path: 'fan', component: FanComponent },
  { path: 'ac', component: AcComponent },
  { path: 'co', component: CoComponent },
];



const routes: Routes = [
  { path: '', redirectTo: 'dao', pathMatch: 'full' },
  {
    path: 'dao',
    component: DaoComponent,
    children: mgtChildrenRoutes,
  },
  { path: 'alipro', component: AliproComponent },
  { path: 'aliproinfo', component: AliproinfoComponent },
  { path: 'light', component: LightComponent },
  { path: 'fan', component: FanComponent },
  { path: 'ac', component: AcComponent },
  { path: 'co', component: CoComponent },
  { path: 'dp', component: DpComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    AliproComponent,
    DaoComponent,
    AliproinfoComponent,
    LightComponent,
    FanComponent,
    AcComponent,
    CoComponent,
    DpComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'), // or import('./path-to-my-custom-echarts')
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
