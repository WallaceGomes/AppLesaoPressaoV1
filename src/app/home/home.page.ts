import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  private authListenerSubs: Subscription;
  usuarioIsAutenticado = false;

  constructor(private navCtrl: NavController, private authService: AuthService) { }

  // AuthService está sendo usado para checar se o usuário está logado, se ele estiver vai liberar as funções da página

  ngOnInit() {
    this.authListenerSubs = this.authService.getAuthStatusListener()
    . subscribe(isAutenticado => {
      this.usuarioIsAutenticado = isAutenticado;
    });
  }

  onLogout() {
    this.authService.logout();
  }

  abrirPagina(nomeDaPagina: string) {
    this.navCtrl.navigateForward(nomeDaPagina);
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

}

