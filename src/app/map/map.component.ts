import { HttpClient } from '@angular/common/http';
import { Component, OnInit, NgZone} from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {
  response ;
  map ;

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
      </div>`;

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

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
       this.map.dispose();
   });
  }
}
