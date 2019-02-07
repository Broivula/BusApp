import { Component, ViewChild, ViewChildren } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataProvider } from "../../providers/data/data";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { IcameraMainData, IcameraPresets, IcameraStationData } from "../../interfaces/cameraDataInterfaces";
import { Slides } from "ionic-angular";
import { Platform } from "ionic-angular";
import { Content } from "ionic-angular";
import { ScreenOrientation } from "@ionic-native/screen-orientation/ngx"

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public form: FormGroup;
  public targetFound: boolean = false;
  public noTargetsFound: boolean = false;
  public loadingComplete: boolean = false;
  public slideIndex : number;
  public cameraData = [];

  @ViewChildren('slides') slides: Slides;
  @ViewChild(Content) content: Content;

  constructor(
      public navCtrl: NavController,
      private data: DataProvider,
      private formbuilder: FormBuilder,
      private platform: Platform,
      private screenOrientation: ScreenOrientation
      ) {
    this.form = this.formbuilder.group({
      searchtext: [''],
    });

  }



  getData (){
     this.data.getSomeData().subscribe((res: IcameraStationData[]) => {
     //  this.cameraData = res.cameraStations[0].cameraPresets;
    });
}

  searchTown () {
  //  console.log(this.form.value);
    if(this.form.value.toString().length > 2)
    {
      this.cameraData =  this.data.getTownSearchResults(this.form.value);
      if(this.cameraData.length > 0){
        this.noTargetsFound = false;
        this.targetFound = true;
      }else {
        //there were no hits!
        this.targetFound = false;
        this.noTargetsFound = true;
      }

     // console.log(this.cameraData);
    }else{
      console.log('nope')
      //send an alert saying that you need to put something to the search field
    }

//   this.slides.slideTo(1, 1);
  }
/*
  ionSlidesDidLoad() {
    return new Promise(resolve => {
      this.slides.getNativeElement().addEventListener('ionSlidesDidLoad', () => {
      resolve(true);
      });
    });
  }

  async ionViewWillEnter() {
    await this.ionSlidesDidLoad();
  }

  async ionViewDidEnter() {
    this.slides.getNativeElement().slideTo(1);
  }*/




  getAllCameraDataAtStart () {
    this.data.getAllCameraData().then( res =>{
      this.loadingComplete = true;
      console.log(this.loadingComplete + 'it actually fucking worked');
      }
    );
  }

  ionViewDidLoad () {
      this.getAllCameraDataAtStart()
  }
}

