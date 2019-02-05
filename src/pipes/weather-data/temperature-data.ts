import { Pipe, PipeTransform } from '@angular/core';
import { DataProvider } from "../../providers/data/data";
import {rejects} from "assert";
import {error} from "util";

/**
 * Generated class for the WeatherDataPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'temperatureData',
})
export class WeatherDataPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */

  constructor(private data: DataProvider){}

  transform(stationID: number, ...args) {


    return new Promise((resolve, reject) =>{
      this.data.getWeatherData(stationID).subscribe( res => {
        console.log(res);
        resolve(res.weatherStations[0].sensorValues[0].sensorValue)
      })
    }).catch(err => { console.log(err)})
  }
}
