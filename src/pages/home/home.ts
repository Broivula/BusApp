import {Component, ViewChild, ViewChildren} from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataProvider } from "../../providers/data/data";
import { FormBuilder, FormGroup} from "@angular/forms";
import { IcameraStationData } from "../../interfaces/cameraDataInterfaces";
import { Slides } from "ionic-angular";
import { Platform } from "ionic-angular";
import { Content } from "ionic-angular";
import { ScreenOrientation } from "@ionic-native/screen-orientation/ngx"
import { Keyboard } from "@ionic-native/keyboard/ngx";

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
  public consolelog : string;
  private latestSearch;

  @ViewChild('slides') slides: Slides;
  @ViewChild(Content) content: Content;


  constructor(
      public navCtrl: NavController,
      private data: DataProvider,
      private formbuilder: FormBuilder,
      private platform: Platform,
      private screenOrientation: ScreenOrientation,
      private keyboard: Keyboard
      ) {
    this.form = this.formbuilder.group({
      searchtext: [''],
    });


    window.addEventListener("orientationchange", () => {
      try {
      }catch (e) {
        console.log('error: ' + e)
      }
    })

  }

  searchTown () {

    this.keyboard.hide();
    if(this.form.value.searchtext.toString().length > 2)
    {
      this.latestSearch = this.form.value.searchtext;
      this.cameraData =  this.data.getTownSearchResults(this.form.value.searchtext);
      this.form.reset();
      if(this.cameraData.length > 0){
        this.noTargetsFound = false;
        this.targetFound = true;
        setTimeout(() =>
        this.slideToFirst(), 2000);
      }else {
        //there were no hits!
        this.targetFound = false;
        this.noTargetsFound = true;
      }

     // console.log(this.cameraData);
    }else{
      console.log('nothing has been searched')
      //send an alert saying that you need to put something to the search field
    }

//   this.slides.slideTo(1, 1);
  }

  async ionViewDidEnter() {
 //   this.slides.slideTo(1);
  }

  slideToFirst (){
    this.slides.slideTo(0, 1000);
  }


  refreshData (event) {

    try {
      this.data.getAllCameraData().then(() => {
        if (this.targetFound) {
          if (this.latestSearch.toString().length > 2) {
            this.cameraData = this.data.getTownSearchResults(this.latestSearch);
            if (this.cameraData.length > 0) {
              this.noTargetsFound = false;
              this.targetFound = true;
              event.complete();
            } else {
              //there were no hits!
              this.targetFound = false;
              this.noTargetsFound = true;
              event.complete();
            }
          } else {
            console.log('nothing has been searched')
          }
        } else {
          event.complete();
        }
      })
    }catch (e) {
      console.log('error in data refreshing: ' + e)
    }

  }

  getAllCameraDataAtStart () {
    this.data.getAllCameraData().then( res =>{
      this.loadingComplete = true;
      console.log(this.loadingComplete + 'it actually worked');
      }
    );
  }

  ionViewDidLoad () {
      this.getAllCameraDataAtStart()
  }
}

