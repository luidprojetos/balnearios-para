import { Injectable } from '@angular/core';
import { uploadBytesResumable } from '@angular/fire/storage';
import {
  getStorage,
  ref,
  listAll,
  ListResult,
  getDownloadURL,
} from 'firebase/storage';
import { Observable, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { v4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private storage = getStorage();
  private listRef = ref(this.storage, '/Balneario');

  constructor() {}

  async mandarFoto(input: any): Promise<any> {
    if (!input.files) return '';
    const files: FileList = input.files;
    const downloadURLs:any [] = []
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (file) {
        const storageRef = ref(this.storage, `user/${v4()}/${file.name}`);
        await uploadBytesResumable(storageRef, file);
        downloadURLs.push(await getDownloadURL(storageRef))
      }
    }
    return downloadURLs;
  }

  async mandarFotos(input: any): Promise<any> {
    const downloadURLs:any [] = []
    for (let i = 0; i < input.length; i++) {
      const file = input[i];
      if (file) {
        const storageRef = ref(this.storage, `user/${v4()}/${file.name}`);
        await uploadBytesResumable(storageRef, file);
        downloadURLs.push(await getDownloadURL(storageRef))
      }
    }
    return downloadURLs;
  }

  verFoto(): Observable<string[]> {
    return from(listAll(this.listRef)).pipe(
      mergeMap((result: ListResult) => {
        const downloadURLs$ = result.items.map((item) =>
          from(getDownloadURL(item))
        );
        return new Observable<string[]>((observer) => {
          let completed = 0;
          const urls: string[] = [];

          downloadURLs$.forEach((url$) => {
            url$.subscribe((url) => {
              urls.push(url);
              completed++;

              if (completed === downloadURLs$.length) {
                observer.next(urls);
                observer.complete();
              }
            });
          });
        });
      })
    );
  }
}
