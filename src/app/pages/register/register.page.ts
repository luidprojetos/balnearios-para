import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MaskitoElementPredicateAsync, MaskitoOptions } from '@maskito/core';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public semana: any = [
    { dia: 'Domingo', ativo: false },
    { dia: 'Segunda',  ativo: false },
    { dia: 'Terça',  ativo: false },
    { dia: 'Quarta',  ativo: false },
    { dia: 'Quinta',  ativo: false },
    { dia: 'Sexta',  ativo: false },
    { dia: 'Sabado', ativo: false },
  ];

  readonly phoneMask: MaskitoOptions = {
    mask: [
      '(',
      /\d/,
      /\d/,
      ')',
      ' ',
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      '-',
      /\d/,
      /\d/,
      /\d/,
      /\d/,
    ],
  };

  readonly horario: MaskitoOptions = {
    mask: [/\d/, /\d/, ':', /\d/, /\d/, ' ate ', /\d/, /\d/, ':', /\d/, /\d/],
  };
  readonly maskPredicate: MaskitoElementPredicateAsync = async (el) =>
    (el as HTMLIonInputElement).getInputElement();
  public registerUser: any = {};
  public tipo: any;
  public url: any = null;
  public avatar: any = null;
  constructor(
    private router: Router,
    private sanitizer: DomSanitizer,
    private storageService: StorageService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.tipo =
      this.router.getCurrentNavigation()?.extras.queryParams?.['tipo'];
    this.registerUser.tipo = this.tipo;
  }

  async criarUsuario(upload: any) {
    if (this.avatar) {
      this.registerUser.avatar = await this.storageService.mandarFoto(upload);
    }
    await this.authService.cadastrar(this.registerUser);

    this.router.navigate(['login']);
  }
  handleFile(event: any) {
    this.avatar = event.target.files?.[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.url = e.target.result;
    };

    reader.readAsDataURL(this.avatar);
  }

  // Sanitizer para evitar erros de segurança ao exibir imagens dinamicamente
  getSanitizedUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  openFileInput() {
    const fileInput = document.getElementById(
      'upload-photo'
    ) as HTMLInputElement;
    fileInput.click();
  }

  EventChange(e:any){
    console.log(e)
  }
}
