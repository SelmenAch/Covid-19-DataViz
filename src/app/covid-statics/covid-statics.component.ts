import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Chart} from 'chartjs';
@Component({
  selector: 'app-covid-statics',
  templateUrl: './covid-statics.component.html',
  styleUrls: ['./covid-statics.component.css']
})
export class CovidStaticsComponent {
  country;
  response  ;
  response1 ;
  response2 ;
    constructor(http:HttpClient , route : ActivatedRoute) { 
      route.paramMap.subscribe(params => {
        this.country = params.get('country');
     })
     http.get('https://api.covid19api.com/total/country/' + this.country).subscribe((result) =>{
       this.response = result;
     })
     http.get('https://api.covid19api.com/summary').subscribe((result)=>{
        this.response2 = result
        this.response2.Countries.forEach(element => {
          if (element.CountryCode === this.country){
            this.response1 = element ;
          }
          
        });
     })
     setTimeout( ()=> {
      this.response.forEach(info => {
      this.barChartLabels.push(info.Date.slice(0,10))
      this.barChartData[0].data.push(info.Deaths);
      this.barChartData[1].data.push(info.Confirmed);
      })}, 1000)}
    public barChartOptions:any = {
      scaleShowVerticalLines: false,
      responsive: true
    };
    public barChartLabels:string[] = []
    public barChartType:string = 'line';
    public barChartLegend:boolean = true;
   
    public barChartData:any[] = [
      {data: [], label: 'death'},
      {data:[],label:'Confirmed'}
    ];
  }
