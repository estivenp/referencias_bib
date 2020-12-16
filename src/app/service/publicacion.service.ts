import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
// import { Observable } from 'rxjs';

@Injectable()
export class publicacionService {

  // Lugar de detalle
  private publicacion;
  private pagAtras;
  private tipo;

  constructor(
    private firestore: AngularFirestore 
    ) 
  {
    // const id = localStorage.getItem('id_lugar');
    this.pagAtras="";
    this.tipo="Registrar";
    this.publicacion="";
    // if (id) {
    //   this.lugar = this.getLugar(id).subscribe((lugar) => {
    //         this.lugar.id = lugar.payload.id;
    //         this.lugar.data = lugar.payload.data();
    //       });
    // }
  }

  // Obtiene todas las publicaciones
  public getPublicaciones() {
    return this.firestore.collection('publicaciones').snapshotChanges();
  }

  // Guarda los datos de un lugar
  public guardarPub(documentId, data: any) {
    return this.firestore.collection('publicaciones').doc(documentId).set(data);
  }

  //eliminar una publicacion
  public eliminarPublicacion(id){
    return this.firestore.collection('publicaciones').doc(id).delete();
  }

  // public obtenerQrsLugar(id){
  //   return this.firestore.collection('DatalleQr',ref=>ref.where('id_lugar','==',id)).snapshotChanges();
  // }

  // public eliminarQr(id,data){
  //   return this.firestore.collection('DetalleQr').doc(id).set(data);
  // }


  public getPubDetalle() {
    return this.publicacion;
  }

  public setPubDetalle(dato) {
    this.publicacion = dato;
  }

  public getTipoForm() {
    return this.tipo;
  }

  public setTipoFor(dato) {
    this.tipo = dato;
  }

  public getPagAtras(){
    return this.pagAtras;
  }

  public setPagAtras(cat){
    this.pagAtras=cat;
  }
}
