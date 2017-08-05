import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Mainprovider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class Mainprovider {

  constructor(public http: Http) {
    console.log('Hello Mainprovider Provider');
  }

  generateApiKey(){
      let d = JSON.stringify({"time":""+new Date()});
      return new Promise((resolve,reject)=>{
          this.http.post(localStorage.getItem("appUrl")+'/generateapikey',d)
          .map(res=>res.json())
          .subscribe(
              data => {
                  resolve(data);
              }, 
              error => {
                  reject(error);
              }
          );
      });
  }
}
