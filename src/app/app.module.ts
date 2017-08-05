import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
//import { Login } from '../pages/login/login';
import { Signup } from '../pages/signup/signup';
import { Register } from '../pages/register/register';
import { Profile } from '../pages/profile/profile';
import { Dashboard } from '../pages/dashboard/dashboard';
import { Setting } from '../pages/setting/setting';
import { Receipts } from '../pages/receipts/receipts';
import { Receiptsview } from '../pages/receiptsview/receiptsview';
import { Billview } from '../pages/billview/billview';
import { Homeslider } from '../pages/homeslider/homeslider';
import { Categories } from '../pages/categories/categories';
import { Categorybills } from '../pages/categorybills/categorybills';
import { Deals } from '../pages/deals/deals';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

import {HttpModule} from '@angular/http';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    Signup,
    Register,
    Profile,
    Dashboard,
    Setting,
    Receipts,
    Receiptsview,
    Billview,
    Homeslider,
    Categories,
    Categorybills,
    Deals
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    Signup,
    Register,
    Profile,
    Dashboard,
    Setting,
    Receipts,
    Receiptsview,
    Billview,
    Homeslider,
    Categories,
    Categorybills,
    Deals
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FileTransfer,
    File
  ]
})
export class AppModule {}
