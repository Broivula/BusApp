import { Component, ViewChild, ViewChildren } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataProvider } from "../../providers/data/data";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { IcameraMainData, IcameraPresets, IcameraStationData } from "../../interfaces/cameraDataInterfaces";
import { Slides } from "ionic-angular";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public form: FormGroup;
  public targetFound: boolean = false;
  public cameraData = [];

  @ViewChildren('slides') slides: Slides;

  constructor(
      public navCtrl: NavController,
      private data: DataProvider,
      private formbuilder: FormBuilder,
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
    if(this.form.value)
    {
      this.cameraData =  this.data.getTownSearchResults(this.form.value);
      this.targetFound = true;
     // console.log(this.cameraData);
    }else {
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
    this.data.getAllCameraData();
  }

  ionViewDidLoad () {
  this.getAllCameraDataAtStart()
  }

}
