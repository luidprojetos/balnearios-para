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
  public semana: any[] = [
    { dia: 'Domingo', ativo: false, horasInicio: '', horasFim: '' },
    { dia: 'Segunda', ativo: false, horasInicio: '', horasFim: '' },
    { dia: 'Terça', ativo: false, horasInicio: '', horasFim: '' },
    { dia: 'Quarta', ativo: false, horasInicio: '', horasFim: '' },
    { dia: 'Quinta', ativo: false, horasInicio: '', horasFim: '' },
    { dia: 'Sexta', ativo: false, horasInicio: '', horasFim: '' },
    { dia: 'Sabado', ativo: false, horasInicio: '', horasFim: '' },
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
  public urls: any = null;
  public avatar: any = null;
  public images: any = null;

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
    if (this.tipo === 0) {
      Object.assign(this.registerUser, {
        horarioFuincionamento: this.semana,
      });
    }

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
    console.log(this.url)
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

  EventChange(e: any, item: any) {
    const index = this.semana.indexOf(item);
    this.semana[index].ativo = e.detail.checked;

    console.log(this.semana);
  }

  tempoInicioCahnge(e: any, item: any) {
    const index = this.semana.indexOf(item);
    this.semana[index].horasInicio = e.detail.value;
    console.log(this.semana);
  }

  tempoFimCahnge(e: any, item: any) {
    const index = this.semana.indexOf(item);
    this.semana[index].horasFim = e.detail.value;
    console.log(this.semana);
  }

  handleCardapio(event: any) {
    const files = event.target.files;

    // Certifique-se de que há arquivos para processar
    if (files.length > 0) {
      this.images = files;
      this.urls = [];

      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.urls.push(e.target.result);

          // Verifique se todas as imagens foram carregadas antes de prosseguir
          if (this.urls.length === files.length) {
            // Todos os arquivos foram carregados, você pode fazer algo com as URLs aqui
          }
        };

        reader.readAsDataURL(files[i]);
      }
      console.log(this.urls)
    }
  }
}
