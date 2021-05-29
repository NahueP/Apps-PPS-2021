import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore : AngularFirestore) 
  {
  }

  public Crear(collection: string, data : any)
  {
    return this.firestore.collection(collection).add(data);
  }

  public ObtenerPorId(coleccion: string, id:string)
  {
    return this.firestore.collection(coleccion).doc(id).snapshotChanges();
  }

  public ObtenerTodos(coleccion:string)
  {
    return this.firestore.collection(coleccion).snapshotChanges();
  }

  public Actualizar(coleccion:string, data:any, id:string)
  {
    return this.firestore.collection(coleccion).doc(id).set(data);
  }
}
