import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public userForm: FormGroup;
  private loading: any;
  public error: string = '';
  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private alertController: AlertController

  ) {
    this.userForm = this.formBuilder.group({
      email: '',
      password: '',
    });
  }

  ngOnInit() {}

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'O que você deseja em nosso app?',
      buttons: [
        {
          text: 'Cadastrar Local',
          role: 'cancel',
          handler: async () => {
            await this.router.navigate(['/register'], {queryParams: {tipo: 0}})
          },
        },
        {
          text: 'Conhecer locais',
          role: 'confirm',
          handler: async () => {
            await this.router.navigate(['/register'], {queryParams: {tipo: 1}})
          },
        },
      ],
    });

    await alert.present();
  }

  redirect(path: string) {
    this.router.navigate([path]);
  }
}
