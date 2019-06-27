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

  paginas : any[] = [
    {title: "Início", icon: "home", url: "/home"},
    {title: "Ver pacientes", icon: "filing", url: "/pagina-listar-pacientes"},
    {title: "Exibir fichas", icon: "document", url: "/pagina-listar-fichas"},
    {title: "Estatísticas", icon: "analytics", url: "/pagina-base-dados"}
  ];
  private authListenerSubs: Subscription;
  usuarioIsAutenticado = false;

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
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
