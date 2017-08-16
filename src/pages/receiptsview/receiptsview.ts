import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FileTransfer } from '@ionic-native/file-transfer';
import { FileUploadOptions } from '@ionic-native/file-transfer';
import { FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { ToastController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { DocumentViewer } from '@ionic-native/document-viewer';
import { DocumentViewerOptions } from '@ionic-native/document-viewer';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { LoadingController } from 'ionic-angular';

import { Billview } from '../billview/billview';
import { Billviewpdf } from '../billviewpdf/billviewpdf';

import * as moment from 'moment';
declare var cordova:any;
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

  isImg:boolean;isPdf:boolean;
  
  constructor(
    public navCtrl: NavController, 
    public toastCtrl:ToastController,
    public transfer: FileTransfer, 
    public file: File,
    public localNotifications: LocalNotifications,
    public loadCtrl:LoadingController,
    public document: DocumentViewer,
    public navParams: NavParams,
    public iab: InAppBrowser
    ) {
      if(localStorage.getItem('AppTitleColor')){
        this.titleColor = localStorage.getItem('AppTitleColor');
      }else{
        localStorage.setItem('AppTitleColor',"newtitle");
        this.titleColor = 'newtitle';
      }

      this.loadNavVals();

    }

  //const fileTransfer: FileTransferObject = this.transfer.create();

  ionViewDidLoad() {
    //let time = moment().format('HH:mm:ss');

    console.log('ionViewDidLoad ReceiptsviewPage');
    this.file.checkDir(this.file.externalRootDirectory, 'billme')
    .then(
      _ => console.log('Directory exists')
    )
    .catch(
      
      err => console.log('Directory doesnt exist')
    );
    this.file.createDir(this.file.externalRootDirectory, 'billme',false)
    .then(
      _ => console.log('created directory')
    )
    .catch(
      err => console.log('not created Directory')
    );
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
    //this.navbillPDF = this.navParams.get("billPDF")?this.navParams.get("billPDF"):"assets/images/logo.png";
    this.navpayedStatus = this.navParams.get("payedStatus");
    this.navpayedBy = this.navParams.get("payedBy");
    this.navtime = this.navParams.get("time");
    this.navisActive = this.navParams.get("isActive");
    this.navcreated_at = this.navParams.get("created_at");
    this.navupdated_at = this.navParams.get("updated_at");
    this.navId = this.navParams.get("id");
    this.navName = this.navParams.get("name");
    console.warn(this.navId+" "+this.navName);

    //this.navbillPDF = this.navParams.get("billPDF")?this.navParams.get("billPDF"):"assets/images/logo.png";
    let im = this.navParams.get("billPDF");
    let liof = im.substr(im.lastIndexOf("/"));
    let spl = liof.split(".");let pic = spl[1];
    if(pic == "pdf" || pic == "PDF" || pic == "DOC" || pic == "doc" || pic == "docx" || pic == "DOCX"){
      this.isPdf = true;this.isImg = false;
      this.navbillPDF = this.navParams.get("billPDF");
    }else{
      this.isPdf = false;this.isImg = true;
      this.navbillPDF = this.navParams.get("billPDF")?this.navParams.get("billPDF"):"assets/images/logo.png";
    }
  }

  openEditBill(){
    this.navCtrl.push(Receiptsview,{
      id:this.navId,
      name:this.navName
    })
  }

  download(){//works
    const fs:string = cordova.file.externalRootDirectory+"Billme";

    let loading = this.loadCtrl.create({ 
      content: 'Downloading...'
    });
    loading.present();
    const fileTransfer: FileTransferObject = this.transfer.create();//important
    let url = this.navbillPDF;
    let time = "_"+moment().format('HH:mm:ss')+"_"+this.navbuyedAt+"_"+localStorage.getItem("billmeUser");
    let name = "Bill_"+time+".pdf";
    //var fileTransfer = new Transfer();
    let path = cordova.file.externalRootDirectory+"Billme/" + name;
    this.localNotifications.schedule({
        id: 1,
        title:'Downloading Bill...',
        icon: 'assets/images/logo.png',
        smallIcon: 'assets/images/logo.png'
      });
    
      if(this.isImg){
        let base64;
        cordova.plugins.pdf.htmlToPDF({
                data: "<html><style>.pdfdiv{height:100%;width:100%;text-align:center;}"+
                 ".pdfimg{padding:5%;margin-top:5%}</style> <div class='pdfdiv'><img class='pdfimg' src="+this.navbillPDF+"></div> </html>",
                //url: "www.cloud.org/template.html" 
            },
            (sucess) => localStorage.setItem("billbase64",sucess),
            (error) => localStorage.setItem("billbase64",error));

        base64 = localStorage.getItem("billbase64");
        url = "data:application/pdf;base64,"+base64;
      }
      if(this.isPdf){
        url = this.navbillPDF;
      }
        fileTransfer.download(url, cordova.file.externalRootDirectory+"Billme/" + name).then((entry) => {
          //console.log('download complete: ' + entry.toURL());
          loading.dismiss();
          this.toastCtrl.create({
                message:"Downloaded successfully!",
                duration:2000,
                position:'middle'
              }).present();
              //alert(JSON.stringify(entry));
          this.localNotifications.schedule({
            id: 1,
            title:'Bill Download completed!',
            text: 'Saved at Billme folder '+name,
            icon: 'assets/images/logo.png',
            smallIcon: 'assets/images/logo.png'
          });
        }, (error) => {
          loading.dismiss();
          this.toastCtrl.create({
                message:"Bill can not be downloaded, try again.",
                duration:2000,
                position:'top'
              }).present();
              //alert(JSON.stringify(error));
              this.localNotifications.schedule({
                id: 1,
                title:'Bill not able to download completely, try again',
                icon: 'assets/images/logo.png',
                smallIcon: 'assets/images/logo.png'
              });
        });
  }
  download2(){
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

  viewpdf2(){
    const options: DocumentViewerOptions = {
      title: 'Bill '+this.navbillName,
      email: {enabled:true},
      print:{enabled:true}
    }

    let url = "Bill_"+this.navbillNo+this.navbuyedAt+".pdf";
    let path = this.navbillPDF;
    this.document.viewDocument(path, 'application/pdf', options);
  }

  viewpdf1(){
    let path = "https://docs.google.com/viewerng/viewer?url="+this.navbillPDF;
    const browser = this.iab.create(path,"_self",{
      location:"yes",
      clearcache:'yes',
      zoom:'yes',
      hardwareback:'yes',
      closebuttoncaption:'OK'
    });

    browser.show();
  }
  
  viewpdf(){//works
    let path = this.navbillPDF;
    this.navCtrl.push(Billviewpdf,{
      navpath:path
    });
  }
  
}
