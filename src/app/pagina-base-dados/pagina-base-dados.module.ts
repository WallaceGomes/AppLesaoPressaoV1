import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PaginaBaseDadosPage } from './pagina-base-dados.page';
// import { FichaListComponent } from './../fichas/ficha-list/ficha-list.component';
import { MatExpansionModule, MatButtonModule, MatPaginatorModule, MatCardModule } from '@angular/material';
import { AnalisePacientesComponent } from '../analises/analise-pacientes/analise-pacientes.component';

const routes: Routes = [
  {
    path: '',
    component: PaginaBaseDadosPage
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
    MatPaginatorModule,
    MatCardModule
  ],
  declarations: [PaginaBaseDadosPage, AnalisePacientesComponent]
})
export class PaginaBaseDadosPageModule {}
