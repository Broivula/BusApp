import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IcameraStationData} from "../../interfaces/cameraDataInterfaces";
import { IweatherParent } from "../../interfaces/cameraDataInterfaces";

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  roadCameraApiUrl = 'http://tie.digitraffic.fi';
  public cameraData: IcameraStationData[];
  cachedCameraStationData = [];
  public completeSearchResults = {};
  httpsOptions = {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type':'application/json'
    },
    body:{

    }
  };

  constructor(public http: HttpClient) {
  }

  getAllCameraData () {
    this.http.get<IcameraStationData[]>('/api/v1/data/camera-data', this.httpsOptions).subscribe( (res: IcameraStationData[]) => {
      this.cameraData = res;
   //   console.log(this.cameraData)
    });
  }

  getTownSearchResults (searchEntry) {
    this.cachedCameraStationData.length = 0;
     this.cameraData.cameraStations.map( entry => {
     // console.log(entry);
      entry.cameraPresets.map( cameraPreset => {
        let nearestWeatherStationId = entry.nearestWeatherStationId;
        cameraPreset.nearestWeatherStationId = nearestWeatherStationId;
        if(this.textComparer(searchEntry, cameraPreset))
        {
         // console.log('results were true: ' + searchEntry.searchtext + ' and ' + cameraPreset.presentationName)
          this.cachedCameraStationData.push(entry.cameraPresets);
        }
      })
    })

    return this.cachedCameraStationData.concat.apply([], this.cachedCameraStationData);
  }


  getWeatherData (id) {
    return this.http.get<IweatherParent>('/api/v1/data/weather-data/' + id)
  }

  getSomeData() {
   return this.http.get<IcameraStationData[]>('/api/v1/data/camera-data/C01535' , this.httpsOptions);
  }

  getDat () {
    return this.http.get('/api/v1/data/weather-data', this.httpsOptions)
  }
//C01535

  textComparer (searchTerm, nameOfCameraPlace) {
    if(!nameOfCameraPlace.presentationName)
    {
      console.log('no presentation name available.');
      return false;
    }else {
      //so first get rid of the whitetext of both entries
      let sT = searchTerm.searchtext.replace(/\s/g, '').toLowerCase();
      let pT = nameOfCameraPlace.presentationName.replace(/\s/g, '').toLowerCase();
      if( sT.includes([pT,]) || pT.includes([sT,]))
      {
        return true;
      }
    }
  }

}







