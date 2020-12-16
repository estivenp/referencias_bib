import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
// import { Observable } from 'rxjs';

@Injectable()
export class usuarioService {

  constructor(private firestore: AngularFirestore ) { }

  // Obtiene un Usuario
  public getUsuario(usuario,contrase) {
    return this.firestore.collection('usuarios',ref=>ref.where('usuario','==',usuario).where("contraseña","==",contrase)).snapshotChanges();
  }

}
