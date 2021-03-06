import { Injectable } from '@angular/core';
import { AuthData } from './auth-data.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from './../../environments/environment';
import { AlertController } from '@ionic/angular';
import { UserData } from './user-data.model';
const BACKEND_URL = environment.apiUrl + "/usuario/";

@Injectable({ providedIn: 'root' })
export class AuthService {
    private token: string;
    private tokenTimer: any;
    private authStatusListener = new Subject<boolean>();
    private isAutenticado = false;

    // usuario = '';
    email = '';
    // matricula = '';
    // unidade = '';

    constructor(private http: HttpClient, private router: Router, private alertCtrl: AlertController) {}

    // setUsuario(usuario: string) {
    //     this.usuario = usuario;
    // }

    setEmail(email: string) {
        this.email = email;
    }

    // setMatricula(matricula: string) {
    //     this.matricula = matricula;
    // }

    // setUnidade(unidade: string) {
    //     this.unidade = unidade;
    // }

    // getUsuario() {
    //     return this.usuario;
    // }

    getEmail() {
       return this.email;
    }

    // getMatricula() {
    //     return this.matricula;
    // }

    // getUnidade() {
    //     return this.unidade;
    // }

    getToken() {
        return this.token;
    }

    getIsAutenticado() { // função para passar a informação se o usuário está autenticado ou não
        return this.isAutenticado;
    }

    getAuthStatusListener() {   // este listener vai informar se o usuário está autenticado ou não para omitir certas funções no app
        return this.authStatusListener.asObservable();
    }

    createUsuario(email: string, senha: string, nome: string, matricula: string, unidade) {
        const userData: UserData = {email: email, senha: senha, nome: nome, matricula: matricula, unidade: unidade}
        this.http.post(BACKEND_URL + '/cadastro', userData)
        .subscribe(response => {
            console.log(response);
            this.alertConfirm();
            this.login(email, senha);
        });
    }

    login(email: string, senha: string) {
        const authData: AuthData = {email: email, senha: senha}
        this.http.post<{token: string, expiresIn: number }>(BACKEND_URL + '/login', authData)
        .subscribe(response => {
            const token = response.token;
            this.token = token;
            if (token) {
                this.setEmail(email);
                const expiresInDuration = response.expiresIn;
                this.setAuthTimer(expiresInDuration);
                this.isAutenticado = true;
                this.authStatusListener.next(true);
                const now = new Date();
                const expirationDate = new Date(now.getTime() + expiresInDuration * 1000000);
                this.saveAuthData(token, expirationDate);
                this.router.navigate(['/']);
            }
        });
    }

    autoAuthUser() {
        const authInformation = this.getAuthData();
        if (!authInformation) {
            return;
        }
        const now = new Date();
        const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
        if (expiresIn > 0) {
            this.token = authInformation.token;
            this.isAutenticado = true;
            this.setAuthTimer(expiresIn / 60);
            this.authStatusListener.next(true);
        }
    }

    logout() {
        this.token = null;
        this.isAutenticado = false;
        this.authStatusListener.next(false);
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        this.router.navigate(['/']);
    }

    async alertConfirm() {
        const alert = await this.alertCtrl.create({
          header: 'Sucesso!',
          message: 'Usuário cadastrado!',
          buttons: [
             {
              text: 'OK',
              handler: () => {
                this.router.navigate(["/"]);
              }
            }
          ]
        });
        await alert.present();
      }

    private setAuthTimer(duration: number) {
        console.log("Setting timer: " + duration);
        this.tokenTimer = setTimeout(() => {
            this.logout();
        }, duration * 1000);
    }

    private saveAuthData(token: string, expirationDate: Date) {
        localStorage.setItem('token', token);
        localStorage.setItem('expiration', expirationDate.toISOString());
    }

    private clearAuthData() {
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
    }

    private getAuthData() {
        const token = localStorage.getItem('token');
        const expirationDate = localStorage.getItem('expiration');
        if (!token || !expirationDate) {
            return;
        }
        return {
            token: token,
            expirationDate: new Date(expirationDate)
        }
    }
}
