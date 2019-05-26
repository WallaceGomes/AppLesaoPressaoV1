import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-cadastro',
    templateUrl: './cadastro.component.html',
    styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {

    constructor(public authService: AuthService, private router: Router) {}

    onCadastro(form: NgForm) {
        if (form.invalid) {
            return;
        }
        this.authService.createUsuario(form.value.email, form.value.senha);
    }
}
