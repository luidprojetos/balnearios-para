import { Injectable } from '@angular/core';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import {
  Firestore,
  collection,
  doc,
  docData,
  setDoc,
} from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private firestore: Firestore) {}
  private auth = getAuth();
  private userCollection = collection(this.firestore, 'user');

  //Cadastro do usuario
  async cadastrar(userData: any) {
    const newUser = await createUserWithEmailAndPassword(
      this.auth,
      userData.email,
      userData.senha,
    );
    await setDoc(doc(this.userCollection, newUser.user.uid), {
      ...userData, uid: newUser.user.uid,
    });
    return newUser.user.uid;
  }




  //Login do usuario
  async login(userData: any) {
    const user = await signInWithEmailAndPassword(
      this.auth,
      userData.email,
      userData.password
    );
    return docData(doc(this.userCollection, user.user.uid)).subscribe((res) => {
      sessionStorage.setItem('userData', JSON.stringify({res}));
    });
  }

  //Logout do usuario
  async logout() {
    return await this.auth.signOut().then(() => {
      sessionStorage.removeItem('userData');
    });
  }
  //Pega uid
  getuid() {
    const data = sessionStorage.getItem('userData');
    if (data) {
      const uid = JSON.parse(data);
      return uid;
    }
  }
}
