import { Component } from '@angular/core';
import { NgForm} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-cadastro',
    templateUrl: './cadastro.component.html',
    styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {

    constructor(public authService: AuthService, private router: Router) {}

    // form: FormGroup;

    onCadastro(form: NgForm) {
        if (form.invalid) {
            return;
        }
        this.authService.createUsuario(
            form.value.email,
            form.value.senha,
            form.value.nome,
            form.value.matricula,
            form.value.unidade
        );
    }

    // get nomepaciente() {
    //     return this.form.get('nome');
    //   }

    // ngOnInit() {
    //     this.form = new FormGroup({
    //       'nome': new FormControl('', [Validators.required]),
    //       'matricula': new FormControl('', [Validators.required]),
    //       'dataInternacao': new FormControl('', [Validators.required]),
    //       'dataNascimento': new FormControl('', [Validators.required]),
    //       'patologia': new FormControl('', [Validators.required]),
    //       'comorbidades': new FormControl('', [Validators.required])
    //     });
}
