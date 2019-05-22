import { Injectable } from '@angular/core';
import { AuthData } from './auth-data.model';
import { HttpClient } from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class AuthService {
    private token: string;

    constructor(private http: HttpClient) {}

    getToken() {
        return this.token;
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
        });
    }
}
