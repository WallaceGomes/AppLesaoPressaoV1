import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PaginaLoginPage } from './pagina-login.page';
import { MatCardModule, MatInputModule, MatButtonModule, MatToolbarModule, MatDividerModule } from '@angular/material';
import { LoginComponent } from '../auth/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: PaginaLoginPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatDividerModule,
  ],
  declarations: [
    PaginaLoginPage,
    LoginComponent
  ]
})
export class PaginaLoginPageModule {}
