import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

  paginas: any[] = [
    {title: "Início", icon: "home", url: "/home"},
    {title: "Cadastrar paciente", icon: "filing", url: "/pagina-cadastro-pacientes"},
    {title: "Ver pacientes", icon: "document", url: "/pagina-listar-pacientes"},
    {title: "Exibir fichas", icon: "document", url: "/pagina-listar-fichas"},
    {title: "Estatísticas", icon: "analytics", url: "/pagina-base-dados"},
    {title: "Ajuda", icon: "help", url: "/pagina-ajuda-escala"},
    {title: "Logout", icon: "log-out"}
  ];
  private authListenerSubs: Subscription;
  usuarioIsAutenticado = false;

  usuario: any;
  email: any;
  matricula: any;
  unidade: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService
  ) {
    this.initializeApp();
  }

  ngOnInit() {
    this.authService.autoAuthUser();
    this.authListenerSubs = this.authService.getAuthStatusListener()
    . subscribe(isAutenticado => {
      this.usuarioIsAutenticado = isAutenticado;
      this.email = this.authService.getEmail;
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  // onLogout() {
  //   this.authService.logout();
  // }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
