import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import { Categoriesprovider } from '../../providers/categoriesprovider';
import { Receiptsview } from "../receiptsview/receiptsview";
/**
 * Generated class for the Categorybills page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-categorybills',
  templateUrl: 'categorybills.html',
  providers:[Categoriesprovider]
})
export class Categorybills {

  navID:any;
  navName:string;
  navDesc:any;
  navTotal:any;
  navAmount:any;
  catbills:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadCtrl:LoadingController,
    public rp:Categoriesprovider
  ) {
    this.loadMybills();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Categorybills');
  }

  loadMybills(){
    this.navID = this.navParams.get("catid");
    this.navName = this.navParams.get("catname");
    this.navDesc = this.navParams.get("catdesc");
    this.navTotal = this.navParams.get("cattotal");
    this.navAmount = this.navParams.get("catamount");
    this.loadCategories();
  }

  //load particular categorywise bills
  loadCategories(){
    let loading = this.loadCtrl.create({
      spinner: 'dots',
      content: `
        <ion-spinner class="loadDataSpin" name="dots"></ion-spinner>`,
      cssClass:'classforspindata'
    });
    loading.present();
    let lData = {
      uid:localStorage.getItem("billmeUID"),
      catid:this.navID,
      catname:this.navName
    };
    this.rp.findcategorybills(lData).then(
    (result)=>{
      console.log(result);
      let dt = JSON.parse(JSON.stringify(result));
      if(dt.status == "success"){
        this.catbills = dt.data;
      }else{
        console.log("no categories");
      }
      loading.dismiss();
    },
    (error)=>{
      loading.dismiss();
      console.error(error);
    }
    );
  }

  callthisReceipt(d){
    let rd = {"id":d.id,"userID":d.userID,"categoryID":d.categoryID,"vendorID":d.vendorID,"billName":d.billName,"name":d.billName,"amount":d.amount,"amountCurrency":d.amountCurrency,"description":d.description,"buyedAt":d.buyedAt,"billNo":d.billNo,"billPDF":d.billPDF,"payedStatus":d.payedStatus,"payedBy":d.payedBy,"time":d.time,"isActive":d.isActive,"created_at":d.created_at,"updated_at":d.updated_at};
    console.log(JSON.stringify(d)+"callthisReceipt()");
    this.navCtrl.push(Receiptsview,rd);
  }
}
