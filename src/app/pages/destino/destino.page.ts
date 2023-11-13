import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-destino',
  templateUrl: './destino.page.html',
  styleUrls: ['./destino.page.scss'],
})
export class DestinoPage implements OnInit {

  public item:any
  public dados = [{ img: '../../../assets/locais/foto1.jpg' }];
  public menu = [
    { nome: 'Cardapio', path: 'cardapio' },
    { nome: 'Foto', path: 'cardapio' },
    { nome: 'Igarapê', path: 'cardapio' },
  ];
  constructor(private router: Router) {
    this.item = this.router.getCurrentNavigation()?.extras.state
    console.log(this.item)
  }

  ngOnInit() {}

  redirect(p:string, item:any){
    this.router.navigate([p], {state:{item:item}})
  }
}
