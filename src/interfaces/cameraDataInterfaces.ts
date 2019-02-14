export interface IcameraStationData {
  'cameraStations':IcameraMainData,
  'dataUpdatedTime': string;
}

export interface IcameraMainData {
  'id': string,
  'roadStationId'?: number,
  'nearestWeatherStationId'?: number,
  'cameraPresets'?: IcameraPresets[],
}
export interface IcameraPresets {
  'id':string,
  'presentationName'?: string,
  'imageUrl'?: string,
  'measuredTime'?: string,
  'nearestWeatherStationId'?: number,
}

export interface IcameraDataParent {
  'dataUpdatedTime'?: string,
  'cameraStations'?: IcameraMainData[]
}

export interface IweatherParent {
  'dataUpdatedTime'?: string,
  'weatherStations'?: IweatherMain[]
}

export interface IweatherMain {
  'id'?:number,
  'measuredTime'?:string,
  'sensorValues'?: IsensorValues[]
}

export interface IsensorValues {
  'id'?: number,
  'roadStationId'?: number,
  'shortName'?: string,
  'sensorValue'?: number,
  'sensorUnit'?: string,
  'measuredTime'?: string,
}

//C01677
