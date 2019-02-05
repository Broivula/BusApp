export interface IcameraStationData {
  'cameraStations':Object[]
  'dataUpdatedTime': string;
}

export interface IcameraMainData {
  'id': string;
  'roadStationId'?: number;
  'nearestWeatherStationId'?: number;
  'cameraPresets'?: IcameraPresets[];
}
export interface IcameraPresets {
  'id':string;
  'presentationName'?: string;
  'imageUrl'?: string;
  'measuredTime'?: string;
}
//C01677
