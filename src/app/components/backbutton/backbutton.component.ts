import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-backbutton',
  templateUrl: './backbutton.component.html',
  styleUrls: ['./backbutton.component.scss'],
})
export class BackbuttonComponent  implements OnInit {
  @Input() path: string = '';
  constructor(private route: Router) { }

  ngOnInit() {}

  async navigate() {
    await this.route.navigate([`/${this.path}`])
  }

}
