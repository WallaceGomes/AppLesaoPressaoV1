import { Component } from '@angular/core';
import { NgForm, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    options: FormGroup;
    constructor(public authService: AuthService, fb: FormBuilder) {
        this.options = fb.group({
            hideRequired: false,
            floatLabel: 'auto',
          });
    }

    onLogin(form: NgForm) {
        if (form.invalid) {
            return;
        }
        this.authService.login(form.value.email, form.value.senha);
    }
}
