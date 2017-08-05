import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import { Receiptprovider } from '../../providers/receiptprovider';
/*
  Generated class for the Dashboard page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
  providers:[Receiptprovider]
})
export class Dashboard {
  titleColor:string;
  billmeuser:string;

  duebills:any;
  expenditure:any;ebillreceived:any;totalduebill:any;
  mostrecent:any;
  deals:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadCtrl:LoadingController,
    public rp:Receiptprovider
  ) {
      if(localStorage.getItem('AppTitleColor')){
        this.titleColor = localStorage.getItem('AppTitleColor');
      }else{
        this.titleColor = 'title';
      }
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
    this.billmeuser = localStorage.getItem("billmeUser");
    this.loadData();
  }

  loadData(){
    let loading = this.loadCtrl.create({
      spinner: 'dots',
      content: `
        <ion-spinner class="loadDataSpin" name="dots"></ion-spinner>`,
      cssClass:'classforspindata'
    });
    loading.present();

    this.rp.loadDashboardData().then(
      data=>{
        console.info(data);
        let d = JSON.parse(JSON.stringify(data));
        if(d.status=="success"){
          this.duebills = d.duebill;
          console.log(this.duebills);

          let exp = d.expenditure;
          if(exp == null || exp == "00.00"){
            this.expenditure = "00.00";
          }else{
            this.expenditure = exp;
          }
          let ebr = d.ebillreceived;
          if(ebr == null || ebr == "0"){
            this.ebillreceived = "0";
          }else{
            this.ebillreceived =  ebr;
          }
          let tdb = d.totalduebill;
          if(tdb == null || tdb == "0"){
            this.totalduebill = "0";
          }else{
            this.totalduebill =  tdb;
          }
          
          this.deals = d.deals;

          this.mostrecent = d.mostrecent;
          console.log(this.mostrecent);

          //setTimeout(()=>{
            loading.dismiss();
          //},8000);
        }else{
          loading.dismiss();
          console.log("No bills right now available");
        }
      },
      error=>{
        loading.dismiss();
        console.error(error+"\t error");
      }
    );
  }

}
