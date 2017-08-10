import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the Billviewpdf page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-billviewpdf',
  templateUrl: 'billviewpdf.html',
})
export class Billviewpdf {

  pdfSrc: string;
  page: number;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
    this.pdfSrc = '/pdf-test.pdf';
    this.page = 1;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Billviewpdf');
  }

}
