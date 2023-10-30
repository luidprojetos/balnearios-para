import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent  implements OnInit {
  public pagina = [
    {pagina:'',iconi:'home-outline'},
    {pagina:'',iconi:'bag-outline'},
    {pagina:'',iconi:'heart-outline'},
    {pagina:'',iconi:'person-outline'}
  ]
  constructor(
    private router: Router
  ) { }

  ngOnInit() {}

  redirect(p:string){
    this.router.navigate([p])
  }


}
