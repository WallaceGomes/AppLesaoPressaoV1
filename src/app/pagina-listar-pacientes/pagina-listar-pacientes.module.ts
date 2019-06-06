import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PaginaListarPacientesPage } from './pagina-listar-pacientes.page';
import { MatExpansionModule, MatButtonModule, MatPaginatorModule } from '@angular/material';
import { ListaPacientesComponent } from '../pacientes/paciente-lista/lista-pacientes.component';

const routes: Routes = [
  {
    path: '',
    component: PaginaListarPacientesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MatExpansionModule,
    MatButtonModule,
    MatPaginatorModule
  ],
  declarations: [PaginaListarPacientesPage, ListaPacientesComponent]
})
export class PaginaListarPacientesPageModule {}
