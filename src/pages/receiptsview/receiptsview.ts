import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FileTransfer } from '@ionic-native/file-transfer';
import { FileUploadOptions } from '@ionic-native/file-transfer';
import { FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { ToastController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { Billview } from '../billview/billview';

import * as moment from 'moment';
/*
  Generated class for the Receiptsview page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-receiptsview',
  templateUrl: 'receiptsview.html'
})
export class Receiptsview {

  titleColor:string;

  navId:number;
  navName:string;
  navuserID:number;navcategoryID:number;navvendorID:number;
  navbillName:any;navamount:any;navamountCurrency:any;
  navdescription:any;navbuyedAt:any;navbillNo:any;
  navbillPDF:any;navpayedStatus:string;navpayedBy:string;
  navtime:any;navisActive:string;navcreated_at:any;navupdated_at:any;

  constructor(
    public navCtrl: NavController, 
    public toastCtrl:ToastController,
    public transfer: FileTransfer, 
    public file: File,
    public localNotifications: LocalNotifications,
    public navParams: NavParams
    ) {
      if(localStorage.getItem('AppTitleColor')){
        this.titleColor = localStorage.getItem('AppTitleColor');
      }else{
        this.titleColor = 'title';
      }

      this.loadNavVals();

    }

  //const fileTransfer: FileTransferObject = this.transfer.create();

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReceiptsviewPage');
  }

  loadNavVals(){
    this.navuserID = this.navParams.get("userID");
    this.navcategoryID = this.navParams.get("categoryID");
    this.navvendorID = this.navParams.get("vendorID");
    this.navbillName = this.navParams.get("billName");
    this.navamount = this.navParams.get("amount");
    this.navamountCurrency = this.navParams.get("amountCurrency");
    this.navdescription = this.navParams.get("description");
    this.navbuyedAt = this.navParams.get("buyedAt");
    this.navbillNo = this.navParams.get("billNo");
    this.navbillPDF = this.navParams.get("billPDF")?this.navParams.get("billPDF"):"assets/images/logo.png";
    this.navpayedStatus = this.navParams.get("payedStatus");
    this.navpayedBy = this.navParams.get("payedBy");
    this.navtime = this.navParams.get("time");
    this.navisActive = this.navParams.get("isActive");
    this.navcreated_at = this.navParams.get("created_at");
    this.navupdated_at = this.navParams.get("updated_at");
    this.navId = this.navParams.get("id");
    this.navName = this.navParams.get("name");
    console.warn(this.navId+" "+this.navName);
  }

  openEditBill(){
    this.navCtrl.push(Receiptsview,{
      id:this.navId,
      name:this.navName
    })
  }

  download(){
    /*this.navCtrl.push(Billview,{
      name:this.navbillName+' '+this.navbuyedAt,
      image:this.navbillPDF
    });*/
    const fileTransfer: FileTransferObject = this.transfer.create();
    const url = this.navbillPDF;
    let name = "Bill_"+this.navbillNo+this.navbuyedAt+".pdf";
    //var fileTransfer = new Transfer();
    let path = this.file.dataDirectory + name;
    fileTransfer.download(url, this.file.dataDirectory + name).then((entry) => {
      //console.log('download complete: ' + entry.toURL());
      this.toastCtrl.create({
            message:"Download completed!",
            duration:2500,
            position:'middle'
          }).present();
      this.localNotifications.schedule({
        id: 1,
        title:'Bill Download completed!',
        text: 'Saved bill '+name+' at '+path,
        icon: 'assets/images/logo.png'
      });
    }, (error) => {
      this.toastCtrl.create({
            message:"Bill can not be downloaded, try again.",
            duration:2000,
            position:'top'
          }).present();
    });
  }

  viewfull(){
    this.navCtrl.push(Billview,{
      name:this.navbillName+' '+this.navbuyedAt,
      image:this.navbillPDF
    });
  }

  convert(ucreated){
    let a = moment(new Date(ucreated)).format("MMM DD, YYYY");
    return a;
  }
}
