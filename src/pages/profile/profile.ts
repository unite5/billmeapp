import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { service } from '../services/service';
import { Http,Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { HttpDefaultService } from '../../providers/http-default-service';
//import { Dbservice } from '../../providers/dbservice';
/*
  Generated class for the Profile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  providers:[service,HttpDefaultService]
})
export class Profile {
  d:any;
  titleColor:string;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public actionCtrl:ActionSheetController,
    public service:service,public hds:HttpDefaultService,//public dbs:Dbservice,
    public loadCtrl:LoadingController,
    public http:Http
    ) {
      if(localStorage.getItem('AppTitleColor')){
        this.titleColor = localStorage.getItem('AppTitleColor');
      }else{
        this.titleColor = 'title';
      }

      //console.info(this.service.hello());
      
      let loading = this.loadCtrl.create({
        content: 'Loading...'
      });
      loading.present();
      setTimeout(()=>{
        loading.dismiss();

       this.hds.findMe4().then(
         (result)=>{
           console.log(result);
           let dt = JSON.parse(JSON.stringify(result));
           this.d = {
            'ip':dt.ip,
            'city':dt.city 
            };
         },
         (error)=>{
           console.error(error);
         }
         );
        //http://ip-api.com/json    //http://freegeoip.net/json/
        

        /*//db code
        this.dbs.createPerson("ABCD","Mumbai")
        .then((result)=>{
          console.info(result);

          this.dbs.getPeople().then(
            (result2)=>{
              console.info(result2);
            },
            (error2)=>{
              console.info(error2);
            }
          );
        },(error)=>{
          console.error(error);
        })*/


      },5000);
      
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  changePicture(){
    this.actionCtrl.create({
      title:"Pic Your Profile Picture Options",
      buttons:[
        {
          text:'Camera',
          handler:()=>{
            console.info("Camera");
          }
        },
        {
          text:'Gallery',
          handler:()=>{
            console.info("Gallery");
          }
        },
        {
          text:'Dismiss',
          role:'cancel',
          handler:()=>{
            console.warn("Dismiss");
          }
        }
      ]
    }).present();
  }

}
