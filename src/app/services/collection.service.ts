import { Injectable } from '@angular/core';
import { user } from '@angular/fire/auth';
import { Firestore ,collection,getDocs,query,where } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  constructor(private firestore: Firestore) {
  }
  private collection = collection(this.firestore, 'user');


  async ler(){
    const q = query(this.collection, where('tipo','==', 0));
    return await getDocs(q)
  }

}
