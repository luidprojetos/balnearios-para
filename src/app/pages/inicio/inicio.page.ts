import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CollectionService } from 'src/app/services/collection.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  public locais: any= []
  public balneario = [
    { nome: 'Balneario do Hirley', img: '../../../assets/locais/foto1.jpg' },
    { nome: 'Hotel Fazenda', img: '../../../assets/locais/foto2.jpg' },
    {
      nome: 'Balneario do Levi - Moju',
      img: '../../../assets/locais/foto3.jpg',
    },
  ];
  constructor(private router: Router, private collection: CollectionService) {
    this.pegarBalnearios();
  }

  ngOnInit() {
  }

  redirect(p: string, item:any) {
    this.router.navigate([p],{state:{item:item}});
  }

 async pegarBalnearios(){
    const lugar = await this.collection.ler();
    lugar.forEach((doc)=>{
      this.locais.push(doc.data());
    });
    console.log(this.locais)
  }
}
