import { Component } from '@angular/core';
import { NavController, NavParams, } from 'ionic-angular';
import { ListPage } from '../list/list';
import { ToastController,AlertController } from 'ionic-angular';
import { usuarioService } from '../../app/service/usuario.service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  isLogged:boolean;

  usuario: string = "";
  password: string = "";

  errorusuario: boolean;
  errorClave: boolean;
  mensajeusuario: string = "";
  mensajePassword: string = "";

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    public toastController: ToastController,
    private _usuarioService: usuarioService,
    public alertCtrl: AlertController
    ) {
  }

  // 
  limpiarFormulario() {
    this.usuario = "";
    this.password = "";
  }

  //Metodo para validar el campo usuario
  validarusuario() {
    this.errorusuario = false;
    var exp = /[`~!#$%^&*()|+\-=¡?;:'",<>\{\}\[\]\\\/]/gi;
    if (this.usuario.replace(/ /g, "") == "") {
      this.mensajeusuario = "El campo de usuario no puede ir vacio";
      this.errorusuario = true;
      return false;
    }
    if(exp.test(this.usuario.toString())){
        this.mensajeusuario = "Este campo no puede contener caracteres especiales";
        this.errorusuario = true;
        return false;
    }
    return true;
  }

  validarClave(){
    this.errorClave = false;
    if(this.password == ""){
      this.mensajePassword = "Dijite la contraseña";
      this.errorClave = true;
      return false;
    }
    return true;
  }

  async ionViewDidEnter() {
    if(localStorage.getItem("isLogged")){
      this.navCtrl.setRoot(ListPage);
    }
    else{
      this.limpiarFormulario();
      if(localStorage.getItem("isLogged")){   
        this.isLogged=true;
      }
      else{
        this.isLogged=false;
      }
    }
  }

  iniciar() {
    if (this.validarusuario() && this.validarClave()) {
      this._usuarioService.getUsuario(this.usuario,this.password).subscribe(async res=>{
        if(res.length){
          console.log("inicio session");
          localStorage.setItem("isLogged","true");
          this.navCtrl.setRoot(ListPage);
          const toast = this.toastController.create({
            message: "Inicio de sesión correctamente",
            duration: 3000,
            position: 'top',
          });
          await toast.present();
        }
        else{
          console.log("Error");
          const toast = this.toastController.create({
            message: "Usuario o contraseña incorrecta",
            duration: 3000,
            position: 'top'
          });
          await toast.present();
        }
      });
    }
  }
}
