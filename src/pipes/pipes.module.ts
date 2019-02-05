import { NgModule } from '@angular/core';
import { WeatherDataPipe } from './weather-data/temperature-data';
@NgModule({
	declarations: [WeatherDataPipe],
	imports: [],
	exports: [WeatherDataPipe]
})
export class PipesModule {}
