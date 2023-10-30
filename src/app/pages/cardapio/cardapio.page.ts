import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.page.html',
  styleUrls: ['./cardapio.page.scss'],
})
export class CardapioPage implements OnInit {
  public img: any;
  public cardapio: any = [];
  constructor(private router: Router) {
    this.cardapio =
      this.router.getCurrentNavigation()?.extras.state?.['item'].cardapio;
    this.img =
      this.router.getCurrentNavigation()?.extras.state?.['item'].avatar;
  }

  ngOnInit() {}
}
