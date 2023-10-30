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

  readonly reais: MaskitoOptions = {
    mask: ['R$', '', /\d/, /\d/, /\d/],
  };
  readonly maskPredicate: MaskitoElementPredicateAsync = async (el) =>
    (el as HTMLIonInputElement).getInputElement();
  public registerUser: any = {};
  public tipo: any;
  public url: any = null;
  public avatar: any = null;
  public urls: any = null;
  public images: any = null;
  public docuemntoUrls: any[] = [];
  public documento: any = [];
  public docs: any[] = [
    { nome: 'CPF', filelist: [] },
    { nome: 'Alvará', filelist: [] },
    { nome: 'Comprovante de residiencia', filelist: [] },
    { nome: 'Identidade', filelist: [] },
  ];
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
      const newAvatar = await this.storageService.mandarFoto(upload);
      this.registerUser.avatar = newAvatar[0];
    }

    if (this.images) {
      const newImages = await this.storageService.mandarFotos(this.images);
      this.registerUser.cardapio = newImages;
    }

    if (this.documento) {
      for(let i = 0; i <this.documento.length; i++){
        const newImages = await this.storageService.mandarFotos(this.documento[i]);
      }

     /*  this.registerUser.documento = newImages; */
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
    console.log(this.url);
    reader.readAsDataURL(this.avatar);
  }

  // Sanitizer para evitar erros de segurança ao exibir imagens dinamicamente
  getSanitizedUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  openFileInput(id: string) {
    console.log(id);
    const fileInput = document.getElementById(id) as HTMLInputElement;
    fileInput.click();
  }

  EventChange(e: any, item: any) {
    const index = this.semana.indexOf(item);
    this.semana[index].ativo = e.detail.checked;
  }
  tempoInicioCahnge(e: any, item: any) {
    const index = this.semana.indexOf(item);
    this.semana[index].horasInicio = e.detail.value;
  }
  tempoFimCahnge(e: any, item: any) {
    const index = this.semana.indexOf(item);
    this.semana[index].horasFim = e.detail.value;
  }

  handleCardapio(event: any) {
    const files = event.target.files;
    if (files.length > 0) {
      this.images = files;
      this.urls = [];
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
        };
        reader.readAsDataURL(files[i]);
      }
      console.log(this.images);
    }
  }

  handleDocumento = (event: any, index: any) => {
    const files = event.target.files;
    if (files.length > 0) {
      this.documento[index] = files;
      this.docuemntoUrls[index] = [];
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.docuemntoUrls[index].push(e.target.result);
        };
        reader.readAsDataURL(files[i]);
      }
    }

    console.log();
  };
}
