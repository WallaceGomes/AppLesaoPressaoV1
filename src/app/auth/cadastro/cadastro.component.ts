import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-cadastro',
    templateUrl: './cadastro.component.html',
    styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {

    constructor(public authService: AuthService) {}

    onCadastro(form: NgForm) {
        if (form.invalid) {
            return;
        }
        this.authService.createUsuario(form.value.email, form.value.senha);
    }
}
