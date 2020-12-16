import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { DetallePage } from '../pages/detalle/detalle';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { FormularioPage } from '../pages/formulario/formulario';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { publicacionService } from './service/publicacion.service';
import { usuarioService } from './service/usuario.service';

import { PipesModule } from '../pipes/pipes.module';


@NgModule({
  declarations: [
    MyApp,
    DetallePage,
    ListPage,
    LoginPage,
    FormularioPage
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    PipesModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFirestoreModule.enablePersistence(),
    // AngularFireAuthModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DetallePage,
    ListPage,
    LoginPage,
    FormularioPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    publicacionService,
    usuarioService,
    AngularFirestoreModule,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
