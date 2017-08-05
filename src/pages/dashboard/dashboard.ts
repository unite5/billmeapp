import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import { Receiptprovider } from '../../providers/receiptprovider';
import { Receiptsview } from "../receiptsview/receiptsview";

import * as moment from 'moment';
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

  //open bills accordingly
  openBill(d){
    let rd = {"id":d.id,"userID":d.userID,"categoryID":d.categoryID,"vendorID":d.vendorID,"billName":d.billName,"name":d.billName,"amount":d.amount,"amountCurrency":d.amountCurrency,"description":d.description,"buyedAt":d.buyedAt,"billNo":d.billNo,"billPDF":d.billPDF,"payedStatus":d.payedStatus,"payedBy":d.payedBy,"time":d.time,"isActive":d.isActive,"created_at":d.created_at,"updated_at":d.updated_at};
    console.log(JSON.stringify(d)+"callthisReceipt()");
    this.navCtrl.push(Receiptsview,rd);
  }

  convert(ucreated){
    let a = moment(new Date(ucreated)).format("MMM DD, YYYY");
    return a;
  }

}
