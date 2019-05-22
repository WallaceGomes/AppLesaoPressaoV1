import { Injectable } from '@angular/core';
import { AuthData } from './auth-data.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class AuthService {
    private token: string;
    private authStatusListener = new Subject<boolean>();
    private isAutenticado = false;

    constructor(private http: HttpClient, private router: Router) {}

    getToken() {
        return this.token;
    }

    getIsAutenticado() { // função para passar a informação se o usuário está autenticado ou não
        return this.isAutenticado;
    }

    getAuthStatusListener() {   // este listener vai informar se o usuário está autenticado ou não para omitir certas funções no app
        return this.authStatusListener.asObservable();
    }

    createUsuario(email: string, senha: string) {
        const authData: AuthData = {email: email, senha: senha}
        this.http.post('http://localhost:3000/api/usuario/cadastro', authData)
        .subscribe(response => {
            console.log(response);
        });
    }

    login(email: string, senha: string) {
        const authData: AuthData = {email: email, senha: senha}
        this.http.post<{token: string}>('http://localhost:3000/api/usuario/login', authData)
        .subscribe(response => {
            const token = response.token;
            this.token = token;
            if (token) {
                this.isAutenticado = true;
                this.authStatusListener.next(true);
                this.router.navigate(['/']);
            }
        });
    }
    logout() {
        this.token = null;
        this.isAutenticado = false;
        this.authStatusListener.next(false);
        this.router.navigate(['/']);
    }
}
