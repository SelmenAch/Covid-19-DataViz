import { HttpClient } from '@angular/common/http';
import { Component, OnInit, NgZone} from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4charts from "@amcharts/amcharts4/charts";

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  response ;
  response1 ;
  chart ;
  public barChartLabels:string[] = ['12/04/2020','13/04/2020','15/4/2020', '16/4/2020', '17/4/2020', '18/4/2020', '19/4/2020', '20/4/2020', '21/4/2020', '22/4/2020', '23/4/2020', '24/4/2020', '25/4/2020', '26/4/2020', '27/4/2020', '28/4/2020', '29/4/2020', '30/4/2020', '1/5/2020', '2/5/2020', '3/5/2020', '4/5/2020', '5/5/2020', '6/5/2020', '7/5/2020', '8/5/2020', '9/5/2020', '10/5/2020', '11/5/2020', '12/5/2020', '13/5/2020', '14/5/2020', '15/5/2020', '16/5/2020', '17/5/2020', '18/5/2020', '19/5/2020', '20/5/2020', '21/5/2020', '22/5/2020', '23/5/2020', '24/5/2020', '25/5/2020', '26/5/2020', '27/5/2020', '28/5/2020', '29/5/2020', '30/5/2020', '31/5/2020', '1/6/2020', '2/6/2020', '3/6/2020', '4/6/2020', '5/6/2020', '6/6/2020', '7/6/2020', '8/6/2020', '9/6/2020', '10/6/2020', '11/6/2020', '12/6/2020', '13/6/2020', '14/6/2020', '15/6/2020', '16/6/2020', '17/6/2020', '18/6/2020', '19/6/2020', '20/6/2020', '21/6/2020', '22/6/2020', '23/6/2020', '24/6/2020', '25/6/2020', '26/6/2020', '27/6/2020', '28/6/2020', '29/6/2020', '30/6/2020', '1/7/2020', '2/7/2020', '3/7/2020', '4/7/2020', '5/7/2020', '6/7/2020', '7/7/2020', '8/7/2020', '9/7/2020', '10/7/2020', '11/7/2020', '12/7/2020', '13/7/2020', '14/7/2020', '15/7/2020'];
  public barChartType:string = 'line';
  public barChartLegend:boolean = true;
 
  public barChartData:any[] = [
    {data:[],label:'Confirmed'}
  ];
  public barChartData1:any[] = [
    {data:[],label:'Deaths'}
  ]
  constructor(private zone : NgZone, private http: HttpClient){
    http.get("https://api.covid19api.com/summary").subscribe(result  =>{
      this.response = result ;
    })
    http.get("https://api.covid19api.com/world").subscribe(result =>{
      this.response1 = result ;
    })
    let array = [];
    const array1 = [] ;
    setTimeout(()=>{
          this.response1.forEach(element => {
            array1.push(element.TotalDeaths);
            array.push(element.TotalConfirmed);
          });
          array.sort(function(a, b){return a-b});
          array1.sort(function(a, b){return a-b});
          this.barChartData[0].data = array ;
          this.barChartData1[0].data = array1 ;
    },1000);
    console.log(array);

  }
  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      // Pie chart
      let chart = am4core.create("chartdiv2", am4charts.PieChart); 
      chart.data = [];
      // I'll put the data here 
      this.response.Countries.forEach(element => {
        if (element.TotalDeaths > 10000){
          let object = {
            "Deaths":element.TotalDeaths,
            "country": element.Country
          }
          chart.data.push(object);
      }});
      console.log(chart.data.length);
      let pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = "Deaths";
      pieSeries.dataFields.category = "country";
      this.chart = chart ;
    }
      )
  }
  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      this.chart.dispose();
    });
  }
}
