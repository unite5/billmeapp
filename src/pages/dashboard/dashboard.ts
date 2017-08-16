import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { Receiptprovider } from '../../providers/receiptprovider';
import { Receiptsview } from "../receiptsview/receiptsview";
import { Billviewpdf } from '../billviewpdf/billviewpdf';

import * as moment from 'moment';
declare var cordova:any;
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

  mostrecentcount:number;duebillscount:number;dealscount:number;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadCtrl:LoadingController,
    public rp:Receiptprovider,
    public iab: InAppBrowser
  ) {
      if(localStorage.getItem('AppTitleColor')){
        this.titleColor = localStorage.getItem('AppTitleColor');
      }else{
        localStorage.setItem('AppTitleColor',"newtitle");
        this.titleColor = 'newtitle';
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
        //console.info(data);
        let d = JSON.parse(JSON.stringify(data));
        if(d.status=="success"){

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
          if((this.deals).length>0){
            this.dealscount=1;//duebillscount:number;dealscount:number;
            //console.log(this.dealscount);
          }else{
            this.dealscount=0;
            //console.log(this.dealscount);
          }

          this.mostrecent = d.mostrecent;
          if((this.mostrecent).length>0){
            this.mostrecentcount=1;//duebillscount:number;dealscount:number;
            //console.log(this.mostrecentcount);
          }else{
            this.mostrecentcount=0;
            //console.log(this.mostrecentcount);
          }
          //console.log(this.mostrecent);


          this.duebills = d.duebill;
          if((this.duebills).length>0){
            this.duebillscount=1;
            //console.log(this.duebillscount);
          }else{
            this.duebillscount=0;
            //console.log(this.duebillscount);
          }
          //console.log(this.duebills);

          //setTimeout(()=>{
            //loading.dismiss();
          //},8000);
        }else{
          this.expenditure = "00.00";
          this.ebillreceived = "0";
          this.totalduebill = "0";
          this.dealscount=0;
          this.mostrecentcount=0;
          this.duebillscount=0;
          //loading.dismiss();
          console.log("No bills right now available");
        }
        loading.dismiss();
      },
      error=>{
        this.expenditure = "00.00";
        this.ebillreceived = "0";
        this.totalduebill = "0";
        this.dealscount=0;
        this.mostrecentcount=0;
        this.duebillscount=0;
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

  makepdf(){
    const before = Date.now();
 
    //document.addEventListener('deviceready', () => {
        console.log('DEVICE READY FIRED AFTER', (Date.now() - before), 'ms');

        //generate the pdf. 
        let base64;let b4;
        cordova.plugins.pdf.htmlToPDF({
                data: "<html><h1>I am visible in pdf</h1></html>",
                //url: "www.cloud.org/template.html" 
            },
            (sucess) => { 
              b4 = sucess;
              localStorage.setItem("billbase64",sucess);
              let path = "data:application/pdf;base64,"+b4;
              this.navCtrl.push(Billviewpdf,{
                navpath:path
              });
            },
            (error) => {
              b4 = error;
              localStorage.setItem("billbase64",error);
          });
        
            base64 = localStorage.getItem("billbase64");
        let url = "data:application/pdf;base64,"+b4;
        //setTimeout(()=>{
          /*alert(url);
          const browser = this.iab.create(url,"_self",{
            location:"yes",
            clearcache:'yes',
            zoom:'yes',
            hardwareback:'yes',
            closebuttoncaption:'OK'
          });

          browser.show();*/
        //},5000);
        
    //});
  }

}
