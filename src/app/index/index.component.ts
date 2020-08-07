import { HttpClient } from '@angular/common/http';
import { Component, OnInit, NgZone} from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4charts from "@amcharts/amcharts4/charts";
import { CloseScrollStrategy } from '@angular/cdk/overlay';

am4core.useTheme(am4themes_animated);



@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  response ;
  response1 ;
  map ;
  map1 ;
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
      /*let map = am4core.create("chartdiv", am4maps.MapChart);
      map.projection = new am4maps.projections.Projection();
      map.geodata = am4geodata_worldLow;
    let polygonSeries = new am4maps.MapPolygonSeries();
      polygonSeries.useGeodata = true;
      
      let polygonTemplate = polygonSeries.mapPolygons.template;
      polygonTemplate.tooltipText = "{name}:{value}";
      polygonTemplate.fill = am4core.color("#74B266");
      polygonSeries.heatRules.push({
        "property": "fill",
        "target": polygonSeries.mapPolygons.template,
        "min": am4core.color("#54d4f7"),
        "max": am4core.color("#1313ed")
      });
      polygonSeries.data = [];
       console.log(polygonSeries.data.length)
// Create hover state and set alternative fill color
          this.response.Countries.forEach(element => {
          //if (element.TotalConfirmed > 100000){
            let object = {
              id:element.CountryCode,
              name: element.Country,
              value: parseInt(element.TotalConfirmed),
          //    fill: am4core.color("#F05C5C")
            }
            polygonSeries.data.push(object);
          //}
          /*else if (element.TotalConfirmed > 10000 && element.TotalConfirmed < 100000){

            let object = {
              id:element.CountryCode,
              name: element.Country,
              value: parseInt(element.TotalConfirmed),
            //  fill: am4core.color("#FFF000")
            }
            polygonSeries.data.push(object);

          }
          else if (element.TotalConfirmed > 1000 && element.TotalConfirmed < 10000){
            let object = {
              id:element.CountryCode,
              name: element.Country,
              value: element.TotalConfirmed,
              //fill: am4core.color("#055c0a")
            }
            polygonSeries.data.push(object);

          }
          else {
            let object = {
              id:element.CountryCode,
              name: element.Country,
              value: parseInt(element.TotalConfirmed),
              //fill: am4core.color("#00000")
            }
            polygonSeries.data.push(object);
          }
        })
        let heatLegend = map.createChild(am4maps.HeatLegend);
        heatLegend.series = polygonSeries;
        heatLegend.width = am4core.percent(100);
      let hs = polygonTemplate.states.create("hover");
      hs.properties.fill = am4core.color("#367B25");
      polygonTemplate.propertyFields.fill = "fill";
      map.series.push(polygonSeries); 
      this.map = map ; 
      
      let map1 = am4core.create("chartdiv1", am4maps.MapChart);
      map1.projection = new am4maps.projections.Projection();
      map1.geodata = am4geodata_worldLow;
    let polygonSeries1 = new am4maps.MapPolygonSeries();
      polygonSeries1.useGeodata = true;
      
      let polygonTemplate1 = polygonSeries1.mapPolygons.template;
      polygonTemplate1.tooltipText = "{name}:{value}";
      polygonTemplate1.fill = am4core.color("#74B266");
      polygonSeries1.heatRules.push({
        "property": "fill",
        "target": polygonSeries1.mapPolygons.template,
        "min": am4core.color("#f7d2d2"),
        "max": am4core.color("#fa0000")
      });
      polygonSeries1.data = [];
// Create hover state and set alternative fill color
          this.response.Countries.forEach(element => {
          //if (element.TotalConfirmed > 100000){
            let object = {
              id:element.CountryCode,
              name: element.Country,
              value: parseInt(element.TotalDeaths),
          //    fill: am4core.color("#F05C5C")
            }
            polygonSeries1.data.push(object);
        })
        let heatLegend1 = map1.createChild(am4maps.HeatLegend);
        heatLegend1.series = polygonSeries1;
        heatLegend1.width = am4core.percent(100);
      let hs1 = polygonTemplate1.states.create("hover");
      hs1.properties.fill = am4core.color("#367B25");
      polygonTemplate1.propertyFields.fill = "fill";
      map1.series.push(polygonSeries1); 
      this.map1 = map1 ;  
      */
      // 3rd chart
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
      /*if (this.map && this.map1) {
        /*this.map.dispose();
        this.map1.dispose();
      }*/
      this.chart.dispose();
      
    });
  }
}
