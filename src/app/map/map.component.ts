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
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {
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

 }
  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      var map = am4core.create("mapdiv", am4maps.MapChart);
      map.projection = new am4maps.projections.Projection();
      map.geodata = am4geodata_worldLow;
      let polygonSeries = new am4maps.MapPolygonSeries();
      polygonSeries.useGeodata = true;
      
      let polygonTemplate = polygonSeries.mapPolygons.template;
      polygonTemplate.tooltipHTML = `
      <div class="col">
        <br>
        <img class="mx-auto rounded border border-light" src="https://cdn.jsdelivr.net/gh/hjnilsson/country-flags@latest/svg/{code}.svg" height="36px"></img>
        <div class="text-center"><h4 class="text-light">{name}</h4></div>
        <table class="table legend table-borderless">
          <tbody>
            <tr class="table-light">
              <th>Confirmed</th>
              <td><span class="legend-confirmed">{value}</span></td>
            </tr>
            <tr class="table-light">
              <th>Active</th>
              <td><span class="legend-active">{active}</span></td>
            </tr>
            <tr class="table-light">
              <th>Recovered</th>
              <td><span class="legend-recovered">{recovered}</span></td>
            </tr>
            <tr class="table-light">
              <th>Deaths</th>
              <td><span class="legend-deaths">{deaths}</span></td>
            </tr>
          </tbody>
        </table>
      </div>

      
      `;

      /* 
      
      <center><strong>{name}</strong></center>
      
      <table>
      <tr>
        <th align="left">Deaths</th>
        <td>{deaths}</td>
      </tr>
      <tr>
        <th align="left">Confirmed</th>
        <td>{value}</td>
      </tr>
      <tr>
        <th align="left">Recovered</th>
        <td>{recovered}</td>
      </tr>
      <tr>
      <th align="left">Active</th>
      <td>{active}</td>
    </tr>
      </table> 
      
      */
      polygonTemplate.fill = am4core.color("#74B266");
      polygonSeries.heatRules.push({
        "property": "fill",
        "target": polygonSeries.mapPolygons.template,
        "min": am4core.color("#c2918c"),
        "max": am4core.color("#ff0000"),
        "dataField": "value",
        "logarithmic": true
      });
      polygonSeries.data = [];
       console.log(polygonSeries.data.length)
       setTimeout(()=>{
          this.response.Countries.forEach(element => {
            let object = {
              id:element.CountryCode,
              code:element.CountryCode.toLowerCase(),
              name: element.Country,
              value: parseInt(element.TotalConfirmed),
              deaths: parseInt(element.TotalDeaths),
              recovered: parseInt(element.TotalRecovered),
              active: element.TotalConfirmed - element.TotalRecovered - element.TotalDeaths
            }
            polygonSeries.data.push(object);
          })
      let heatLegend = map.createChild(am4maps.HeatLegend);
      heatLegend.series = polygonSeries;
      heatLegend.width = am4core.percent(100);
      heatLegend.valign = "bottom";
      heatLegend.padding(20, 20, 20, 20);
      let hs = polygonTemplate.states.create("hover");
      hs.properties.fill = am4core.color("#007BFF");
      polygonTemplate.propertyFields.fill = "fill";
      polygonSeries.exclude = ["AQ","GL","TM"];
      map.series.push(polygonSeries); 

      this.map = map ; 
    },1000)})
  }
}
  /*ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.map) {
       this.map.dispose();
        
      }
      //this.chart.dispose();
      
   });
  }*/
