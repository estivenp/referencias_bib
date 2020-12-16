import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormularioPage } from '../formulario/formulario'
import { publicacionService } from '../../app/service/publicacion.service';
import { AlertController,ToastController } from 'ionic-angular';

@Component({
  selector: 'page-detalle',
  templateUrl: 'detalle.html'
})
export class DetallePage {

  publicacion;
  tipopub;

  constructor(public navCtrl: NavController,public _publicacionServ:publicacionService,
    public alertCtrl: AlertController,public toastController: ToastController) {
    this.publicacion=this._publicacionServ.getPubDetalle();
    switch(this.publicacion.data.tipopub){
      case 1: this.tipopub="1 - Articulo revista";break;
      case 2: this.tipopub="2 - Articulo evento";break;
      case 3: this.tipopub="3 - Otro";break;
    }
  }

  modificar(){
    this.navCtrl.push(FormularioPage);
  }

  eliminar(){
    const confirm = this.alertCtrl.create({
      title: 'Confirmar eliminación',
      message: 'Estas seguro de eliminar esta publicacion',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('cancelar');
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            this._publicacionServ.eliminarPublicacion(this.publicacion.id).then(async res=>{
              const toast = this.toastController.create({
                // header: 'Error',
                message: "La publicación fue eliminada",
                duration: 3000,
                position: 'top',
                // color: 'danger',
              });
              await toast.present();
              this.navCtrl.popToRoot();
            })
            .catch(err=>{
              console.log(err);
            });
          }
        }
      ]
    });
    confirm.present();
  }
}
