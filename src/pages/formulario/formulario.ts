import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { ToastController,AlertController } from 'ionic-angular';
import { publicacionService } from '../../app/service/publicacion.service';

@Component({
  selector: 'page-formulario',
  templateUrl: 'formulario.html',
})
export class FormularioPage {

  correo: string = "";
  password: string ;

  titulopub: string;
  tipopub;
  eventorevista: string ;
  doi: string;
  anyopub: Date ;
  autores = [];

  nuevoAut;

  tipo:string;
  publicacion;

  errorTitulo: boolean;
  errorAutores: boolean;
  mensajeAutores: string = "";
  mensajeTitulo: string = "";
  errorTipoPub: boolean;
  mensajeTipoPub: string = "";
  errorAnyo: boolean;
  mensajeAnyo: string = "";

  ultimoReg;

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    public _publicacionServ: publicacionService,
    public toastController: ToastController,
    public alertCtrl: AlertController
    ) {
  }

  ionViewDidLoad() {
    this.tipo=this._publicacionServ.getTipoForm();
    this.publicacion=this._publicacionServ.getPubDetalle();
    this.cargarCampos();
    this.traerUltimoReg();
  }

  traerUltimoReg(){
    this._publicacionServ.getPublicaciones().subscribe(res=>{
      this.ultimoReg=res[res.length-1].payload.doc.id;
    });
  }

  cargarCampos(){
    if(this.tipo=="Registrar"){
      this.titulopub="";
      this.tipopub=0;
      this.eventorevista="" ;
      this.doi="";
      this.anyopub=null ;
      this.autores=[];
    }
    else{
      this.titulopub=this.publicacion.data.titulopub;
      this.tipopub=this.publicacion.data.tipopub;
      this.eventorevista=this.publicacion.data.eventorevista ;
      this.doi=this.publicacion.data.doi;
      this.anyopub=this.publicacion.data.anyopub ;
      this.autores=this.publicacion.data.autores;
    }
  }

  validarTitulo(){
    this.errorTitulo = false;
    if(this.titulopub == ""){
      this.mensajeTitulo = "El titulo es obligatorio";
      this.errorTitulo = true;
      return false;
    }
    return true;
  }

  validarAutores(){
    this.errorAutores = false;
    if(this.autores.length <= 0){
      this.mensajeAutores = "Debe tener al menos un autor";
      this.errorAutores = true;
      return false;
    }
    return true;
  }

  validarTipoPub(){
    this.errorTipoPub = false;
    if(this.tipopub == 0){
      this.mensajeTipoPub = "Seleccione el tipo de publicación";
      this.errorTipoPub = true;
      return false;
    }
    return true;
  }

  validarAnyo(){
    this.errorAnyo = false;
    if(this.anyopub == null){
      this.mensajeAnyo = "El año de publicación es obligatorio";
      this.errorAnyo = true;
      return false;
    }
    return true;
  }

  guardar(){
    if(this.tipo=="Registrar"){
      this.agregar();
    }
    else{
      this.modificar();
    }
  }

  modificar() {
    if (this.validarTitulo() && this.validarAutores()&&this.validarTipoPub()&&this.validarAnyo()) {
      var datos = {titulopub:this.titulopub,autores:this.autores,tipopub:parseInt(this.tipopub),eventorevista:this.eventorevista,
      doi:this.doi,anyopub:this.anyopub};
      this._publicacionServ.guardarPub(this.publicacion.id,datos).then(async res=>{
        const toast = this.toastController.create({
          message: "La publicación a sido modificada correctamente",
          duration: 3000,
          position: 'top'
        });
        await toast.present();
        this.navCtrl.popToRoot();
      }).catch(err=>{
        console.log(err);
      });
    }
  }

  agregar() {
    if (this.validarTitulo() && this.validarAutores()&&this.validarTipoPub()&&this.validarAnyo()) {
      var datos = {titulopub:this.titulopub,autores:this.autores,tipopub:parseInt(this.tipopub),eventorevista:this.eventorevista,
      doi:this.doi,anyopub:this.anyopub};
      this._publicacionServ.guardarPub((parseInt(this.ultimoReg)+1).toString(),datos).then(async res=>{
        const toast = this.toastController.create({
          message: "La publicación a sido agregada",
          duration: 3000,
          position: 'top'
        });
        await toast.present();
        this.navCtrl.popToRoot();
      }).catch(err=>{
        console.log(err);
      });
    }
  }

  eliminarAut(i){
    this.autores.splice(i, 1)
  }

  AgregarAut(){
    this.autores.push(this.nuevoAut)
    this.nuevoAut=""
  }

}
