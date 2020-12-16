import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class publicacionService {

  private publicacion;
  private tipo;

  constructor(
    private firestore: AngularFirestore 
    ) 
  {
    this.tipo="Registrar";
    this.publicacion="";
  }

  // Obtiene todas las publicaciones
  public getPublicaciones() {
    return this.firestore.collection('publicaciones').snapshotChanges();
  }

  // Guarda los datos de una publicacion
  public guardarPub(documentId, data: any) {
    return this.firestore.collection('publicaciones').doc(documentId).set(data);
  }

  //eliminar una publicacion
  public eliminarPublicacion(id){
    return this.firestore.collection('publicaciones').doc(id).delete();
  }

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

}
