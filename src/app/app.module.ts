import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DataProvider } from '../providers/data/data';
import { HttpClientModule } from "@angular/common/http";
import * as ionicGalleryModal from 'ionic-gallery-modal';
import { HAMMER_GESTURE_CONFIG} from "@angular/platform-browser";
import { PipesModule } from "../pipes/pipes.module";
import { ScreenOrientation } from "@ionic-native/screen-orientation/ngx"
import { Keyboard } from "@ionic-native/keyboard/ngx";


@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    ionicGalleryModal.GalleryModalModule,
    PipesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ScreenOrientation,
    Keyboard,
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    },
    {
      provide: HAMMER_GESTURE_CONFIG,
    useClass: ionicGalleryModal.GalleryModalHammerConfig
    },
    DataProvider,
  ]
})
export class AppModule {}
