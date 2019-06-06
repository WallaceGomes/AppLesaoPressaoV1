import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PaginaCadastroPacientesPage } from './pagina-cadastro-pacientes.page';
import { CadastroPaciente } from '../pacientes/paciente-cadastro/cadastro-pacientes.component';
import { MatCardModule, MatInputModule, MatButtonModule, MatToolbarModule, MatDividerModule } from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: PaginaCadastroPacientesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatDividerModule,
  ],
  declarations: [PaginaCadastroPacientesPage, CadastroPaciente]
})
export class PaginaCadastroPacientesPageModule {}
