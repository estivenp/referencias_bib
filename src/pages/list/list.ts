import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DetallePage } from '../detalle/detalle';
import { FormularioPage } from '../formulario/formulario';
import {publicacionService} from '../../app/service/publicacion.service';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  publicaciones;
  busqueda="";

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _publicacionServ:publicacionService) {
      this.obtenerPublicaciones();
  }

  itemTapped(publicacion) {
    this._publicacionServ.setTipoFor("Modificar");
    this._publicacionServ.setPubDetalle(publicacion);
    this.navCtrl.push(DetallePage);
  }

  agregar(){
    this._publicacionServ.setTipoFor("Registrar");
    this.navCtrl.push(FormularioPage);
  }

  obtenerPublicaciones(){
    this._publicacionServ.getPublicaciones().subscribe(res=>{
      this.publicaciones = [];
      res.forEach(publicacionData=>{
        this.publicaciones.push({
          id: publicacionData.payload.doc.id,
          data: publicacionData.payload.doc.data()
        });
      });
    });
  }
}
