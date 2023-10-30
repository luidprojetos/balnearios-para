import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.page.html',
  styleUrls: ['./buscar.page.scss'],
})
export class BuscarPage implements OnInit {
  public lista = [
    'Abaetetuba',
    'Barcarena',
    'Cametá',
    'Dom Eliseu',
    'Eldorado do Carajás',
    'Floresta do Araguaia',
    'Gurupá',
    'Igarapé-Açu',
    'Jacareacanga',
    'Limoeiro do Ajuru',
  ];
  public results = [...this.lista];
  constructor() {}
  handleChange(event:any) {
    const query = event.target.value.toLowerCase();
    this.results = this.lista.filter((d) => d.toLowerCase().indexOf(query) > -1);
  }
  ngOnInit() {}
}
